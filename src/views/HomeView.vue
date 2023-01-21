<template>
  

  <div class="home">
    <AlkoholeApp />
  </div>
</template>

<script>
import aklohole from './components/AlkoholeApp.vue'
export default {
  components: {
    AlkoholeApp: aklohole
  },
  methods: {
   
  }
}
</script>
<style>
 body {
        background: url("./assets/tapeta.png") no-repeat center center
        fixed;
        
        background-size: 1550px,2100px;
        background-color: black;
        font-style: 24px;
        color: gold;
        }
       
       
       
 nav a {
  font-weight: bold;
  color: gold;
}

nav a.router-link-exact-active {
  color: gold;
}

 
</style>
