<template>
  <div v-if="selectedAsteroid !== undefined">
    <md-dialog overflow="auto" class="dialog" :md-active.sync="showDialog">
      <md-dialog-title>Name: {{selectedAsteroid.name}}</md-dialog-title>
      <md-dialog-content>
        <!-- Only displaying some information from JSON response to avoid a super long dialog
              and make it more readable. Included link to NASA site which displays the data
              I left out of this dialog. -->
              <p>First Observed: {{selectedAsteroid.orbital_data.first_observation_date}}</p>
              <p>Last Observed: {{selectedAsteroid.orbital_data.last_observation_date}}</p>
              <p>Magnitude: {{selectedAsteroid.absolute_magnitude_h}}</p>
              <p>Estimated Diameter:
                {{selectedAsteroid.estimated_diameter.feet.estimated_diameter_min.toFixed(2)}}ft -
                {{selectedAsteroid.estimated_diameter.feet.estimated_diameter_max.toFixed(2)}}ft
              </p>
              <p>{{selectedAsteroid.is_sentry_object ?
                "This asteroid is a sentry object" :
                "This asteroid is not a sentry object"}}
              </p>
              <p>{{selectedAsteroid.is_potentially_hazardous_asteroid ?
                "This asteroid is potentially hazardous" :
                "This asteroid is not potentially hazardous"}}
              </p>
              <a :href="selectedAsteroid.nasa_jpl_url" target="_blank">View additional data on NASA's JPL website</a>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
  export default {
    name: 'Dialog',
    props: {
      selectedAsteroid: Object
    },
    data() {
      return {
        showDialog: true,
      }
    },
  }
</script>

<style scoped>
p {
  display: flex;
  align-items: center;
  margin: 10px;
}
a {
  display: flex;
  align-items: center;
  margin: 10px;
  color: #1d5a5f;
}
</style>