import connectToDB from "@/config/db";
import { NextApiRequest, NextApiResponse } from "next";
import { LaptopModel, PcModel, PartsModel, AccessoriesModel, ConsoleModels } from "@/models/Product";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: "This route can't be acceessed without POST request_" })

    try {

        const { id } = req.query

        await connectToDB()

        const models = [LaptopModel, PcModel, PartsModel, AccessoriesModel, ConsoleModels];

        let product;
        
        for (const Model of models) {
            product = await Model.findOne({ _id: id });
            if (product) break;
        }

        if (!product) throw new Error("Product with this id didn't found")

        return res.status(200).json(product)

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;