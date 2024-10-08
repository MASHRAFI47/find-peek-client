// import { useQuery } from "@tanstack/react-query"
// import useAxiosCommon from "../../hooks/useAxiosCommon"
// import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
// import { useEffect, useState } from "react";
import { useEffect, useState } from "react";
// import useProducts from "../../hooks/useProducts";
import { format } from "date-fns";
import moment from "moment/moment";
import axios from "axios";


const Products = () => {

    // eslint-disable-next-line no-unused-vars
    const [asc, setAsc] = useState(true);
    const [search, setSearch] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [category, setCategory] = useState('');


    const [myProducts, setMyProducts] = useState([]);


    //pagination state
    const [currentPage, setCurrentPage] = useState(1);
    // eslint-disable-next-line no-unused-vars
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [count, setCount] = useState(0);

    //filter
    const [filter, setFilter] = useState("");

    //brand
    const [brand, setBrand] = useState("");

    //sort
    const [sort, setSort] = useState("");

    //min
    const [min, setMin] = useState("");

    //max
    const [max, setMax] = useState("");

    // const products = useProducts(asc, search, category, currentPage, itemsPerPage);



    useEffect(() => {
        const getData = async () => {
            const { data } = await axios(`${import.meta.env.VITE_api_url}/products-data?page=${currentPage}&size=${itemsPerPage}&filter=${filter}&sort=${sort}&search=${search}&brand=${brand}&min=${min}&max=${max}`)
            setMyProducts(data);
        }
        getData()
    }, [currentPage, itemsPerPage, filter, sort, search, brand, min, max]);


    useEffect(() => {
        const getProductsCount = async () => {
            const { data } = await axios(`${import.meta.env.VITE_api_url}/products-count?filter=${filter}&search=${search}`);
            setCount(data.count)
        }
        getProductsCount()
    }, [filter, search]);


    //pagination
    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()].map(element => element + 1);


    const handlePaginationButton = (value) => {
        setCurrentPage(value);
    }

    const handleSearch = e => {
        e.preventDefault();
        const searchValue = e.target.search.value;
        setSearch(searchValue);
    }



    return (
        <div>

            <div className="w-full text-center mb-5">
                <form action="" onSubmit={handleSearch}>
                    <input type="text" placeholder="Search By Product Name" name="search" className="input input-bordered w-full max-w-xs" />
                    <input type="submit" value={"Search"} className="btn btn-primary" />
                </form>
                {/* <button className="btn btn-success mt-3" onClick={() => setAsc(!asc)}>
                    {asc ? "Sort By: High to Low" : "Price: Low to High"}
                </button> */}
            </div>

            <div className="container mx-auto mb-3">
                {/* <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-warning m-1">Brand</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li onClick={() => setSearch("")}><a>All</a></li>
                        <li onClick={() => setSearch("MSI")}><a>MSI</a></li>
                        <li onClick={() => setSearch("ASUS")}><a>ASUS</a></li>
                    </ul>
                </div>


                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-warning m-1">Category</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li onClick={() => setCategory("")}><a>All</a></li>
                        <li onClick={() => setCategory("Monitor")}><a>Monitor</a></li>
                        <li onClick={() => setCategory("Headphone")}><a>Headphone</a></li>
                        <li onClick={() => setCategory("Motherboard")}><a>Motherboard</a></li>
                        <li onClick={() => setCategory("Casing")}><a>Casing</a></li>
                    </ul>
                </div> */}

                <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mx-4 md:mx-0">
                    <select className="select select-bordered w-full max-w-xs" onChange={e => {
                        setBrand(e.target.value)
                        setCurrentPage(1);
                    }}
                        value={brand}
                    >
                        <option disabled selected>Sort By Brand</option>
                        <option value={""}>All (Brands)</option>
                        <option value={"MSI"}>MSI</option>
                        <option value={"Asus"}>Asus</option>
                        <option value={"Lenovo"}>Lenovo</option>
                    </select>


                    <select className="select select-bordered w-full max-w-xs" onChange={e => {
                        setSort(e.target.value);
                        setCurrentPage(1);
                    }} value={sort}>
                        <option disabled selected>Sort By Price</option>
                        <option value={"dsc"}>Sort By Price (Descending)</option>
                        <option value={"asc"}>Sort By Price (Ascending)</option>
                    </select>

                    <select className="select select-bordered w-full max-w-xs" onChange={e => {
                        setFilter(e.target.value);
                        setCurrentPage(1);
                    }} value={filter}>
                        <option disabled selected>Category</option>
                        <option value={""}>Category</option>
                        <option value={"Monitor"}>Monitor</option>
                        <option value={"Headphone"}>Headphone</option>
                        <option value={"Motherboard"}>Motherboard</option>
                        <option value={"Casing"}>Casing</option>
                        <option value={"Laptop"}>Laptop</option>
                        <option value={"Mouse"}>Mouse</option>
                    </select>


                    <input type="text" placeholder="Min Price" onChange={e => setMin(e.target.value)} className="input input-bordered w-full max-w-xs" />
                    <input type="text" placeholder="Max Price" onChange={e => setMax(e.target.value)} className="input input-bordered w-full max-w-xs" />
                </div>
            </div>

            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {
                    myProducts?.map(product => <div key={product._id}>
                        <div className="card bg-base-100 border shadow-xl relative">
                            <figure>
                                <img className=""
                                    src={product?.productImage}
                                    alt={product?.productName} />
                            </figure>
                            <div>
                                <p className="absolute top-6 right-5 bg-pink-600 w-24 rounded text-center text-white">Rating: {product?.rating}</p>
                            </div>
                            <div className="card-body">
                                <h2 className="card-title">
                                    {product?.productName}
                                    <div className="badge badge-warning">${product?.price}</div>
                                </h2>
                                <p>{product?.description.slice(0, 60).concat("...")}</p>
                                <div>
                                    <p><span className="font-semibold">Brand:</span> {product?.brand}</p>
                                    <p><span className="font-semibold">Category:</span> {product?.category}</p>
                                    <p><span className="font-semibold">Created On:</span> {format(new Date(product?.time), 'MM/dd/yyyy')}</p>
                                    <p><span className="font-semibold">Time:</span> {moment(product?.time).format('LLL')}</p>
                                </div>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>


            <div className="flex justify-center gap-2 my-10">
                <button className="btn" disabled={currentPage == 1} onClick={() => handlePaginationButton(currentPage - 1)}>Prev</button>
                {
                    pages?.map((btnNum, index) => <div key={index}>
                        <button className={`btn ${currentPage === btnNum ? "bg-blue-400" : ""}`} onClick={() => handlePaginationButton(btnNum)}>{btnNum}</button>
                    </div>)
                }
                <button className="btn" disabled={currentPage == numberOfPages} onClick={() => handlePaginationButton(currentPage + 1)}>Next</button>
            </div>
        </div>
    )
}

export default Products