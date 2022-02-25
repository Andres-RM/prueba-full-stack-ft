<template>
  <v-card class="rounded-xl">
    <v-card-text>
      <span class="text-h4">Listado de Productos</span>
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
            <v-btn color="error" icon   @click="deleteProduct(item)">
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
            Agregar Producto
          </v-card-title>
        </v-toolbar>
        <v-card-text class="my-5">
          <v-form lazy-validation ref="createform">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field v-model="sku" :rules="rule" label="Sku" outlined rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="name" :rules="rule" label="Nombre Producto" outlined rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="stock" :rules="rule" type="number" label="Stock" outlined rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="price" :rules="rule" label="Precio" outlined rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-textarea v-model="description" :rules="rule" label="Descripcion" outlined rounded></v-textarea>
              </v-col>
            </v-row>
          </v-form>
          <v-row justify="end">
            <v-col cols="auto">
              <v-btn color="primary" @click="createProduct" :loading="loadingCreate">
                Agregar
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-snackbar
      >
        Usuario Registrado

        <template v-slot:action="{ attrs }">
          <v-btn
              color="success"
              text
              v-bind="attrs"
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
            Editar Producto
          </v-card-title>
        </v-toolbar>
        <v-card-text class="my-5">
          <v-form lazy-validation ref="editForm">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field v-model="skuEdit" :rules="rule" label="Sku" outlined rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="nameEdit" :rules="rule" label="Nombre Producto" outlined rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="stockEdit" :rules="rule" type="number" label="Stock" outlined rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="priceEdit" :rules="rule" label="Precio" outlined rounded></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-textarea v-model="descriptionEdit" :rules="rule" label="Descripcion" outlined rounded></v-textarea>
              </v-col>
            </v-row>
          </v-form>
          <v-row justify="end">
            <v-col cols="auto">
              <v-btn color="primary" @click="editProduct" :loading="loadingCreate" >
                Editar
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-snackbar
      >
        Usuario Registrado

        <template v-slot:action="{ attrs }">
          <v-btn
              color="success"
              text
              v-bind="attrs"
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
  name: "ProductosPage",
  data() {
    return {
      items: [],
      itemsPerPage: 0,
      loading: false,
      headers: [
        {
          text: 'Sku',
          value: 'sku',
        },
        {
          text: 'Nombre Producto',
          value: 'name',
        },
        {
          text: 'Stock',
          value: 'stock',
        },
        {
          text: 'Precio',
          value: 'price',
        },
        {
          text: '',
          value: 'action'
        },
      ],
      modalAdd: false,
      sku: '',
      name: '',
      stock: '',
      price: '',
      description: '',
      modalEdit: false,
      skuEdit: '',
      nameEdit: '',
      stockEdit: '',
      priceEdit: '',
      descriptionEdit: '',
      idEdit: null,
      rule: [
        v => !!v || 'Es requerido',
      ],
      loadingCreate: false
    }
  },
  beforeMount() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.loading = true
      Axios.get('http://127.0.0.1:8000/api/product')
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
    createProduct() {
      if (!this.$refs.createform.validate())
        return
      this.loadingCreate = true
      const request = {
        "sku": this.sku,
        "name": this.name,
        "stock": this.stock,
        "price": this.price,
        description: this.description
      }

      Axios.post('http://127.0.0.1:8000/api/product/create', request)
          .then(() => {
            this.loadData()
            this.$refs.createform.reset()
          }).finally(() => {
        this.loadingCreate = false
      })
    },
    deleteProduct(item) {
      Axios.post('http://127.0.0.1:8000/api/product/' + item.id + '/remove')
      .then(() => {
        this.loadData()
      })
    },
    openEdit(item) {
      this.skuEdit = item.sku
      this.nameEdit = item.name
      this.stockEdit = item.stock
      this.priceEdit = item.price
      this.descriptionEdit = item.description
      this.idEdit = item.id
      this.modalEdit = true
    },
    editProduct() {
      if (!this.$refs.editForm.validate())
        return
      this.loadingCreate = true
      const request = {
        "sku": this.skuEdit,
        "name": this.nameEdit,
        "stock": this.stockEdit,
        "price": this.priceEdit,
        description: this.descriptionEdit
      }

      Axios.post('http://127.0.0.1:8000/api/product/' + this.idEdit, request)
          .then(() => {
            this.loadData()
            this.$refs.editForm.reset()
          }).finally(() => {
        this.loadingCreate = false
      })
    }
  }
}
</script>

<style scoped>

</style>
