import Image from "next/image";
import { FaUserLarge } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineFileUpload } from "react-icons/md";
import { ChangeEvent, useState } from "react";
import { handleDeleteFile, imageUploader, showToast } from "@/utils";
import { useAppDispatch } from "@/Hooks/useRedux";
import { modalDataUpdater, userUpdater } from "@/Redux/Features/globalVarsSlice";
import { ModalProps } from "./Modal";

const ProfileData = ({ userProfile, _id }: { userProfile: string | undefined, _id: string }) => {

    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useAppDispatch()

    const deleteProfile = async () => {

        if (isLoading) return

        dispatch(modalDataUpdater({
            isShown: true,
            message: 'آیا از حذف عکس اطمینان دارید؟',
            status: false,
            title: 'حذف عکس',

            fn: async () => {
                try {
                    setIsLoading(true)

                    await handleDeleteFile(userProfile!)

                    const res = await fetch('/api/users/update', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(
                            {
                                _id,
                                prop: 'profile',
                                value: null
                            })
                    })

                    const data = await res.json()
                    showToast(res.ok, data.message)

                    if (res.ok) dispatch(userUpdater())

                } catch (error) { console.log(error) }
                finally { setIsLoading(false) }
            }

        } as ModalProps))
    }

    const addProfile = (e: ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files![0]
        if (isLoading || !file) return

        dispatch(modalDataUpdater({
            isShown: true,
            message: 'آیا از آپلود عکس اطمینان دارید؟',
            status: true,
            title: 'آپلود عکس',

            fn: async () => {
                try {
                    setIsLoading(true)

                    const newProfile = await imageUploader(file!)
                    if (!newProfile) return showToast(false, 'خطا در اپلود تصویر')

                    const res = await fetch('/api/users/update', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(
                            {
                                _id,
                                prop: 'profile',
                                value: newProfile
                            })
                    })

                    const data = await res.json()
                    showToast(res.ok, data.message)

                    if (res.ok) {
                        dispatch(userUpdater())
                    }

                } catch (error) {
                    console.log(error)
                }
                finally {
                    setIsLoading(false)
                    e.target.value = ''
                }
            },

            onCancel: () => { e.target.value = '' }

        } as ModalProps))
    }

    return (
        <div className="absolute left-4 top-3 rounded-full border-2 border-gray-600/15 size-[65px] bg-primary-black flex-center text-title-text">
            <div className="relative size-full flex-center">
                {
                    userProfile
                        ?
                        <Image
                            className="size-full rounded-full object-cover"
                            src={userProfile}
                            alt="user profile"
                            width={200}
                            height={200}
                            quality={90}
                        />
                        :
                        <FaUserLarge className="size-2/4" />
                }

                <span
                    onClick={() => userProfile && deleteProfile()}
                    className="absolute size-[23px] flex-center m-auto rounded-full cursor-pointer -bottom-1 right-0 bg-dark-red ch:text-white ch:size-full ch:rounded-full ch:p-[3px]"
                >
                    {
                        userProfile
                            ?
                            <RiDeleteBin6Line className="text-dark-red" />
                            :
                            <>
                                <input
                                    id="profileUpload"
                                    onChange={addProfile}
                                    className="hidden"
                                    type="file"
                                    accept="image/*"
                                />
                                <label className="size-full cursor-pointer flex-center" htmlFor="profileUpload">
                                    <MdOutlineFileUpload className="text-white size-20" />
                                </label>
                            </>
                    }
                </span>

            </div>
        </div>
    )
}

export default ProfileData