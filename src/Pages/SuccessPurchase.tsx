import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Progress from "../components/Progress"

const SuccessPurchase = () => {

    const navigate = useNavigate()

    return (
        <section className="bg-primary-black">
            <Header />

            <span className='pt-[180px] block'></span>

            <div className="container h-[500px] ">

                <Progress />

                <div className="p-3 text-center w-3/4 m-auto text-title-text font-peyda text-[30px] bg-green rounded-md">سفارش شما با موفقیت ثبت شد</div>

                <div className="flex items-center gap-3 w-3/4 m-auto mt-3">
                    <Button fn={() => navigate('/profile', { replace: true })} text="مشاهده اطلاعات سفارش ها" filled />
                    <Button fn={() => navigate('/', { replace: true })} text="خانه" />
                </div>

            </div>

            <Footer />
        </section>
    )
}

export default SuccessPurchase