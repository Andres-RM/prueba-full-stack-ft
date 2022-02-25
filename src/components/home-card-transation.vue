<template>
  <v-card class="rounded-xl" height="500">
    <v-card-title>
      <p class="text-h4">
        Log de transaciones
      </p>
    </v-card-title>
    <v-card-text>
      <v-sheet height="400" style="overflow: auto"><v-timeline>
        <v-timeline-item
            v-for="(year, i) in years"
            :key="i"
            :color="year.color"
            small
        >
          <template v-slot:opposite>
        <span
            :class="`headline font-weight-bold ${year.color}--text`"
            v-text="year.year"
        ></span>
          </template>
          <div class="py-4">
            <h2 :class="`headline font-weight-light mb-4 ${year.color}--text`">
              Lorem ipsum
            </h2>
            <div>
              Lorem ipsum dolor sit amet, no nam oblique veritus.  alutandi sententiae.
            </div>
          </div>
        </v-timeline-item>
      </v-timeline></v-sheet>

    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "home-card-transation",
  data: () => ({
    years: [
      {
        color: 'cyan',
        year: '1960',
      },
      {
        color: 'green',
        year: '1970',
      },
      {
        color: 'pink',
        year: '1980',
      },
      {
        color: 'amber',
        year: '1990',
      },
      {
        color: 'orange',
        year: '2000',
      },
    ],
  }),
}
</script>

<style scoped>

</style>
