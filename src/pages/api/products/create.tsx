import connectToDB from "@/config/db";
import { AccessoriesModel, ConsoleModels, LaptopModel, PartsModel, PcModel } from "@/models/Product";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: "This route can't be acceessed without POST request_" })
    // if role !== admin -> unauth -> error

    try {

        await connectToDB()

        const { type, ...data } = req.body

        if (!type || !data) return res.status(421).json({ message: 'requirement data to make product not found idiot!' })

        let productType

        switch (type) {
            case 'laptop': { productType = LaptopModel; break }
            case 'pc': { productType = PcModel; break }
            case 'console': { productType = ConsoleModels; break }
            case 'accessory': { productType = AccessoriesModel; break }
            case 'parts': { productType = PartsModel; break }
            default: { throw new Error('Not a valid type') }
        }

        const newProduct = await productType.create(data)

        console.log('created successfully :))', newProduct)

        return res.status(201).json({ message: 'Product created successfully :))' })

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;