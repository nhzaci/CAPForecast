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
        >
          <v-card-title :class="titleClass" class="font-weight-bold">
            Calculator
          </v-card-title>
          <v-card-text>
            <v-form>
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
            </v-form>
            <p>To reach your goal of CAP {{ capAim }}, you would need:</p>
            <p>Combinations of:
              <ul>
                <li>{{ averageGrade }}</li>
              </ul>
            </p>
            <p>In the next {{ projectLength }} sem(s), assuming 20 MC per sem.</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data: () => ({
    year: 1,
    years: [1,2,3,4,5],
    sem: 1,
    sems: [1,2],
    mcTaken: 20,
    capAim: 5.0,
    capCurr: 5.0,
    caps: [5.0, 4.5, 4.0, 3.5, 3.0, 2.5, 2.0],
    capsReverse: [2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0],
    projectSem: [1,2,3,4,5,6,7,8,9,10],
    projectLength: 1,
  }),
  methods: {
    getCombinations(total) {
      var count = 0
      var caps = this.capsReverse

      var changer = function(index, value) {
        var currentCap = caps[index]

        if (index == 0) {
          if (value % currentCap == 0) {
            count++
          }
          return
        }

        while (value >= 0) {
          changer(index-1, value)
          value -= currentCap
        }
      }
      changer(caps.length - 1, total)
      return count
    },
    getGrade(val) {
      if (val > 5) {
        return 'Hmmm... Someone trying to play punk?'
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
    }
  },
  computed: {
    averageGrade() {
      let totalMC = this.projectLength * 20 + Number(this.mcTaken)
      let totalGP = totalMC * this.capAim
      let remGP = totalGP - (Number(this.mcTaken) * Number(this.capCurr))
      //let avgGP = remGP / (this.projectLength * 20)
      return this.getCombinations(remGP / 4) // assume each mod is 4 MC
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
