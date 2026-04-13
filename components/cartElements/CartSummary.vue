<script setup lang="ts">
const summary = useStore()
const { totalPrice, totalCount, installationEnabled, defaultValueCart } = storeToRefs(summary)
const isSubmitting = ref(false)

const handleCheckout = async () => {
    const isConfirmed = confirm('Подтвердите заказ')
    if (!isConfirmed) return

    isSubmitting.value = true
    const orderData = {
        items: defaultValueCart.value.map(item => ({
            id: item.id,
            name: item.name,
            model: item.model,
            article: item.article,
            price: item.defaultPrice,
            quantity: item.count,
        })),
        totalAmount: totalPrice.value,
        totalQuantity: totalCount.value,
        installationEnabled: installationEnabled.value,
    }

    try {
        const response = await $fetch('/api/orders', {
            method: 'POST',
            body: orderData,
        })
        alert(response.message)
        summary.clearCart()
    } catch (error: any) {
        console.error('Ошибка оформления заказа:', error)
        alert(error?.statusMessage || 'Не удалось оформить заказ. Попробуйте позже.')
    } finally {
        isSubmitting.value = false
    }
}
</script>

<template>
    <div class="cart-summary">
        <div class="cart-summary__container">
            <h2 class="cart-summary__title">Итого</h2>
            <div class="cart-summary__order cart-summary__flex--row">
                <p class="cart-summary__label">Сумма заказа</p>
                <span class="cart-summary__value">{{ totalPrice }}</span>
            </div>
            <div class="cart-summary__count cart-summary__flex--row">
                <p class="cart-summary__label">Колличество</p>
                <span class="cart-summary__value">{{ totalCount }}</span>
            </div>
            <div class="cart-summary__installation cart-summary__flex--row">
                <p class="cart-summary__label">Установка</p>
                <span class="cart-summary__value">{{ installationEnabled ? 'Да' : 'Нет' }}</span>
            </div>
            <div class="cart-summary__result cart-summary__flex--row">
                <p class="cart-summary__result--label">Стоимость товаров</p>
                <span class="cart-summary__result--value">{{ totalPrice }}₽</span>
            </div>
            <div class="cart-summary__link">
                <button class="cart-summary__btn cart-summary__btn--primary"
                    :disabled="isSubmitting || totalCount === 0" @click="handleCheckout">
                    {{ isSubmitting ? 'Оформление...' : 'Оформить заказ' }}
                </button>
                <NuxtLink to="/quick-order" class="cart-summary__btn cart-summary__btn--secondary">
                    Купить в 1 клик
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
.cart-summary {
    grid-area: summary;
    font-size: 18px;
}

.cart-summary__flex--row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.cart-summary__container {
    margin: 65px 30px;
    display: flex;
    flex-direction: column;
    gap: 18px;
}

.cart-summary__title {
    font-size: 24px;
}

.cart-summary__label {
    font-size: 16px;
    font-weight: 500;
}

.cart-summary__installation {
    padding-bottom: 28px;
    border-bottom: 1px solid rgba(174, 176, 182, 1);
}

.cart-summary__link {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.cart-summary__btn {
    display: flex;
    font-size: 18px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    border: 1px solid rgba(0, 105, 180, 1);
    height: 54px;
    text-decoration: none;
}

.cart-summary__btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
}

.cart-summary__result--label {
    font-weight: 500;
}

.cart-summary__result--value {
    font-size: 26px;
    font-weight: 700;
}

.cart-summary__btn--primary {
    background-color: rgba(0, 105, 180, 1);
    color: rgba(255, 255, 255, 1);
}

.cart-summary__btn--secondary {
    color: rgba(0, 105, 180, 1);
}
</style>