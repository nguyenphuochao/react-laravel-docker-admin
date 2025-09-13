import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { Link, Redirect } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await axios.post('login', {
            email,
            password
        });

        setRedirect(true);

        console.log(response);
    }

    if (redirect) {
        return <Redirect to="" />
    }

    return (
        <div className="container mt-5">

            <h2>Login</h2>

            <form onSubmit={submit}>
                
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="text" className="form-control" id="email"
                        onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="text" className="form-control" id="password"
                        onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button type="submit" className="btn btn-primary">Login</button>

                <div className="mt-3">
                    <span>Back to </span>
                    <Link to="/register">Register</Link>
                </div>

            </form>
        </div>
    )
}

export default Login;