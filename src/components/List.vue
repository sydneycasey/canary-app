<template>
  <div>
    <!-- Header and loading progress bar -->
    <h1>NeoWs Asteroids</h1>
    <md-progress-bar v-if="isLoading" md-mode="indeterminate"></md-progress-bar>
    <!-- Start and end date selectors -->
    <div class="date-picker">
      <md-datepicker md-immediately :md-model-type="String" v-on:input="checkDates" v-model="startDate">
        <label>Start Date</label>
      </md-datepicker>
      <md-datepicker md-immediately :md-model-type="String" v-on:input="checkDates" v-model="endDate">
        <label>End Date</label>
      </md-datepicker>
    </div>
    <!-- Warning message informing user of date restrictions -->
    <div v-if="isDisabled && !isLoading">
        <md-toolbar class="md-dense md-alignment-center-center">
          <h5 class="md-title">Please select dates within 7 days of each other</h5>
        </md-toolbar>
    </div>
    <!-- Button to make API request. Disabled depending on dates selected -->
    <md-button class="md-raised md-primary" @click="getAsteroidData" :disabled="isDisabled">
      Retrieve Closest Asteroids
    </md-button>
    <!-- List of asteroid names returned between selected dates -->
      <div v-for="obj in asteroidList" :key="obj.id" class="obj-data">
        <div v-for="asteroid in obj" :key="asteroid.id" class="asteroid-data">
          <md-list class="asteroid-stats">
            <!-- When asteroid name is clicked, display dialog component with selected asteroid passed in-->
            <md-list-item class="asteroid-name" @click="clicked(asteroid.id)">
              Name: {{asteroid.name}}
            </md-list-item>
            <div v-if="selectedAsteroid && asteroid.id === selectedAsteroid.id">
              <Dialog v-bind:selectedAsteroid="selectedAsteroid"></Dialog>
            </div>
        </md-list>
      </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import Dialog from './Dialog.vue'

export default {
  name: "List",
  components: {
    Dialog
  },
  data() {
    return {
      asteroidList: [], // list of asteroids returned from API
      selectedAsteroid: {}, // individual asteroid selected to be passed to Dialog component
      startDate: null,
      endDate: null,
      isDisabled: true,
      isLoading: false
    };
  },
  methods: {
    getAsteroidData() {
      // Lists asteroids based on start and end dates user selected
      this.isLoading = true;
      const reqUrl = `${process.env.VUE_APP_URL}start_date=${this.startDate}&end_date=${this.endDate}&api_key=${process.env.VUE_APP_API_KEY}`
      axios.get(reqUrl)
        .then(res => this.asteroidList = res.data.near_earth_objects)
        .then(() => { this.isLoading = false; this.isDisabled = false })
        .catch(err => {this.isLoading = false; console.log('error: ', err.message)})
    },
    checkDates() {
      // Neo - Feed API does not allow requests for two dates greater than 7 days apart
        const date1 = new Date(this.startDate);
        const date2 = new Date(this.endDate);
        const differenceInTime = date2.getTime() - date1.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);
        // only disable the request button if there is no start date, if the start and end date are
        // more than 7 days apart, or if the start date is later than the end date
        if (differenceInDays > 7 || differenceInDays < 0 || !this.startDate) this.isDisabled = true;
        else this.isDisabled = false;

    },
    clicked(id) {
      // if the user clicks the selected asteroid again, deselect it
      // otherwise get data for the newly selected asteroid
      if (this.selectedAsteroid && id === this.selectedAsteroid.id) this.selectedAsteroid = null;
      else {
        const reqUrl = `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${process.env.VUE_APP_API_KEY}`
        axios.get(reqUrl)
          .then(res => this.selectedAsteroid = res.data)
          .catch(err => console.log('error: ', err.message))
      }
    }
  }
};
</script>

<style scoped>
.asteroid-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: .5px solid lightgrey
}
.date-picker {
  display: flex;
  align-content: center;
}
</style>