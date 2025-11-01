import { createPortal } from 'react-dom'
import { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

import './SideDrawer.css'

export default function SideDrawer({ show, children, onClick }) {

    const nodeRef = useRef(null)

    let content = (
        <CSSTransition 
            in={show}
            timeout={200} 
            classNames='slide-in-left'
            mountOnEnter
            unmountOnExit
            nodeRef={nodeRef}
        >
            <aside ref={nodeRef} 
                   className='side-drawer'
                   onClick={onClick}
            >
                {children}
            </aside>
        </CSSTransition>
    )

    return createPortal(content, document.getElementById('drawer-hook'))
}