<template>
  <v-app
    app
  >

    <NavBar />

    <v-content height="100%" class="primary">
      <v-fade-transition>
        <router-view></router-view>
      </v-fade-transition>
      <v-btn
        color="contrast"
        class="secondary--text mb-12"
        fab
        large
        fixed
        bottom
        right
        @click="setModalOpen(true)"
      >
        <v-icon>mdi-help</v-icon>
      </v-btn>
      <HelpModal />
    </v-content>


  </v-app>
</template>

<script>
import { mapMutations } from 'vuex'

import HelpModal from '@/components/HelpModal'
import NavBar from '@/components/NavBar'

export default {
  name: 'App',
  metaInfo: {
    title: 'CAPForecast',
    titleTemplate: '%s | CAPForecast' 
  },
  components: {
    HelpModal,
    NavBar
  },
  methods: {
    ...mapMutations({
      setModalOpen: 'modal/setModalOpen'
    })
  }
};
</script>
