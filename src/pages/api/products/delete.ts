import connectToDB from "@/config/db";
import ProductModel from "@/models/Product";
import { authUser } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'DELETE') return res.status(421).json({ message: "This route can't be accessed without DELETE request_" })

    try {

        await connectToDB()

        const user = await authUser({ isFromClient: false, cookie: req.cookies?.token })
        if (user?.role !== 'ADMIN') return res.status(421).json({ message: 'This route is protected' })

        const { _id } = req.body
        if (!_id) return res.status(421).json({ message: 'need product id to delete it' })

        await ProductModel.findOneAndDelete({ _id })

        return res.json({ message: 'محصول با موفقیت خذف شد' })

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;