import { useRef, useEffect } from 'react'
import { loadGoogleMaps } from '../../../utils/loadGoogleMaps'
import './Map.css'

export default function Map({className, style, center, zoom}) {
    
    const mapRef = useRef()

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

    useEffect(() => {
        loadGoogleMaps(apiKey)
        .then(google => {
            const map = new google.maps.Map(mapRef.current, {
                center,
                zoom,
                mapId: "DEMO_MAP_ID",
            } )

            new google.maps.marker.AdvancedMarkerElement({ position: center, map: map })
        })
        .catch(error => {
            console.error("Maps failed to load", error)
        })
    }, [center, zoom])


    return <div ref={mapRef} className={`map ${className}`} style={style}></div>
}