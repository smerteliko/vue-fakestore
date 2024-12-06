import AdminComp from "@/views/Admin/AdminMain/AdminMainLayout.vue";
import AdminCompMain from "@/views/Admin/AdminMain/AdminCompMain.vue";
import AdminCompEntities from "@/views/Admin/AdminMain/AdminCompEntities.vue";
import AdminUserLoginComp from "@/views/Admin/AdminUser/AdminUserLoginComp.vue";

let adminRoute = [
	{
		path: '/admin',
		name: 'AdminComp',
		component: AdminComp,
		meta: {
			requiresAuth: true,
			isAdmin: true
		},
		children: [
			{
				name: 'AdminCompMain',
				path: 'main',
				component: AdminCompMain,
			},
			{
				name: 'AdminCompEntities',
				path: 'entities',
				component: AdminCompEntities,
			},
		],

	},
	{
		path: '/admin/login',
		name: 'AdminUserLogin',
		component:  AdminUserLoginComp
	}
];

export default adminRoute;
