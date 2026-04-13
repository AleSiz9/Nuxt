// composables/useCarousel.ts
import { ref, computed, onMounted, onBeforeUnmount, type Ref } from 'vue'

export function useCarousel(items: Ref<any[]>, options: { gap?: number } = {}) {
    const gap = options.gap ?? 20
    const containerRef = ref<HTMLElement | null>(null)
    const slidesPerView = ref(4)
    const firstVisibleIndex = ref(0)
    const canScrollPrev = ref(false)
    const canScrollNext = ref(false)

    const totalPages = computed(() =>
        Math.ceil(items.value.length / slidesPerView.value)
    )

    const currentPage = computed(() =>
        Math.min(Math.ceil(firstVisibleIndex.value / slidesPerView.value) + 1, totalPages.value)
    )

    const getSlideElement = (): HTMLElement | null => {
        if (!containerRef.value) return null
        return containerRef.value.querySelector('.carousel__slide')
    }

    // Вычисление количества слайдов, помещающихся в контейнер
    const calculateSlidesPerView = (): number => {
        const container = containerRef.value
        const slide = getSlideElement()
        if (!container || !slide) return 4
        const slideWidth = slide.offsetWidth
        const containerWidth = container.clientWidth
        const count = Math.floor((containerWidth + gap) / (slideWidth + gap))
        return Math.max(1, count)
    }

    const updateScrollState = () => {
        const container = containerRef.value
        const slide = getSlideElement()
        if (!container || !slide) return

        const slideWidth = slide.offsetWidth
        const scrollLeft = container.scrollLeft

        const index = Math.round(scrollLeft / (slideWidth + gap))
        firstVisibleIndex.value = Math.min(index, items.value.length - 1)

        slidesPerView.value = calculateSlidesPerView()
        canScrollPrev.value = scrollLeft > 0
        canScrollNext.value = scrollLeft < container.scrollWidth - container.clientWidth - 1
    }

    const scrollPrev = () => {
        const container = containerRef.value
        const slide = getSlideElement()
        if (!container || !slide) return
        const slideWidth = slide.offsetWidth
        const pageWidth = (slideWidth + gap) * slidesPerView.value
        container.scrollBy({ left: -pageWidth, behavior: 'smooth' })
    }

    const scrollNext = () => {
        const container = containerRef.value
        const slide = getSlideElement()
        if (!container || !slide) return
        const slideWidth = slide.offsetWidth
        const pageWidth = (slideWidth + gap) * slidesPerView.value
        container.scrollBy({ left: pageWidth, behavior: 'smooth' })
    }

    onMounted(() => {
        slidesPerView.value = calculateSlidesPerView()
        updateScrollState()

        const container = containerRef.value
        if (!container) return

        container.addEventListener('scroll', updateScrollState)
        const resizeObserver = new ResizeObserver(() => {
            slidesPerView.value = calculateSlidesPerView()
            updateScrollState()
        })
        resizeObserver.observe(container)

        onBeforeUnmount(() => {
            container.removeEventListener('scroll', updateScrollState)
            resizeObserver.disconnect()
        })
    })

    return {
        containerRef,
        slidesPerView,
        firstVisibleIndex,
        canScrollPrev,
        canScrollNext,
        totalPages,
        currentPage,
        scrollPrev,
        scrollNext,
    }
}