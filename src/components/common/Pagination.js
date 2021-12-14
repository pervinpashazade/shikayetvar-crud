import React from 'react'

function Pagination(props) {

    const [
        totalCount,
        rowsOnPage,
        currentPage,
        getDataFunc,
        setRowCount,

    ] = props;

    const pagination = () => {
        let pagination = [];
        let startPage, endPage;
        let total_count = totalCount;
        let rows_on_page = rowsOnPage;
        let page = currentPage;
        let page_count = Math.ceil(total_count / rows_on_page);

        if (page_count <= 10) {
            startPage = 1;
            endPage = page_count;
        } else {
            if (page <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (Number(page) + 4 >= page_count) {
                startPage = page_count - 9;
                endPage = page_count;
            } else {
                startPage = Number(page) - 5;
                endPage = Number(page) + 4;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pagination.push(
                <li key={i}>
                    <span onClick={(() => getDataFunc(i, rows_on_page))}
                        className={i === Number(page) ? "page active" : "page"}>{i}</span>
                </li>
            )
        }

        return pagination;
    }

    return (
        <div className="pagination my-4">
            <ul className="m-auto">
                <li className="page-item">
                    <select className="d-inline" onChange={setRowCount} value={rowsOnPage}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </li>
                {pagination}
            </ul>
        </div>
    )
}

export default Pagination
