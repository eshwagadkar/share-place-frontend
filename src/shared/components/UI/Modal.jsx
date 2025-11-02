import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'

import Backdrop from './Backdrop'

import './Modal.css'

function ModalOverlay({ className, 
                        style, 
                        headerClass, 
                        header, 
                        onSubmit, 
                        contentClass, 
                        children, 
                        footerClass, 
                        footer
}) {

    const content = (
        <div className={`modal ${className}`} style={style}>
        <header className={`modal__header ${headerClass}`}>
            <h2>{header}</h2>
        </header>
        <form onSubmit={ onSubmit ? onSubmit : event => event.preventDefault()}>
            <div className={`modal__content ${contentClass}`}>
                {children}
            </div>
            <footer className={`modal__footer ${footerClass}`}>
                {footer}
            </footer>
        </form>
        </div>
    )

    return createPortal(content, document.getElementById('modal-hook'))
}

export default function Modal(props) {
    
    const modalRef = useRef(null)

    return <>
    { props.show && <Backdrop onClick={props.onCancel} /> }
    <CSSTransition 
        in={props.show} 
        mountOnEnter 
        unmountOnExit 
        timeout={200}
        classNames='modal'    
        nodeRef={modalRef}
    > 
        <ModalOverlay ref={modalRef} {...props} />
    </CSSTransition>
    </>
}