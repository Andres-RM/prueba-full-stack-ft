<template>
  <v-row>
    <v-col cols="12"><p class="text-h3 mt-4" style="margin-bottom: 100px;">Inicio</p></v-col>
    <v-col md="6" lg="4">
      <home-card-product></home-card-product>
    </v-col>
    <v-col md="6" lg="4">
      <home-card-user></home-card-user>
    </v-col>
    <v-col md="6" lg="4">
      <home-card-transation></home-card-transation>
    </v-col>
  </v-row>
</template>

<script>

import HomeCardUser from "@/components/home-card-user";
import HomeCardProduct from "@/components/home-card-product";
import HomeCardTransation from "@/components/home-card-transation";
export default {
  name: 'HomeView',
  components: {HomeCardTransation, HomeCardProduct, HomeCardUser},
}
</script>
