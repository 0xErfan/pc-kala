import connectToDB from "@/config/db";
import UserModel from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";
import { compare, hash } from "bcrypt";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: "This route can't be accessed without POST request!" })

    try {
        await connectToDB()

        const { compare: passwordToCompare, password, _id } = req.body
        const userData = await UserModel.findOne({ _id })

        if (passwordToCompare) { // if the compare have value, it means we only want this api to compare the password and not change it.
            if (! await compare(passwordToCompare, userData.password)) {
                return res.status(401).json({ message: 'رمز عبور وارد شده صحیح نیست' })
            } else {
                return res.status(200).json({ message: 'رمز عبور صحیح است' })
            }
        } else {
            const hashedPassword = await hash(password, 12)
            await UserModel.findOneAndUpdate({ _id }, { password: hashedPassword })
            return res.status(200).json({ message: 'رمز عبور با موفقیت تغییر یافت(:' })
        }

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید' })
    }
}

export default handler;