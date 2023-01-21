<template>
    <div>
        <div class="Nazwa">
            <h1>Podaj nazwe drinka:</h1>

            <input type="text" id="name" name="name" v-model="formData.name" placeholder="Nazwa drinka">
        </div>
        <br />
        <div class="alkohole">
            <h1>Wybierz Alkohole:</h1>

            <div v-for="alcohol, index in alcohols" :key="alcohol.label">
      <t v-if="alcohol.value == false"><button @click="alcohols[index].value = true">dodaj</button> </t>
      <t v-else><button @click="alcohols[index].value = false">usuń</button></t> <t> </t>
      <t>{{alcohol.label}}</t>
      <br/><br/>  
      
    </div>
        </div>
        <br />
        <div class="zdjecie">
            <h1>Dodaj zdjęcie</h1>
            <input type="text" class="form-control" v-model="formData.image" placeholder="Wpisz ścieżkę internetową zdjęcia" />

            <img v-if="formData.image" :src="formData.image" alt="Drink" width="450" height="500">
        </div>
        <br />
        <div class="Skladniki">
            <h1>Wypisz wszystkie składniki:</h1>
            <br />
            <div class="sklad">



                <div class="input-group">
                    <input type="text" class="form-control" v-model="formData.recipeText" placeholder="Wypisz: ilość i nazwę składnika" />

                    <div class="input-group-append">
                        <button @click="addRecipe()" type="button">Dodaj</button>
                        <button @click="clearRecipe()" type="button">Wyczyść</button>
                    </div>
                </div>

                <ul >
                    <li v-for="item, index in formData.recipe" :key="index">
                    <p><button @click="removeRecipe(index)">Usuń</button>{{ item }}</p>
                </li>
                </ul>



            </div>
        </div>
        <br />
        <div class="Instrukcje">
            <h1>Wypisz Instrukcje:</h1> <br />


            <div class="input-group">
                <input type="text" class="form-control" v-model="formData.recipeDescriptionText" placeholder="Wypisz instrukcje wykonania drinka" />

                <div class="input-group-append">
                    <button @click="addRecipeDescription()" type="button">Dodaj</button>
                    <button @click="clearRecipeDescription()" type="button">Wyczyść</button>
                </div>
            </div>

            <ul>
                <li v-for="item, index in formData.recipeDescription" :key="index">
                    <p><button @click="removeRecipeDescription(index)">Usuń </button>{{ item }} </p>
                </li>

            </ul>


        </div>
        <br />
        <h1> Zatwierdź poprawność drinka </h1>
        <router-link to="/"><button @click="save()" type="button" >Zatwierdź</button></router-link><t> Potwierdź poprawność drinka - <br/>  po zatwierdzeniu nie będzie już możliwości jego edycji.</t>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { apiService } from "@/services/api/api.service";

//struktura bazdy danych
const formData = ref({
    name: '',
    image: null,
    recipe: [],
    recipeText: '',
    recipeDescription: [],
    recipeDescriptionText: ''

})

const alcohols = ref([])

onMounted(async ()=> {
      // Alcohols
        const alcoholsData = await apiService.getAlcohols()
        const alcoholAfterMap = alcoholsData.map(({name, id}) => ({label:name, value: false, id}))
        alcohols.value = alcoholAfterMap;
      })

const addRecipe =() => {
    if(formData.value.recipeText.trim().length >0){
        formData.value.recipe.push(formData.value.recipeText)
        formData.value.recipeText = ''
    }

}

const clearRecipe = () => {
    formData.value.recipeText = ''
}


const removeRecipe = (numberOfId) => {
    formData.value.recipe.splice(numberOfId, 1)
}

const addRecipeDescription = () => {
    if(formData.value.recipeDescriptionText.trim().length >0){
        formData.value.recipeDescription.push(formData.value.recipeDescriptionText)
        formData.value.recipeDescriptionText = ''
    }
}

const clearRecipeDescription = () => {
    formData.value.recipeDescriptionText = ''
}


const removeRecipeDescription = (numberOfId) => {
    formData.value.recipeDescription.splice(numberOfId, 1)   
}

const  save= async () => {
    if(formData.value.name.trim() === 0) {
        return
    }
    else {
    const {name, image, recipe, recipeDescription} = formData.value
    const dataToSave = {};
    dataToSave.id = name.toLowerCase().replace(' ', '-')
    dataToSave.label = name;
    dataToSave.img = image;
    dataToSave.components = alcohols.value.filter(alc => alc.value).map(alc => alc.id)
    dataToSave.recipe = recipe;
    dataToSave.recipeDescription = recipeDescription;

    await apiService.addDrink(dataToSave)
    }
}


</script>

<style>
input {
    border-color: gold;
    border-radius: 10px;
    border-width: 3px;
    border-style: groove;
    font: Arial;
    text-align: left;
    fill: purple;
    color: gold;
    width: 80px;
    height: 25px;
    font-size: medium;
    display: inline-block;
    background-color: black;
    width: 500px;
}
</style>