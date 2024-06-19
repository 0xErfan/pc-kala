import connectToDB from "@/config/db";
import { productDataTypes } from "@/global.t";
import ProductModel from "@/models/Product";
import { NextApiRequest, NextApiResponse } from "next";

interface reqProps {
    category: string
    limit: number
    currentPage: number
    filterBy: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: "This route can't be accessed without POST request_" })

    const { category, limit = 12, currentPage, filterBy }: reqProps = req.body;
    const skipValueForProductFetch = currentPage * limit

    try {

        const isCategoryValid = ['accessory', 'pc', 'parts', 'laptop', 'console'].find(cat => cat == category)
        if (!isCategoryValid?.length) return res.status(421).json({ message: 'its not a valid category name bro' })

        await connectToDB()

        let product: productDataTypes[] = []

        const filterProductsWithCategoryAndSubMenu = await ProductModel.find({ category, ['sub-cat']: filterBy }).skip(skipValueForProductFetch).limit(limit)

        if (filterProductsWithCategoryAndSubMenu.length) {
            product = filterProductsWithCategoryAndSubMenu
        } else {
            const regexPattern = new RegExp(`.*${filterBy}.*`, 'i');
            product = await ProductModel.find({ category, name: { $regex: regexPattern } }).skip(skipValueForProductFetch).limit(limit)
        }

        return res.json({ product: [...new Set([...product])].slice(0, 12) })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'خطا - اتصال به اینترنت را چک کنید', err })
    }
}

export default handler;