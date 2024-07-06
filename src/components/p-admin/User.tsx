import { useAppDispatch } from '@/Hooks/useRedux'
import { modalDataUpdater } from '@/Redux/Features/globalVarsSlice'
import { userDataTypes } from '@/global.t'
import { showToast } from '@/utils'
import React from 'react'
import { MdDeleteOutline } from 'react-icons/md'
import { ModalProps } from '../Modal'

interface Props {
    rowNumber: number
    usersUpdater: () => void
}

const User = ({ nameLastName, email, role, isBan, rowNumber, _id, usersUpdater }: userDataTypes & Props) => {

    const dispatch = useAppDispatch()

    const banUser = () => {

        if (role == 'ADMIN') return showToast(false, 'امکان بن ادمین وجود نداره')

        dispatch(modalDataUpdater({
            isShown: true,
            message: `آیا از ${isBan ? 'حذف بن' : 'بن'} کاربر اطمینان دارید؟`,
            status: false,
            title: isBan ? 'حذف بن' : 'بن',

            fn: async () => {

                try {

                    const res = await fetch('/api/users/ban', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ _id, isBanned: isBan })
                    })

                    const data = await res.json()
                    showToast(res.ok, data.message)

                    res.ok && usersUpdater()

                } catch (error) { console.log(error) }
            }
        } as ModalProps))
    }

    const deleteUser = async () => {
        //...
        usersUpdater()
    }

    const changeUserRole = async () => {
        //...
        usersUpdater()
    }

    return (
        <tr data-aos='zoom-in' className='ch:border-2 ch:border-white ch:ch:text-[11px] ch:md:text-[15px] ch:py-2'>

            <td>{rowNumber + 1}</td>

            <td>{nameLastName}</td>

            <td>{email}</td>

            <td className='w-[120px] m-auto'>

                <div className="grid grid-cols-1 pl-4">
                    <select
                        onChange={changeUserRole}
                        defaultValue={role == 'ADMIN' ? 'ADMIN' : 'USER'}
                        className={`w-full h-full ch:p-2 ${role == 'ADMIN' && 'text-panel-darkGreen ch:text-panel-darkTitle'} text-center font-peyda text-[18px] bg-panel-white`}
                    >
                        <option value='USER'>کاربر</option>
                        <option value="ADMIN">ادمین</option>
                    </select>
                </div>

            </td>

            <td onClick={banUser} className='size-14 cursor-pointer'><div className={`flex-center border-none md:border ${isBan ? 'text-panel-darkGreen' : 'text-panel-darkRed' }`}>{isBan ? 'حذف بن' : 'بن'}</div></td>
            <td className='size-14 cursor-pointer'><div className='flex-center border-none md:border text-panel-darkRed cursor-pointer ch:size-6 md:ch:size-7'><MdDeleteOutline /></div></td>
        </tr>
    )
}

export default User