import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import Wrapper from '../../components/Wrapper';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import ImageUpload from '../../components/ImageUpload';

const ProductEdit = (props: any) => {

    const [title, setTitle] = useState('');
    const [description, setDesciption] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const ref = useRef();

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get<any>(`products/${props.match.params.id}`);
                setTitle(data.title);
                setDesciption(data.description);
                setPrice(data.price);
                setImage(data.image);
            }
        )()
    }, []);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.put(`products/${props.match.params.id}`, {
            title,
            description,
            price,
            image
        });

        setRedirect(true);

    }

    if (redirect) {
        return <Redirect to="/products" />
    }

    return (
        <Wrapper>
            <form onSubmit={submit}>

                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title"
                        defaultValue={title}
                        onChange={(e) => setTitle(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description"
                        rows={5}
                        defaultValue={description}
                        onChange={(e) => setDesciption(e.target.value)}>
                    </textarea>
                </div>

                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image</label>
                    <div className="input-group">
                        <input className="form-control"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                        <ImageUpload uploaded={setImage} />
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="text" className="form-control" id="price"
                        defaultValue={price}
                        onChange={(e) => setPrice(e.target.value)} />
                </div>

                <button type="submit" className="btn btn-outline-primary btn-sm">Update</button>

            </form>
        </Wrapper>
    );
};

export default ProductEdit;