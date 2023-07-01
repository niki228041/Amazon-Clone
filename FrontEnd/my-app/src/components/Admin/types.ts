
export interface createProduct{
    name: String,
    price: number,
    discount: number,
    description: String,
    quantity: number,
    isInTheStock: Boolean,
    numberOfDaysForDelivery: number,
    address: String,
    categoryId: number,
    images_:any,
}


export interface imgDTO{
    data: String,
    extension: String
}

export interface createCategory{
    name: String,
    categoryId: number
}

export interface Category{
    id: number,
    name: String,
}