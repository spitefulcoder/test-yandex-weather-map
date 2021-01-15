<template>
  <div id="app">
    <WeatherBar v-if="forecast.fact" :forecast="forecast" />
    <div class="map-block">
      <yandex-map
        :coords="coords"
        :zoom="5"
        :controls="[]"
        :options="{ suppressMapOpenBlock: true }"
        @click="onClick"
        @map-was-initialized="mapLoaded"
        class="map"
      >
        <ymap-marker
          :coords="coords"
          marker-id="123"
          hint-content="some hint"
        />
      </yandex-map>
    </div>
  </div>
</template>

<script>
import WeatherBar from './components/WeatherBar'

export default {
  name: 'App',
  components: { WeatherBar },
  data: () => ({
    coords: [55.751244, 37.618423],
    map: null,
    forecast: {
      geo_object: {
        locality: { name: '' },
        district: null,
        province: { name: '' },
      },
      fact: {
        temp: null,
        icon: '',
      },
    },
  }),

  methods: {
    onClick(e) {
      let [lat, lon] = (this.coords = e.get('coords'))
      this.fetchWeather(lat, lon)
    },

    mapLoaded(map) {
      this.map = map
      let mySearchControl = new window.ymaps.control.SearchControl({
        options: {
          provider: 'yandex#search',
          noPlacemark: true,
          noCentering: true,
          noPopup: true,
        },
      })
      map.controls.add(mySearchControl)
      map.events.add('click', (e) => {
        let coords = e.get('coords')
        window.ymaps
          .geocode(coords)
          .then((res) =>
            mySearchControl.search(res.geoObjects.get(0).properties.get('text'))
          )
      })
    },
    fetchWeather(lat, lon) {
      fetch(
        `https://cors-anywhere.herokuapp.com/https://api.weather.yandex.ru/v2/forecast?lat=${lat}&lon=${lon}&limit=1`,
        {
          method: 'GET',
          headers: {
            'X-Yandex-API-Key': '312c3978-9cef-4f49-9da6-02032ae13ce9',
          },
        }
      )
        .then((response) => response.json())
        .then((data) => (this.forecast = data))
    },
  },
  async mounted() {
    this.fetchWeather(55.751244, 37.618423)
  },
}
</script>

<style>
html {
  width: 100%;
  height: 100%;
  display: flex;
}
body {
  margin: 0;
  padding: 0;
  display: flex;
  flex: 1 1 0;
}

.map {
  position: absolute;
  width: 100%;
  height: 100%;
}

.map-block {
  flex: 1 1 0;
  position: relative;
}
#app {
  display: flex;
  flex: 1 1 0;
  max-width: 100%;
  height: 100vh;
}
.ymap-container {
  height: 100%;
}
</style>
