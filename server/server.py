from flask import Flask
from flask import request
from flask.helpers import send_from_directory
from flask_sqlalchemy import SQLAlchemy
from model import G_DCGAN, G_NET
from model import RNN_ENCODER, CNN_ENCODER
from miscc.config import cfg, cfg_from_file
from miscc.utils import weights_init, load_params, copy_G_params
from miscc.utils import mkdir_p
from flask_cors import CORS, cross_origin

import time

import torch.utils.data as data
from torch.autograd import Variable
from nltk.tokenize import RegexpTokenizer

import numpy as np
import random
import string
import torch
import pickle
import nltk
from easydict import EasyDict as edict

import os
from PIL import Image

import json
app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"]= "sqlite:///DEA-GAN.db"
db = SQLAlchemy(app)

class Images(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    image_path = db.Column(db.Text, nullable=False)

    def __str__(self):
        return f'{self.id} {self.name} {self.image_path}'

filepath = "./captions.pickle"
with open(filepath, 'rb') as f:
    x = pickle.load(f)
    train_captions, test_captions, train_attrs, test_attrs = x[0], x[1], x[4], x[5]
    ixtoword, wordtoix = x[2], x[3]
    del x
    n_words = len(ixtoword)

cfg_from_file("./cfg/eval_bird.yml")

global current_caption

def get_attribute(cap):
    cap = cap.replace("\ufffd\ufffd", " ")
    # picks out sequences of alphanumeric characters as tokens
    # and drops everything else
    tokenizer = RegexpTokenizer(r'\w+')
    tokens = tokenizer.tokenize(cap.lower())
    # sentence = tokenizer.tokenize(text.lower())

    # Attribute extraction
    sentence_tag = nltk.pos_tag(tokens)
    # CUB
    grammar = "NP: {<DT>*<JJ>*<CC|IN>*<JJ>+<NN|NNS>+|<DT>*<NN|NNS>+<VBZ>+<JJ>+<IN|CC>*<JJ>*}"
    # COCO
    #  grammar = "NP: {<CD|DT|JJ>*<JJ|PRP$>*<NN|NNS>+|<CD|DT|JJ>*<JJ|PRP$>*<NN|NNS>+<IN>+<NN|NNS>+|<VB|VBD|VBG|VBN|VBP|VBZ>+<CD|DT>*<JJ|PRP$>*<NN|NNS>+|<IN>+<DT|CD|JJ|PRP$>*<NN|NNS>+<IN>*<CD|DT>*<JJ|PRP$>*<NN|NNS>*}"
    cp = nltk.RegexpParser(grammar)
    tree = cp.parse(sentence_tag)                  

    attr_list = []

    for i in range(len(tree)):
        if type(tree[i]) == nltk.tree.Tree:
            attr = []
            for j in range(len(tree[i])):
                attr.append(tree[i][j][0])
            attr_list.append(attr)
    return attr_list

def get_caption(sent_ix):
    # a list of indices for a sentence
    sent_caption = np.asarray(sent_ix).astype('int64')

    if (sent_caption == 0).sum() > 0:
        print('ERROR: do not need END (0) token', sent_caption)
    num_words = len(sent_caption)
    # pad with 0s (i.e., '<end>')
    x = np.zeros((cfg.TEXT.WORDS_NUM, 1), dtype='int64')
    x_len = num_words
    if num_words <= cfg.TEXT.WORDS_NUM:
        x[:num_words, 0] = sent_caption
    else:
        ix = list(np.arange(num_words))  # 1, 2, 3,..., maxNum
        np.random.shuffle(ix)
        ix = ix[:cfg.TEXT.WORDS_NUM]
        ix = np.sort(ix)
        x[:, 0] = sent_caption[ix]
        x_len = cfg.TEXT.WORDS_NUM
    return x, x_len

def get_attr(sent_attr):
    # sen_attr = np.asarray(self.attrs[sent_ix]).astype('int64')
    num_attrs = len(sent_attr)  # num of attr per sentence
    # cfg.MAX_ATTR_NUM, cfg.MAX_ATTR_LEN
    # pad with 0s (i.e., '<end>') ,  max_atr_len = 5
    sen_attr_new = []
    attr_cnt = 0
    # new
    sen_attr_new = np.zeros((cfg.MAX_ATTR_NUM, cfg.MAX_ATTR_LEN, 1), dtype='int64')
    
    for attr in sent_attr:
        attr = np.asarray(attr).astype('int64')
        # print(attr.shape, "====", attr)
        attr_cnt = attr_cnt + 1
        if attr_cnt > cfg.MAX_ATTR_NUM:
            break
        attr_len = len(attr)
        if attr_len <= cfg.MAX_ATTR_LEN:
            sen_attr_new[attr_cnt-1][:attr_len, 0] = attr
        else:
            ix = list(np.arange(attr_len))  # 1, 2, 3,..., maxNum
            np.random.shuffle(ix)
            ix = ix[:cfg.MAX_ATTR_LEN]
            ix = np.sort(ix)
            sen_attr_new[attr_cnt-1][:, 0] = attr[ix]
    return sen_attr_new

def convert_ix(caption):
    attr = get_attribute(caption)
    sent_ix = []
    sent_attr = []

    for word in caption.split(" "):
        if word in wordtoix:
            sent_ix.append(wordtoix[word])
    
    for att in attr:
        rev = []
        for word in att:
            if word in wordtoix:
                rev.append(wordtoix[word])
        sent_attr.append(rev)
    return sent_ix, sent_attr

def generate_image(caption):
    # caption = get_text_input()
    sent_ix, sent_attr = convert_ix(caption)
    cap, cap_len = get_caption(sent_ix)
    attr = get_attr(sent_attr)
    caps = np.zeros((20, 2))
    attrs = np.zeros((3, 5, 2))
    cap_lens = np.zeros((2))
    caps[:, 0:1] = cap
    caps[:, 1:2] = cap
    attrs[:, :, 0:1] = attr
    attrs[:, :, 1:2] = attr
    cap_lens = np.array([cap_len, cap_len])
    gpu = 0
    torch.cuda.set_device(gpu)

    netG = G_NET()
    netG.apply(weights_init)
    netG.cuda(gpu)
    netG.eval()

    text_encoder = RNN_ENCODER(n_words, nhidden=cfg.TEXT.EMBEDDING_DIM)
    state_dict = torch.load(cfg.TRAIN.NET_E, map_location=lambda storage, loc: storage)
    # print('state_dict:', state_dict.keys(), state_dict['encoder.weight'].shape)
    # print(text_encoder.encoder.weight.shape)
    text_encoder.load_state_dict(state_dict)
    print('Load text encoder from:', cfg.TRAIN.NET_E)
    text_encoder = text_encoder.cuda(gpu)
    text_encoder.eval()

    # image_encoder = CNN_ENCODER(cfg.TEXT.EMBEDDING_DIM)
    # img_encoder_path = cfg.TRAIN.NET_E.replace('text_encoder', 'image_encoder')
    # state_dict = torch.load(img_encoder_path, map_location=lambda storage, loc: storage)
    # image_encoder.load_state_dict(state_dict)
    # print('Load image encoder from:', img_encoder_path)
    # image_encoder = image_encoder.cuda(gpu)
    # image_encoder.eval()

    batch_size = 2
    nz = cfg.GAN.Z_DIM
    noise = Variable(torch.FloatTensor(batch_size, nz), volatile=True)
    noise = noise.cuda(non_blocking=True)

    model_dir = cfg.TRAIN.NET_G
    state_dict = torch.load(model_dir, map_location=lambda storage, loc: storage)
    # state_dict = torch.load(cfg.TRAIN.NET_G)
    netG.load_state_dict(state_dict)
    print('Load G from: ', model_dir)


    save_dir = "../fe/src/components/ImageOutput/image/content/generates"
    mkdir_p(save_dir)

    # prepare data minimal
    caps = torch.tensor(caps, dtype=torch.int).reshape(-1, 20).cuda()
    cap_lens = torch.tensor(cap_lens, dtype=torch.int).reshape(-1).cuda()
    attrs = torch.tensor(attrs, dtype=torch.int).reshape(-1, 3, 5).cuda()

    hidden = text_encoder.init_hidden(batch_size)
    # words_embs: batch_size x nef x seq_len
    # sent_emb: batch_size x nef

    words_embs, sent_emb = text_encoder(caps, cap_lens, hidden)
    words_embs, sent_emb = words_embs.detach(), sent_emb.detach()

    # attrs processing
    attr_len = torch.Tensor([cfg.MAX_ATTR_LEN] * cap_lens.size(0))
    _, attr_emb0 = text_encoder(attrs[:, 0:1, :].squeeze(), attr_len, hidden)
    _, attr_emb1 = text_encoder(attrs[:, 1:2, :].squeeze(), attr_len, hidden)
    _, attr_emb2 = text_encoder(attrs[:, 2:3, :].squeeze(), attr_len, hidden)
    attr_embs = torch.stack((attr_emb0, attr_emb1, attr_emb2), dim=2)  # [batch_size, nef, attr_num]

    mask = (caps == 0)
    num_words = words_embs.size(2)
    if mask.size(1) > num_words:
        mask = mask[:, :num_words]

    noise.data.normal_(0, 1)
    fake_imgs, _, _, _ = netG(noise, sent_emb, words_embs, attr_embs, mask, cap_len)
    for j in range(batch_size):
        s_tmp = '%s/single/%s' % (save_dir, "cc")
        folder = s_tmp[:s_tmp.rfind('/')]
        if not os.path.isdir(folder):
            # print('Make a new folder: ', folder)
            mkdir_p(folder)
        k = -1
        # for k in range(len(fake_imgs)):
        im = fake_imgs[k][j].data.cpu().numpy()
        # [-1, 1] --> [0, 255]
        im = (im + 1.0) * 127.5
        im = im.astype(np.uint8)
        im = np.transpose(im, (1, 2, 0))
        im = Image.fromarray(im)
        img_name = 's%d_%d' % (k, j)
        # img_name = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(cap_len))
        fullpath = '%s%s.png' % (s_tmp, img_name)
        im.save(fullpath)
        break
    return img_name

@app.route("/get_text_input", methods = ['POST'])
# @cross_origin()
def get_text_input():
    if request.method == 'POST':
        current_caption = json.loads(json.dumps(request.get_json()))
        input_text = Images(name=current_caption['name'], image_path='')
        db.session.add(input_text)
        db.session.commit()
    return {
        'code': 200,
        'message': 'Success',
        'data': current_caption
    }

@app.route("/get_image")
# @cross_origin()
def get_image():
    query = Images.query.all()
    result = {
        'id': query[-1].id,
        'name': query[-1].name,
        'image_path': query[-1].image_path
    }
    image_path = generate_image(result['name'])
    # time.sleep(3)
    query = Images.query.filter_by(id=result['id']).first()
    query.image_path = image_path
    result['image_path'] = image_path
    print(result)
    db.session.commit()
    return {
        "data": result
    }

@app.route("/get_recommend_input")
# @cross_origin()
def get_recommend_input():
    data = []
    for i in range(5):
        randomIdx = random.randint(0, len(test_captions))
        caption = ""
        for cap in test_captions[randomIdx]: 
            caption += ixtoword[cap] + " "
        eachSen = {
            'id': i + 1,
            'value': caption
        }
        data.append(eachSen)
    return {
        'code': 200,
        'message': 'Success',
        'data': data
    }

# @app.route("/")
# @cross_origin()
# def serve():
#     return send_from_directory(app.static_folder, 'index.html')
    
if __name__ == "__main__":
    # Bind to PORT if defined, otherwise default to 5000.
    # port = int(os.environ.get('PORT', 5000))
    # app.run(host='0.0.0.0', port=port)
    app.run()