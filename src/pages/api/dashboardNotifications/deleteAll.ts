import connectToDB from "@/config/db";
import { DashboardNotificationModel } from "@/models/DashboardNotification";
import { authUser } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'DELETE') return res.status(421).json({ message: "This route can't be accessed without DELETE request_" })

    try {

        const userData = await authUser({ cookie: req.cookies?.token })
        if (!userData || userData.role !== 'ADMIN') return res.status(404).json({ message: 'This route is protected buddy' })

        await connectToDB()

        const { target } = req.body

        await DashboardNotificationModel.deleteMany({ target })

        return res.status(201).json({ message: 'Notifications deleted' })

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;