import { useEffect, useState } from "react"
import { CiEdit } from "react-icons/ci";
import Button from "./Button";
import { inputValidations } from "@/utils";

interface inputProps {
    title: string
    inputValue: string
    name: string
    readOnly?: boolean
    editAble?: boolean
    dataEditorCloser: () => void
    fn: (name: string, value: string) => unknown
    editToggle: () => void
}

export const UserDataUpdater = ({ name, fn, readOnly, title, inputValue, editAble = true, editToggle, dataEditorCloser }: inputProps) => {

    const [value, setValue] = useState(inputValue)

    useEffect(() => { fn(name, value) }, [value])

    const validateValue = () => {
        const dada = inputValidations(name, value)
        console.log(dada)
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
                                onChange={e => setValue(e.target.value)}
                            />
                            <div data-aos-duration="550" data-aos="fade-right" className="flex-1 flex items-center gap-1 ch:flex-1 w-full">
                                <Button fn={() => { dataEditorCloser(), setValue(inputValue) }} text="لغو" size="sm" />
                                <Button fn={validateValue} text="تایید" filled size="sm" />
                            </div>
                        </div>
                    </div>
            }

        </>
    )
}

export default UserDataUpdater;