import { useAppDispatch } from "@/Hooks/useRedux";
import { modalDataUpdater } from "@/Redux/Features/globalVarsSlice";
import { productDataTypes } from "@/global.t";
import Image from "next/image";
import { ModalProps } from "../Modal";
import { showToast } from "@/utils";

const Product = ({ data, productUpdater, productEditor }: { data: productDataTypes } & { productUpdater: () => void, productEditor: (data: productDataTypes) => void }) => {

    const dispatch = useAppDispatch()

    const deleteProduct = () => {
        dispatch(modalDataUpdater({
            isShown: true,
            message: 'آیا از حذف این محصول اطمینان دارید؟',
            status: false,
            title: 'حذف محصول',

            fn: async () => {
                try {
                    const res = await fetch('/api/products/delete', {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ _id: data._id })
                    })
                    const fetchData = await res.json()

                    showToast(res.ok, fetchData.message)
                    if (res.ok) productUpdater()

                } catch (error) { console.log(error) }
            }

        } as ModalProps))
    }

    return (
        <div data-aos={`fade-in`} data-aos-duration="550" className={` transition-all duration-300 w-full relative m-auto bg-white shadow-sm rounded-xl p-3 overflow-hidden text-panel-darkTitle text-sm`}>

            {data.discount && <div className=" flex-center absolute bg-[#EE273A] size-9 text-white pt-1 text-sm discount-border">{data.discount}٪</div>}

            <div className="size-[90%] m-auto aspect-square">

                <div className="size-full bg-center bg-white m-auto ch:m-auto flex-center">
                    <Image
                        className="object-cover bg-transparent bg-center"
                        src={
                            data.image?.length
                                ?
                                data.image[0]
                                :
                                `/images/imageNotFound.webp`
                        }
                        width={500}
                        height={500}
                        priority
                        alt="product-name"
                        blurDataURL="true"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3 justify-center whitespace-pre text-title-text text-sm">
                {data.discount && <div className="red-line-through text-panel-darkTitle ">{data.price.toLocaleString('fa-IR')}</div>}
                <div className="text-panel-darkBlue">{Number(data.price - (data.price * (data.discount / 100))).toLocaleString('fa-IR')} <span className="text-[10px] text-panel-darkTitle">تومان</span></div>
            </div>

            <div className="text-center px-3 transition-all min-h-[50px] h-full line-clamp-2 text-panel-darkTitle break-all leading-[25px] my-4 ">{data.name}</div>

            <div className="flex items-center gap-3 ch:flex-1 ch:w-full mt-4 text-description-text ch:cursor-pointer font-peyda">
                <button onClick={() => productEditor(data)} className="flex items-center gap-1 justify-center p-3 text-center rounded-md border bg-panel-lightBlue text-panel-darkBlue border-panel-darkBlue">ادیت</button>
                <button onClick={deleteProduct} className="flex items-center gap-1 justify-center p-3 text-center rounded-md border bg-panel-lightRed text-panel-darkRed border-panel-darkRed">حذف</button>
            </div>

        </div>
    )
}

export default Product;