import React from 'react'
const Pagination = () => {
  return (
    <div className="pagination px-3 d-flex justify-content-end">
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item px-1 ">
            <a className="page-link rounded" href="#">
              <i className="bi bi-chevron-double-left"></i>
            </a>
          </li>
          <li className="page-item px-1 ">
            <a className="page-link rounded" href="#">
              <i className="bi bi-chevron-left"></i>
            </a>
          </li>
          <li className="page-item px-1 ">
            <a className="page-link active" href="#">
              1
            </a>
          </li>
          <li className="page-item px-1 ">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item px-1 ">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item px-1 ">
            <a className="page-link" href="#">
              <i className="bi bi-chevron-right"></i>
            </a>
          </li>
          <li className="page-item px-1">
            <a className="page-link rounded" href="#">
              <i className="bi bi-chevron-double-right"></i>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Pagination
