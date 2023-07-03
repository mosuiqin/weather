export const loadRainData = (map,dataset) => {
    import(`../data/${dataset}.json`).then((res) => {
        const geojson = res.default
        map.addLayer({
            id: dataset,
            type: 'circle',
            source: {
                type: 'geojson',
                data: geojson,
            },
            paint: {
                'circle-color': {
                    property: dataset,
                    type: 'exponential',
                    stops: [
                        [0, 'rgba(0,0,0,0)'],
                        [0.5, '#9ecae1'],
                        [1, '#08306b'],
                    ],
                },
                // 'circle-opacity':0.2
            },
        })
    })

}