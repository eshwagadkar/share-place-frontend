import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PlaceList from '../components/PlaceList'
import ErrorModal from '../../shared/components/UI/ErrorModal'
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner'
import useHttpClient from '../../shared/hooks/http-hooks'

export default function UserPlaces() {
      const backendURL = import.meta.env.VITE_BACKEND_URL
      const [loadedPlaces, setLoadedPlaces] = useState()
      const {isLoading, error, sendRequest, clearError} = useHttpClient()

      const userId = useParams().uid

      useEffect(() => {

        async function fetchPlaces() {
            try {
              const responseData = await sendRequest(
                `${backendURL}places/user/${userId}`)
              setLoadedPlaces(responseData.places)  
            } catch(error) {}

        }

        fetchPlaces()

     },[sendRequest, userId])

     const placeDeleteHandler = (deletedPlaceId) => {
      setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId))
     }

    return <>
      <ErrorModal onClear={clearError} error={error}/>
      {isLoading && <div className="center"><LoadingSpinner /></div>}
      {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler}/>}
    </>
}