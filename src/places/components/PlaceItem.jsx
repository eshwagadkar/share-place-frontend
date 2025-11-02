import { useState } from 'react'
import Card from '../../shared/components/UI/Card'
import Button from '../../shared/components/FormElements/Button'
import Modal from '../../shared/components/UI/Modal'

import './PlaceItem.css'

export default function PlaceItem({ id, image, title, address, description }) {

    const [showMap, setShowMap] = useState(false)

    const viewMapHandler = () => { setShowMap(true) }
    const closeMapHandler = () => { setShowMap(false) }

    return (
    <>
      <Modal show={showMap} 
        onCancel={closeMapHandler}
        header={address}
        contentClass='place-item__modal-content'
        footerClass='place-item__modal-actions'
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
            <h2>The Map</h2>
        </div>
      </Modal>

      <li className='place-item'>
        <Card>
            <div className='place-item__image'>
                <img src={image} alt={title} />
            </div>
            <div className='place-item__info'>
                <h2>{title}</h2>
                <h3>{address}</h3>
                <p>{description}</p>
            </div>
           <div className='place-item__actions'>
                <Button inverse onClick={viewMapHandler}>VIEW ON MAP</Button>
                <Button to={id}>EDIT</Button>
                <Button danger>DELETE</Button>
           </div>
        </Card>
      </li>
    </>
    )
}