import { useQuery } from "@tanstack/react-query"
import useAxiosCommon from "../../hooks/useAxiosCommon"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Home = () => {
    const axiosCommon = useAxiosCommon();

    const { data: products, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/products');
            return data
        }
    })

    if (isLoading) return <LoadingSpinner />

    console.log(products)
    return (
        <div>

            <div className="container text-center mb-5">
                <input type="text" placeholder="Search here" className="input input-bordered w-full max-w-xs" />
                <input type="submit" value={"Search"} className="btn btn-primary" />
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
                                <p><span className="font-semibold">Brand:</span> {product?.brand}</p>
                                <p><span className="font-semibold">Category:</span> {product?.category}</p>
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

export default Home