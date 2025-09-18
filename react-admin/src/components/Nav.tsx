import axios from 'axios';
import { useState } from 'react';
import { User } from '../models/user';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Nav = (props: { user: User }) => {

    const [redirect, setRedirect] = useState(false);

    const logout = async () => {
        if (window.confirm('Are you sure you want to logout?')) {
            await axios.post('logout', {});
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Redirect to="/login" />
    }

    return (
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <Link className="navbar-brand col-md-3 col-lg-2 me-0 px-3" to="#">Company name</Link>

            <ul className="my-2 my-md-0 mr-md-3">
                <Link className="p-2 text-white" to="#">{props.user.name}</Link>
                <Link className="p-2 text-white" to="#" onClick={logout}>Sign out</Link>
            </ul>

        </nav>
    );
}

const mapStateToProps = (state: { user: User }) => {
    return {
        user: state.user
    }
};

export default connect(mapStateToProps)(Nav);