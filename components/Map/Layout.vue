<template>
  <div class="layoutContainer">
    <CoordinateSelector
      class="selectorContainer"
      @newCoords="passCoords($event)"
      v-bind:distance="distance"
    />
    <MapHolder
      class="mapContainer"
      @newDistance="passDistance($event)"
      v-bind:coordinates="coordinates"
    />
  </div>
</template>

<script>
import CoordinateSelector from './CoordinateSelector'
import MapHolder from './MapHolder'
export default {
  components: {
    CoordinateSelector,
    MapHolder
  },
  data() {
    return {
      coordinates: [],
      distance: 0
    }
  },
  methods: {
    passCoords(coordinates) {
      this.coordinates = coordinates
    },
    passDistance(distance) {
      this.distance = distance
    }
  }
}
</script>

<style scoped>
.layoutContainer {
  width: 100%;
  display: flex;
  flex-direction: row;
}
.selectorContainer {
  position: relative;
  left: 0%;
  width: 20%;
  height: 100%;
  background: rgba(0, 0, 0, 0.911);
}
.mapContainer {
  position: relative;
  right: 0;
  width: 80%;
  height: 100%;
}

@media only screen and (max-width: 600px) {
  .layoutContainer {
    flex-direction: column-reverse;
  }
  .selectorContainer {
    bottom: 0%;
    width: 100%;
    height: 40%;
  }
  .mapContainer {
    top: 0%;
    width: 100%;
    height: 60%;
  }
}
</style>
