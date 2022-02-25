<template>
  <v-app>
    <v-navigation-drawer app color="#efe9e1">
      <v-row justify="center" class="mt-10 mb-4">
        <v-col cols="auto">
          <v-img :src="require('../assets/logo.png')" width="120" aspect-ratio="1"></v-img>
        </v-col>
      </v-row>
      <v-list nav shaped >
        <v-list-item-group
            v-model="selectedItem"
            color="primary"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-clipboard-list</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Lista de Productos</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Lista de Usuarios</v-list-item-title>
          </v-list-item>
        </v-list-item-group>

      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="primary">
            Cerrar sesion
            <v-icon class="ml-2">mdi-logout</v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-main class="fondo">
      <v-container class="mt-3 px-6">
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "main-layout",
  data() {
    return {
      selectedItem: null
    }
  }
}
</script>

<style scoped>
</style>
