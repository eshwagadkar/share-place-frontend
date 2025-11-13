import './PlaceList.css'
import Card from '../../shared/components/UI/Card'
import PlaceItem from './PlaceItem'
import Button from '../../shared/components/FormElements/Button'

export default function PlaceList({ items }) {

    if(items.length === 0) {
        return <div className='center place-list'>
            <Card>
                <h2>No places found, May be create one?</h2>
                <Button to='/places/new'>Share Place</Button>
            </Card>
        </div>
    }

    return (
        <ul className='place-list'>
            {items.map(place => (
                <PlaceItem 
                    key={place.id}
                    id={place.id}
                    image={place.image}
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