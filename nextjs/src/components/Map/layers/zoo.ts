export const zooGJson = {
    type: 'FeatureCollection',
    name: 'zoo',
    crs: { type: 'name', properties: { name: 'urn:ogc:def:crs:EPSG::3857' } },
    features: [
        {
            type: 'Feature',
            properties: { id: 1 },
            geometry: {
                type: 'Point',
                coordinates: [-11035148.621003778651357, 5613744.710829109884799],
            },
        },
        {
            type: 'Feature',
            properties: { id: 2 },
            geometry: {
                type: 'Point',
                coordinates: [-10482845.859797878190875, 5453534.749563275836408],
            },
        },
        {
            type: 'Feature',
            properties: { id: 3 },
            geometry: { type: 'Point', coordinates: [-10061240.698572, 5360781.614093583077192] },
        },
        {
            type: 'Feature',
            properties: { id: 4 },
            geometry: {
                type: 'Point',
                coordinates: [-10503926.117859173566103, 5263812.427011630497873],
            },
        },
        {
            type: 'Feature',
            properties: { id: 5 },
            geometry: {
                type: 'Point',
                coordinates: [-10836994.195227615535259, 5162627.188317419961095],
            },
        },
        {
            type: 'Feature',
            properties: { id: 6 },
            geometry: {
                type: 'Point',
                coordinates: [-10887586.814574722200632, 5407158.181828428991139],
            },
        },
    ],
}
