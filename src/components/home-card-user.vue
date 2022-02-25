<template>
  <v-card class="rounded-xl" height="500">
    <v-card-title>
      <p class="text-h4">
        Usuarios
      </p>
    </v-card-title>
    <v-card-text>
      <div style="height: 350px; width: 100%" class="d-flex justify-center align-center align-content-center">
        <div style="width: 100%;">
          <p class="text-h3 text-center">200</p>
          <p class="my-10 text-center" style="font-size: 30px; line-height: 32px">Activos activos de 1000 existentes</p>
          <v-row justify="center">
            <v-btn color="primary" class="my-3">
              Ver Usuarios
            </v-btn>
          </v-row>
        </div>

      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "home-card-user"
}
</script>

<style scoped>

</style>
