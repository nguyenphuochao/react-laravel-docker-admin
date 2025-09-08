import React, { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';

const Paginator = (props: { page: number, lastPage: number, pageChaned: (page: number) => void, pageNumbers: number[] }) => {

    const next = (e: SyntheticEvent) => {
        e.preventDefault();
        if (props.page < props.lastPage) {
            props.pageChaned(props.page + 1);
        }
    }

    const prev = (e: SyntheticEvent) => {
        e.preventDefault();
        if (props.page > 1) {
            props.pageChaned(props.page - 1);
        }
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item"><Link className="page-link" to="#" onClick={prev}>Previous</Link></li>

                {
                    props.pageNumbers.map(page =>
                        <li className="page-item"><Link className="page-link" to="#">{page}</Link></li>
                    )
                }

                <li className="page-item"><Link className="page-link" to="#" onClick={next}>Next</Link></li>
            </ul>
        </nav>
    );
};

export default Paginator;