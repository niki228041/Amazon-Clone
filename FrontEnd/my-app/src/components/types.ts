

export interface Product{
    id: number,
    name: String,
    price: String,
    discount: String,
    description: String,
    quantity: String,
    isInTheStock: String,
    numberOfDaysForDelivery: String,
    address: String,
    image: any,
    comments: Comment[],
    options: SelectedOption[],
}

export interface SelectedOption{
    title:string,
    variant:string,
    variantId:number
}

export interface Comment{
    stars:number
}

export interface Order{
    id:any;
    name:any;
    product_id:any;
}

export interface categorySequence{
    id:any;
    name:any;
}

export interface ImageLink {
  image: string;
  productId: number;
}