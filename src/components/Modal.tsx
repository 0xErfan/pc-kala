import { useAppDispatch, useAppSelector } from "@/Hooks/useRedux"
import { modalDataReset, modalDataUpdater } from "@/Redux/Features/globalVarsSlice"

interface ModalProps {
    status: boolean
    title: string
    message: string
    isShown: boolean
    fn: () => void
    okBtnText?: string
    cancelBtnText?: string
}

const Modal = () => {

    const modalData: ModalProps = useAppSelector(state => state.globalVarsSlice.modalData)
    const dispatch = useAppDispatch()
    const { status, isShown, title, message, fn, okBtnText = 'تایید', cancelBtnText = 'لغو' } = modalData

    return (
        <section className={`fixed z-[10000000] duration-300 transition-all ${isShown ? 'opacity-100 visible' : 'opacity-0 invisible'} w-full h-full flex-center inset-0 m-auto bg-transparent`}>

            <div className="max-w-[512px] w-full text-center rounded-md p-4 flex flex-col items-center justify-center space-y-3 bg-white shadow-md">

                <div className={`w-12 rounded-full p-2 flex-center ${status ? 'bg-[#bbf7d0]' : 'bg-red-200'} `}>
                    {
                        status
                            ?

                            <svg
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                                className="text-[#16a34a]"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                            </svg>
                            :
                            <svg
                                className="text-red-600"
                                fill="none"
                                viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z">

                                </path>
                            </svg>
                    }
                </div>

                <div className="text-[#111827]">{title}</div>

                <div className="text-[#6b7280] leading-6 ">{message}</div>

                <div className="flex items-center justify-center ch:w-full w-full ch:cursor-pointer ch:text-center gap-1 ch:flex-1 ch:shrink font-peyda">
                    <button onClick={fn} className="rounded-md py-2 bg-white-red text-white">{okBtnText}</button>
                    <button onClick={() => dispatch(modalDataReset())} className="rounded-md py-2 ">{cancelBtnText}</button>
                </div>

            </div>
        </section>
    )
}

export default Modal;