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

    const products = useProducts(asc, search);

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

            <div className="container text-center mb-5">
                <form action="" onSubmit={handleSearch}>
                    <input type="text" placeholder="Search here" name="search" className="input input-bordered w-full max-w-xs" />
                    <input type="submit" value={"Search"} className="btn btn-primary" />
                </form>
                <button className="btn" onClick={() => setAsc(!asc)}>
                    {asc ? "Price: High to Low" : "Price: Low to High"}
                </button>
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