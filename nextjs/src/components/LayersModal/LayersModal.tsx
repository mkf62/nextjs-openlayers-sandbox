import { ReactNode, useState } from 'react'
import { Modal, Checkbox, Button, Center, Alert } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useAppDispatch, useAppSelector } from '@/GlobalRedux/hooks'
import { addLayerToMap, removeLayerFromMap } from '@/GlobalRedux/slices/mapSlice'
import { IconAlertTriangle } from '@tabler/icons-react'
import { useMantineTheme } from '@mantine/core'
import styles from './assets/LayersModal.module.css'

export const LayersModal = () => {
    const [opened, { open, close }] = useDisclosure(true)
    const [value, setValue] = useState<string[]>(['icecream'])
    const [message, setMessage] = useState('')
    const mapLayers = useAppSelector((state) => state.map.mapLayers)
    const dispatch = useAppDispatch()
    const theme = useMantineTheme()

    //Create layer checkboxes
    let checkboxes: ReactNode[] = []
    Object.keys(mapLayers).forEach((lyr) => {
        //Exclude the basemap
        if (lyr != 'osm') {
            checkboxes.push(
                <Checkbox
                    key={lyr}
                    className={styles.spacing}
                    value={lyr}
                    label={mapLayers[lyr].layerName}
                />,
            )
        }
    })

    const changeLayers = (layers: string[]) => {
        // Get current layer visibility from global state and determine what layers
        // are being added and removed
        let visibleOnMap: string[] = []
        let notVisibleOnMap: string[] = []
        Object.keys(mapLayers).forEach((key) => {
            if (mapLayers[key].visible == true && key != 'osm') {
                visibleOnMap.push(key)
            } else if (mapLayers[key].visible == false && key != 'osm') {
                notVisibleOnMap.push(key)
            }
        })

        // When lyr is currently visible on the map but the incoming layer array
        // doesn't include it, it needs to be removed from the map
        const needRemoved = visibleOnMap.filter((lyr) => !layers.includes(lyr))
        // When lyr is not currently visible on the map but the incoming layer array
        // does include it, it needs to be added to the map
        const needAdded = notVisibleOnMap.filter((lyr) => layers.includes(lyr))

        // These lines update the `visible` property of a layer in global state.
        // `MapContainer.tsx` then has a useEffect that listens for the change on `mapLayers`
        // in the global state and updates the layer visibility on the actual map object.
        needRemoved.forEach((lyr) => dispatch(removeLayerFromMap(lyr)))
        needAdded.forEach((lyr) => dispatch(addLayerToMap(lyr)))

        // Update the checkboxes
        setValue(layers)
    }

    const hitBackend = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_REQUEST_PREFIX}/main/hello-world`, {
            method: 'GET',
        })

        const res = await response.json()
        if (response.ok) {
            setMessage(res.msg)
        }
    }

    return (
        <Modal
            opened={opened}
            onClose={close}
            size={'20rem'}
            title="Layers List"
            closeOnClickOutside={false}
            closeOnEscape={false}
            withCloseButton={false}
            withOverlay={false}
            classNames={{
                inner: styles.inner,
                header: styles.header,
                content: styles.content,
                body: styles.body,
            }}
        >
            <Checkbox.Group value={value} onChange={changeLayers}>
                {checkboxes}
            </Checkbox.Group>
            <Center style={{ marginTop: 'auto' }}>
                <Button variant="filled" onClick={hitBackend}>
                    Hello World!
                </Button>
            </Center>

            {message && (
                <Alert
                    className={styles.spacing}
                    variant="filled"
                    color={theme.colors.green[0]}
                    title="You received a message"
                    icon={<IconAlertTriangle />}
                >
                    {message}
                </Alert>
            )}
        </Modal>
    )
}
