declare global {
  interface Window {
    xDataCart: () => any;
    GlobalState: any;
  }
}

export default function xDataCart() {

  
  return {
    loading:{
      checkout: false,
    },
    clearCartItem(id: string) {
      window.Qumra.cart.clearCartItem(id).then((res) => {
        window.updateCart(res);
      }).catch((err: any) => {
        console.error("clearCartItem error", err);
      });
    },

    decreaseCartItem(id: string, quantity: number) {
      window.Qumra.cart.updateQuantity(id, quantity - 1)
        .then((res) => window.updateCart(res))
        .catch((err: any) => console.error("decreaseCartItem error", err));
    },

    increaseCartItem(id: string, quantity: number) {
      window.Qumra.cart.updateQuantity(id, quantity + 1)
        .then((res) => window.updateCart(res))
        .catch((err: any) => console.error("increaseCartItem error", err));
    },

    checkout() {
      this.loading.checkout = true
      window.Qumra.order.checkout()
        .then((res: any) => {
        this.loading.checkout = false
          window.location.href = res.url;
        })
        .catch((err: any) => {
          console.error("checkout error", err);
        })
        .finally(() => {
          window.loading.checkout = false;
        });
    },
  };
}

window.xDataCart = xDataCart;
