export interface ICardStore{
    id: number
    model: string
    name: string
    description: string
    article: string
    property: string
    defaultPrice: number
    inStoke: number
    count: number
    price:{
        min: number
        max: number
    }
    euroPrice: {
        min: number
        max: number
    }
    img: string
}