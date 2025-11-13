import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { authActions } from '../../../store/auth-slice'
import './NavLinks.css'

export default function NavLinks() {
    const userId = useSelector(state => state.auth.userId)
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
       if (!isLoggedIn) {
            navigate('/auth', { replace: true })   // redirect to home
          }
    }, [isLoggedIn, navigate])
    

    function logoutHandler() {
        dispatch(authActions.logout({
            userId: null,
            isLoggedIn: false
        }
     ))
    }
    
    return <ul className='nav-links'>
        <li>
            <NavLink to='/' end>ALL USERS</NavLink>
        </li>
        { isLoggedIn && <li>
            <NavLink to={`${userId}/places`}>MY PLACES</NavLink>
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
        {
            isLoggedIn && <button onClick={logoutHandler}>LOGOUT</button>
        }
    </ul>
}