import { SyntheticEvent, useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import { User } from "../../models/user";

const Users = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        (
            async () => {
                const { data } = await axios.get<{ data: User[] }>(`users?page=${page}`);

                setUsers(data.data);

            }
        )();
    }, [page]);

    const next = (e: SyntheticEvent) => {
        e.preventDefault();
        setPage(page + 1);
    }

    const prev = (e: SyntheticEvent) => {
        e.preventDefault();
        setPage(page + 1);
    }

    return (
        <Wrapper>
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
                                        <td></td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>

            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item"><a className="page-link" href="#" onClick={prev}>Previous</a></li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#" onClick={next}>Next</a></li>
                </ul>
            </nav>


        </Wrapper>
    )
}

export default Users;