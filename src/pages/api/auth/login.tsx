import connectToDB from "@/config/db";
import UserModel from "@/model/User";
import { NextApiRequest, NextApiResponse } from "next";
import { compare } from "bcrypt";
import { serialize } from "cookie";
import { Secret, sign } from 'jsonwebtoken'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') return res.status(421).json({ message: 'This route can be accessed with post request!' })

    try {
        connectToDB()

        const { username, email, password } = req.body
        const userData = await UserModel.findOne({ $or: [ {username}, { email } ] })

        if (!userData) return res.status(401).json({ message: 'This username or email does not exist' })

        if (! await compare(password, userData.password)) return res.status(401).json({ message: 'Incorrect username or password' })

        const token = sign({ ...userData }, process.env.secretKey as Secret, { expiresIn: '6D' })

        return res
            .setHeader("Set-Cookie", serialize("token", token, { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 * 6 }))
            .status(201).json({ message: 'You logged in successfully :))', userData, token })

    } catch (err) {
        return res.status(421).json({ message: 'Serverside error occurred => ', err })
    }
}

export default handler;