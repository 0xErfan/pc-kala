import { useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Input } from "../components/Input"

const Checkout = () => {

    const [formData, setFormData] = useState({});

    const inputUpdater = (name: string, value: unknown) => setFormData(prev => ({ ...prev, [name]: value }));

    console.log(formData);


    return (
        <>
            <section className="bg-primary-black">

                <Header />

                <span className='md:pt-[160px] pt-[130px] block'></span>

                <div className="container">

                    <div className="flex items-center gap-4">
                        <div className="flex-1 grid grid-cols-2 gap-3 ch:mb-4">

                            <Input fn={(name, value) => inputUpdater(name, value)} name="name" title="نام" />
                            <Input fn={(name, value) => inputUpdater(name, value)} name="lName" title="نام خانوادگی" />
                            <Input fn={(name, value) => inputUpdater(name, value)} name="ostan" title="استان" />
                            <Input fn={(name, value) => inputUpdater(name, value)} name="city" title="شهر" />
                            <Input fn={(name, value) => inputUpdater(name, value)} name="codePost" title="کد پستی"  type="number"/>
                            <Input fn={(name, value) => inputUpdater(name, value)} name="phoneNum" title="شماره موبایل" type="number" />
                            <Input fn={(name, value) => inputUpdater(name, value)} name="email" title="پست الکترونیک (اختیاری)" required={false} type="email" />
                        </div>
                        <div className="flex-1"></div>
                    </div>
                </div>

                <div className="h-[400px]"></div>
            </section>

            <Footer />
        </>
    )
}

export default Checkout