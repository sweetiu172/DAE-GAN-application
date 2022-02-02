// import React, {useState} from 'react'
// import {

//     Navbar,
//     NavbarToggler,
//     NavbarBrand,
//     Nav,
//     NavItem,
//     NavLink,
//     UncontrolledDropdown,
//     DropdownToggle,
//     DropdownMenu,
//     DropdownItem, Collapse
// } from 'reactstrap';

// // import { MenuItems } from "./MenuItems"
// // import { Button } from '../Button'
// // import './Navbar.css'
// const Header = () => {
//   const [isOpen, toggleIsOpen] = useState(false)
//   const toggle = () => {
//       toggleIsOpen(!isOpen)
//   }
//   return (
//       <Navbar color="light" light expand="md">
//         <NavbarBrand href="/">reactstrap</NavbarBrand>
//         <NavbarToggler onClick = {toggle} />
//         <Collapse isOpen={isOpen} navbar>
//           <Nav className="mr-auto" navbar>
//             <NavItem>
//               <NavLink href="/tools">Components</NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
//             </NavItem>
//             <UncontrolledDropdown nav inNavbar>
//               <DropdownToggle nav caret>
//                 Options
//               </DropdownToggle>
//               <DropdownMenu end>
//                 <DropdownItem>
//                   Option 1
//                 </DropdownItem>no
//                 <DropdownItem>
//                   Option 2
//                 </DropdownItem>
//                 <DropdownItem divider />
//                 <DropdownItem>
//                   Reset
//                 </DropdownItem>
//               </DropdownMenu>
//             </UncontrolledDropdown>
//           </Nav>
//         </Collapse>
//       </Navbar>
//   )
// }
// export default Header


import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Collapse } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
// import HomeIcon from '@mui/icons-material/Home';
// import SortIcon from '@material-ui/icons/Sort';
import Link from '@material-ui/core/Link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKiwiBird } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontFamily: 'Nunito',
  },
  appbar: {
    background: 'none',
    
  },
  appbarWrapper: {
    width: '80%',
    margin: '0 auto',
  },
  appbarTitle: {
    flexGrow: '1',
  },
  icon: {
    color: '#f8331a',
    fontSize: '2rem',
    margin: '0 20px',
  },
  colorText: {
    color: '#f8331a',
    
    
  },
  colorText2: {
    color: 'rgb(123, 27, 59)',
  },
  container: {
    textAlign: 'center',
  },
  title: {
    color: '#fff',
    fontSize: '4.5rem',
  },
  goDown: {
    color: '#f8331a',
    fontSize: '4rem',
  },
}));
export default function Header() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);
  return (
    <div className={classes.root} id="header">
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.appbarWrapper}>
          <h1 className={classes.appbarTitle}>
            <span className={classes.colorText}><FontAwesomeIcon icon={faKiwiBird} size = '1x'></FontAwesomeIcon>DAE-GAN</span>
          </h1>
          <Link href="/">
            <HomeIcon className={classes.icon} />
          </Link>
          <Link href="/tools">
            <PlayArrowIcon className={classes.icon} />
          </Link>
        </Toolbar>
      </AppBar>

      <Collapse
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
        collapsedHeight={50}
      >
        <div className={classes.container}>
          <h1 className={classes.title}>
          <span className={classes.colorText2}>Welcome to </span><br />
          <span className={classes.colorText2}>Our</span><span className={classes.colorText}>Project.</span>
          </h1>
          
        </div>
      </Collapse>
    </div>
  );
}
