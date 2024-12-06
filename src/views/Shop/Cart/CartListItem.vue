<template>
  <tr class="d-flex tr-height">
    <td class="align-content-center ">
      <img
        :src="``"
        class="img-thumbnail"
        width="100px"
        height="100px"
        alt="No image"
      >
    </td>
    <td class="align-content-center col-3 ">
            <RouterLink
              :to="{name: 'ProductComp', params:{id: this.cartItem.product.id}}"
              class=" link-underline-opacity-100 text-decoration-none"
            >
      <h6 class="mb-0 text-decoration-underline">
        {{ this.cartItem.product.Name }}
      </h6>
      <div class="product-description">
        <small class="text-secondary"> {{ this.desc }}</small>
      </div>
         </RouterLink>
    </td>
    <td class="align-content-center col-2">
      <div class="input-group input-group-sm flex-nowrap w-100 ">
        <button
          class="btn btn-outline-danger border-end-0 border-radius"
          type="button"
          @click="this.updateQuantity(this.cartItem.product.id, this.cartItem.quantity-1)"
        >

          <i
            :class="{
              'fa-solid fa-minus' : this.cartItem.quantity !== 1,
              'fa-regular fa-trash-can' : this.cartItem.quantity === 1}"
          />
        </button>
        <input
          v-model="this.cartItem.quantity"
          class="form-control border border-end-0 border-start-0 border-input"
          value="1"
          min="1"
          type="number"
          disabled
        >
        <button
          class=" btn btn-outline-success border-start-0 border-radius"
          type="button"
          @click="this.updateQuantity(this.cartItem.product.id, this.cartItem.quantity+1)"
        >
          <i class="fa-solid fa-plus" />
        </button>
      </div>
    </td>
    <td class="align-content-center col-3">
      <h5 class="mb-0">
        Total: {{ this.cartStore.cartItemPrice(this.cartItem.product.id) }}
        <i
          class=""
          v-text="this.cartStore.getCurrencySymbol"
        />
      </h5>
      <small class="text-secondary text-decoration-underline">
        <i> Per each: {{ this.cartItem.product.productPrice.ConvertedPrice[this.userStore.currencyID] }} </i>
        <i
          v-text="this.cartStore.getCurrencySymbol"
        />
      </small>
      <p class="align-text-bottom mb-0">
        Shipping:
      </p>
    </td>
    <td class="align-content-center col-1">
      <div class="form-check">
        <input
          v-model="this.cartItem.forFuturePurchase"
          type="checkbox"
          class="form-check-input"
          @change="this.toggleSelected(this.cartItem.product.id)"
        >
      </div>
    </td>
  </tr>
</template>

<script>
import { mapStores } from 'pinia'
import { useCartStore } from '@/stores/cartStore.js'
import { useUserStore } from '@/stores/userStore.js'
import { useJSONStore } from '@/stores/jsonStore.js'

export default {
  name: 'CartListItem',
  props: {
    cartItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      favourite: false,
      quantity: this.cartItem.quantity,
      image: this.getMainImg(),
      desc: this.cartItem.product.productDescription ? this.cartItem.product.productDescription.BriefDesc : '',
      price: 0
    }
  },
  computed: {
    ...mapStores(useCartStore, useUserStore, useJSONStore)
  },
  beforeMount() {

  },
  methods: {
    toggleSelected(productId) {
      this.cartStore.toggleForFuturePurchase(productId)
    },
    updateQuantity(productId, quantity) {
      if(quantity < 1) {
        this.cartStore.removeItem(productId);
      } else {
        this.cartStore.updateItemQuantity(productId, quantity);
      }
    },

    getMainImg() {
      if (this.product && this.product.productImages.length > 0) {
        const mainImgName = this.product.productImages.find(
          (value) => {
            return value.Main === true
          }
        ).FileNameBase
        return new URL('../../../assets/products/' + mainImgName, import.meta.url).href
      }
      return ''
    }
  }
}
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
  text-align: center;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
  text-align: center;
}

input:disabled {
  background: none;
}

input[type=checkbox] {
  /* Double-sized Checkboxes */
  -ms-transform: scale(1.5); /* IE */
  -moz-transform: scale(1.5); /* FF */
  -webkit-transform: scale(1.5); /* Safari and Chrome */
  -o-transform: scale(1.5); /* Opera */
  padding: 5px;
}

.tr-height {
  height: 120px;
}


.border-input {
  border-style: solid !important;
  border-image: linear-gradient(90deg, rgba(220, 53, 69, 1) 0%, rgba(25, 135, 84, 1) 100%) 1 !important;
}

.border-radius {
  border-radius: 20px;
}

.fancy-checkbox input[type="checkbox"],
.fancy-checkbox .checked {
  display: none !important;
  width: 1em !important;
  height: 1em !important;
}

.fancy-checkbox input[type="checkbox"],
.fancy-checkbox .checked {
  display: none !important;
  width: 1em !important;
  height: 1em !important;
}

.fancy-checkbox input[type="checkbox"]:checked ~ .checked {
  display: inline-block !important;
  width: 1em !important;
  height: 1em !important;
}

.fancy-checkbox input[type="checkbox"]:checked ~ .unchecked {
  display: none !important;
  width: 1em !important;
  height: 1em !important;
}

.font-size-x-large {
  font-size: x-large !important;
}


</style>
