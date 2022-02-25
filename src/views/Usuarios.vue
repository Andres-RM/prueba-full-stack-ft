<template>
  <v-card class="rounded-xl">
    <v-card-text>
      <span class="text-h4">Listado de Usuarios</span>
      <v-btn color="primary" right class="float-right my-2" @click="openAdd">
        Agregar
      </v-btn>
    </v-card-text>
    <v-card-text class="mt-5">
      <v-data-table :loading="loading" :items="items" :headers="headers" :items-per-page="itemsPerPage">
        <template slot="item.action">
          <v-btn-toggle
              mandatory
          >
            <v-btn color="primary" icon>
              <v-icon>mdi-account-edit</v-icon>
            </v-btn>
            <v-btn color="secondary" icon>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-btn-toggle>
        </template>
      </v-data-table>
    </v-card-text>
    <v-dialog v-model="modalAdd" max-width="800">
      <v-card>
        <v-toolbar color="primary" dark>
          <v-card-title>
            Agregar Usuario
          </v-card-title>
        </v-toolbar>
        <v-card-text class="my-5">
          <v-form lazy-validation ref="createform">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field v-model="name" :rules="rule" label="Nombres y Apellidos" outlined rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="phone" :rules="rule" label="Telefono" outlined rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="username" :rules="rule" label="Username" outlined rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="email" :rules="rule" label="Email" outlined rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="date"
                        outlined
                        rounded
                        :rules="rule"
                        label="Fecha de Nacimiento"
                        prepend-inner-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                      v-model="date"
                      no-title
                      scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                        text
                        color="primary"
                        @click="menu = false"
                    >
                      Cancelar
                    </v-btn>
                    <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(date)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="password" :rules="rule" type="password" label="Password" outlined
                              rounded></v-text-field>
              </v-col>
            </v-row>
          </v-form>
          <v-row justify="end">
            <v-col cols="auto">
              <v-btn color="primary" @click="createUser" :loading="loadingCreate">
                Agregar
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-snackbar
          v-model="snackbar"
      >
        Usuario Registrado

        <template v-slot:action="{ attrs }">
          <v-btn
              color="success"
              text
              v-bind="attrs"
              @click="snackbar = false"
          >
            Cerrar
          </v-btn>
        </template>
      </v-snackbar>

    </v-dialog>
  </v-card>
</template>

<script>
import Axios from "axios";

export default {
  name: "Usuarios-page",
  data() {
    return {
      items: [],
      itemsPerPage: 0,
      loading: false,
      headers: [
        {
          text: 'Nombres',
          value: 'name',
        },
        {
          text: 'Username',
          value: 'username',
        },
        {
          text: 'Email',
          value: 'email',
        },
        {
          text: 'Telefono',
          value: 'phone',
        },
        {
          text: 'Telefono',
          value: 'phone',
        },
        {
          text: '',
          value: 'action'
        },
      ],
      modalAdd: false,
      menu: false,
      date: null,
      username: '',
      email: '',
      password: '',
      name: '',
      phone: '',
      rule: [
        v => !!v || 'Es requerido',
      ],
      snackbar :false,
      loadingCreate: false
    }
  },
  methods: {
    loadData() {
      this.loading = true
      Axios.get('http://localhost:8000/api/user')
          .then(value => {
            this.items = value.data.data
            this.itemsPerPage = value.data.per_page
          }).finally(() => {
        this.loading = false
      })
    },
    openAdd() {
      this.modalAdd = true
    },
    createUser() {
      if (!this.$refs.createform.validate())
        return
      this.loadingCreate = true
      const request = {
        "username": this.username,
        "email": this.email,
        "name": this.name,
        "phone": this.phone,
        "password": this.password,
        "date": this.date
      }
      Axios.post('http://localhost:8000/api/user/create', request)
          .then(() => {
            this.snackbar = true
            this.$refs.createform.reset()
          })
          .finally(() => {
            this.loadingCreate = false
          })
    }
  },
  beforeMount() {
    this.loadData()
  },

}
</script>

<style scoped>

</style>
