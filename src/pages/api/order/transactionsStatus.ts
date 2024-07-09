import connectToDB from "@/config/db";
import { transactionModel } from "@/models/Transactions";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    try {

        const pipeline = [
            {
                $group: {
                    _id: null,
                    rejected: { $sum: { $cond: [{ $eq: ["$status", "CANCELED"] }, 1, 0] } }, // if the $cond is true, return 1 else 0 and add it to the counter
                    delivered: { $sum: { $cond: [{ $eq: ["$status", "DELIVERED"] }, 1, 0] } },
                    pending: { $sum: { $cond: [{ $eq: ["$status", "PROCESSING"] }, 1, 0] } }
                }
            }
        ];

        await connectToDB();

        // we use Mongoose's aggregate() method to perform the grouping and counting operation directly in the database instead of fetching all documents and processing them in Node.js(lead in performance issues).
        const result = await transactionModel.aggregate(pipeline);

        const { rejected, delivered, pending } = result[0];

        return res.status(200).json({ message: 'سفارش شما با موفقیت لغو شد', transactionsData: { rejected, delivered, pending } })

    } catch (err) {
        console.log(err)
        return res.status(421).json({ message: 'خطای ناشناخته / بعدا تلاش کنید', err })
    }
}

export default handler;