<template>
  <div class="alkhole">

    <div v-for="alcohol, index in alcohols" :key="alcohol.label">
      <t v-if="alcohol.value == false"><button @click="alcohols[index].value = true">dodaj</button> </t>
      <t v-else><button @click="alcohols[index].value = false">usuń</button></t> <t> </t>
      <t>{{alcohol.label}}</t>
      <br/><br/>  
      
    </div>
    
    <!-- pętla wypisuje alkohole z obiektu alcohols w których skład wchodzi index czyli np rum, nazwa- label 'Rum' i wartość true/false  --> 
    <!-- aby dodać alkohol wystarczy w obiekcie dodać index i wartości label i value -->
    <p> Dostępne przepisy do wykonania: </p>

    
    
    <!-- szuka drinka w obiekcie drinki(nasza baza drinków) klucz mówi po jakim parametrze ma wyszukiwać/ robić akcje -->
    <div v-for="drink in drinks" :key="(drink.id, drink.path)">
      <t v-if="checkIfIsValidDrink(drink.id)">
        <k> <router-link :to="/drink/ + drink.id">Przepis</router-link>  </k>
        <t> 
        </t> {{drink.label}}</t>
      <p></p>
    </div>
    
    

  </div>
</template>
  
<script setup type="text/javascript">

//import { router } from "express";

import { apiService } from "@/services/api/api.service";
import { ref, onMounted } from "vue"




onMounted(async ()=> {
      // Alcohols
        const alcoholsData = await apiService.getAlcohols()
        const alcoholAfterMap = alcoholsData.map(({name, id}) => ({label:name, value: false, id}))
        alcohols.value = alcoholAfterMap;

      
      // Drinks
        const drinksData = await apiService.getDrinks()
        const drinksAfterMap = drinksData.map(({id, label, components}) => ({id, label, components, path: `/${id}`}))
        drinks.value = drinksAfterMap
      })


const alcohols = ref([])
const drinks = ref([])



//mechanizm sprawdający czy można wykonć jakiś drink
//na zasadzie pętli sprawdzającej indywiduanie dla każdego alkoholu czy się on znajduje
//jeżeli tak to wartość value jest true

const checkIfIsValidDrink = (drinkId) => {

 
  if(!alcohols.value){
    return false;
  }

  const currentDrink = drinks.value.find(({id})=> id === drinkId)
  const checkAlcohols = alcohols.value.every(({value, id}) => {
    const isCurrentAlcoholNeeded = currentDrink.components.indexOf(id) > -1;
    if(isCurrentAlcoholNeeded) {
        return value === true;
    } 
    return true
  })

  // TODO: sprawdzic czy w danym drinku nie brakuje alkocholi które nie sa wybrane
  return checkAlcohols;

}

</script>



<style>
body {
  display: grid;
  place-items: center;
}

k{
 border-color: gold;
 border-radius: 10px;
 border-width: 3px;
 border-style: groove;
 font: Arial;
 text-align: center;
 fill: purple;
 color: gold;
 width: 80px;
 height: 25px;
 font-size: medium;
 display: inline-block;
 background-color: black;

}




 button{
  border-color: gold;
  border-radius: 10px;
  border-width: 3px;
  border-style: groove;
  font: Arial;
  text-align: center;
  fill: purple;
  color: gold;
  width: 90px;
  height: 25px;
  font-size: medium;
  display: inline-block;
  background-color: black;
  
  margin-left: 5px;
  margin-right: 5px;
  
}

t {
  background-color: rgba(0, 0, 0, 0.83);
  font: Arial;
  font-size: 20px;
  border-radius: 3px;
  text-align: left;

}

p {
  background-color: rgba(0, 0, 0, 0.8);
  font: Arial;
  font-size: 24px;

}
</style>