<template>
  <v-app
    app
  >

    <NavBar />

    <v-content height="100%" class="primary">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar'

export default {
  name: 'App',
  components: {
    NavBar
  }
};
</script>
