import React, { SyntheticEvent, useEffect, useState } from 'react';
import Wrapper from '../../components/Wrapper';
import axios from 'axios';
import { Role } from '../../models/role';
import { Redirect } from 'react-router-dom';

const UserCreate = () => {

    const [firstName, setfirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [roldId, setRoleId] = useState('');
    const [roles, setRoles] = useState([]);

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get<any>('roles');
                setRoles(data);
            }
        )()
    }, [])


    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('users', {
            first_name: firstName,
            last_name: lastName,
            email: email,
            role_id: roldId
        });

        setRedirect(true);

    }

    if (redirect) {
        return <Redirect to="/users" />
    }

    return (
        <Wrapper>
            <form onSubmit={submit}>

                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="firstName"
                        onChange={(e) => setfirstName(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="lastName"
                        onChange={(e) => setLastName(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="text" className="form-control" id="email"
                        onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="roles" className="form-label">Role</label>
                    <select name="roles" id="roles" className="form-control" onChange={(e) => setRoleId(e.target.value)}>
                        <option value="">Please select</option>
                        {
                            roles.map((r: Role) =>
                                <option key={r.id} value={r.id}>{r.name}</option>
                            )
                        }
                    </select>
                </div>

                <button type="submit" className="btn btn-primary btn-sm">Save</button>

            </form>
        </Wrapper>
    );
};

export default UserCreate;