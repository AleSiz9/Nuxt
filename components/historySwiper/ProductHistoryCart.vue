<script setup lang="ts">
import { onMounted } from 'vue'
const dataHistory = useStore()
const { historyItems } = storeToRefs(dataHistory)
onMounted(async () => {
    await dataHistory.fetchHistory()
})

const {
    containerRef,
    canScrollPrev,
    canScrollNext,
    totalPages,
    currentPage,
    scrollPrev,
    scrollNext,
} = useCarousel(historyItems, { gap: 20 })

</script>

<template>
    <div class="carousel">
        <div class="carousel__header">
            <h2 class="carousel__title">Просмотренные товары</h2>
            <div class="carousel__controls">
                <button class="carousel__btn carousel__btn--prev" @click="scrollPrev" :disabled="!canScrollPrev">
                    <svg fill="#000000" height="50px" width="50px" version="1.1" id="XMLID_54_"
                        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 24 24" xml:space="preserve">
                        <g id="previous">
                            <g>
                                <polygon points="17.2,23.7 5.4,12 17.2,0.3 18.5,1.7 8.4,12 18.5,22.3" />
                            </g>
                        </g>
                    </svg>
                </button>
                <span class="carousel__counter">
                    {{ currentPage }} / {{ totalPages }}
                </span>
                <button class="carousel__btn carousel__btn--next" @click="scrollNext" :disabled="!canScrollNext">
                    <svg fill="#000000" height="50px" width="50px" version="1.1" id="XMLID_287_"
                        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 24 24" xml:space="preserve">
                        <g id="next">
                            <g>
                                <polygon points="6.8,23.7 5.4,22.3 15.7,12 5.4,1.7 6.8,0.3 18.5,12" />
                            </g>
                        </g>
                    </svg>
                </button>
            </div>
        </div>
        <div ref="containerRef" class="carousel__container">
            <div class="carousel__track">
                <div v-for="value in dataHistory.historyItems" :key="value.id" class="carousel__slide">
                    <div class="product-card">
                        <div class="product-card__image">
                            <NuxtImg :src="value.img" :alt="value.model" width="245" />
                        </div>
                        <div class="product-card__info">
                            <h3 class="product-card__model">{{ value.model }}</h3>
                            <p class="product-card__description">{{ value.description }}</p>
                        </div>
                        <div class="product-card__prices">
                            <span class="product-card__price">
                                {{ value.price.min }}₽ – {{ value.price.max }} ₽
                            </span>
                            <span class="product-card__euro-price">
                                {{ value.euroPrice.min }}₽ – {{ value.euroPrice.max }} €
                            </span>
                        </div>
                        <div class="product-card__link">
                            <NuxtLink :to="`/products/${value.id}`">Подробнее</NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.carousel__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 95px 0 20px;
}

.carousel__title {
    font-size: 24px;
    font-weight: 600;
}

.carousel__controls {
    display: flex;
    gap: 8px;
    align-items: center;
}

.carousel__btn {
    width: 40px;
    height: 40px;
    border: none;
    background: rgba(144, 162, 181, 1);
    border-radius: 50%;
    font-size: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.carousel__btn:hover:not(:disabled) {
    background-color: rgba(144, 162, 181, 0.8);
}

.carousel__btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

.carousel__container {
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.carousel__track {
    display: flex;
    gap: 20px;
}

.carousel__slide {
    scroll-snap-align: start;
    width: 305px;
    flex-shrink: 0;
}

.product-card {
    padding: 25px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
}

.product-card__image img {
    width: 90%;
    height: 245px;
}

.product-card__info {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.product-card__model {
    font-size: 22px;
    font-weight: 700;
}

.product-card__description {
    font-size: 14px;
    height: 60px;
    line-height: 1.4;
}

.product-card__prices {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: 39px;
    margin-bottom: 16px;
}

.product-card__price {
    font-size: 22px;
    font-weight: 500;
}

.product-card__euro-price {
    font-size: 16px;
    font-weight: 400;
    color: var(--color-text-secondary);
}

.product-card__link {
    width: 100%;
    text-align: center;
    background-color: var(--color-btn-secondary);
    padding: 16px 16px;
    cursor: pointer;
    border-radius: 4px;
}

.product-card__link a {
    color: white;
    text-decoration: none;
    font-weight: 500;
}

.product-card__link:hover {
    background-color: rgba(0, 105, 180, 0.8);
}

@media (max-width: 768px) {
    .carousel {
        padding: 0 12px;
    }

    .carousel__slide {
        width: 220px;
    }
}
</style>