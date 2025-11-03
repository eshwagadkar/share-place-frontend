import { useParams } from 'react-router-dom'
import PlaceList from '../components/PlaceList'

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Eifel Tower',
    description: 'One of the most famous sky scrapers in the world',
    imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    address: 'Paris',
    location: {
      lat: 48.8575475,
      lng: 2.3513765
    },
    creator: 'u2'
  }
]

export default function UserPlaces() {

     const userId = useParams().uid

     const userSpecificPlaces = DUMMY_PLACES.filter(place => place.creator === userId)

    return <PlaceList items={userSpecificPlaces}/>
}