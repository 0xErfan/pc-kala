import { useAppDispatch, useAppSelector } from '@/Hooks/useRedux'
import { modalDataUpdater } from '@/Redux/Features/globalVarsSlice'
import { userDataTypes } from '@/global.t'
import { showToast } from '@/utils'
import { MdDeleteOutline } from 'react-icons/md'
import { ModalProps } from '../Modal'

interface Props {
    rowNumber: number
    usersUpdater: () => void
}

const User = ({ nameLastName, email, role, username, isBan, rowNumber, _id, usersUpdater }: userDataTypes & Props) => {

    const dispatch = useAppDispatch()
    const userData = useAppSelector(state => state.userSlice.data)

    const banUser = () => {

        if (userData._id == _id) return
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

        if (userData._id == _id) return
        if (role == 'ADMIN') return showToast(false, 'امکان حذف حساب ادمین وجود نداره')

        dispatch(modalDataUpdater({
            isShown: true,
            message: `آیا از حذف حساب این کاربر اطمینان دارید؟ اطلاعات شخص مورد نظر قابل بازگشت نخواهد بود`,
            status: false,
            title: 'حذف حساب کاربری',

            fn: async () => {

                try {

                    const res = await fetch('/api/users/delete', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ _id })
                    })

                    const data = await res.json()
                    showToast(res.ok, data.message)

                    res.ok && usersUpdater()

                } catch (error) { console.log(error) }
            }
        } as ModalProps))
    }

    const changeUserRole = async (roleValue: typeof role) => {

        if (userData._id == _id) return

        dispatch(modalDataUpdater({
            isShown: true,
            message: `آیا از تغییر نقش به ${roleValue == 'ADMIN' ? 'ادمین' : 'کاربر'} اطمینان دارید؟`,
            status: false,
            title: 'تغییر نقش',

            fn: async () => {

                try {

                    const res = await fetch('/api/users/roleChange', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ _id })
                    })

                    const data = await res.json()
                    showToast(res.ok, data.message)

                } catch (error) { console.log(error) }
                finally { usersUpdater() }
            },

        } as ModalProps))

    }

    return (
        <tr data-aos='zoom-in' className='ch:border-2 ch:border-white ch:ch:text-[11px] ch:md:text-[15px] ch:py-2'>

            <td>{rowNumber + 1}</td>

            <td>{nameLastName || username || 'یافت نشد'} <span className='font-peyda text-2xl text-panel-darkGreen'>{userData._id == _id && '(شما)'}</span></td>

            <td>{email}</td>

            <td className='w-[120px] m-auto'>

                <div className="grid grid-cols-1 pl-4">
                    <select
                        onChange={e => changeUserRole(e.target.value as typeof role)}
                        value={role == 'ADMIN' ? 'ADMIN' : 'USER'}
                        className={`w-full h-full ch:p-2 ${role == 'ADMIN' && 'text-panel-darkGreen ch:text-panel-darkTitle'} text-center font-peyda text-[18px] bg-panel-white`}
                    >
                        <option value='USER'>کاربر</option>
                        <option value="ADMIN">ادمین</option>
                    </select>
                </div>

            </td>

            <td onClick={banUser} className={`w-20 text-xl font-bold ${userData._id == _id ? 'cursor-not-allowed' : 'cursor-pointer'}`}><div className={`flex-center border-none md:border ${isBan ? 'text-panel-darkGreen' : 'text-panel-darkRed'}`}>{isBan ? 'حذف بن' : 'بن'}</div></td>
            <td onClick={deleteUser} className={`w-14 ${userData._id == _id ? 'cursor-not-allowed' : 'cursor-pointer'}`}><div className='flex-center border-none md:border text-panel-darkRed ch:size-6 md:ch:size-7'><MdDeleteOutline /></div></td>
        </tr>
    )
}

export default User