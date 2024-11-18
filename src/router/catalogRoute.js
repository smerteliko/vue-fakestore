const CategoryComp = () => import( "@/views/Shop/Catalog/CategoryComp.vue");

let catalogRoute = [
	{
		path: '/catalog/category/:catID',
		name: "CategoryComp",
		component: CategoryComp
	},

	{
		path: '/catalog/category/:catID/subcategory/:subID',
		name: "CategoryCompBuSub",
		component: CategoryComp
	},
];

export default catalogRoute;
