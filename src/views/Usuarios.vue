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
        <template v-slot:[`item.action`]="{item}">
          <v-btn-toggle
              mandatory
          >
            <v-btn color="primary" icon @click="openEdit(item)">
              <v-icon>mdi-account-edit</v-icon>
            </v-btn>
            <v-btn color="secondary" icon v-if="item.status" @click="disableUser(item)">
              <v-icon>mdi-lock</v-icon>
            </v-btn>
            <v-btn color="success" icon v-if="!item.status" @click="enableUser(item)">
              <v-icon>mdi-unlock</v-icon>
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
    <v-dialog v-model="modalEdit" max-width="800">
      <v-card>
        <v-toolbar color="primary" dark>
          <v-card-title>
            Editar Usuario
          </v-card-title>
        </v-toolbar>
        <v-card-text class="my-5">
          <v-form lazy-validation ref="editform">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field v-model="nameEdit" :rules="rule" label="Nombres y Apellidos" outlined
                              rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="phoneEdit" :rules="rule" label="Telefono" outlined rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="usernameEdit" :rules="rule" label="Username" outlined rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="emailEdit" :rules="rule" label="Email" outlined rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-menu
                    ref="menuEdit"
                    v-model="menuEdit"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="dateEdit"
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
                      v-model="dateEdit"
                      no-title
                      scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                        text
                        color="primary"
                        @click="menuEdit = false"
                    >
                      Cancelar
                    </v-btn>
                    <v-btn
                        text
                        color="primary"
                        @click="$refs.menuEdit.save(dateEdit)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="passwordEdit" type="password" label="Password" outlined
                              rounded></v-text-field>
              </v-col>
            </v-row>
          </v-form>
          <v-row justify="end">
            <v-col cols="auto">
              <v-btn color="primary" @click="editUser">
                Editar
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-snackbar
          v-model="snackbarEdit"
      >
        Usuario Editado

        <template v-slot:action="{ attrs }">
          <v-btn
              color="success"
              text
              v-bind="attrs"
              @click="snackbarEdit = false"
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
      modalEdit: false,
      menuEdit: false,
      dateEdit: null,
      usernameEdit: '',
      emailEdit: '',
      passwordEdit: '',
      nameEdit: '',
      phoneEdit: '',
      idEdit: null,
      rule: [
        v => !!v || 'Es requerido',
      ],
      snackbar: false,
      snackbarEdit: false,
      loadingEdit: false,
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
            this.loadData()
          })
          .finally(() => {
            this.loadingCreate = false
          })
    },
    editUser() {
      if (!this.$refs.editform.validate())
        return
      this.loadingEdit = true
      const request = {
        "username": this.usernameEdit,
        "email": this.emailEdit,
        "name": this.nameEdit,
        "phone": this.phoneEdit,
        "password": this.passwordEdit,
        "date": this.dateEdit
      }
      Axios.post('http://localhost:8000/api/user/' + this.idEdit, request)
          .then(() => {
            this.snackbarEdit = true
            this.$refs.createform.reset()
            this.loadData()
          })
          .finally(() => {
            this.loadingEdit = false
          })
    },
    disableUser(item) {
      Axios.put('http://127.0.0.1:8000/api/user/' + item.id + '/disabled')
          .then(() => {
            this.loadData()
          })
    },
    enableUser(item) {
      Axios.put('http://127.0.0.1:8000/api/user/' + item.id + '/enabled')
          .then(() => {
            this.loadData()
          })
    },
    openEdit(item) {
      this.dateEdit = item.date
      this.usernameEdit = item.username
      this.emailEdit = item.email
      this.nameEdit = item.name
      this.phoneEdit = item.phone
      this.idEdit = item.id
      this.modalEdit = true
    }
  },
  beforeMount() {
    this.loadData()
  },

}
</script>

<style scoped>

</style>
