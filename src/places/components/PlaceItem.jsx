import Card from '../../shared/components/UI/Card'
import './PlaceItem.css'

export default function PlaceItem({ image, title, address, description }) {
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
                <button>VIEW ON MAP</button>
                <button>EDIT</button>
                <button>DELETE</button>
            </div>
        </Card>
    </li>

    )
}