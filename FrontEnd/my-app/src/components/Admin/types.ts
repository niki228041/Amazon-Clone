
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
    Variants_:VariantDTO[],
    userId:number
}


export interface imgDTO{
    data: String,
    extension: String
}

export interface createCategory{
    name: String,
    categoryId: number,
    optionsIds:number[]
}

export interface Category{
    id: number,
    name: String,
}


export interface Options{
    id:number;
    title:string;
    variants:Variant[];
}
  
export interface Variant{
  id:number,
  title:string
}

export interface VariantDTO{
    id:number
}

export interface Company{
  description:string,
  users: any,
  id: number,
  name:string,
  creatorId:number,
  image:string,
}
