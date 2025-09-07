import React, { SyntheticEvent, useEffect, useState } from 'react';
import Wrapper from '../../components/Wrapper';
import axios from 'axios';
import { Role } from '../../models/role';
import { Redirect } from 'react-router-dom';

const UserEdit = (props: any) => {

    const [firstName, setfirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [roldId, setRoleId] = useState('');
    const [roles, setRoles] = useState([]);

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        (
            async () => {
                const response = await axios.get<any>('roles');
                setRoles(response.data);

                const { data } = await axios.get<any>(`users/${props.match.params.id}`);

                setfirstName(data.first_name);
                setLastName(data.last_name);
                setEmail(data.email);
                setRoleId(data.role.id);
            }

        )()
    }, [])

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.put(`users/${props.match.params.id}`, {
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
                        defaultValue={firstName}
                        onChange={(e) => setfirstName(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="lastName"
                        defaultValue={lastName}
                        onChange={(e) => setLastName(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="text" className="form-control" id="email"
                        defaultValue={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="roles" className="form-label">Role</label>
                    <select name="roles" id="roles" className="form-control"
                        value={roldId}
                        onChange={(e) => setRoleId(e.target.value)}>
                        <option value="">Please select</option>
                        {
                            roles.map((r: Role) =>
                                <option key={r.id} value={r.id}>{r.name}</option>
                            )
                        }
                    </select>
                </div>

                <button type="submit" className="btn btn-primary btn-sm">Update</button>

            </form>
        </Wrapper>
    );
};

export default UserEdit;