import Card from '../../shared/components/UI/Card'
import Button from '../../shared/components/FormElements/Button'
import './PlaceItem.css'

export default function PlaceItem({ id, image, title, address, description }) {
    return (
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
                <Button inverse>VIEW ON MAP</Button>
                <Button to={id}>EDIT</Button>
                <Button danger>DELETE</Button>
            </div>
        </Card>
    </li>

    )
}