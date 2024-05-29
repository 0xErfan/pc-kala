interface unknownObjProps<T> { [key: string]: T }

type categories = 'pc' | 'laptop' | 'accessory' | 'console' | 'parts' | 'لوازم جانبی' | 'کنسول بازی' | 'لپتاپ' | 'قطعات کامپیوتر' | 'کامپیوتر'

interface commentProps {
    body: string
    rate: number
    creator: unknownObjProps<string>
    productID: string
    createdAt: string
}

export type { unknownObjProps, categories, commentProps }