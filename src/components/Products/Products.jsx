// import { useQuery } from "@tanstack/react-query"
// import useAxiosCommon from "../../hooks/useAxiosCommon"
// import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
// import { useEffect, useState } from "react";
import { useState } from "react";
import useProducts from "../../hooks/useProducts";
import { format } from "date-fns";
import moment from "moment/moment";


const Products = () => {

    const [asc, setAsc] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');

    const products = useProducts(asc, search, category);

    // const axiosCommon = useAxiosCommon();


    /////////****TANSTACK */
    // const { data: products = [], isLoading } = useQuery({
    //     queryKey: ['products'],
    //     queryFn: async () => {
    //         const { data } = await axiosCommon.get('/products');
    //         return data
    //     }
    // })

    // const [productsData, setProductsData] = useState(products);


    // useEffect(() => {
    //     axiosCommon.get(`/products?search=${search}&sort=${asc ? "asc" : "desc"}`)
    // }, [search, asc]);

    // if (isLoading) return <LoadingSpinner />



    const handleSearch = e => {
        e.preventDefault();
        const searchValue = e.target.search.value;
        setSearch(searchValue);
    }

    console.log(search)

    return (
        <div>

            <div className="w-full text-center mb-5">
                <form action="" onSubmit={handleSearch}>
                    <input type="text" placeholder="Search By Product Name" name="search" className="input input-bordered w-full max-w-xs" />
                    <input type="submit" value={"Search"} className="btn btn-primary" />
                </form>
                <button className="btn btn-success mt-3" onClick={() => setAsc(!asc)}>
                    {asc ? "Sort By: High to Low" : "Price: Low to High"}
                </button>
            </div>

            <div className="container mx-auto mb-3">
                <div className="dropdown">
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
                </div>
            </div>

            <div className="container mx-auto grid grid-cols-4 gap-8">
                {
                    products?.map(product => <div key={product._id}>
                        <div className="card bg-base-100 border shadow-xl">
                            <figure>
                                <img className="w-64"
                                    src={product?.productImage}
                                    alt="Shoes" />
                            </figure>
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
        </div>
    )
}

export default Products