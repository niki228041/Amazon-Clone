import { Company } from "./Admin/types";


export interface Product{
    id: number,
    name: string,
    price: number,
    discount: string,
    description: string,
    quantity: string,
    isInTheStock: string,
    numberOfDaysForDelivery: string,
    address: string,
    image: string,
    comments: Comment[],
    options: SelectedOption[],
}

export interface OneProductVM{
    id: number,
    name: string,
    price: number,
    discount: string,
    description: string,
    quantity: string,
    isInTheStock: string,
    selledCount:number,
    numberOfDaysForDelivery: string,
    address: string,
    images: string[],
    comments: Comment[],
    options: SelectedOption[],
    companyVM:Company,
}




export interface SelectedOption{
    title:string,
    isBaseOptions:boolean,
    variant:string,
    variantId:number
}

export interface Comment{
    stars:number
}

export interface Order{
    id:any;
    name:string;
    price:number;
    count:number;
    product_id:any;
    discount:any;
}

export interface OrderedOrder{
    id:any;
    fullName:string;
    cardId:number;
    addressId:number;
    dateCreated:number;
}

export interface OrderForSeller{
    id:any;
    fullName:string;
    cardId:number;
    addressId:number;
    dateCreated:number;
    products:OrderedProductUpdated[];
}

export interface OrderedProductUpdated{
    count:number,
    product:Product
}

export interface ChangeOrderCount{
    index:any;
    count:number;
}

export interface categorySequence{
    id:any;
    name:any;
}

export interface User {
    name: string,
    surname: string,
    username: string,
    email: string,
    avatar:string
}

export interface UserVM {
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    avatar:string
}

export interface Login {
    email: string,
    password: string
}
export interface Register {
    email: string | undefined
    UserName: string | undefined
    FirstName: string | undefined
    LastName: string | undefined
    password: string | undefined
    CheckPassword: string | undefined
}
export interface UserState {
    user: User | null,
    loading: boolean,
    isAuth: boolean,
    message: ''
}

export interface ImageLink {
  image: string;
  productId: number;
}

export interface FindById{
    id:number
  }

export interface addCard{
  ownerName:string ,
  cardNumber:string ,
  year:string ,
  month:string ,
  userId:string ,
  isDefault:boolean,
}

export interface Card{
    ownerName:string ,
    cardNumber:string ,
    year:string ,
    month:string ,
    userId:string ,
    id:string ,
    isDefault:boolean,
  }

  
export interface Address{
    street:string,
    city:string,
    phone :string,
    fullName :string,
    country :string,
    postcode :string,
    userId :number,
    id :number,
  }

export interface OrderedProducts{
  productId:number,
  count:number
}

export interface OrderDTO{
    fullName:string,
    userId:number,
    cardId:number,
    addressId:number,
    orderedProducts_:OrderedProducts[]
}