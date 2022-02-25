<template>
  <v-card class="rounded-xl" height="500">
    <v-card-title>
      <p class="text-h4">
        Productos
      </p>
    </v-card-title>
    <v-card-text>
      <v-row justify="center" class="mt-7">
        <v-progress-circular :value="70" :size="200"
                             :width="15" color="primary">
          <v-col cols="12">
            <p class="text-h3 text-center">5</p>
          </v-col>
        </v-progress-circular>
      </v-row>
      <p class="my-10 text-center" style="font-size: 30px; line-height: 32px">Productos activos de 7 existentes</p>
      <v-row justify="center">
        <v-btn color="primary" :to="{name: 'productos'}">
          Ver productos
        </v-btn>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "home-card-product"
}
</script>

<style scoped>

</style>
