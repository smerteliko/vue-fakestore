const CartComp = () => import( "@/views/Shop/Cart/CartLayout.vue");

let cartRoute  = [
	{
		path: '/cart',
		name: "CartComp",
		component: CartComp
	},
];
export default cartRoute;
