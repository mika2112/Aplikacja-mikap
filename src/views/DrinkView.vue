
<template>
    <div class="container">
        <h1>{{drink?.label}}</h1>
        <img v-if="drink?.img" :src="getImgLink(drink.img)"  />
        <div>
             <h1> Składniki </h1>
             <t v-if="drink?.recipe">
              <template v-for="(line, index) in drink.recipe" :key="index">
                - {{line}} <br/>
              </template>
            </t>
        </div>
        <div>
            <h1>Sposób wykonania</h1>
            <t v-if="drink?.recipeDescription">
              <template v-for="(line, index) in drink.recipeDescription" :key="index">
                - {{line}} <br/>
              </template>
            </t>
        </div>

    </div>
</template>

<script setup>
import { apiService } from '@/services/api/api.service';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

    const drink = ref()
    const route = useRoute()

    onMounted(async ()=> {
        const drinkData = await apiService.getDrinkById(route.params.id)
        drink.value = drinkData;
    })

    const getImgLink = (img) => {
      return img.startsWith('http') ? img : `/assets/${img}`
    }

</script>


<style>
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 65%;
}
</style>