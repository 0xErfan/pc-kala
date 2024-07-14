import connectToDB from "@/config/db";
import VisitModel from "@/models/Visit";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        await connectToDB()

        const date = req.body
        await VisitModel.findOneAndUpdate({ date }, { $inc: { count: 1 } }, { upsert: true })

        return res.json({ message: 'Visit count updated successfully' })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'internal error happened' })
    }
}

export default handler;