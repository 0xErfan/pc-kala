import connectToDB from "@/config/db";
import { productDataTypes } from "@/global.t";
import ProductModel from "@/models/Product";
import { NextApiRequest, NextApiResponse } from "next";

interface reqProps {
    text: string
    limit: number
    currentPage: number
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: "This route can't be accessed without POST request_" })

    const { text, limit = 12, currentPage }: reqProps = req.body;
    const skipValueForProductFetch = (currentPage - 1) * limit

    try {

        await connectToDB()

        const allProducts = await ProductModel.find({})

        const matchedProducts = [...allProducts]
            .filter(product =>
                product.name?.toLowerCase().includes(text)
                ||
                product.text?.toLowerCase().includes(text)
            )
            .concat([...allProducts] // search in the product spec values for filtering
                .map((product: productDataTypes) => Object.values(product.specs)
                    .some(spec => spec?.value.toString().toLowerCase().includes(text as string)) ? product : null)
                .filter(Boolean));


        const matchedProductsWithoutRepeatedProducts = [...new Set(matchedProducts)].slice(skipValueForProductFetch, skipValueForProductFetch + limit)

        return res.json({ products: matchedProductsWithoutRepeatedProducts })

    } catch (err) {
        console.log('globalSearch page error -> ', err)
        return res.status(500).json({ message: 'something went wrong i think' })
    }
}

export default handler;