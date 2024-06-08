import connectToDB from "@/config/db";
import { productDataTypes } from "@/global.t";
import ProductModel from "@/models/Product";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: "This route can't be accessed without POST request_" })

    try {

        await connectToDB()

        const text = req.body?.text.toLowerCase()

        const allProducts = await ProductModel.find({})

        const matchedProducts = [...allProducts]
            .filter(product =>
                product.name?.toLowerCase().includes(text) ||
                product.category?.toLowerCase().includes(text)
            )
            .concat([...allProducts] // just search in the product spec values for filtering
                .map((product: productDataTypes) => Object.values(product.specs)
                    .some(spec => spec?.value.toString().toLowerCase().includes(text)) ? product : null)
                .filter(Boolean));


        return res.status(201).json([...new Set(matchedProducts)]) // use new set to remove duplicated filtered products

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;