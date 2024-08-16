import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import imageUpload from "../../hooks/imageUpload";

const AddProduct = () => {
    const axiosCommon = useAxiosCommon();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async data => {
        const { productName, productImage, description, price, category, rating } = data

        //image
        const displayImage = productImage[0];
        const picture = await imageUpload(displayImage);
        console.log(picture)

        mutateAsync({ productName, productImage: picture, description, price, category, rating, time: Date.now() });
    };

    const { mutateAsync } = useMutation({
        mutationFn: async (product) => {
            const { data } = await axiosCommon.post("/products", product);
            return data;
        },
        onSuccess: (data) => {
            console.log(data);
        }
    })

    return (
        <div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl border mx-auto">
                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Product Name*</span>
                        </label>
                        <input type="text" placeholder="casing" className="input input-bordered" {...register("productName", { required: true })} />
                        {errors.productName && <span className="text-red-600">This field is required</span>}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Product Image*</span>
                        </label>
                        <input type="file" className="file-input file-input-bordered w-full max-w-xs" {...register("productImage", { required: true })} />
                        {errors.productImage && <span className="text-red-600">This field is required</span>}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description*</span>
                        </label>
                        <textarea className="textarea textarea-bordered" placeholder="description..." {...register("description", { required: true })}></textarea>
                        {errors.description && <span className="text-red-600">This field is required</span>}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Price*</span>
                        </label>
                        <input type="number" placeholder="$10" className="input input-bordered" {...register("price", { required: true })} />
                        {errors.price && <span className="text-red-600">This field is required</span>}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Category*</span>
                        </label>
                        <select className="select select-bordered w-full max-w-xs" {...register("category", { required: true })}>
                            <option disabled>Select Category</option>
                            <option>MSI</option>
                            <option>Asus</option>
                        </select>
                        {errors.category && <span className="text-red-600">This field is required</span>}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Rating*</span>
                        </label>
                        <select className="select select-bordered w-full max-w-xs" {...register("rating", { required: true })}>
                            <option disabled>Select Category</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option selected>5</option>
                        </select>
                        {errors.rating && <span className="text-red-600">This field is required</span>}
                    </div>


                    <div className="form-control mt-6">
                        <button className="btn btn-secondary">Add</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProduct