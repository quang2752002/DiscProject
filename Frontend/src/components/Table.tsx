'use client'
import React, { useState } from 'react'
import Pagination from './Pagination'
import SubTable from './SubTable'
import { formatDate } from '@/utils/formatDate'
type DateInput = {
  fromDate: string
  toDate: string
}
type ComponentProps = {
  children: React.ReactNode
  tableHeader: {
    tableName: string
    tableSize: number
    tableColumns: string[]
  }
  hasDateInput?: boolean
  hasAddButton?: boolean
  dateInputs?: DateInput
  handleOpenAddForm?: () => void
  onInputChange?: (dateInput: DateInput) => void
}

const Table: React.FC<ComponentProps> = ({
  children,
  tableHeader,
  hasDateInput = false,
  hasAddButton = false,
  dateInputs = { fromDate: '', toDate: '' },
  handleOpenAddForm = () => {},
  onInputChange = () => {},
}: Readonly<ComponentProps>) => {
  return (
    <div
      className="table-wrapper bg-white border rounded shadow"
      style={{ position: 'relative' }}
    >
      <div className="table-header d-flex align-items-center justify-content-between p-4">
        <h5 className="flex-grow-1">
          All {tableHeader.tableName}s ({tableHeader.tableSize})
        </h5>
        {hasDateInput && (
          <div className="d-flex align-items-center px-2">
            <label className="px-2">From</label>
            <input
              type="date"
              className="form-control"
              value={dateInputs.fromDate}
              onChange={(e) =>
                onInputChange({
                  ...dateInputs,
                  fromDate: formatDate(new Date(e.target.value)),
                })
              }
            />
            <label className="px-2">to</label>
            <input
              type="date"
              className="form-control"
              value={dateInputs.toDate}
              onChange={(e) =>
                onInputChange({
                  ...dateInputs,
                  toDate: formatDate(new Date(e.target.value)),
                })
              }
            />
          </div>
        )}
        {hasAddButton && (
          <button
            className="btn btn-success border-0"
            style={{ backgroundColor: '#71DD37' }}
            onClick={() => handleOpenAddForm()}
          >
            New <i className="bi bi-plus-circle"></i>
          </button>
        )}
      </div>
      <div className="table-body px-2">
        <table className="table">
          <thead>
            <tr>
              {tableHeader.tableColumns.map((col, index) => (
                <th
                  key={index}
                  className="text-uppercase small text-center"
                  style={{ color: '#566A7F' }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
      <div
        className="pagination-wrapper"
      >
        <Pagination />
      </div>
    </div>
  )
}

export default Table
