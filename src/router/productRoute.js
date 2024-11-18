const ProductComp = () => import( "@/views/Shop/Products/ProductComp.vue");

let productRoute  = [
	{
		path: '/products/:id',
		name: "ProductComp",
		component: ProductComp
	},
];
export default productRoute;
