

export interface Product{
    id: number,
    name: String,
    price: String,
    discount: String,
    description: String,
    quantity: String,
    isInTheStock: String,
    numberOfDaysForDelivery: String,
    address: String
}

export interface Order{
    id:any;
    name:any;
    product_id:any;
}