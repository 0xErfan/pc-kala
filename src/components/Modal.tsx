import { useAppDispatch, useAppSelector } from "@/Hooks/useRedux"
import { modalDataReset, modalDataUpdater } from "@/Redux/Features/globalVarsSlice"
import { useState } from "react"

export interface ModalProps {
    status: boolean
    title: string
    message: string
    isShown: boolean
    fn: () => unknown
    okBtnText?: string
    cancelBtnText?: string | false
}

const Modal = () => {

    const dispatch = useAppDispatch()

    const modalData: ModalProps = useAppSelector(state => state.globalVarsSlice.modalData)

    const { status, isShown, title, message, fn, okBtnText = 'تایید', cancelBtnText = 'لغو' } = modalData

    const [moveModal, setMoveModal] = useState(false)

    const notifyUserToClickButtons = () => {

        if (!cancelBtnText) return closeModal() // for one button situations we can let user close the modal by clicking outside of the modal container

        setMoveModal(true)

        setTimeout(() => {
            setMoveModal(false)
        }, 100);
    } // if user try not to click the modal buttons 🥲😂

    const closeModal = () => {

        dispatch(modalDataUpdater({ isShown: false }))

        setTimeout(() => { // if instantly reset the modal, the message and title will be empty and user will see it(bad ux i think), so we will make it disappear first
            dispatch(modalDataReset())
        }, 300);
    }

    return (

        <section
            onClick={e => {
                const target = e.target as HTMLElement
                String(target?.className ?? '').includes('modalContainer') && notifyUserToClickButtons()
            }}

            className={`fixed modalContainer duration-200 transition-all ${isShown ? 'opacity-100 visible' : 'opacity-0 invisible'} w-full z-[1000] h-full flex-center px-12 inset-0 m-auto bg-transparent select-none`}>

            <div className={`max-w-[512px] transition-all ${moveModal ? 'scale-75' : ''} w-full text-center rounded-b-xl rounded-l-xl p-4 flex flex-col z-[100] items-center justify-center space-y-5 bg-white shadow-md overflow-hidden`}>

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
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                            </svg>
                            :
                            <svg
                                className="text-red-600"
                                fill="none"
                                viewBox="0 0 24 24" strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z">

                                </path>
                            </svg>
                    }
                </div>

                <div className="text-[#111827]">{title}</div>

                <div className="text-[#6b7280] leading-6 ">{message}</div>

                <div className="flex items-center justify-center ch:w-full w-full ch:cursor-pointer ch:text-center gap-1 ch:flex-1 ch:shrink font-peyda">

                    <button
                        onClick={() => Promise.resolve().then(fn).finally(closeModal)} // after fn runes, we want to close the modal too
                        className="rounded-md py-2 bg-white-red text-white">{okBtnText}
                    </button>

                    {
                        cancelBtnText ? // sometimes we don't need cancel button buddy
                            <button
                                onClick={closeModal}
                                className="rounded-md py-2 ">{cancelBtnText}
                            </button>
                            : null
                    }

                </div>

            </div>
        </section>
    )
}

export default Modal;