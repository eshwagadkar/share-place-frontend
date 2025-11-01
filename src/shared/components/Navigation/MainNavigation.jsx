import { useState } from 'react'
import { Link } from 'react-router-dom'

import MainHeader from './MainHeader'
import NavLinks from './NavLinks'
import SideDrawer from './SideDrawer'
import Backdrop from '../UI/Backdrop'

import './MainNavigation.css'

export default function MainNavigation() {

    const [drawerIsOpen, setDrawerIsOpen] = useState(false)

    function openDrawerHandler(){ setDrawerIsOpen(true) }

    function closeDrawerHandler(){ setDrawerIsOpen(false) }
    
    return (
        <>
        { drawerIsOpen && <Backdrop onClick={closeDrawerHandler}/>}
        <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
                <nav className='main-navigation__drawer-nav'>
                    <NavLinks />
                </nav>
        </SideDrawer>

        <MainHeader>
            <button onClick={openDrawerHandler} 
                className='main-navigation__menu-btn'>
                <span />
                <span />
                <span />
            </button>
            <h1 className='main-navigation__title'>
                <Link to='/'>Share Places</Link>
            </h1>
            <nav className='main-navigation__header-nav'>
                <NavLinks />
            </nav>
        </MainHeader>
        </>
    )
}