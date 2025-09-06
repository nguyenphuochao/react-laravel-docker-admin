import { SyntheticEvent, useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import { User } from "../../models/user";
import { Link } from "react-router-dom";

const Users = () => {

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get<any>(`users?page=${page}`);

                setUsers(data.data);
                setLastPage(data.last_page);
                setTotalPages(Math.ceil(data.meta.total / data.meta.per_page));

            }
        )();
    }, [page]);

    console.log(users);

    const next = (e: SyntheticEvent) => {
        e.preventDefault();
        if (page < lastPage) {
            setPage(page + 1);
        }
    }

    const prev = (e: SyntheticEvent) => {
        e.preventDefault();

        if (page > 1) {
            setPage(page - 1);
        }
    }

    const del = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            await axios.delete(`users/${id}`);
            setUsers(users.filter((user: User) => user.id !== id));
        }
    }

    return (
        <Wrapper>

            <Link to={'/users/create'} className="btn btn-primary btn-sm mt-4">Create</Link>

            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            users.map((user: User) => {
                                return (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.first_name} {user.last_name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role.name}</td>
                                        <td>
                                            <button className="btn btn-sm btn-outline-secondary">Edit</button>
                                            <button className="btn btn-sm btn-outline-danger"
                                                onClick={() => del(user.id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>

            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item"><Link className="page-link" to="#" onClick={prev}>Previous</Link></li>

                    {
                        pageNumbers.map(page => 
                            <li className="page-item"><Link className="page-link" to="#">{page}</Link></li>
                        )
                    }
                  
                    <li className="page-item"><Link className="page-link" to="#" onClick={next}>Next</Link></li>
                </ul>
            </nav>


        </Wrapper>
    )
}

export default Users;