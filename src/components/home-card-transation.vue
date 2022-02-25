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
              Actividad
            </h2>
            <div>
              {{ year.text}}
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
        year: '10:14',
        text: 'Registro de usuario'
      },
      {
        color: 'green',
        year: '12:30',
        text: 'Edicion de un producto'
      },
      {
        color: 'pink',
        year: '02:13',
        text: 'Registro de un producto'
      },
      {
        color: 'amber',
        year: '04:45',
        text: 'Eliminación de un producto'
      },
    ],
  }),
}
</script>

<style scoped>

</style>
