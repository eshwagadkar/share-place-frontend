import { useEffect, useState } from 'react'
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner'
import ErrorModal from '../../shared/components/UI/ErrorModal'
import UsersList from '../components/UsersList'
import useHttpClient from '../../shared/hooks/http-hooks'

export default function Users() {
    const backendURL = import.meta.env.VITE_BACKEND_URL
    const {isLoading, error, sendRequest, clearError } = useHttpClient()
    const [loadedUsers, setLoadedUsers] = useState()

    useEffect(() => {
        async function fetchUsers() {
            try{
                const responseData = await sendRequest(`${backendURL}users`)
                setLoadedUsers(responseData.users)
            } catch(error) { }
        }
        fetchUsers()
    },[sendRequest])

    return (
        <>  
         <ErrorModal onClear={clearError} error={error}/>
         {isLoading && <div className="center"><LoadingSpinner asOverlay /></div>}
         {!isLoading && loadedUsers && <UsersList items={loadedUsers}/>}
        </>
    )
}