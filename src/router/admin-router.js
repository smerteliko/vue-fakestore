import {createRouter, createWebHistory} from "vue-router";
import AdminRoute from "./adminRoute.js";
import {useUserStore} from "@/stores/userStore.js";


let adminRouter =  createRouter({
	history: createWebHistory(),
	routes: [].concat(AdminRoute)


});
adminRouter.beforeEach( async (to, from , next) => {
	const store = useUserStore();
	await store.isAuthorized();
	if (to.meta.requiresAuth && !store.isAuthed) {
		next({name:'AdminUserLogin'});
	} else if(to.meta.isAdmin && !store.checkAdmin) {
		next({name:'AdminUserLogin'});
	} else {
		next();
	}
});


export default adminRouter;
