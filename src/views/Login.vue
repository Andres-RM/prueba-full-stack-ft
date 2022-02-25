<template>
  <v-app class="fondo">
    <v-row justify="center" align-content="center" align="center" style="height: 100%">
      <v-col md="6" lg="3">
        <v-card class="rounded-xl">
          <v-card-text>
            <p class="text-h4 text-center mt-3">Bienvenido a</p>
            <v-row justify="center" class="mb-4">
              <v-col cols="auto">
                <v-img :src="require('../assets/logo.png')" width="150" aspect-ratio="1"></v-img>
              </v-col>
            </v-row>
            <v-form lazy-validation class="mx-4">
              <v-text-field label="Username" rounded outlined prepend-inner-icon="mdi-account">
              </v-text-field>
              <v-text-field label="Password" type="password" rounded outlined prepend-inner-icon="mdi-lock">
              </v-text-field>
            </v-form>
            <v-row justify="center" class="mb-5">
              <v-btn color="primary" rounded>
                Ingresar
              </v-btn>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>

export default {
  name: "login-page",
  methods: {
  }
}
</script>

<style scoped>
.fondo {
  background-image: url("../assets/background.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

</style>
