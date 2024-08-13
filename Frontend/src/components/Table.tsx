'use client'
import React, { useState } from 'react'
import Pagination from './Pagination'
import AddButton from './AddButton'
import SubTable from './SubTable'
import FormModal from './FormModal'
type ComponentProps = {
  tableData: TableData<TableDataType>
  hasDateInput?: boolean
  hasAddButton?: boolean
  hasChevron?: boolean
}

const Table: React.FC<ComponentProps> = ({
  tableData,
  hasDateInput = false,
  hasAddButton = false,
  hasChevron = false,
}: Readonly<ComponentProps>) => {
  const [isModalOpen, setIsModelOpen] = useState<boolean>(false)
  const [visibleActionIndex, setVisibleActionIndex] = useState<number>(-1)
  const [visibleSubMenuIndex, setVisibleSubMenuIndex] = useState<boolean[]>(
    Array(tableData.rows.length).fill(false)
  )
  const { tableName, columns, rows } = tableData
  const handlerToggleSubMenu = (index: number) => {
    var newVisibleSubMenuIndex = [...visibleSubMenuIndex]
    newVisibleSubMenuIndex[index] = !newVisibleSubMenuIndex[index]
    setVisibleSubMenuIndex(newVisibleSubMenuIndex)
  }

  return (
    <div className="table-wrapper bg-white border rounded shadow">
      <div className="table-header d-flex align-items-center justify-content-between p-4">
        <h5 className="flex-grow-1">
          All {tableName}s ({rows.length})
        </h5>
        {hasDateInput && (
          <div className="d-flex align-items-center px-2">
            <label className="px-2">From</label>
            <input type="date" className="form-control" />
            <label className="px-2">to</label>
            <input type="date" className="form-control" />
          </div>
        )}
        {hasAddButton && (
          <button
            className="btn btn-success border-0"
            style={{ backgroundColor: '#71DD37' }}
            onClick={() => setIsModelOpen(true)}
          >
            New <i className="bi bi-plus-circle"></i>
          </button>
        )}
      </div>
      <div className="table-body px-2">
        <table className="table">
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="text-uppercase small"
                  style={{ color: '#566A7F' }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td className="table-row-content small">{index + 1}</td>
                  {Object.keys(row).map((key) => (
                    <td key={key} className="table-row-content small">
                      {key === 'image' || key === 'avatar' ? (
                        <img src={row[key as keyof TableDataType]} alt="img" />
                      ) : (
                        row[key as keyof TableDataType]
                      )}
                    </td>
                  ))}
                  <td
                    className="table-row-content small "
                    style={{ position: 'relative' }}
                  >
                    <i
                      className="bi bi-three-dots-vertical"
                      style={{ cursor: 'pointer' }}
                      onClick={() =>
                        visibleActionIndex === -1
                          ? setVisibleActionIndex(index)
                          : setVisibleActionIndex(-1)
                      }
                    ></i>
                    {visibleActionIndex === index && (
                      <menu
                        id="action-menu"
                        className="d-flex flex-column shadow rounded bg-white p-3"
                        style={{
                          position: 'absolute',
                          top: '2em',
                          right: '8em',
                          zIndex: '10',
                          width: '12em',
                        }}
                      >
                        <li>
                          <button className="btn  mb-2">
                            <i className="bi bi-pencil-square"></i> Edit
                          </button>
                        </li>
                        <li>
                          <button className="btn">
                            <i className="bi bi-trash3"></i> Delete
                          </button>
                        </li>
                      </menu>
                    )}
                  </td>
                  {hasChevron && (
                    <td>
                      {visibleSubMenuIndex[index] ? (
                        <i
                          className="bi bi-chevron-down"
                          onClick={() => handlerToggleSubMenu(index)}
                          style={{ cursor: 'pointer' }}
                        />
                      ) : (
                        <i
                          className="bi bi-chevron-right"
                          onClick={() => handlerToggleSubMenu(index)}
                          style={{ cursor: 'pointer' }}
                        />
                      )}
                    </td>
                  )}
                </tr>
                {visibleSubMenuIndex[index] && (
                  <tr key={`${index}`}>
                    <td colSpan={columns.length + 2}>
                      <SubTable colSpan={9} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <Pagination />
      </div>
      <FormModal isOpen={isModalOpen} setModalIsOpen={setIsModelOpen} />
    </div>
  )
}

export default Table
