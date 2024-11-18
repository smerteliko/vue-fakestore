<template>
  <div class="container component component-flex bg-light ">
    <div class="container container-color">
      <ProductListComp :product-list="this.productStore.getProductList" />
    </div>
  </div>
</template>

<script>
import ProductListComp from "../Products/ProductsListComp.vue"
import {useProductStore} from "@/stores/productsStore.js";
import {mapActions, mapStores} from 'pinia'
import axios from "axios";

export default {
    name: 'StartComp',
    components: { ProductListComp},
    computed:{
      ...mapStores(useProductStore),
    },
    async beforeMount() {
      this.fetchProductList();
      await axios.get('/api/currencies/024').then((response)=>{
        console.log(response)
      })
    },
  methods: {
    ...mapActions(useProductStore, ["fetchProductList"]),
  }
}
</script>


<style scoped>

</style>
