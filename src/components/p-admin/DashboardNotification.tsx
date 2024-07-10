import { useAppDispatch } from "@/Hooks/useRedux"
import { modalDataUpdater, userUpdater } from "@/Redux/Features/globalVarsSlice"
import { showToast } from "@/utils"
import { ModalProps } from "../Modal"
import { MdDeleteOutline } from "react-icons/md"
import { dashboardNotification } from "@/global.t"

const DashboardNotification = ({ _id, createdAt, creator, isSeen, message }: dashboardNotification) => {

    const dispatch = useAppDispatch()

    const deleteNotification = () => {

        dispatch(modalDataUpdater({
            isShown: true,
            message: 'آیا از حذف پیام اطمینان دارید؟',
            status: false,
            title: 'حذف پیام',

            fn: async () => {
                try {
                    const res = await fetch('/api/dashboardNotifications/delete', {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ _id })
                    })
                    const data = await res.json()

                    showToast(res.ok, data.message)
                    if (res.ok) dispatch(userUpdater())

                } catch (error) { console.log(error) }
            }

        } as ModalProps))

    }

    const seenNotification = async () => {

        try {
            const res = await fetch('/api/dashboardNotifications/seen', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ _id })
            })

            if (res.ok) return dispatch(userUpdater())
            throw new Error()

        } catch (error) { showToast(false, 'خطای اینترنت') }

    }

    return (
        <div className={`${isSeen ? 'opacity-50' : 'opacity-100'}  flex transition-all flex-col gap-1 ch:last:border-none relative ch:pt-1`}>

            <div className='flex items-center justify-between'>
                <div onClick={seenNotification} className='flex items-center font-peyda text-black'>

                    <p>{creator.nameLastName || creator.username}</p>

                    <div className='w-2 h-px rounded-full px-3 bg-panel-caption rotate-90'></div>

                    <div className='flex items-center gap-2'>
                        <p>{new Date(createdAt).toLocaleDateString('fa-IR')}</p>
                        {!isSeen ? <div className='size-2 rounded-full bg-panel-darkGreen mb-4 animate-pulse'></div> : null}
                    </div>

                </div>
                <MdDeleteOutline onClick={deleteNotification} className='text-panel-darkRed transition-all hover:scale-125 size-6 cursor-pointer' />
            </div>

            <p onClick={seenNotification} className='text-[13px] border-b border-panel-caption pb-3 text-panel-darkTitle'>{message}</p>
        </div>
    )
}

export default DashboardNotification