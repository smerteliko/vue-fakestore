import { defineStore } from 'pinia'
import { useUserStore } from './userStore.js'
import { useJSONStore } from './jsonStore.js'
import axios from 'axios'

axios.defaults.withCredentials = false
export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      items: [],
      userStore: useUserStore(),
      currenciesStore: useJSONStore(),
      allSelectedState: false,
      errorMessage: null
    }
  },
  actions: {
    initializeCart() {
      //TODO remove comments after backend part
      // Load cart from localStorage if user is not logged in
      //if (!localStorage.getItem('token')) {
      const cartData = localStorage.getItem('cart');
      if (cartData) {
        this.items = JSON.parse(cartData);
      }
      //TODO remove comments after backend part
      // } else {
      // If user is logged in, fetch cart from server
      //  this.fetchCartItems();
      // }
    },

    async fetchCartItems() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/cart', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.items = response.data.items || [];
      } catch (error) {
        console.error('Error fetching cart items:', error)
        this.errorMessage = 'Failed to fetch cart items. Please try again later.'
      }
    },

    async addItem(product, quantity) {
      this.items.push({
        product,
        quantity,
        selected: false,
        forFuturePurchase: false
      });
      await this.updateCart();
    },

    async removeItem(productId) {
      const originalCart = [...this.items];
      this.items = this.items.filter(item => item.product.id !== productId);

      try {
        await this.updateCart();
      } catch (error) {
        console.error('Error updating cart on server:', error);
        this.items = originalCart;
        this.showErrorMessage('Failed to remove item from cart. Please try again.');
      }
    },

    async updateItemQuantity(productId, quantity) {
      const originalQuantity = this.items.find(item => item.product.id === productId)?.quantity;
      const item = this.items.find(item => item.product.id === productId);
      if (item) {
        item.quantity = quantity;
      }

      try {
        await this.updateCart();
      } catch (error) {
        console.error('Error updating cart on server:', error);
        this.updateItemQuantity(productId, originalQuantity);
        this.showErrorMessage('Failed to update cart. Please try again.');
      }
    },

    toggleSelectAll() {
      this.allSelectedState = !this.allSelectedState;
      this.items.forEach(item => item.selected = this.allSelectedState);
      this.updateCart();
    },

    toggleForFuturePurchase(productId) {
      const item = this.items.find(item => item.product.id === productId);
      if (item) {

        item.selected = !item.selected;
        this.updateCart();
      }
    },

    async removeSelectedItems() {
      const originalCart = [...this.items];
      this.items = this.items.filter(item => !item.selected);

      try {
        await this.updateCart();
      } catch (error) {
        console.error('Error updating cart on server:', error);
        this.items = originalCart;
        this.showErrorMessage('Failed to remove selected items. Please try again.');
      }
    },

    async updateCart() {
      //TODO remove comments after backend part
      // if (localStorage.getItem('token')) {
      //   await this.updateCartOnServer();
      // } else {
      localStorage.setItem('cart', JSON.stringify(this.items));
      // }
    },

    async updateCartOnServer() {
      try {
        const token = localStorage.getItem('token');
        await axios.put('/api/cart', { items: this.items }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        localStorage.setItem('cart', JSON.stringify(this.items));
      } catch (error) {
        console.error('Error updating cart on server:', error);
        throw error;
      }
    },

    showErrorMessage(message) {
      this.errorMessage = message;
    },

    clearErrorMessage() {
      this.errorMessage = null;
    },

    checkIsProductInCart(productId) {
      const item = this.items.find(item => item.product.id === productId);
      return !!item;
    }
  },
  getters: {
    cartItems: (state) => state.items,

    cartItemsCount: (state) => state.items.length,

    cartTotal: (state) => {

      return state.items.reduce((total, item) => {
        return total + (item.product.productPrice.ConvertedPrice[state.userStore.currencyID] * item.quantity);
      }, 0);
    },

    getErrorMessage: (state) => state.errorMessage,

    allSelected: (state) => state.allSelectedState,

    getCurrencySymbol(state) {
      const findCurrency = state.currenciesStore.getCurrencies.find((item) => {
        return item.IsoCode === (state.userStore.currencyID ? state.userStore.currencyID : '840');
      });
      return findCurrency ? findCurrency.Symbol : '';
    },

    selectedItems: (state) => {
      return state.items.filter(item => item.selected === true);
    },

    selectedItemsCount: (state) => {
      return state.items.filter(item => item.selected === true).length;
    },

    selectedItemsPiesCount: (state) => {
      return state.items.filter(item => item.selected === true).reduce((total, item) => {
        return total + item.quantity;
      }, 0);
    },

    selectedItemsTotalPrice: (state) => {
      return state.items.filter(item => item.selected === true).reduce((total, item) => {
        return total + (item.product.productPrice.ConvertedPrice[state.userStore.currencyID] * item.quantity);
      }, 0);
    },

    cartItemPrice(state) {
      return (productID) => {
        return state.items.filter(item => item.product.id === productID).reduce((total, item) => {
             return total + (item.product.productPrice.ConvertedPrice[state.userStore.currencyID] * item.quantity)
           },0);
      }
    }

  }
});
