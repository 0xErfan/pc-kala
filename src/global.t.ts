interface unknownObjProps<T> { [key: string]: T }

type categories = 'pc' | 'laptop' | 'accessory' | 'console' | 'parts' | 'لوازم جانبی' | 'کنسول بازی' | 'لپتاپ' | 'قطعات کامپیوتر' | 'کامپیوتر'

interface commentProps {
    _id: string
    body: string
    rate: number
    creator: userDataTypes
    productID: productDataTypes
    accepted: 0 | -1 | 1
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
    profile: string | undefined
    nationalCode: number
    role: 'USER' | 'ADMIN'
    isBan: boolean
    dashboardNotifications: dashboardNotification[]
}

interface productDataTypes {
    _id: string
    name: string
    price: number
    discount: number
    category: categories
    'sub-cat'?: string
    image: Array<string>
    specs: unknownObjProps<unknownObjProps<string>>
    customers: number
}

interface TransactionProductsTypes {
    _id: string
    productID: productDataTypes,
    services: unknownObjProps<number>,
    count: number
}

interface DiscountDataTypes {
    code: string
    value: number
    maxUse: number
    expireAfter: number
    createdAt: string
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

interface NotificationProps {
    _id: string
    userID: userRelatedDataTypes
    body: string
    createdAt: string
}

interface BasketItemProps {
    _id: string
    userID: userRelatedDataTypes
    productID: productDataTypes
    count: number
    services: unknownObjProps<number>
}

interface OrderDataTypes {
    productID: productDataTypes
    count: number
}

interface WishDataTypes {
    creator: userRelatedDataTypes
    productID: productDataTypes
}

interface userRelatedDataTypes {
    Wish: WishDataTypes[]
    Order: OrderDataTypes[]
    BasketItem: BasketItemProps[]
    Notification: NotificationProps[],
    Transaction: TransactionProps[]
    Comment: commentProps[]
    dashboardNotifications: dashboardNotification[]
}

interface dashboardNotification {
    _id: string
    message: string
    isSeen: boolean
    creator: userDataTypes
    target: userDataTypes
    createdAt: string
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
    NotificationProps,
    BasketItemProps,
    OrderDataTypes,
    WishDataTypes,
    DiscountDataTypes,
    dashboardNotification,
}