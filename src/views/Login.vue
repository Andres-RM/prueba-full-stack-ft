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
            <v-form lazy-validation class="mx-4" ref="loginform">
              <v-text-field v-model="username" :rules="rule" label="Username" rounded outlined
                            prepend-inner-icon="mdi-account">
              </v-text-field>
              <v-text-field v-model="password" :rules="rule" label="Password" type="password" rounded outlined
                            prepend-inner-icon="mdi-lock">
              </v-text-field>
            </v-form>
            <v-row justify="center" class="mb-5">
              <v-btn color="primary" rounded @click="login" :loading="loading">
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

import Axios from "axios";

export default {
  name: "login-page",
  data() {
    return {
      username: 'admin',
      password: 'admin',
      loading: false,
      rule: [
        v => !!v || 'Es requerido',
      ],
    }
  },
  methods: {
    login() {
      if (!this.$refs.loginform.validate())
        return
      const request = {
        "username": this.username,
        "password": this.password
      }
      this.loading = true
      Axios.post('http://127.0.0.1:8000/api/auth/login/', request)
      .then(value => {
        localStorage.setItem('UserKeyToken', value.data.token)
        this.loading = false
        this.$router.push({name: 'home'})
      }).finally(() => {
        this.loading = false
      })
    }
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
