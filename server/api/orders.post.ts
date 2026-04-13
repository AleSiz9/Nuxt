// server/api/orders.post.ts
import fs from 'node:fs/promises'
import path from 'node:path'

interface OrderItem {
    id: number
    name: string
    price: number
    quantity: number
}

interface OrderData {
    items: OrderItem[]
    totalAmount: number
    totalQuantity: number
    installationEnabled: boolean
    createdAt: string
}

export default defineEventHandler(async (event) => {
    const body = await readBody<OrderData>(event)

    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Корзина не может быть пустой',
        })
    }

    const order = {
        ...body,
        createdAt: new Date().toISOString(),
    }

    const filePath = path.resolve(process.cwd(), 'server/data/orders.json')

    try {
        let orders: any[] = []
        try {
            const fileContent = await fs.readFile(filePath, 'utf-8')
            orders = JSON.parse(fileContent)
        } catch(error: any) {
            //файл отсутствует или поврежден, код продолжит с пустого списка orders = []
            if(error.code !== 'ENOENT'){
                console.error('Ошибка чтения файла заказов:', error)
            }
        }
        orders.push(order)

        await fs.mkdir(path.dirname(filePath), { recursive: true })
        await fs.writeFile(filePath, JSON.stringify(orders, null, 2), 'utf-8')

        return {
            success: true,
            orderId: orders.length,
            message: 'Заказ успешно оформлен',
        }
    } catch (error) {
        console.error('Ошибка сохранения заказа:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Не удалось сохранить заказ',
        })
    }
})