<template>
  <v-app-bar
    dark
    app 
    flat
    class="primary px-lg-12"
  >

    <v-spacer class="hidden-md-and-up"></v-spacer>

    <v-toolbar-title 
      :class="titleClass" 
      class="font-weight-bold"
    >
      Module Forecast Calculator
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn
      text
      to="/"
      hidden
    >
      Home
    </v-btn>
    <v-btn
      text
      to="/about"
      hidden
    >
      About
    </v-btn>
  </v-app-bar>
</template>

<script>
  export default {
    computed: {
      titleClass() {
        if (this.$vuetify.breakpoint.mdAndUp) {
          return 'display-1'
        }
        return 'headline'
      },
      subtitleClass() {
        if (this.$vuetify.breakpoint.mdAndUp) {
          return 'headline'
        }
        return 'subtitle-1'
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>