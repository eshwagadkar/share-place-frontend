import { createPortal } from 'react-dom'
import './SideDrawer.css'

export default function SideDrawer({ children }) {
    return createPortal(
        <aside className='side-drawer'>{children}</aside>,
        document.getElementById('drawer-hook')
    )
}