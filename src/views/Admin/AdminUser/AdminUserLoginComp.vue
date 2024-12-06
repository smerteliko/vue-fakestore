<template>
  <div
    class="component container container-fluid"
  >
    <form
      class="form-center form-size bg-info-subtle
             border-radius-50pc d-flex flex-column
             align-content-center align-items-stretch
             justify-content-center"
      @submit.prevent="submitLogin"
    >
      <h3 class="text-center text-black">
        Symfony fakestore Admin
      </h3>
      <div class="row mt-4 justify-content-center">
        <div class="w-50">
          <InputComp
            :id="`adminLoginEmail`"
            :class="`border-danger`"
            :type="`email`"
            :label="`Email address`"
            :model="this.email"
            @input-value="this.email = $event"
          />
        </div>
      </div>
      <div class="row mt-4 justify-content-center">
        <div class="w-50">
          <InputComp
            :id="`adminLoginPassword`"
            :class="`border-danger border-end-0  border-right-0`"
            :type="`password`"
            :label="`Password`"
            :model="this.password"
            :password-toggle-class="{borderColor:`border-danger`, textColor:`textDanger`}"
            @input-value="this.password = $event"
          />
        </div>
      </div>
      <div class="row justify-content-center mt-3">
        <div class="btn-group w-50">
          <button
            class="form-control bg-danger rounded-pill btn height-58px"
            type="submit"
          >
            Log in
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import {mapActions, mapStores, mapWritableState} from "pinia";
import {useUserStore} from "@/stores/userStore.js";

export default {
  name: "AdminUserLoginComp",
  components: {},
  data(){
    return {
      errors: {
        email:'',
      },
      showPassword: false,
      showPasswordType: 'password'
    }
  },
  computed: {
    ...mapStores(useUserStore),
    ...mapWritableState(useUserStore, ['email', "password"]),
  },
  mounted() {
  },
  methods: {
    ...mapActions(useUserStore, ['logIn']),

    async submitLogin() {
      await this.userStore.logIn(true);
      this.$router.push({path: '/admin/main', replace: true});
    },
  }
}
</script>



<style scoped>

.form-center {
  display: block;
  margin: 0 auto;
}
.border-color {
  border-color: rgba(13,13,213,1)!important
}

.border-radius-50pc{
  border-radius: 50%;
}

.height-58px {
  height: 58px;
}

.border-left-50rem {
  border-top-left-radius: 50rem !important;
  border-bottom-left-radius: 50rem !important;
}

.border-right-50rem {
  border-top-right-radius: 50rem !important;
  border-bottom-right-radius: 50rem !important;
}

.bg-none {
  background-color: unset;
}

.fs-x-large {
  font-size: x-large;
}

button:focus {
  border: none;
  outline: none;
}

.form-size {
  width: 45rem;
  height: 45rem;
}
</style>
