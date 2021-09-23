import './pagination.css';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import { Link } from '@material-ui/core';



const Pagination = ({ total, page, changePage }) => {

    let middlePagination;
    if (total < 6) {
        middlePagination = [...Array(total)].map((_, ind) => (
            <li
                key={ind + 1}
                className={page === ind + 1 ? 'page_list_item current_page' : 'page_list_item'}
                onClick={() => changePage(ind + 1)}>
                <Link to="/blog/page/2" className="page_link">{ind + 1} </Link>
            </li>
        ))
    } else {
        const startValue = Math.floor((page - 1) / 5) * 5
        middlePagination = (
            <>
                {[...Array(5)].map((_, ind) => (
                    <li
                        key={startValue + ind + 1}
                        className={page === startValue + ind + 1 ? 'page_list_item current_page' : 'page_list_item'}
                        onClick={() => changePage(startValue + ind + 1)}>
                        <span className="page_link">
                            {startValue + ind + 1}
                        </span>
                    </li>
                ))}

                <li className="page_list_item">
                    <span className="page_link">...</span>
                </li>
                <li className="page_list_item" onClick={() => changePage(total)}>
                    <span className="page_link">{total}</span>
                </li>
            </>
        );

        if (page > 5) {
            if (total - page >= 5) {
                middlePagination = (
                    <>
                        <li className="page_list_item" onClick={() => changePage(1)}>
                            <span className="page_link">1</span>
                        </li>
                        <li className="page_list_item">
                            <span className="page_link">...</span>
                        </li>
                        <li className="page_list_item" onClick={() => changePage(startValue)}>
                            <span className="page_link">{startValue}</span>
                        </li>

                        {[...Array(5)].map((_, ind) => (

                            <li
                                className={page === startValue + ind + 1 ? 'page_list_item current_page' : 'page_list_item'}
                                key={startValue + ind + 1}
                                onClick={() => changePage(startValue + ind + 1)}
                            >
                                <span className="page_link">{startValue + ind + 1}</span>
                            </li>


                        ))}

                        <li className="page_list_item">
                            <span className="page_link">...</span>
                        </li>
                        <li className="page_list_item" onClick={() => changePage(total)}>
                            <span className="page_link">{total}</span>
                        </li>
                    </>
                );
            } else {
                let amountLeft = total - page + 5;
                middlePagination = (
                    <>
                        <li className="page_list_item" onClick={() => changePage(1)}>
                            <span className="page_link">1</span>
                        </li>
                        <li className="page_list_item">
                            <span className="page_link">...</span>
                        </li>

                        <li className="page_list_item" onClick={() => changePage(startValue)}>
                            <span className="page_link">{startValue}</span>
                        </li>

                        {[...Array(amountLeft)].map((_, ind) => (
                            <li
                                key={startValue + ind + 1}
                                className={page === startValue + ind + 1 ? 'page_list_item current_page' : 'page_list_item'}
                                style={
                                    total < startValue + ind + 1 ? { display: "none" } : null
                                }
                                onClick={() => changePage(startValue + ind + 1)}
                            >
                                <span className="page_link">{startValue + ind + 1}</span>

                            </li>
                        ))}
                    </>
                );
            }
        }
    }

    return (
        <div className="pagination d-flex justify-content-center">
            <ul className="page_list d-flex align-items-center">
                <li className={page === 1 ? 'page_list_item disabled' : 'page_list_item'} onClick={() => changePage(page => page - 1)}>
                    <span className="page_link prev_page">
                        <ArrowBack />
                    </span>
                </li>

                {middlePagination}


                <li className={page === total ? 'page_list_item disabled' : 'page_list_item'} onClick={() => changePage(page => page + 1)}>
                    <span className="page_link next_page">
                        <ArrowForward />
                    </span>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;