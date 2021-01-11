<template>
  <div v-show="forecast.fact.temp" class="container">
    <div class="weather-maps-fact">
      <h1 class="weather-maps-fact__title">
        <div v-if="forecast.geo_object.district">
          {{ forecast.geo_object.district.name }}
        </div>
        <div v-else>
          {{ forecast.geo_object.province.name }}
        </div>
      </h1>
      <h2 class="weather-maps-fact__location">
        {{ forecast.geo_object.locality.name }}
      </h2>
      <div class="weather-maps-fact__base">
        <div class="weather-maps-fact__temp">{{ forecast.fact.temp }}°</div>
        <img
          :src="
            `https://yastatic.net/weather/i/icons/blueye/color/svg/${forecast.fact.icon}.svg`
          "
          class="weather-maps-fact__icon"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    forecast: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style scoped>
.container {
  padding: 100px 16px 24px;
}
.weather-maps-fact {
  z-index: 9999;
  width: 250px;
  font-family: Helvetica;
}
.weather-maps-fact__title {
  font-size: 20px;
  line-height: 24px;
  font-weight: 500;
  margin: 0;
}

.weather-maps-fact__location {
  font-size: 14px;
  line-height: 18px;
  color: #939cb0;
  font-weight: 400;
  margin: 0;
}

.weather-maps-fact__temp {
  display: inline-block;
  font-size: 60px;
}
.weather-maps-fact__icon {
  width: 40px;
  height: 40px;
  vertical-align: bottom;
}
</style>
