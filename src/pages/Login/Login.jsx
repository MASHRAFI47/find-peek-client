import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { signInUser, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
        const { email, password } = data;
        signInUser(email, password)
            .then((res) => {
                console.log(res.user)
                navigate("/")
            })
    }

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(res => {
                navigate("/");
                console.log(res.user);
            })
    }

    return (
        <div className='min-h-screen flex flex-col items-center justify-center'>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 border">
                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="text-2xl font-bold text-center">Login</h1>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" className="input input-bordered" {...register("email", { required: true })} />
                        {errors.email && <span className="text-red-600">This field is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" className="input input-bordered" {...register("password", { required: true })} />
                        {errors.password && <span className="text-red-600">This field is required</span>}
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                    </div>

                </form>
                <div className="form-control">
                    <button className="btn btn-accent mx-8 mb-6" onClick={handleGoogleSignIn}>Google</button>
                </div>
            </div>
        </div>
    )
}

export default Login