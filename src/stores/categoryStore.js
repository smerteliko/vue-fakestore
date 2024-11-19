import axios from "axios";
import {defineStore} from "pinia";

axios.defaults.withCredentials = false;
export const useCategoryStore = defineStore('category', {
	state: () => {
		return {
			categoryList: [],
			categoryData: []
		};
	},
	actions: {
		async fetchCatList() {
			await axios.get(import.meta.env.VITE_API_HOST+'/json/catalogs')
					.then((response )=> {
						this.categoryList = response.data.categories
					}).catch((reason)=>{
						console.warn(reason)
					})
		},

		async fetchCategoryData(id ) {
			await axios.get(import.meta.env.VITE_API_HOST+'/catalog/api/category/'+id)
					.then((response )=> {
						this.categoryData = response.data.list;
					}).catch((reason)=>{
						console.warn(reason)
					})
		}
	},
	getters: {
		getCategoryList() {
			return this.categoryList;
		},
		getCategoryData() {
			return this.categoryData;
		}
	},
});
