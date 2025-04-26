import { useState, useEffect } from 'react'
import { useAppSelector } from '@/GlobalRedux/hooks'
import Map from 'ol/Map'
import View from 'ol/View'
import { layerList } from './layers/layerList'
import styles from './assets/MapContainer.module.css'

const MapContainer = () => {
    const mapLayers = useAppSelector((state) => state.map.mapLayers)
    const [mapObj, setMapObj] = useState<Map>()

    ////////////////////////////////////////////////////////////////////////////////////////
    //
    // Initialize the map with default layers
    //
    ///////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        // Get layers from global state to initially display on the map
        const initialLyrs = Object.entries(mapLayers)
            .map(([key, { visible }]) => {
                if (visible == true) {
                    return layerList[key]
                }
            })
            .filter((lyr) => !!lyr)

        // Create the map
        const map = new Map({
            target: 'map',
            view: new View({
                center: [-10997148, 4569099],
                zoom: 5,
            }),
            layers: initialLyrs,
        })

        setMapObj(map)
    }, [])

    ////////////////////////////////////////////////////////////////////////////////////////
    //
    // Add and remove layers from the map
    //
    ////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        //If not yet initialized, skip this section
        if (!mapLayers || !mapObj) {
            return
        }

        //Get list of names of all layers currently on the map
        let layerNamesOnMap: string[] = []
        let layersOnMap = mapObj.getAllLayers()
        layersOnMap.forEach((lyr) => layerNamesOnMap.push(lyr.get('name')))

        //Determine layer visiblity for the map
        let beVisible: string[] = []
        let notBeVisible: string[] = []
        Object.entries(mapLayers).forEach(([key, { visible }]) => {
            if (visible == false) notBeVisible.push(key)
            else beVisible.push(key)
        })

        //If layer that is on the map should not be visible, remove it
        const removeList = notBeVisible.filter((lyrName) => layerNamesOnMap.includes(lyrName))
        removeList.forEach((lyrName) => {
            layersOnMap.forEach((lyr) => {
                if (lyr.get('name') == lyrName) {
                    mapObj.removeLayer(lyr)
                }
            })
        })

        //If layer that is not visible on the map should be visible, add it
        const addList = beVisible.filter((lyrName) => !layerNamesOnMap.includes(lyrName))
        addList.forEach((lyrName) => {
            mapObj.addLayer(layerList[lyrName])
        })
    }, [mapLayers])

    return (
        <>
            <div className={styles.mapContainer} id="map"></div>
        </>
    )
}

export default MapContainer
