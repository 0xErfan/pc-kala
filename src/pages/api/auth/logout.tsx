import connectToDB from "@/config/db";
import UserModel from "@/model/User";
import { NextApiRequest, NextApiResponse } from "next";
import { compare } from "bcrypt";
import { serialize } from "cookie";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: 'This route can be accessed with post request!' })

    try {
        connectToDB()

        const { username, email, password } = req.body
        const findUser = await UserModel.findOne({ $or: [{ username }, { email }] })

        if (!findUser) return res.status(401).json({ message: 'This username or password does not exist' })

        const passwordValidator = (password: string, hashedPassword: string) => {
            return compare(password, hashedPassword)
        }

        console.log('hi mother fuckers')

        passwordValidator(password, findUser.password).then(data => console.log(data))

        // if (!isPasswordValid) return res.status(401).json({ message: 'Incorrect username or password' })

        return res
            .setHeader("token", serialize("token", '', { httpOnly: true, path: "/", maxAge: new Date().getDate() + 6 }))
            .status(201).json({ message: 'You logged in successfully :))' })

    } catch (err) {
        return res.status(421).json({ message: 'Serverside error occurred => ', err })
    }
}

export default handler;