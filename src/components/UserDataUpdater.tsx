import { useEffect, useState } from "react"
import { CiEdit } from "react-icons/ci";
import Button from "./Button";
import { convertNumbers2English, inputValidations, showToast } from "@/utils";
import { useAppDispatch, useAppSelector } from "@/Hooks/useRedux";
import Loader from "./Loader";
import { userRelatedDataUpdater } from "@/Redux/Features/globalVarsSlice";

interface inputProps {
    title: string
    inputValue: string
    name: string
    readOnly?: boolean
    editAble?: boolean
    dataEditorCloser: () => void
    editToggle: () => void
}

export const UserDataUpdater = ({ name, readOnly, title, inputValue, editAble = true, editToggle, dataEditorCloser }: inputProps) => {

    const [value, setValue] = useState(inputValue)
    const [loading, setLoading] = useState(false)
    const { _id } = useAppSelector(state => state.userSlice.data) || ''
    const dispatch = useAppDispatch()

    const validateValueAndUpdate = async () => {

        const data = inputValidations(name, value)

        if (!data?.isValid) { showToast(false, data.errorMessage); return }
        if (value == inputValue) return

        setLoading(true)

        try {

            const res = await fetch('/api/users/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prop: name, value, _id })
            })

            const { message } = await res.json()

            showToast(res.ok, message);
            if (!res.ok) return

            setValue(value)
            dispatch(userRelatedDataUpdater())
            dataEditorCloser()

        } catch (err) { showToast(false, 'خطا - از اتصال به اینترنت اطمینان منید') }
        finally { setLoading(false) }
    }

    return (
        <>
            {
                readOnly
                    ?
                    <div className="flex items-center justify-between px-2">
                        <div className="flex flex-col gap-2 text-[12px] text-description-text p-3">
                            <label className="text-[13px]">{title}</label>
                            <div className={`text-[14px] text-white py-1`}>{value}</div>
                        </div>
                        {editAble && <CiEdit onClick={editToggle} className="size-7 cursor-pointer" />}
                    </div>
                    :
                    <div className="flex flex-col gap-2 text-[12px] text-description-text px-3 overflow-hidden pb-4">
                        <label className="text-[13px]">{title}</label>
                        <div className="flex items-center justify-between gap-3">
                            <input
                                data-aos-duration="550" data-aos="fade-left"
                                className={`appearance bg-primary-black flex-[3] outline-none rounded-md p-3 text-white`}
                                type="input"
                                value={value}
                                name={name}
                                onChange={e => setValue(convertNumbers2English(e.target.value))}
                                onKeyDown={e => e.key == 'Enter' && validateValueAndUpdate()}
                            />
                            <div data-aos-duration="550" data-aos="fade-right" className="flex-1 flex items-center gap-1 ch:flex-1 w-full">
                                <Button fn={() => { dataEditorCloser(), setValue(inputValue) }} text="لغو" size="sm" />
                                <Button text={loading ? '' : 'تایید'} fn={validateValueAndUpdate} Icon={loading ? <Loader size="sm" /> : <></>} filled size="sm" />
                            </div>
                        </div>
                    </div>
            }

        </>
    )
}

export default UserDataUpdater;