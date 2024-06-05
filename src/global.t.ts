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

export type {
    unknownObjProps,
    categories,
    commentProps,
    userDataTypes,
}