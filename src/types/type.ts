
export interface productType {
    id: string,
    product: string,
    price: number,
    brand: string
}


export interface TypeData {
    sortPrice: string[],
    products: productType[],
    page: number,
    id: string[],
    filtr: boolean,
}