declare global {
    interface Window {
        xDataproduct: (product: any) => any;
        GlobalState: any;
        updateCart: (res: any) => void;
    }
}

function xDataproduct(product: any) {
    return {
        quntity: product?.minQuantity || 1,
        localType: null as 'call' | 'whatsapp' | null,
        loading: {
            cart: false,
            checkout: false,
            priceAtCall: false,
            priceAtCallWhatsApp: false,
            addToCart: false,
            productDetails: false,
        },

        addProductToCart(productId: string) {
            this.loading.addToCart = true;
            window.Qumra.cart.addCartItem(productId, this.quntity)
                .then((res: any) => {
                    this.loading.addToCart = false;
                    window.updateCart(res);
                })
                .catch(() => {
                    this.loading.addToCart = false;
                });
        },

        async priceAtCallMethod(type: 'call' | 'whatsapp') {
            this.localType = type;
            if (type === 'call') {
                this.loading.priceAtCall = true;
            } else {
                this.loading.priceAtCallWhatsApp = true;
            }
                
            window.Qumra.products.productPriceAtCall(type)
                .then((res: any) => {
                    if (res?.type === 'whatsapp') {
                        window.location.href = `https://wa.me/${res.phone}`;
                    } else if (res?.type === 'call') {
                        window.location.href = `tel:${res.phone}`;
                    }
                }).catch((err: any) => {
                    console.error("productPriceAtCall error", err);
                }).finally(() => {
                if (type === 'call') {
                    this.loading.priceAtCall = false;
                } else {
                    this.loading.priceAtCallWhatsApp = false;
                }
                }
            );
        },

        decreaseCartItem(quantity: number) {
            if (quantity <= product?.minQuantity) return;
            this.quntity = quantity - 1;
        },
        increaseCartItem(quantity: number) {
            this.quntity = quantity + 1;
        },
        checkout() {
            this.loading.checkout = true;
            window.Qumra.order.checkout()
                .then((res: any) => {
                    window.location.href = res.url;
                })
                .catch((err: any) => {
                    console.error("checkout error", err);
                })
                .finally(() => {
                    this.loading.checkout = false;
                });
        },
 
    };
}

window.xDataproduct = xDataproduct;
