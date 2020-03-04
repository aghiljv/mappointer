<template>
  <div id="mapContainer" data-cy="main_map"></div>
</template>

<script>
export default {
  data() {
    return {
      map: null,
      loadedOnce: false,
      dataPoints: null,
      dataLine: null
    }
  },
  props: ['coordinates'],
  mounted() {
    this.initiateMap()
  },
  watch: {
    coordinates() {
      this.loadedOnce ? this.updateSources() : this.addMultiplePoints()
    }
  },
  methods: {
    initiateMap() {
      var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js')

      mapboxgl.accessToken =
        'pk.eyJ1IjoiYWdoaWxqdiIsImEiOiJjazZteTV1bW4wc2ppM2pwNmE4Ym42ZHlvIn0.BLgXIAmmmS0bp28bscvntA'
      this.map = new mapboxgl.Map({
        container: 'mapContainer',
        style: 'mapbox://styles/mapbox/dark-v9',
        center: [6.887199, 50.940975],
        zoom: 15,
        maxBounds: [
          [-180, -85],
          [180, 85]
        ]
      })
    },
    initiateSoureDatas() {
      this.sourcePoint = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: this.$props.coordinates[0]
        },
        properties: {
          title: 'Source',
          icon: 'circle'
        }
      }
      this.destPoint = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: this.$props.coordinates[1]
        },
        properties: {
          title: 'Destination',
          icon: 'marker'
        }
      }
      this.dataLine = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: this.$props.coordinates
        }
      }
    },
    addMultiplePoints() {
      this.initiateSoureDatas()

      this.map.addSource('route', {
        type: 'geojson',
        data: this.dataLine
      })
      this.map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#fff',
          'line-width': 2
        }
      })

      this.map.addSource('source', {
        type: 'geojson',
        data: this.sourcePoint
      })
      this.map.addLayer({
        id: 'source',
        type: 'symbol',
        source: 'source',
        layout: {
          'icon-image': ['concat', ['get', 'icon'], '-15'],
          'text-field': ['get', 'title'],
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 0.6],
          'text-anchor': 'top'
        },
        paint: {
          'text-color': '#ffffff'
        }
      })

      this.map.addSource('destination', {
        type: 'geojson',
        data: this.destPoint
      })
      this.map.addLayer({
        id: 'destination',
        type: 'symbol',
        source: 'destination',
        layout: {
          'icon-image': ['concat', ['get', 'icon'], '-15'],
          'icon-offset': [0, -7],
          'text-field': ['get', 'title'],
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 0.6],
          'text-anchor': 'top'
        },
        paint: {
          'text-color': '#ffffff'
        }
      })

      this.calcAndJump()
      this.loadedOnce = true
    },
    updateSources() {
      this.sourcePoint.geometry.coordinates = this.$props.coordinates[0]
      this.destPoint.geometry.coordinates = this.$props.coordinates[1]
      this.dataLine.geometry.coordinates = this.$props.coordinates

      this.map.getSource('source').setData(this.sourcePoint)
      this.map.getSource('destination').setData(this.destPoint)
      this.map.getSource('route').setData(this.dataLine)

      this.calcAndJump()
    },
    calcAndJump() {
      this.map.fitBounds(this.$props.coordinates, { padding: 50 })
      this.$emit('newDistance', turf.length(turf.lineString(this.coordinates)))
    }
  }
}
</script>

<style scoped></style>
