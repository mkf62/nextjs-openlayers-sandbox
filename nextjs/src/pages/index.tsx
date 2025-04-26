import dynamic from 'next/dynamic'
import { LayersModal } from '@/components/LayersModal/LayersModal'
const MapContainer = dynamic(() => import('@/components/Map/MapContainer'), { ssr: false })

export default function Index() {
    return (
        <>
            <LayersModal />
            <MapContainer />
        </>
    )
}
