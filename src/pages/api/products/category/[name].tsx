import connectToDB from "@/config/db";
import { NextApiRequest, NextApiResponse } from "next";
import { LaptopModel, PcModel, PartsModel, AccessoriesModel, ConsoleModels } from "@/models/Product";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: "This route can't be acceessed without POST request_" })

    try {

        const { name } = req.query

        await connectToDB()

        let product;

        switch (name) { // im not a backend guy so here we are (:
            case 'laptop': { product = await LaptopModel.find({}).exec(); break }
            case 'pc': { product = await PcModel.find({}).exec(); break }
            case 'accessory': { product = await AccessoriesModel.find({}).exec(); break }
            case 'console': { product = await ConsoleModels.find({}).exec(); break }
            case 'parts': { product = await PartsModel.find({}).exec(); break }
        }

        if (!product) throw new Error("Invalid category name")

        return res.status(201).json(product)

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;