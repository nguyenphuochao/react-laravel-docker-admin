import React, { useEffect, useState } from 'react';
import Wrapper from '../../components/Wrapper';
import { Link } from 'react-router-dom';
import { Role } from '../../models/role';
import axios from 'axios';

const Roles = () => {

    const [roles, setRoles] = useState([])

    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get<any>(`roles`);
                setRoles(data);
            }
        )();
    }, []);

    const del = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this role?')) {
            await axios.delete(`roles/${id}`);
            setRoles(roles.filter((role: Role) => role.id !== id));
        }
    }

    return (
        <Wrapper>

            <Link to={'/roles/create'} className="btn btn-outline-primary btn-sm mt-4">Create</Link>

            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            roles.map((role: Role) => {
                                return (
                                    <tr key={role.id}>
                                        <td>{role.id}</td>
                                        <td>{role.name}</td>
                                        <td>
                                            <Link to={`/roles/${role.id}/edit`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                                            <button className="btn btn-sm btn-outline-danger"
                                                onClick={() => del(role.id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>

        </Wrapper>
    );
};

export default Roles;