<template>
  <v-row justify="center">
    <v-dialog
      v-model="modalOpen"
      max-width="80%"
    >
      <v-card
        color="secondary"
        class="contrast--text"
      >
        <v-card-title class="font-weight-bold">
          Help
        </v-card-title>
        <v-card-text class="contrast--text">
          <ul>
            <li>Simply input the cap you are aiming for</li>
            <li>Your current CAP</li>
            <li>The number of MCs in your current CAP</li>
            <li>And lastly, the number of semesters you want to project to see what your average grade and CAP would be to reach your goal</li>
            <li>Works for both maintaining and checking your CAP</li>
          </ul>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    computed: {
      modalOpen: {
        get() {
          return this.$store.state.modal.modalOpen
        },
        set(bool) {
          this.$store.commit('modal/setModalOpen', bool)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>