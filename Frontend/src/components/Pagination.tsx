'use client'
import React from 'react'
import usePaginationStore from '@/store/pagination.store'
const Pagination: React.FC = () => {
  const { currentPage, totalPages, handleChangePage } = usePaginationStore()
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const startPages: number[] = currentPage <= 4 ? [1, 2, 3, 4, 5] : [1, 2]
  const middlePages: number[] =
    currentPage >= totalPages - 2 || currentPage <= 4
      ? []
      : [currentPage - 1, currentPage, currentPage + 1]
  const endPages: number[] =
    currentPage >= totalPages - 2
      ? pages.slice(totalPages - 5, totalPages)
      : [totalPages - 1, totalPages]
  const handleChangPage = (page: number) => {
    handleChangePage(page)
  }
  return (
    <div className="pagination px-3 d-flex justify-content-end ">
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {/* previous */}
          <li
            className="page-item px-1 "
            style={{
              visibility: currentPage !== 1 ? 'visible' : 'hidden',
              cursor: 'pointer',
            }}
            onClick={() => handleChangPage(currentPage - 1)}
          >
            <a className="page-link rounded" href="#">
              <i className="bi bi-chevron-left"></i>
            </a>
          </li>

          {totalPages <= 7 &&
            pages.map((i) => (
              <li
                key={i}
                className="page-item px-1 "
                style={{ cursor: 'pointer' }}
                onClick={() => handleChangPage(i)}
              >
                <a
                  className={
                    i === currentPage ? 'page-link active' : 'page-link'
                  }
                >
                  {i}
                </a>
              </li>
            ))}

          {totalPages > 7 && (
            <>
              {startPages.map((i) => (
                <li
                  key={i}
                  className="page-item px-1 "
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleChangPage(i)}
                >
                  <a
                    className={
                      i === currentPage ? 'page-link active' : 'page-link'
                    }
                  >
                    {i}
                  </a>
                </li>
              ))}
              <li>...</li>
              {middlePages.map((i, index) => (
                <>
                  <li
                    key={i}
                    className="page-item px-1 "
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleChangPage(i)}
                  >
                    <a
                      className={
                        i === currentPage ? 'page-link active' : 'page-link'
                      }
                    >
                      {i}
                    </a>
                  </li>
                  {index == middlePages.length - 1 &&
                    middlePages[middlePages.length - 1] + 1 != endPages[0]! && (
                      <li>...</li>
                    )}
                </>
              ))}
              {endPages.map((i) => (
                <li
                  key={i}
                  className="page-item px-1 "
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleChangPage(i)}
                >
                  <a
                    className={
                      i === currentPage ? 'page-link active' : 'page-link'
                    }
                  >
                    {i}
                  </a>
                </li>
              ))}
            </>
          )}

          {/* next */}

          <li
            className="page-item px-1 "
            style={{
              visibility:
                currentPage !== totalPages && totalPages !== 0
                  ? 'visible'
                  : 'hidden',
              cursor: 'pointer',
            }}
            onClick={() => handleChangPage(currentPage + 1)}
          >
            <a className="page-link rounded">
              <i className="bi bi-chevron-right"></i>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Pagination
