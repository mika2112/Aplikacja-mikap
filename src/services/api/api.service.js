
import { db } from '@/firebase'
import { getDocs, collection, query, where, addDoc } from 'firebase/firestore'
//import jsonData from './../../data/db.json'
// const 

// let jsonData = jsonDataDef


const apiServiceDef = () => {
    // private fields
    const alcoholsRef = collection(db, 'alcohols') 
    const drinksRef = collection(db, 'drinks')  
    // private fields

    const getDrinks = async () => {
        try {

            const querySnapshot = await getDocs(drinksRef)
            const drinks = querySnapshot.docs.map(snap => snap.data())
            return drinks

        }catch (e){
            console.log(e)
        }
    }

    const getDrinkById = async (id) => {
        try {
            const querySnapshot = await getDocs(query(drinksRef, where('id', "==", id)))
            return  querySnapshot.docs[0]?.data()
        }catch (e){
            console.log(e)
        }
    }

    const getAlcohols = async () => {
        try {
           
            const querySnapshot = await getDocs(query(alcoholsRef))
            return querySnapshot.docs.map(snap => snap.data())
           
        }catch (e){
            console.log(e)
        }
    }

    const addDrink = async (drink) => {
        try {
            await addDoc(drinksRef, drink)
        }catch (e){
            console.log(e)
        }
    }

    // const mockDrinks = async () => {
    //     try {
    //         for await (const drink of jsonData.drinks){
    //             await addDoc(drinksRef, drink)
    //         }
    //     }catch (e){
    //         console.log(e)
    //     }
    // }

    // const mockAlcohols = async () => {
    //     try {
    //         for await (const alcohol of jsonData.alcohols){
    //             await addDoc(alcoholsRef, alcohol)
    //         }
    //     }catch (e){
    //         console.log(e)
    //     }
    // }

    return {
        getDrinks,
        getAlcohols,
        getDrinkById,
        addDrink,
        // mockDrinks,
        // mockAlcohols
    }
}

export const apiService = apiServiceDef()