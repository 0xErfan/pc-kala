import connectToDB from "@/config/db";
import { AccessoriesModel, ConsoleModels, LaptopModel, PartsModel, PcModel } from "@/models/Product";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: "This route can't be acceessed without POST request_" })

    try {

        await connectToDB()

        const text = req.body?.text.toLowerCase()

        const matchedItems: [] = []

        for (const Model of [AccessoriesModel, ConsoleModels, LaptopModel, PartsModel, PcModel,]) {

            const allCategoryProducts = await Model.find({})

            allCategoryProducts
                .filter(prd => String(prd.name)
                    .toLowerCase().includes(text) || String(prd.category).toLowerCase().includes(text))
                .forEach((prd) => matchedItems.push(prd as never))
        }

        return res.status(201).json([...matchedItems])

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;