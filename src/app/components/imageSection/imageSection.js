import Image from "next/image"
import Link from "next/link"

const ImageSection = () => {

    return (
        // min-h-[400px] max-h-[85vh]
        <div className="h-[clamp(40vh,55vw,85vh)]  flex px-25 py-7.5 max-xl:px-4 max-lg:flex-col max-lg:h-[auto] ">
            <div className="w-[50%] mr-7.5 group flex relative bg-[#000] overflow-hidden max-lg:w-[100%]">
                <Image className="w-[100%] h-[100%] transition duration-500 group-hover:opacity-60 group-hover:scale-[1.1] "
                    src={'/images/girly2.jpg'}
                    height={1920}
                    width={1080}
                    priority={true}
                    alt={"Images"}
                />
                <div className="max-lg:h-[100%]  bg-[re]  absolute    flex justify-center items-center h-[100%] w-[100%] overflow-hidden">

                    <h1 className="max-lg:text-[clamp(2vh,60vw,45vh)]  text-[clamp(20vh,25vw,45vh)] font-extrabold text-[#B06708] opacity-80 transform transition-all duration-750 ease-in-out will-change-transform group-hover:scale-75 group-hover:-translate-y-[-25%] group-hover:opacity-80">
                        18
                    </h1>
                    <h2 className="max-lg:text-6xl max-sm:text-[40px] max-xl:text-4xl font-medium absolute text-5xl text-white   transform transition-all duration-750 ease-in-out group-hover:translate-y-[380%]">
                        New Arrivals
                    </h2>
                </div>
                {/* <div className="max-lg:h-[110%] max-lg:w-[100%] top-0 [@media(max-width:1100px)]:top-[-100]  max-xl:top-[-100] absolute  max-xl:top-[-20]  flex justify-center items-center min-h-[82vh] w-[95%] overflow-hidden">
                    <h1 className="max-lg:text-[clamp(2vh,60vw,45vh)] text-[clamp(22vh,25vw,45vh)] font-extrabold text-[#B06708] opacity-80 transform transition-all duration-750 ease-in-out will-change-transform group-hover:scale-75 group-hover:-translate-y-[-25%] group-hover:opacity-80">
                        18
                    </h1>

                    <h2 className="max-lg:text-6xl max-lg:top-[55%] [@media(max-width:600px)]:right-[15%] [@media(max-width:500px)]:!right-[5%]  max-xl:text-4xl font-medium absolute text-5xl text-white top-1/2 right-[25%] transform -translate-y-1/2 transition-all duration-750 ease-in-out group-hover:translate-y-[380%]">
                        New Arrivals
                    </h2>
                </div> */}
            </div>
            <div className="w-[50%] flex flex-col max-lg:w-[100%] max-lg:mt-7.5 max-lg:h-[90vh] max-md:h-auto">
                <div className="h-[45%] flex max-md:flex-col ">
                    <div className="w-[48%] group relative mr-7.5 bg-[#000] overflow-hidden max-md:w-[100%] max-md:h-[clamp(40vh,95vw,85vh)]">
                        <Image
                            className="w-[100%] h-[100%] transition duration-500 group-hover:opacity-60 group-hover:scale-[1.1]"
                            src={'/images/be.jpg'}
                            height={1920}
                            width={1080}
                            priority={true}
                            alt={"Images"}
                        />
                        <div className="z-10 pl-7.5 py-5 absolute w-[100%] flex flex-col transition duration-750 items-start justify-end bottom-[-80] min-h-[50vh] group-hover:translate-y-[-20%]">
                            <h3 className="text-2xl">COLLECTION</h3>
                            <h2 className="text-4xl font-bold">WOMEN</h2>
                            <Link href={"/shop"}>
                                <button className="cursor-pointer py-2 px-5 mt-10 text-sm border-[2px]  max-sm:px-3.5 max-sm:py-1.5 transition duration-500 hover:bg-[#000] hover:text-[#fff]">SHOP NOW</button>
                            </Link>
                        </div>
                    </div>
                    <div className="w-[47.5%] group relative bg-[#000] overflow-hidden max-lg:w-[49%] max-md:w-[100%] max-md:mt-7.5 max-md:h-[clamp(40vh,95vw,85vh)]">
                        <Image
                            className="w-[100%] h-[100%] transition duration-500 group-hover:opacity-60 group-hover:scale-[1.1]"
                            src={'/images/green.jpg'}
                            height={1920}
                            width={1080}
                            priority={true}
                            alt={"Images"}
                        />
                        <div className="z-10 pl-7.5 py-5 absolute w-[100%] flex flex-col w-[10px] transition duration-750 items-start justify-end bottom-[-80] min-h-[50vh] group-hover:translate-y-[-20%]">
                            <h3 className="text-2xl">COLLECTION</h3>
                            <h2 className="text-4xl font-bold">MEN</h2>
                            <Link href={"/shop"}>
                                <button className="cursor-pointer py-2 px-5 mt-10 text-sm border-[2px]  max-sm:px-3.5 max-sm:py-1.5 transition duration-500 hover:bg-[#000] hover:text-[#fff]">SHOP NOW</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="h-[50%] mt-7.5 group relative bg-[#000] overflow-hidden max-lg:w-[100%] max-md:h-[clamp(20vh,50vw,85vh)]">
                    <Image className="w-[100%] h-[100%] transition duration-500 group-hover:opacity-60 group-hover:scale-[1.1]"
                        src={'/images/girly2.jpg'}
                        height={1920}
                        width={1080}
                        priority={true}
                        alt={"Images"}
                    />
                    <div className=" left-0 bottom-0 z-10 pl-7.5 pb-5 absolute w-[100%] transition  duration-750  
                    group-hover:translate-y-[-55%] ">
                        <h3 className="text-4xl font-bold">SALE</h3>
                        <h2 className="text-2xl ">Up to 40% OFF</h2>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ImageSection