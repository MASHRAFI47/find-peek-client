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
        <div className="container mx-auto">
            {
                products?.map(product => <div key={product._id}>
                    <div className="card bg-base-100 w-96 shadow-xl">
                        <figure>
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                alt="Shoes" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Shoes!</h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
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