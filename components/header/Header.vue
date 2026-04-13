<script setup lang="ts">
const cart = useStore()
const {totalCount, totalPrice} = storeToRefs(cart)
</script>
<template>
    <header class="header">
        <div class="header__container">
            <div class="header__icon">
                <img src="/icons/cart-icon.svg" alt="">
            </div>
            <div class="header__cart-info">
                <p class="cart-info__title">
                    Ваша корзина
                </p>
                <span class="cart-info__count">
                    {{ totalCount }} товара
                </span>
                <span class="cart-info__price">
                    {{ totalPrice }}
                </span>
            </div>
        </div>
    </header>
</template>

<style scoped>
    .header{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 45px;
    }
    .header__container{
        display: flex;
        align-items: center;
        margin: 19px 0px 25px 0;
    }
    .header__icon img{
        width: 32px;
        margin-right: 10px;
    }
    .header__cart-info{
        display: flex;
        flex-direction: column;
        font-size: 12px;
    }
    .cart-info__count{
        color: var(--color-text-secondary);
    }
    .cart-info__title{
        font-size: 14px;
    }
</style>