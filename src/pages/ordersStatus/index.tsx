import Footer from "@/components/Footer"
import Header from "@/components/Header"

const index = () => {
    return (
        <section className={"bg-primary primary-bg"}>

            <Header />

            <span className='md:pt-[160px] pt-[130px] block'></span>

            <div className="container border border-dark-gold rounded-md p-4 bg-secondary-black h-[600px] mb-12">
                <div>hi just a container</div>
            </div>

            <Footer />
        </section>
    )
}

export default index