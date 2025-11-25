import Image from "next/image"

const PageDefiner = ({head , para}) => {

    return (
        <div className="relative w-full h-[250px] overflow-hidden flex justify-center">
            <Image src={"/images/shop-bg.jpg"} width={883} height={1600} alt="shop-bg" className="w-full absolute bottom-10  " />
            <div className="z-1 text-center pt-10">
                <h1 className="text-5xl">{head}</h1>
                <p className="text-lg pt-5">{para}</p>
            </div>
        </div>
    )
}

export default PageDefiner