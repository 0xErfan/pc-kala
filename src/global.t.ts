interface unknownObjProps<T> { [key: string]: T }

type categories = 'pc' | 'laptop' | 'accessory' | 'console' | 'parts' | 'لوازم جانبی' | 'کنسول بازی' | 'لپتاپ' | 'قطعات کامپیوتر' | 'کامپیوتر'

interface commentProps {
    body: string
    rate: number
    creator: unknownObjProps<string>
    productID: string
    createdAt?: string
    isCreatedByCustomer: boolean
    services: unknownObjProps<string | number>
}

interface CustomerDataForTransactionData {
    name: string
    lName: string
    ostan: string
    province: string
    codePost: number
    phoneNum: string
    email?: string
    orderDetails?: string
}

interface userDataTypes {
    _id: string
    nameLastName: string
    username: string
    email: string
    phoneNumber: number
    password: string
    nationalCode: number
    role: 'USER' | 'ADMIN'
}

interface productDataTypes {
    _id: string
    name: string
    price: number
    discount: number
    category: string
    image: string
    type: 'pc' | 'laptop' | 'parts' | 'accessory' | 'console'
    specs: unknownObjProps<unknownObjProps<string>>
}

interface TransactionProductsTypes {
    productID: productDataTypes,
    services: unknownObjProps<number>,
    count: number
}

interface TransactionProps {
    _id: string
    userID: userRelatedDataTypes | string,
    customerData: CustomerDataForTransactionData,
    productsList: TransactionProductsTypes[],
    status: 'DELIVERED' | 'CANCELED' | 'PROCESSING',
    totalPrice: number,
    createdAt: string
}

interface userRelatedDataTypes {
    Wish: { creator: userRelatedDataTypes, productID: productDataTypes }[]
    Order: { productID: productDataTypes, count: number }[]
    BasketItem: { userID: userRelatedDataTypes, productID: productDataTypes, count: number, services: unknownObjProps<number> }[]
    Notification: { userID: userRelatedDataTypes, body: string, createdAt: string }[],
    Transaction: TransactionProps[]
    Comment: commentProps[]
}

export type {
    unknownObjProps,
    categories,
    commentProps,
    userDataTypes,
    productDataTypes,
    userRelatedDataTypes,
    TransactionProps,
    TransactionProductsTypes,
    CustomerDataForTransactionData,
}