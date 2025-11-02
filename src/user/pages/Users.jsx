
import UsersList from "../components/UsersList"

const USERS = [
    {
        id: 'u1',
        image: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg',
        name: 'eshwa',
        places: 4
    },
    {
        id: 'u2',
        image: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg',
        name: 'max',
        places: 4
    }
]

export default function Users() {
    return (
        <>
            <UsersList items={USERS}/>
        </>
    )
}