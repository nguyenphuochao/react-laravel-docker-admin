import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { User } from '../models/user';
import { Link } from 'react-router-dom';

const Nav = () => {

    const [user, setUser] = useState(new User());

    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get<any>('user');

                setUser(new User(
                    data.id,
                    data.first_name,
                    data.last_name,
                    data.email,
                    data.role
                ));
            }
        )();
    }, []);

    const logout = async () => {
        if (window.confirm('Are you sure you want to logout?')) {
            await axios.post('logout', {});
        }
    }

    return (
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <Link className="navbar-brand col-md-3 col-lg-2 me-0 px-3" to="#">Company name</Link>

            <ul className="my-2 my-md-0 mr-md-3">
                <Link className="p-2 text-white" to="#">{user.name}</Link>
                <Link className="p-2 text-white" to="#" onClick={logout}>Sign out</Link>
            </ul>

        </nav>
    );
}

export default Nav;