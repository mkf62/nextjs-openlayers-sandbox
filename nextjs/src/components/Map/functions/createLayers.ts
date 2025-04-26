import GeoJSON from 'ol/format/GeoJSON'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import { createPointStyle } from '../functions/createStyles'

export const createPointLayer = (
    layerName: string,
    gjsonObj: any,
    zIdx: number,
    fillColor: string,
    pointRadius?: number,
    lineColor?: string,
    lineWidth?: number,
) => {
    // This example uses hardcoded GeoJSON objects, but in reality you'd probably have GeoServer or some
    // other spatial server serving your data. Then the code would look more like this:
    //
    // const vectorSource = new VectorSource({
    //   format: new GeoJSON(),
    //   url: https://mygeoserver.url.com/data
    // })
    //
    const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(gjsonObj, {
            dataProjection: 'EPSG:3857',
            featureProjection: 'EPSG:3857',
        }),
    })

    const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: createPointStyle(fillColor, pointRadius, lineColor, lineWidth),
        properties: {
            name: layerName,
        },
        zIndex: zIdx,
    })

    return vectorLayer
}
