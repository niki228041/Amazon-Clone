
export interface createProduct{
    name: string,
    price: number,
    discount: number,
    description: string,
    quantity: number,
    isInTheStock: boolean,
    numberOfDaysForDelivery: number,
    address: string,
    categoryId: number,
    images_:any,
    Variants_:VariantDTO[],
    userId:number
}


export interface imgDTO{
    data: string,
    extension: string
}

export interface createCategory{
    name: string,
    categoryId: number,
    images_:any,
    optionsIds:number[]
}

export interface Category{
    id: number,
    name: string,
    countOfProducts:number,
    images_: string
}


export interface Options{
    id:number;
    title:string;
    variants:Variant[];
}
  
export interface Variant{
  id:number,
  title:string,
  countOfProducts:number
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
