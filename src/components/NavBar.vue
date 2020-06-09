<template>
  <v-app-bar
    dark
    app
    class="px-lg-12"
  >

    <v-spacer class="hidden-md-and-up"></v-spacer>

    <v-toolbar-title>NUS SU Calculator</v-toolbar-title>

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
    
  }
</script>

<style lang="scss" scoped>

</style>