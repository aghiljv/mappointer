<template>
  <div class="container">
    <Header class="headerContainer"/>
    <Layout class="mapComponentContainer"/>
  </div>
</template>

<script>
import Header from '../components/Header';
import Layout from '../components/Map/Layout';

export default {
  components: {
    Header,
    Layout
  },
}
</script>

<style>
.container {
  margin: 0;
  overflow: hidden;
  position: absolute;
  height: 100%;
  width: 100%;
}
.headerContainer{
  position: absolute;
  top: 0%;
  width: 100%;
  height: 10%;
}
.mapComponentContainer{
  position: absolute;
  bottom: 0%;
  width: 100%;
  height: 90%;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

</style>
