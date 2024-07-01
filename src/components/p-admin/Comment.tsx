import { useAppDispatch } from '@/Hooks/useRedux'
import { modalDataUpdater } from '@/Redux/Features/globalVarsSlice'
import { commentProps } from '@/global.t'
import React from 'react'
import { FaRegEye } from 'react-icons/fa'
import { TiTick } from 'react-icons/ti'
import { ModalProps } from '../Modal'
import { MdOutlineCancel } from "react-icons/md";
import { showToast } from '@/utils'

interface Props {
    rowNumber: number
    commentsUpdater: () => void
}

const Comment = ({ creator, accepted, _id, body, rate, productID, createdAt, rowNumber, commentsUpdater }: commentProps & Props) => {

    const dispatch = useAppDispatch()

    const showCommentMessage = () => {

        dispatch(modalDataUpdater({
            isShown: true,
            message: body,
            cancelBtnText: false,
            status: true,
            title: 'نظر کاربر',
        } as ModalProps))
    }

    const changeCommentStatus = async () => {

        const res = await fetch('/api/comment/accept', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ commentID: _id, shouldAccept: accepted == 1 ? -1 : 1 })
        })

        const data = await res.json()

        showToast(res.ok, data.message)

        if (res.ok) commentsUpdater()
    }

    const showCommentProduct = () => {

        dispatch(modalDataUpdater({
            isShown: true,
            message: productID.name,
            cancelBtnText: false,
            status: true,
            title: 'محصول تارگت',
        } as ModalProps))
    }

    return (
        <tr className='ch:border-2 ch:border-white ch:ch:text-[11px] font-peyda ch:md:text-[15px] ch:py-2'>

            <td>{rowNumber + 1}</td>

            <td>{creator.nameLastName || creator.username}</td>

            <td>{creator.email}</td>

            <td>{rate}</td>

            <td onClick={showCommentProduct} className='text-panel-darkBlue cursor-pointer'>...</td>

            <td className=''>{new Date(createdAt!).toLocaleDateString()}</td>

            <td
                onClick={showCommentMessage}
                className='bg-black/10 cursor-pointer'
            >
                <div className='flex-center ch:size-5 md:ch:size-6'><FaRegEye /></div>
            </td>

            <td
                onClick={changeCommentStatus}
                className={`cursor-pointer`}
            >
                <div className={`flex-center ${accepted !== 1 ? 'text-panel-darkGreen' : 'text-panel-darkRed'}  ch:size-7`}>
                    {
                        accepted == 1
                            ?
                            <div className='flex-center text-[16px]'>رد</div>
                            :
                            <div className='flex-center text-[16px]'>تایید</div>
                    }
                </div>
            </td>

        </tr>
    )
}

export default Comment