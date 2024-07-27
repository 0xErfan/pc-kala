import { useAppDispatch, useAppSelector } from '@/Hooks/useRedux'
import { modalDataUpdater, setActiveStatusBox } from '@/Redux/Features/globalVarsSlice'
import { userDataTypes } from '@/global.t'
import { showToast } from '@/utils'
import { MdDeleteOutline, MdKeyboardArrowDown } from 'react-icons/md'
import { ModalProps } from '../Modal'

interface Props {
    rowNumber: number
    usersUpdater: () => void
}

const User = ({ nameLastName, email, role, username, isBan, rowNumber, _id, usersUpdater }: userDataTypes & Props) => {

    const dispatch = useAppDispatch()
    const userData = useAppSelector(state => state.userSlice.data)

    const activeStatusBoxUpdater = () => { dispatch(setActiveStatusBox(_id)) }
    const activeStatusBox = useAppSelector(state => state.globalVarsSlice.activeStatusBox)

    const banUser = () => {

        if (userData?._id == _id) return
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

        if (userData?._id == _id) return
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

    const changeUserRole = async () => {

        if (userData?._id == _id) return

        dispatch(modalDataUpdater({
            isShown: true,
            message: `آیا از تغییر نقش به ${role == 'USER' ? 'ادمین' : 'کاربر'} اطمینان دارید؟`,
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

                    res.ok && dispatch(setActiveStatusBox(0))

                } catch (error) { console.log(error) }
                finally { usersUpdater() }
            },

        } as ModalProps))

    }

    return (
        <tr data-aos='zoom-in' className='ch:border-2 ch:border-white ch:ch:text-[11px] ch:md:text-[15px] ch:py-2 shrink-0'>

            <td>{rowNumber + 1}</td>

            <td>{nameLastName || username || 'یافت نشد'} <span className='font-peyda text-2xl text-panel-darkGreen'>{userData?._id == _id && '(شما)'}</span></td>

            <td>{email}</td>


            <td className='w-20 relative'>

                <div className={`flex-center w-full px-2 `}>

                    <button
                        onClick={activeStatusBoxUpdater}
                        className={`text-black rounded-lg flex ${role == 'ADMIN' ? 'bg-panel-darkGreen text-white' : 'bg-white'} justify-between  p-2.5 text-center items-center whitespace-nowrap text-[12px] w-full`}
                        name='update activeStatusBox'
                    > {role == 'ADMIN' ? 'ادمین' : 'کاربر'}
                        <MdKeyboardArrowDown className={`size-[18px] ${activeStatusBox == (_id as any) && 'rotate-180'} transition-all`} />
                    </button>

                </div>

                <div className={`${activeStatusBox == (_id as any) ? 'visible opacity-100 -right-24' : 'invisible opacity-0 -right-0'} z-[999] absolute transition-all top-4 rounded-lg font-peyda bg-black`}>
                    <div className="flex-center m-auto ch:cursor-pointer p-3 rounded-md text-panel-darkTitle shadow-md border-2 border-black/70 bg-panel-white ch:p-2 flex-col gap-2 text-sm">
                        <div onClick={changeUserRole}>{role == 'ADMIN' ? 'کاربر' : 'ادمین'}</div>
                    </div>
                </div>

            </td>

            <td onClick={banUser} className={`w-20 text-xl font-bold ${userData?._id == _id ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                <div className={`flex-center border-none md:border ${isBan ? 'text-panel-darkGreen' : 'text-panel-darkRed'}`}>{isBan ? 'حذف بن' : 'بن'}</div>
            </td>
            <td onClick={deleteUser} className={`w-14 ${userData?._id == _id ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                <div className='flex-center border-none md:border text-panel-darkRed ch:size-6'><MdDeleteOutline /></div>
            </td>
        </tr>
    )
}

export default User