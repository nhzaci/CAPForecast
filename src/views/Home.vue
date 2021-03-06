<template>
  <v-container class="fill-height" fluid>
    <v-row
      justify="center"
      align="center"
    >
      <v-col cols="12" lg="8" md="10">
        <v-card
          dark
          tile
          elevation="10"
          class="secondary"
        >
          <v-card-title :class="titleClass" class="font-weight-bold">
            <v-row align="center" class="px-lg-5">
              <v-col cols="6" md="8" class="text-truncate">
                <span :class="titleClass" class="font-weight-bold">Forecast Calculator</span>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="6" md="4">
                <v-overflow-btn
                  :items="modes"
                  v-model="mode"
                ></v-overflow-btn>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-sheet elevation="5" tile class="accent pa-3 ma-2">
              <v-form>
                <!-- Commented out because seems redundant -->
                <!--
                <v-select
                  v-model="year"
                  :items="years"
                  label="I am in year..."
                ></v-select>
                <v-select
                  v-model="sem"
                  :items="sems"
                  label="This is sem..."
                ></v-select>
                -->
                <v-select
                  v-model="capAim"
                  :items="caps"
                  label="I am aiming for at least CAP"
                ></v-select>
                <v-text-field
                  label="My current CAP"
                  v-model="capCurr"
                ></v-text-field>
                <v-text-field
                  label="Current MCs counted in CAP"
                  v-model="mcTaken"
                ></v-text-field>
                <v-select
                  :items="projectSem"
                  v-model="projectLength"
                  label="Number of semesters to project"
                ></v-select>
                <v-expand-transition>
                  <div
                    v-show="mode==='Advanced'"
                  >
                    <v-text-field
                      label="MC per sem"
                      v-model="mcSem"
                    ></v-text-field>
                  </div>
                </v-expand-transition>
              </v-form>

            </v-sheet>
            <v-sheet
              elevation="5"
              tile
              class="ma-2 pa-3 accent"
              id="sheet"
            >
              <p>To reach your goal of <span class="font-weight-bold">CAP {{ capAim }}</span>, you would need:</p>
              <p class="font-weight-bold">{{ averageGrade }}</p>
              <p>In the next {{ projectLength }} sem(s), assuming {{ mcSem }} MC per sem</p>
              <v-btn
                color="primary"
                tile
                elevation="5"
                @click="saveCombi"
              >
                Save Combination
              </v-btn>
            </v-sheet>
            <v-expand-transition>
              <div v-if="saved.length">
                <h1 :class="titleClass" class="font-weight-bold px-lg-5 white--text py-2">Saved Combinations</h1>
                <v-sheet
                  elevation="5"
                  tile
                  class="ma-2 pa-3 accent"
                  id="savedSheet"
                >
                  <v-scroll-x-transition group>
                    <div
                      v-for="(comb, i) in saved"
                      :key="comb+i"
                      class="my-2"
                    >
                      <p>Goal of <span class="font-weight-bold">CAP {{ comb[0] }}</span> from a <span class="font-weight-bold">CAP of {{ comb[4] }} on {{ comb[5] }} MCs</span></p>
                      <p class="font-weight-bold">{{ comb[1] }}</p>
                      <p>In the next {{ comb[2] }} sem(s), assuming {{ comb[3] }} MC per sem</p>
                      <v-btn
                        color="error"
                        tile
                        elevation="5"
                        @click="deleteCombi(i)"
                      >
                        Remove Combination
                      </v-btn>
                    </div>
                  </v-scroll-x-transition>
                </v-sheet>
              </div>
            </v-expand-transition>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  metaInfo: {
    title: 'Calculator'
  },
  data: () => ({
    modes: ['Simple', 'Advanced'],
    mode: 'Simple',
    year: 1,
    years: [1,2,3,4,5],
    sem: 1,
    sems: [1,2],
    mcTaken: 20,
    mcSem: 20,
    capAim: 5.0,
    capCurr: 5.0,
    caps: [5.0, 4.5, 4.0, 3.5, 3.0, 2.5, 2.0],
    capsReverse: [2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0],
    projectSem: [1,2,3,4,5,6,7,8,9,10],
    projectLength: 1,
    saved: []
  }),
  methods: {
    saveCombi() {
      var aim = this.capAim
      var avgGrade = this.averageGrade
      var projectLength = this.projectLength
      var mcSem = this.mcSem
      var capSaved = this.capCurr
      var mcTaken = this.mcTaken
      this.saved.push([aim, avgGrade, projectLength, mcSem, capSaved, mcTaken])
    },
    deleteCombi(index) {
      // Removes a saved item from the array 
      this.saved.splice(index,1)
    },
    /*
    getCombinations(total) {
      var caps = this.caps.slice(0,3)
      var count = 0
      var combinations = []

      var counter = function(index, value) {
        var currentCap = caps[index]

        if (index == 0) {
          if (value % currentCoin == 0) {
            combinations.pu
          }
        }
      }
    },
    */
    getGrade(val) {
      if (val > 5) {
        return 'higher than A'
      } else if (val > 4.50) {
        return 'A'
      } else if (val > 4.00) {
        return 'A-'
      } else if (val > 3.50) {
        return 'B+'
      } else if (val > 3.00) {
        return 'B'
      } else if (val > 2.50) {
        return 'B-'
      } else if (val > 2.00) {
        return 'C+'
      } else {
        return 'C'
      }
    }
  },
  watch: {
    year: function (val) {
      this.mcTaken = Number(val) * this.sem * 20
    },
    sem: function (val) {
      this.mcTaken = Number(val) * this.year * 20
    },
    mode: function(text) {
      if (text == 'Simple') {
        this.mcSem = 20
      }
    }
  },
  computed: {
    averageGrade() {
      let totalMC = this.projectLength * this.mcSem + Number(this.mcTaken)
      let totalGP = totalMC * this.capAim
      let remGP = totalGP - (Number(this.mcTaken) * Number(this.capCurr))
      let avgGP = Math.round(remGP / (this.projectLength * this.mcSem) * 100) / 100
      return `Average grade of ${this.getGrade(avgGP)} or CAP of ${avgGP}`
    },
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

<style lang="scss">
  #sheet {
    p {
      margin: 0;
      text-align: center;
    }
  }
  #savedSheet {
    p {
      margin: 0;
      text-align: center;
    }
  }
</style>