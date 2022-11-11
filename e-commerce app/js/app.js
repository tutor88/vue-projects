new Vue({
  el: "#app",
  data: {
    ////boolean property that decides if products are shown or cart is shown, in template with v-if
    isShowingCart: false,
    //product added will be added to the items array in cart
    cart: {
      items: [],
    },
    products: [
      {
        id: 1,
        name: "MacBook Pro (15 inch)",
        description:
          "This laptop has a super crisp Retina display. Yes, we know that it's overpriced...",
        price: 2999,
        inStock: 50,
      },
      {
        id: 2,
        name: "Samsung Galaxy Note 7",
        description:
          "Unlike the overpriced MacBook Pro, we're selling this one a bit cheap, as we heard it might explode...",
        price: 299,
        inStock: 755,
      },
      {
        id: 3,
        name: "HP Officejet 5740 e-All-in-One-printer",
        description:
          "This one might not last for so long, but hey, printers never work anyways, right?",
        price: 149,
        inStock: 5,
      },
      {
        id: 4,
        name: "iPhone 7 cover",
        description:
          "Having problems keeping a hold of that phone, huh? Ever considered not dropping it in the first place?",
        price: 49,
        inStock: 42,
      },
      {
        id: 5,
        name: "iPad Pro (9.7 inch)",
        description:
          "We heard it's supposed to be pretty good. At least that's what people say.",
        price: 599,
        inStock: 0,
      },
      {
        id: 6,
        name: "OnePlus 3 cover",
        description:
          "Does your phone spend most of its time on the ground? This cheap piece of plastic is the solution!",
        price: 19,
        inStock: 81,
      },
    ],
  },

  methods: {
    addItemToCart: function (product) {
      //checks if product already exists, return either null if doesnt exist or product if does exist
      let cartItem = this.getCartItem(product);
      if (cartItem != null) {
        cartItem.quantity++;
      } else {
        this.cart.items.push({
          product: product,
          quantity: 1,
        });
      }

      product.inStock--;
      console.log(this.cart.items);
    },
    //helper function to check if product alreay exists in item array
    getCartItem: function (product) {
      for (let i = 0; i < this.cart.items.length; i++) {
        if (this.cart.items[i].product.id === product.id)
          return this.cart.items[i];
      }
      return null;
    },
    // not neccesary can also be done directly in template on click
    showCart: function () {
      this.isShowingCart = true;
    },
    // increase quantity of cartitem and decrease stock
    increaseQuantity: function (cartItem) {
      cartItem.product.inStock--;
      cartItem.quantity++;
    },
    // decrease quantity of cartitem and increase stock
    decreaseQuantity: function (cartItem) {
      cartItem.product.inStock++;
      cartItem.quantity--;
      if (cartItem.quantity == 0) {
        this.removeItemFromCart(cartItem);
      }
    },
    //removes item from items array in cart
    removeItemFromCart: function (cartItem) {
      let index = this.cart.items.indexOf(cartItem);
      if (index !== -1) {
        this.cart.items.splice(index, 1);
      }
    },
    // for profuction purposes, if customer agrees clears items array and places items back in stock
    checkOut: function () {
      if (confirm("Are you sure that you want to buy these products?")) {
        this.cart.items.forEach(function (item) {
          item.product.inStock += item.quantity;
        });
        this.cart.items = [];
      }
    },
  },

  computed: {
    //if items are added to cart, the totak is recalculated
    cartTotal: function () {
      let total = 0;
      this.cart.items.forEach((item) => {
        total += item.quantity * item.product.price;
      });
      return total;
    },
    /// uses carTotal function to calc tax amount
    taxAmount: function () {
      return (this.cartTotal * 10) / 100;
    },
  },

  filters: {
    // filter to be used on al currency values
    currency: function (value) {
      return "$" + value;
    },
  },
});
