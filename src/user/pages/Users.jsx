import { useEffect, useState } from 'react'
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner'
import ErrorModal from '../../shared/components/UI/ErrorModal'
import UsersList from '../components/UsersList'

export default function Users() {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const [loadedUsers, setLoadedUsers] = useState()

    useEffect(() => {

        async function fetchUsers() {
            setIsLoading(true)
            
                try{
                    const response = await fetch('http://localhost:4001/api/v1/users')
                    
                    const responseData = await response.json()
                    
                    if(!response.ok){
                        throw new Error(responseData.message)
                    }

                    setLoadedUsers(responseData.users)
                    
                } catch(error) {
                    setError(error.message)
                }

            setIsLoading(false)


        }
        fetchUsers()
    },[])

    const errorHandler = () => setError(null)

    return (
        <>  
            <ErrorModal onClear={errorHandler} error={error}/>
            {isLoading && <div className="center"><LoadingSpinner /></div>}
            {!isLoading && loadedUsers && <UsersList items={loadedUsers}/>}
        </>
    )
}