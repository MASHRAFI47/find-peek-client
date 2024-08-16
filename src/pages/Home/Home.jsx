import { useQuery } from "@tanstack/react-query"
import useAxiosCommon from "../../hooks/useAxiosCommon"

const Home = () => {
    const axiosCommon = useAxiosCommon();

    const { data: products, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/products');
            return data
        }
    })

    console.log(products)
    return (
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
                            <h2 className="card-title">{product?.productName}</h2>
                            <p>{product?.description.slice(0, 100).concat("...")}</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>
                </div>)
            }
        </div>
    )
}

export default Home