const ProductComp = () => import( "@/views/Shop/Products/ProductLayout.vue");

let productRoute  = [
	{
		path: '/products/:id',
		name: "ProductComp",
		component: ProductComp
	},
];
export default productRoute;
