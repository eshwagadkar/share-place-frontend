import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import './NavLinks.css'

export default function NavLinks() {

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    console.log(isLoggedIn)
    
    return <ul className='nav-links'>
        <li>
            <NavLink to='/' end>ALL USERS</NavLink>
        </li>
        { isLoggedIn && <li>
            <NavLink to='u1/places'>MY PLACES</NavLink>
        </li>
        }
        { isLoggedIn && <li>
            <NavLink to='places/new'>ADD PLACE</NavLink>
        </li>
        }
        { !isLoggedIn && <li>
            <NavLink to='auth'>AUTHENTICATE</NavLink>
        </li>
        }   
    </ul>
}