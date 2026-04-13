import { defineStore } from "pinia";
import type { ICardStore } from '@/types/cardTypes';

const defaultValueCart = [
    {
        id: 1,
        model: 'BXC',
        name: 'Вытяжное устройство G2H',
        description: 'Вытяжное устройство для механической системы вентиляции',
        article: 'G2H1056',
        property: '12-72/168 м3/ч / гидрорегулируемый расход / от датчика присутствия',
        defaultPrice: 12644,
        installation: false,
        count: 1,
        inStoke: 10,
        price: {
            min: 6848,
            max: 56584
        },
        euroPrice: {
            min: 77.60,
            max: 643.86,
        },
        img: '/images/9dcd2a6e6e52f0e3db978e2972974a05e2cab1f7.png'
    },
    {
        id: 2,
        model: 'G2H',
        name: 'Вытяжное устройство BXC',
        description: 'Многофункциональное вытяжное устройство для естественной и гибридной вентиляции',
        article: 'G2H1056',
        property: '12-72/168 м3/ч / гидрорегулируемый расход / от датчика присутствия',
        defaultPrice: 12644,
        installation: true,
        count: 2,
        inStoke: 10,
        price: {
            min: 6848,
            max: 56584
        },
        euroPrice: {
            min: 77.60,
            max: 643.86,
        },
        img: '/images/c16c179f01e10420cfedd1db0ccc213f53f48ab7.png'
    },
    {
        id: 3,
        model: 'GHN',
        name: 'Вытяжное устройство GHN',
        description: 'Вытяжное устройство с датчиком присутствия',
        article: 'G2H1056',
        property: '12-72/168 м3/ч / гидрорегулируемый расход / от датчика присутствия',
        defaultPrice: 12644,
        installation: true,
        inStoke: 10,
        count: 1,
        price: {
            min: 6848,
            max: 56584
        },
        euroPrice: {
            min: 77.60,
            max: 643.86,
        },
        img: '/images/2268b19fa3325353a0e1c66b734515429be5faca.png'
    },
]

export const useStore = defineStore('cart', {
    state: () => ({
        defaultValueCart,
        historyItems: [] as ICardStore[],
        installationEnabled: false,

        isLoading: false,
        error: null as string | null
    }),
    getters: {
        totalPrice: (state) => state.defaultValueCart.reduce((sum, items) => sum + items.defaultPrice * items.count, 0),
        totalCount: (state) => state.defaultValueCart.reduce((sum, count) => sum + count.count, 0),
        historyList: (state) => {
            [...state.historyItems]
        }
    },
    actions: {
        toggleInstallation() {
            this.installationEnabled = !this.installationEnabled
        },
        setInstallation(value: boolean){
            this.installationEnabled = value
        },
        increaseCount(id: number, inStoke: number) {
            const item = this.defaultValueCart.find(i => i.id === id)
            if (item && item.count < inStoke) {
                item.count++
            }
        },
        decreaseCount(id: number,) {
            const item = this.defaultValueCart.find(i => i.id === id)
            if (item) {
                if (item.count > 1) {
                    item.count--
                } else {
                    this.removeFromCart(id)
                }
            }
        },
        removeFromCart(id: number) {
            this.defaultValueCart = this.defaultValueCart.filter(i => i.id !== id)
        },
        clearCart() {
            this.defaultValueCart = []
        },
        async fetchHistory() {
            this.isLoading = true;
            this.error = null;
            try {
                const data = await $fetch<ICardStore[]>('/api/example')
                this.historyItems = data
            } catch (err: any) {
                this.error = err.message || 'Ошибка загрузки'
                console.error('❌ Ошибка в fetchHistory:', err)
            } finally {
                this.isLoading = false
            }
        }
    }
})
