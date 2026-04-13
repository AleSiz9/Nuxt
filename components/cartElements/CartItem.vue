<script setup lang="ts">
const cart = useStore()
const hasInstallationItem = computed(() => {
    return cart.defaultValueCart.some(item => item.installation === true)
})
</script>
<template>
    <div class="cart__items">
        <div class="cart__item-list">
            <div class="cart-item__container" v-for="value in cart.defaultValueCart" :key="value.id">
                <div class="cart-item__img">
                    <img :src="value.img" alt="">
                </div>
                <div class="cart-item__info">
                    <h3 class="cart-item__name">
                        {{ value.name }}
                    </h3>
                    <p class="cart-item__property">
                        {{ value.property }}
                    </p>
                    <span class="cart-item__article">
                        {{ value.article }}
                    </span>
                </div>
                <div class="cart-item__actions">
                    <button class="cart-item__btn cart-item__btn--action" @click="cart.decreaseCount(value.id)">
                        -
                    </button>
                    <span class="cart-item__count">
                        {{ value.count }}
                    </span>
                    <button class="cart-item__btn cart-item__btn--action"
                        @click="cart.increaseCount(value.id, value.inStoke)">
                        +
                    </button>
                </div>
                <div class="cart-item__price">
                    <span>{{ value.defaultPrice * value.count }}</span>
                </div>
                <div class="cart-item__remove">
                    <button class="cart-item__renove-btn" @click="cart.removeFromCart(value.id)">
                        X
                    </button>
                </div>
            </div>
        </div>
        <div class="installation" v-if="hasInstallationItem">
            <div class="installation__control">
                <div class="installation__checkbox">
                    <input id="installation-checkbox" class="installation-checkbox" type="checkbox"
                        @change="cart.toggleInstallation">
                    <label for="installation-checkbox">
                        <img class="installation__icon" src="/icons/Unknown-5.svg" alt="">
                    </label>
                </div>
            </div>
            <div class="installation__content">
                <h3 class="installation__title">
                    Установка
                </h3>
                <p class="installation__description">
                    Отметьте, если Вам необходима консультация профессионала по монтажу выбранных товаров.
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.cart__items {
    display: flex;
    flex-direction: column;
    gap: 20px;
    grid-area: item;
    margin: 50px 55px 0 0;
}

.cart-item__container {
  border-bottom: 1px solid rgba(196, 196, 196, 1);
}

.cart-item__container:last-child {
  border-bottom: none;
}

.cart-item__container {
    display: grid;
    grid-template-columns: 18% 40% 18% auto 2%;
    align-items: center;
    justify-items: center;
}

.cart-item__img {
    width: 100%;
}

.cart-item__img img {
    max-width: 100px;
}

.cart-item__info {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.cart-item__name {
    font-size: 18px;
    font-weight: 600;
}

.cart-item__property {
    font-size: 14px;
    color: rgba(44, 50, 66, 1);
}

.cart-item__article {
    font-size: 13px;
    color: var(--color-text-secondary);
}

.cart-item__actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
}

.cart-item__btn {
    background: none;
    border: none;
    font-size: 31px;
    cursor: pointer;
}

.cart-item__btn--action:hover,
.cart-item__remove:hover {
    background-color: rgb(234, 234, 234);
}

.cart-item__count {
    font-size: 14px;
    font-weight: 500;
    min-width: 24px;
    text-align: center;
}

.cart-item__price {
    font-size: 20px;
    font-weight: 700;
    color: #1a1a1a;
    white-space: nowrap;
}

.cart-item__remove {
    margin-bottom: auto;
}

.cart-item__renove-btn {
    background: none;
    border: none;
    cursor: pointer;
}

.cart__installation {
    margin-top: 32px;
}

.installation {
    margin-top: 44px;
    display: flex;
    align-items: center;
    padding: 28px 43px 28px 25px;
}

.installation__title {
    font-size: 16px;
}

.installation__description {
    font-size: 14px;
    color: var(--color-text-secondary);
}


.installation__checkbox {
    display: flex;
    align-items: center;
}

.installation-checkbox {
    height: 20px;
    width: 20px;
    cursor: pointer;
}

.installation__icon {
    width: 30px;
    height: 30px;
    margin: 0 30px;
}

@media (max-width: 700px) {
    .cart-item {
        grid-template-columns: 80px 1fr;
        gap: 16px;
        position: relative;
    }

    .cart-item__image {
        width: 80px;
        height: 80px;
    }

    .cart-item__actions {
        grid-column: span 2;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .cart-item__remove {
        position: absolute;
        top: 12px;
        right: 12px;
    }

    .installation {
        flex-direction: column;
    }
}
</style>