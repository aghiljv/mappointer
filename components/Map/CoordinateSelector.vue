<template>
  <div class="csContainer">
    Source
    <div class="inputElements">
      <input
        type="text"
        id="lat1"
        ref="lati1"
        placeholder="Source Latitude"
        class="inputMap"
        @keyup="keyUpEvent('lati1')"
        data-cy="latitude1"
      />
      <input
        type="text"
        id="lon1"
        ref="long1"
        name="Longitude1"
        placeholder="Source Longitude"
        class="inputMap"
        @keyup="keyUpEvent('long1')"
        data-cy="longitude1"
      />
    </div>
    Destination
    <div class="inputElements">
      <input
        type="text"
        id="lat2"
        ref="lati2"
        placeholder="Destination Latitude"
        class="inputMap"
        @keyup="keyUpEvent('lati2')"
        data-cy="latitude2"
      />
      <input
        type="text"
        id="lon2"
        ref="long2"
        placeholder="Destination Longitude"
        class="inputMap"
        @keyup="keyUpEvent('long2')"
        data-cy="longitude2"
      />
    </div>

    <button type="button" class="inputElements" data-cy="find_button" @click="getCoordinates">
      Find
    </button>
    <div id="distanceholder" data-cy="distance_container">{{distanceText}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coordinates: [],
      distanceText: ""
    }
  },
  props: ['distance'],
  watch: {
    distance() {
      this.distanceText =
        'Distance : ' + this.$props.distance.toFixed(2) + 'kms'
    }
  },
  methods: {
    getCoordinates() {
      let longitude1 = !isNaN(this.$refs.long1.value)
        ? parseFloat(this.$refs.long1.value)
        : this.$refs.long1.value
      let latitude1 = !isNaN(this.$refs.lati1.value)
        ? parseFloat(this.$refs.lati1.value)
        : this.$refs.lati1.value
      let longitude2 = !isNaN(this.$refs.long2.value)
        ? parseFloat(this.$refs.long2.value)
        : this.$refs.long2.value
      let latitude2 = !isNaN(this.$refs.lati2.value)
        ? parseFloat(this.$refs.lati2.value)
        : this.$refs.lati2.value
      if (
        !isNaN(longitude1) &&
        !isNaN(latitude1) &&
        !isNaN(longitude2) &&
        !isNaN(latitude2)
      ) {
        if (longitude1 == longitude2 && latitude1 == latitude2) {
          alert('Same source and destination')
          this.$refs.long2.style.color = 'red'
          this.$refs.lati2.style.color = 'red'
        } else if (
          longitude1 > 180 ||
          longitude1 < -180 ||
          latitude1 > 90 ||
          latitude1 < -90 ||
          longitude2 > 180 ||
          longitude2 < -180 ||
          latitude2 > 90 ||
          latitude2 < -90
        ) {
          alert('Input/Inputs out of bounds')
        } else {
          this.coordinates = [
            [longitude1, latitude1],
            [longitude2, latitude2]
          ]
          this.$emit('newCoords', this.coordinates)
        }
      } else {
        alert('Incorrect Input/Inputs')
      }
    },
    keyUpEvent(refCode) {
      let entry = this.$refs[refCode]
      entry.style.color =
        isNaN(entry.value) ||
        (refCode.includes('long') &&
          (parseFloat(entry.value) > 180 || parseFloat(entry.value) < -180)) ||
        (refCode.includes('lati') &&
          (parseFloat(entry.value) > 90 || parseFloat(entry.value) < -90))
          ? 'red'
          : 'black'
    }
  }
}
</script>

<style scoped>
.csContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1%;
  color: white;
}
.inputElements {
  width: 90%;
  height: 5%;
  padding: 0%;
  margin: 5%;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: space-evenly;
}
.inputMap {
  border: none;
  border-radius: 5px;
  width: 48%;
}
input {
  padding: 2%;
}
button {
  align-items: center;
  background: #395abd;
  color: white;
}
button:focus {
  outline: 0;
}
#distanceholder {
  position: absolute;
  bottom: 0%;
  padding: 5%;
  width: 100%;
  text-align: center;
  transition: 0.5s;
}
@media only screen and (max-width: 600px) {
  .inputElements {
    height: 15%;
    margin: 1%;
  }
}
</style>
