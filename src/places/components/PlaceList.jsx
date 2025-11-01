import './PlaceList.css'
import Card from '../../shared/components/UI/Card'
import PlaceItem from './PlaceItem'

export default function PlaceList({ items }) {

    if(items.length === 0) {
        return <div className='center place-list'>
            <Card>
                <h2>No places found, May be create one?</h2>
                <button>Share Place</button>
            </Card>
        </div>
    }

    return (
        <ul className='place-list'>
            {items.map(place => (
                <PlaceItem 
                    key={place.id}
                    id={place.id}
                    image={place.imageURL}
                    title={place.title}
                    description={place.description}
                    address={place.address}
                    creatorId={place.creator}
                    coordinates={place.location}
                />
            ))}
        </ul>
    )
}