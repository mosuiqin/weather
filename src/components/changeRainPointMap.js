import {
  loadRainData
} from './rainPontMap'
export const changeRainPointMap = (map, dataset) => {
  const layer = map.getStyle().layers
  let flag = 0
  let mapId
  for (let item of layer) {
    if (item.id.slice(0, 1) === 'd') {
      flag = 1
      mapId = item.id
    }
  }
  if (flag === 1) {
    map.removeLayer(mapId)
    map.removeSource(mapId)

  }
  loadRainData(map, dataset)
}