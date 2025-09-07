import React, { SyntheticEvent, useEffect, useState } from 'react';
import Wrapper from '../../components/Wrapper';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Permission } from '../../models/permission';

const RoleCreate = () => {

    const [name, setName] = useState('');
    const [permissions, setPermissions] = useState([]);
    const [selected, setSelected] = useState([] as number[]);

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get<any>('permissions');
                setPermissions(data);
            }
        )()
    }, []);

    const check = (id: number) => {
        if (selected.some(s => s === id)) {
            setSelected(selected.filter(s => s !== id));
            return;
        }

        setSelected([...selected, id]);
    }

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('roles', {
            name,
            permissions: selected
        });

        setRedirect(true);
    }

    if (redirect) {
        return <Redirect to="/roles" />
    }

    return (
        <Wrapper>
            <form onSubmit={submit}>

                <div className="mb-3 mt-3 row">
                    <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="name"
                            onChange={(e) => setName(e.target.value)} />
                    </div>
                </div>

                <div className="mb-3 mt-3 row">
                    <label htmlFor="name" className="col-sm-2 form-label">Permission</label>
                    <div className="col-sm-10">
                        {
                            permissions.map((p: Permission) => {
                                return (
                                    <div key={p.id} className="form-check form-check-inline col-3">
                                        <input className="form-check-input" type="checkbox" id={`inlineCheckbox1-${p.id}`}
                                            value={p.id}
                                            onChange={() => check(p.id)}
                                        />
                                        <label className="form-check-label" htmlFor={`inlineCheckbox1-${p.id}`}>{p.name}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <button type="submit" className="btn btn-outline-primary btn-sm">Save</button>

            </form>
        </Wrapper>
    );
};

export default RoleCreate;