
<template>
  <RouterView class="vh-100 mh-100" />
</template>

<script>
import axios from 'axios'

export default {
  name: "vue-fakestore",
  async beforeMount() {
    await axios.get('http://localhost:8080/api/sub_categories',{ withCredentials: false }).then((response)=>{
      console.log(response)
    })
  }
};
</script>

<style scoped>
</style>
