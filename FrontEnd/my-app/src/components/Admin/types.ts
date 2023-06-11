
export interface createProduct{
    name: String,
    price: number,
    discount: number,
    description: String,
    quantity: number,
    isInTheStock: Boolean,
    numberOfDaysForDelivery: number,
    address: String,
    categoryId: number
}

export interface createCategory{
    name: String,
    categoryId: number
}

export interface Category{
    id: number,
    name: String,
}