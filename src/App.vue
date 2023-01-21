<template>
  <div>
  
  <h1>----------Alkomix----------</h1>
<AlkoholeApp />
<DrinkApp />
   
  </div>
  <nav>
    <router-link to="/">Home</router-link> || <router-link to="/addDrink">Dodaj Przepis</router-link>
  </nav>
  <router-view/>


</template>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: gold;
}

nav {
  text-align: center;
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
body {
  
  text-align: left;


  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 40%;
}
h1{
  text-align: center;
  background-color: rgba(0, 0, 0, 0.83);
}
</style>
