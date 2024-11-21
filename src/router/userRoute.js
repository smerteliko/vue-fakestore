
const UserComp = ()=> import("@/views/Shop/User/UserLayout.vue");
const UserPersonalInfo = ()=> import("@/views/Shop/User/UserPersonalInfoComp.vue");
const UserVerificationComp = ()=> import("@/views/Shop/User/UserVerificationComp.vue");

let userRoute = [
	{
		path: '/user/profile',
		name: 'UserComp',
		component: UserComp,
		meta: {requiresAuth: true},
		children: [
			{
				// UserProfile will be rendered inside User's <adminRouter-view>
				// when /user/:id/profile is matched
				name: 'UserPersonalInfo',
				path: 'personal_info',
				component: UserPersonalInfo,
			},
			{
				// UserProfile will be rendered inside User's <adminRouter-view>
				// when /user/:id/profile is matched
				name: 'UserVerification',
				path: 'verify',
				component: UserVerificationComp,
			},
		],

	}
];

export default userRoute;
