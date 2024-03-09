/* eslint-disable no-useless-catch */
import { API_URL, PASSWORD } from "../const/auth"
import md5 from "md5"


export async function sendRequest(action: string, params: Record<string, unknown> = {}) {
    try {
        const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '')
        const authString = md5(`${PASSWORD}_${timestamp}`)
        let retries = 3; // Количество попыток повторного выполнения запроса

        while (retries > 0) {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth': authString
                },
                body: JSON.stringify({ action, params })
            })

            if (response.ok) {
                const data = await response.json()
                console.log("respose = ", data)
                return data;
            } else if (response.status === 500) {
                retries--; // Уменьшаем количество попыток
                console.error('Ошибка 500 при выполнении запроса. Повторная попытка...');
                await new Promise(resolve => setTimeout(resolve, 1000)); // Ждем 1 секунду перед повторной попыткой
            } else {
                throw new Error('Ошибка при выполнении запроса');
            }
        }

        throw new Error('Не удалось выполнить запрос после нескольких попыток');
    } catch (error) {
        console.error('Произошла ошибка:', error);
        throw error;
    }
}

export async function getIds(offset = 0, limit = 50) {
    try {
        const response = await sendRequest('get_ids', { offset: (offset - 1) * 50, limit })

        return response.result
    } catch (error) {
        throw error
    }
}

export async function getItems(ids: string[]) {
    try {
        const response = await sendRequest('get_items', { ids: [...ids], limit: 50 })
        return response.result
    } catch (error) {
        throw error
    }
}

export async function SortPrice(price: number) {
    try {
        const response = await sendRequest('filter', { price })
        console.log("responcePrice = ", response)
        return response.result
    } catch (error) {
        throw error
    }
}

export async function SortName(name: string) {
    try {
        const response = await sendRequest('filter', { product: name })
        console.log("responceName = ", response)
        return response.result
    } catch (error) {
        throw error
    }
}

export async function SortBrand(brand: string) {
    try {
        const response = await sendRequest('filter', { brand })
        console.log("responceBrand = ", response)
        return response.result
    } catch (error) {
        throw error
    }
}