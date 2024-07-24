import { MdDeleteOutline } from "react-icons/md"
import { ProductSpecs } from "./ProductTemplate"
import { ChangeEvent, useEffect, useRef } from "react"

interface Props {
    deleteProductSpec: (id: number) => void
    updateProductSpec: (key: string, value: string, id: number) => void
}

const ProductSpec = ({ specKey, value, id, canDelete, updateProductSpec, deleteProductSpec }: ProductSpecs & Props) => {

    return (

        <div data-aos='zoom-in' className="flex ch:bg-panel-white items-center relative justify-center gap-2 rounded-xl">
            <input
                onChange={e => updateProductSpec('specKey', e.target.value, id)}
                value={specKey}
                className="bg-panel-white flex-[5] rounded-xl p-2" placeholder="صفحه نمایش"
                type="text"
            />

            <div className="flex-1 bg-panel-white text-center text-xl rounded-xl p-2"> = </div>

            {
                id !== 1 && canDelete
                    ?
                    <span onClick={() => deleteProductSpec(id)} data-aos='zoom-out' className='absolute cursor-pointer left-2 ch:size-6 transition-all bg-panel-lightRed text-panel-darkRed'><MdDeleteOutline /></span>
                    :
                    null
            }

            <input
                onChange={e => updateProductSpec('value', e.target.value, id)}
                value={value}
                className="bg-panel-white flex-[5] rounded-xl p-2" placeholder="12 اینچ 1440p"
                type="text"
            />

        </div>
    )
}

export default ProductSpec;