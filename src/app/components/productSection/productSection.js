"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation";
import Image from "next/image"
import { useRouter } from "next/navigation"
import Link from "next/link";

// icons
import { CiSearch, CiHeart } from "react-icons/ci";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

// components
import Tooltip from "../Tooltip";
import ProductInfo from "../productInfo/ProductInfo";

// Redux 
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/app/features/products/productsSlice";
import { addToCartAsync } from "@/app/features/carts/cartSlice";
import { toast } from "react-toastify";




const ProductSection = () => {

    const dispatch = useDispatch()
    const products = useSelector(state => state.products.items)
    const user = useSelector((state) => state.auth.user);



    const router = useRouter();
    const pathName = usePathname();

    const [gridCols, setGridCols] = useState(5)
    // const [productList, setProductList] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("Shirts");
    const [filteredProducts, setFilteredProducts] = useState()
    const [show, setShow] = useState(false)
    const [data, setData] = useState(false)


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;
    const total = products.length; // e.g. 32
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, total);




    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);
    // console.log(products)

    const check = (page) => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        setFilteredProducts(products.slice(start, end));
        // products.slice(start , end)
        setCurrentPage(page);
    };

    const check1 = (e, item) => {
        e.stopPropagation()
        setData(item)
        setShow(true)
        // console.log(item)
    }

    const addToCart = async (e, item) => {
        e.stopPropagation()
        try {
            if (!user) {
                toast.warn("Please log in first!")
                return
            }
            await dispatch(addToCartAsync({ _id: item._id, quantity: item.quantity }))
            toast.success("Item added to cart!");
        } catch (error) {
            if (err.response?.status === 401) {
                toast.warn("Please log in first!");
            } else {
                toast.error("Something went wrong!");
            }
        }


        // dispatch(addToCartAsync({ _id: item._id, quantity: item.quantity }))
    }

    const handleFilter = (category) => setSelectedCategory(category);
    const goToProduct = (slug) => router.push(`/product/${slug}`);



    useEffect(() => {
        if (selectedCategory === "Shirts") {
            setFilteredProducts(products.slice(0, 15));
        }
        else if (pathName === "/shop") {
            setFilteredProducts(products.filter(item => item.category === selectedCategory));
        } else {
            setFilteredProducts(products.filter(item => item.category === selectedCategory).slice(0, 5));
        }
        // console.log(filteredProducts)
    }, [products, selectedCategory]);



    // For pagination
    // const check = (page) => {
    //     const start = (page - 1) * itemsPerPage;
    //     const end = start + itemsPerPage;
    //     setFilteredProducts(productList.slice(start, end));
    //     setCurrentPage(page);
    // };



    // // API for catching all products
    // const allProducts = async () => {
    //     const apiUrl = "http://localhost:3000/api/products/all-products/"

    //     try {
    //         const res = await axios({
    //             method: "GET",
    //             url: apiUrl,
    //         })
    //         console.log(res.data.getItems)
    //         setProductList(res.data.getItems)
    //         setFilteredProducts(res.data.getItems)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // const handleFilter = (category) => {
    //     setSelectedCategory(category);
    // };



    // const goToProduct = (slug) => {
    //     router.push(`/product/${slug}`);
    // };

    // const check1 = (e, item) => {
    //     e.stopPropagation()
    //     setData(item)
    //     setShow(true)
    // }


    // useEffect(() => {
    //     allProducts()
    // }, [])
    // useEffect(() => {
    //     if (selectedCategory === "Shirts") {
    //         setFilteredProducts(productList.slice(0, 15));
    //     }
    //     else if (pathName === "/shop") {
    //         setFilteredProducts(productList.filter(item => item.category === selectedCategory));
    //     } else {
    //         setFilteredProducts(productList.filter(item => item.category === selectedCategory).slice(0, 5));
    //     }
    //     // console.log(filteredProducts)
    // }, [productList, selectedCategory]);


    return (
        <div>
            <div className="w-full flex flex-col gap-4 my-10 justify-center items-center">
                {pathName !== "/shop" ? <h1 className="font-bold text-2xl">TOP PRODUCT</h1> : null}
                <div className=" flex max-md:flex-col max-md:text-center gap-5 text-[#9f9f9f] font-bold">
                    <h2 className={`relative hover:text-[black] cursor-pointer transition duration-500  text-lg ${selectedCategory === "trend" ? "text-[black]" : null}`} onClick={() => handleFilter(("trend"))}> Trendy Items <span className={` absolute left-0 bottom-0 h-[2px] w-full bg-black origin-center transition-transform duration-300 ${selectedCategory === "trend" ? "scale-x-100" : "scale-x-0"}`} /></h2>
                    <h2 className={`relative hover:text-[black] cursor-pointer transition duration-500  text-lg ${selectedCategory === "Shirts" ? "text-[black]" : null}`} onClick={() => handleFilter(("Shirts"))}>{pathName === "/shop" ? "All Products" : "Featured Products"} <span className={` absolute left-0 bottom-0 h-[2px] w-full bg-black origin-center transition-transform duration-300 ${selectedCategory === "Shirts" ? "scale-x-100" : "scale-x-0"}`} /></h2>
                    <h2 className={`relative hover:text-[black] cursor-pointer transition duration-500  text-lg ${selectedCategory === "bestSeller" ? "text-[black]" : null} `} onClick={() => handleFilter(("bestSeller"))}>Best Seller <span className={` absolute left-0 bottom-0 h-[2px] w-full bg-black origin-center transition-transform duration-300 ${selectedCategory === "bestSeller" ? "scale-x-100" : "scale-x-0"}`} /></h2>
                </div>
            </div>
            <div className="px-20 flex justify-between">
                {pathName === "/shop" && selectedCategory === "Shirts" && (
                    <p className="text-[grey]">Showing {start}–{end} of {total}</p>
                )}
                {
                    pathName === "/shop" && (
                        <ul className="flex gap-3 cursor-pointer text-[grey] max-xl:hidden">
                            See:
                            {
                                [2, 3, 4, 5].map(item => {
                                    return (
                                        <li
                                            key={item}
                                            onClick={() => setGridCols(item)}
                                            className={`${item === gridCols ? "text-black underline underline-offset-3" : null} hover:text-black`}
                                        >
                                            {item}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    )
                }
            </div>
            <ul className={`grid gap-6 ${gridCols === 2 ? "grid-cols-2" : gridCols === 3 ? "grid-cols-3" : gridCols === 4 ? "grid-cols-4" : "grid-cols-5"}  w-full px-20 max-xl:grid-cols-3 max-lg:px-5 max-md:grid-cols-2 max-sm:grid-cols-1 `}>

                {filteredProducts ?
                    (filteredProducts.map((item, index) => {
                        return (
                            // h-[clamp(22vh,22vw,45vh)]
                            <li onClick={() => goToProduct(item.slug)} key={index} className=" w-[95%] max-xl:h-[clamp(30vh,35vw,65vh)] max-md:h-[clamp(45vh,55vw,65vh)] max-sm:w-[100%] max-sm:h-[clamp(25vh,95vw,100vh)]  cursor-pointer">
                                {/* h-[75%] */}
                                <div className="h-[75%] max-sm:h-[85%] group relative overflow-hidden" >
                                    <Image
                                        className=" h-full w-full   z-5 "

                                        src={item.images[0]}
                                        width={1920}
                                        height={1080}
                                        priority={true}
                                        alt="productImg"
                                    />

                                    <div className="flex absolute justify-center left-0  transiton duration-200 text-[#A8A9AC] max-xl:bottom-[10] items-end py-1 bottom-[-40]  h-[110%] w-full group-hover:bottom-[0]">
                                        <Tooltip text="Quick view" position="cardLeft">
                                            <button onClick={(e) => check1(e, item)} className=" max-xl:opacity-100 p-2 text-2xl cursor-pointer bg-[#303030] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-200 hover:bg-[#C71932] hover:text-[#fff]"><CiSearch /></button>
                                        </Tooltip>
                                        <button onClick={(e) => addToCart(e, item)} className="max-xl:opacity-100 mx-0.5 cursor-pointer w-[75%] py-2 bg-[#303030] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100 hover:bg-[#C71932] hover:text-[#fff]">ADD TO CART</button>
                                        <Tooltip text="Add to Wishlist" position="cardRight">
                                            <button className="max-xl:opacity-100 p-2 text-2xl cursor-pointer bg-[#303030] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-200 hover:bg-[#C71932] hover:text-[#fff]"><CiHeart /></button>
                                        </Tooltip>
                                    </div>
                                </div>
                                <div className="p-1.5 pt-5">
                                    <h1 className="text-[grey] text-sm">
                                        {item.name}
                                    </h1>
                                    <h2 className="font-medium text-lg ">$ {item.price - 1}.99</h2>
                                </div>
                            </li>
                        )
                    })) :
                    (null)
                }
            </ul>

            {pathName === "/shop" && selectedCategory === "Shirts" && (
                <div>
                    <ul className="flex gap-5  justify-center items-center my-10 text-[#9f9f9f]">
                        <li
                            onClick={() => {
                                if (currentPage > 1) check(currentPage - 1);
                            }}
                            className={`cursor-pointer ${currentPage === 1 ? "opacity-0 cursor-not-allowed" : "hover:text-black"
                                }`}
                        >
                            <FaArrowLeft />
                        </li>
                        {[1, 2, 3].map(page => (
                            <li
                                key={page}
                                onClick={() => check(page)}
                                className={`cursor-pointer hover:text-[#000] ${currentPage === page ? "text-black font-bold underline underline-offset-5" : ""}`}
                            >
                                {page}
                            </li>
                        ))}

                        <li
                            onClick={() => {
                                if (currentPage < 3) check(currentPage + 1);
                            }}
                            className={`cursor-pointer ${currentPage === 3 ? "opacity-0 cursor-not-allowed" : "hover:text-black"
                                }`}
                        >
                            <FaArrowRight />
                        </li>
                    </ul>

                </div>
            )}
            {
                pathName !== "/shop" && (
                    <div className="flex justify-center my-10">
                        <Link href={"/shop"}>
                            <button className="cursor-pointer px-7 py-2 border-2 transition duration-500 hover:bg-[#000] hover:text-[#fff] ">SHOP MORE</button>
                        </Link>
                    </div>
                )
            }
            {
                show && (
                    <ProductInfo product={data} show={show} setShow={setShow} />
                )
            }
        </div>
    )
}


export default ProductSection


// const router = useRouter();
// const pathName = usePathname();

// const [gridCols, setGridCols] = useState(5)
// // const [productList, setProductList] = useState([])
// const [selectedCategory, setSelectedCategory] = useState("Shirts");
// const [filteredProducts, setFilteredProducts] = useState()
// const [show, setShow] = useState(false)
// const [data, setData] = useState(false)


// const [currentPage, setCurrentPage] = useState(1);
// const itemsPerPage = 15;
// const total = products.length; // e.g. 32
// const start = (currentPage - 1) * itemsPerPage + 1;
// const end = Math.min(currentPage * itemsPerPage, total);


// // // For pagination
//     // const check = (page) => {
//     //     const start = (page - 1) * itemsPerPage;
//     //     const end = start + itemsPerPage;
//     //     setFilteredProducts(productList.slice(start, end));
//     //     setCurrentPage(page);
//     // };



//     // // API for catching all products
//     // const allProducts = async () => {
//     //     const apiUrl = "http://localhost:3000/api/products/all-products/"

//     //     try {
//     //         const res = await axios({
//     //             method: "GET",
//     //             url: apiUrl,
//     //         })
//     //         console.log(res.data.getItems)
//     //         setProductList(res.data.getItems)
//     //         setFilteredProducts(res.data.getItems)
//     //     } catch (error) {
//     //         console.log(error)
//     //     }
//     // }

//     // const handleFilter = (category) => {
//     //     setSelectedCategory(category);
//     // };



//     // const goToProduct = (slug) => {
//     //     router.push(`/product/${slug}`);
//     // };

//     // const check1 = (e, item) => {
//     //     e.stopPropagation()
//     //     setData(item)
//     //     setShow(true)
//     // }


//     // useEffect(() => {
//     //     allProducts()
//     // }, [])
//     // useEffect(() => {
//     //     if (selectedCategory === "Shirts") {
//     //         setFilteredProducts(productList.slice(0, 15));
//     //     }
//     //     else if (pathName === "/shop") {
//     //         setFilteredProducts(productList.filter(item => item.category === selectedCategory));
//     //     } else {
//     //         setFilteredProducts(productList.filter(item => item.category === selectedCategory).slice(0, 5));
//     //     }
//     //     // console.log(filteredProducts)
//     // }, [productList, selectedCategory]);



// return (
//         <div>
//             <div className="w-full flex flex-col gap-4 my-10 justify-center items-center">
//                 {pathName !== "/shop" ? <h1 className="font-bold text-2xl">TOP PRODUCT</h1> : null}
//                 <div className=" flex max-md:flex-col max-md:text-center gap-5 text-[#9f9f9f] font-bold">
//                     <h2 className={`relative hover:text-[black] cursor-pointer transition duration-500  text-lg ${selectedCategory === "trend" ? "text-[black]" : null}`} onClick={() => handleFilter(("trend"))}> Trendy Items <span className={` absolute left-0 bottom-0 h-[2px] w-full bg-black origin-center transition-transform duration-300 ${selectedCategory === "trend" ? "scale-x-100" : "scale-x-0"}`} /></h2>
//                     <h2 className={`relative hover:text-[black] cursor-pointer transition duration-500  text-lg ${selectedCategory === "Shirts" ? "text-[black]" : null}`} onClick={() => handleFilter(("Shirts"))}>{pathName === "/shop" ? "All Products" : "Featured Products"} <span className={` absolute left-0 bottom-0 h-[2px] w-full bg-black origin-center transition-transform duration-300 ${selectedCategory === "Shirts" ? "scale-x-100" : "scale-x-0"}`} /></h2>
//                     <h2 className={`relative hover:text-[black] cursor-pointer transition duration-500  text-lg ${selectedCategory === "bestSeller" ? "text-[black]" : null} `} onClick={() => handleFilter(("bestSeller"))}>Best Seller <span className={` absolute left-0 bottom-0 h-[2px] w-full bg-black origin-center transition-transform duration-300 ${selectedCategory === "bestSeller" ? "scale-x-100" : "scale-x-0"}`} /></h2>
//                 </div>
//             </div>
//             <div className="px-20 flex justify-between">
//                 {pathName === "/shop" && selectedCategory === "Shirts" && (
//                     <p className="text-[grey]">Showing {start}–{end} of {total}</p>
//                 )}
//                 {
//                     pathName === "/shop" && (
//                         <ul className="flex gap-3 cursor-pointer text-[grey] max-xl:hidden">
//                             See:
//                             {
//                                 [2, 3, 4, 5].map(item => {
//                                     return (
//                                         <li
//                                             key={item}
//                                             onClick={() => setGridCols(item)}
//                                             className={`${item === gridCols ? "text-black underline underline-offset-3" : null} hover:text-black`}
//                                         >
//                                             {item}
//                                         </li>
//                                     )
//                                 })
//                             }
//                         </ul>
//                     )
//                 }
//             </div>
//             <ul className={`grid gap-6 ${gridCols === 2 ? "grid-cols-2" : gridCols === 3 ? "grid-cols-3" : gridCols === 4 ? "grid-cols-4" : "grid-cols-5"}  w-full px-20 max-xl:grid-cols-3 max-lg:px-5 max-md:grid-cols-2 max-sm:grid-cols-1 `}>

//                 {filteredProducts ?
//                     (filteredProducts.map((item, index) => {
//                         return (
//                             // h-[clamp(22vh,22vw,45vh)]
//                             <li onClick={() => goToProduct(item.slug)} key={index} className=" w-[95%] max-xl:h-[clamp(30vh,35vw,65vh)] max-md:h-[clamp(45vh,55vw,65vh)] max-sm:w-[100%] max-sm:h-[clamp(25vh,95vw,100vh)]  cursor-pointer">
//                                 {/* h-[75%] */}
//                                 <div className="h-[75%] max-sm:h-[85%] group relative overflow-hidden" >
//                                     <Image
//                                         className=" h-full w-full   z-5 "

//                                         src={item.images[0]}
//                                         width={1920}
//                                         height={1080}
//                                         priority={true}
//                                         alt="productImg"
//                                     />

//                                     <div className="flex absolute justify-center left-0  transiton duration-200 text-[#A8A9AC] max-xl:bottom-[10] items-end py-1 bottom-[-40]  h-[110%] w-full group-hover:bottom-[0]">
//                                         <Tooltip text="Quick view" position="cardLeft">
//                                             <button onClick={(e) => check1(e, item)} className=" max-xl:opacity-100 p-2 text-2xl cursor-pointer bg-[#303030] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-200 hover:bg-[#C71932] hover:text-[#fff]"><CiSearch /></button>
//                                         </Tooltip>
//                                         <button className="max-xl:opacity-100 mx-0.5 cursor-pointer w-[75%] py-2 bg-[#303030] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100 hover:bg-[#C71932] hover:text-[#fff]">ADD TO CART</button>
//                                         <Tooltip text="Add to Wishlist" position="cardRight">
//                                             <button className="max-xl:opacity-100 p-2 text-2xl cursor-pointer bg-[#303030] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-200 hover:bg-[#C71932] hover:text-[#fff]"><CiHeart /></button>
//                                         </Tooltip>
//                                     </div>
//                                 </div>
//                                 <div className="p-1.5 pt-5">
//                                     <h1 className="text-[grey] text-sm">
//                                         {item.name}
//                                     </h1>
//                                     <h2 className="font-medium text-lg ">$ {item.price - 1}.99</h2>
//                                 </div>
//                             </li>
//                         )
//                     })) :
//                     (null)
//                 }
//             </ul>

//             {pathName === "/shop" && selectedCategory === "Shirts" && (
//                 <div>
//                     <ul className="flex gap-5  justify-center items-center my-10 text-[#9f9f9f]">
//                         <li
//                             onClick={() => {
//                                 if (currentPage > 1) check(currentPage - 1);
//                             }}
//                             className={`cursor-pointer ${currentPage === 1 ? "opacity-0 cursor-not-allowed" : "hover:text-black"
//                                 }`}
//                         >
//                             <FaArrowLeft />
//                         </li>
//                         {[1, 2, 3].map(page => (
//                             <li
//                                 key={page}
//                                 onClick={() => check(page)}
//                                 className={`cursor-pointer hover:text-[#000] ${currentPage === page ? "text-black font-bold underline underline-offset-5" : ""}`}
//                             >
//                                 {page}
//                             </li>
//                         ))}

//                         <li
//                             onClick={() => {
//                                 if (currentPage < 3) check(currentPage + 1);
//                             }}
//                             className={`cursor-pointer ${currentPage === 3 ? "opacity-0 cursor-not-allowed" : "hover:text-black"
//                                 }`}
//                         >
//                             <FaArrowRight />
//                         </li>
//                     </ul>

//                 </div>
//             )}
//             {
//                 pathName !== "/shop" && (
//                     <div className="flex justify-center my-10">
//                         <Link href={"/shop"}>
//                             <button className="cursor-pointer px-7 py-2 border-2 transition duration-500 hover:bg-[#000] hover:text-[#fff] ">SHOP MORE</button>
//                         </Link>
//                     </div>
//                 )
//             }
//             {
//                 show && (
//                     <ProductInfo product={data} show={show} setShow={setShow} />
//                 )
//             }
//         </div>
//     )