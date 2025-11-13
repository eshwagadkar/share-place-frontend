import { useState } from 'react'
import { useSelector } from 'react-redux'
import Card from '../../shared/components/UI/Card'
import Button from '../../shared/components/FormElements/Button'
import Modal from '../../shared/components/UI/Modal'
import Map from '../../shared/components/UI/Map'
import useHttpClient from '../../shared/hooks/http-hooks'

import './PlaceItem.css'
import ErrorModal from '../../shared/components/UI/ErrorModal'
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner'

export default function PlaceItem({ id, image, title, address, description, coordinates, onDelete }) {

    const [showMap, setShowMap] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const {isLoading, error, sendRequest, clearError} = useHttpClient()
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

    const viewMapHandler = () => { setShowMap(true) }
    const closeMapHandler = () => { setShowMap(false) }

    const showDeleteWarningHandler = () => {
      setShowConfirmModal(true)
    }

    const cancelDeleteHandler = () => {
       setShowConfirmModal(false)
    }

    const confirmDeleteHandler = async () => {
      setShowConfirmModal(false)
      try{
        await sendRequest(`http://localhost:4003/api/v1/places/${id}`, 'DELETE')
        onDelete(id)
      } catch(error) {}
    }

    return (
    <>
      <ErrorModal onClear={clearError} error={error} />
      <Modal show={showMap} 
        onCancel={closeMapHandler}
        header={address}
        contentClass='place-item__modal-content'
        footerClass='place-item__modal-actions'
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
            <Map center={coordinates} zoom={16} />
        </div>
      </Modal>

      <Modal show={showConfirmModal} onCancel={cancelDeleteHandler} header='Are you sure?' footerClass='place-item__modal-actions' footer={
        <> 
          <Button onClick={cancelDeleteHandler} inverse>CANCEL</Button>
          <Button onClick={confirmDeleteHandler} danger>DELETE</Button>
        </>
      }
      >
        <p>Do you want to proceed and delete this place?</p>
        <p>Please note that it cant be undone there after!</p>
      </Modal>

      <li className='place-item'>
        <Card>
            { isLoading && <LoadingSpinner asOverlay />}
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
                {isLoggedIn && <Button to={`/places/${id}`}>EDIT</Button>}
                {isLoggedIn && <Button onClick={showDeleteWarningHandler} danger>DELETE</Button>}
           </div>
        </Card>
      </li>
    </>
    )
}