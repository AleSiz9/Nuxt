<script setup>
const cart = useStore()
const { totalCount } = storeToRefs(cart)
</script>
<template>
    <div class="cart">
        <div class="cart__title">
            <h1>
                Ваша корзина
                <span class="cart__count">{{ totalCount }} товара</span>
            </h1>
            <button class="cart__clear-btn" @click="cart.clearCart()">
                <u>
                    Очистить корзину
                </u>
            </button>
        </div>
        <CartItem />
        <CartSummary />
    </div>
</template>

<style scoped>
.cart {
    display: grid;
    grid-template-columns: auto 33%;
    grid-template-rows: auto auto;
    grid-template-areas:
        "title ."
        "item summary"
    ;
}

.cart__title {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    grid-area: title;
    margin-right: 55px;
}

.cart__title h1 {
    font-size: 44px;
    font-weight: 700;
    margin-right: 22px;
}

.cart__count {
    font-size: 18px;
    font-weight: 400;
    color: var(--color-text-secondary);
}

.cart__clear-btn {
    background: none;
    border: none;
    font-size: 14px;
    color: var(--color-text-secondary);
    cursor: pointer;
}

.cart__clear-btn:hover {
    color: rgb(255, 26, 28);
}

@media (max-width: 600px) {
    .cart {
        padding: 16px;
    }

    .cart__header {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
    }

    .cart__title {
        font-size: 24px;
    }

    .cart__clear-btn {
        align-self: flex-end;
    }
}
</style>