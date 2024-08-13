import React from 'react'
type ComponentProps = {
  colSpan: number
}
const SubTable: React.FC<ComponentProps> = ({ colSpan }: ComponentProps) => {
  return (
    <tr>
      <td colSpan={colSpan}>
        <table
          className="table table-borderless table-secondary table-sm"
          style={{ width: '100%' }}
        >
          <thead>
            <tr>
              <th>Product name</th>
              <th>Author</th>
              <th>Quantity</th>
              <th>Price (USD)</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Thiên lý ơi</td>
              <td>Jack 5 củ</td>
              <td>2</td>
              <td>500</td>
              <td>1000</td>
            </tr>
            <tr>
              <td>Thiên lý ơi</td>
              <td>Jack 5 củ</td>
              <td>2</td>
              <td>500</td>
              <td>1000</td>
            </tr>
            <tr>
              <td>Thiên lý ơi</td>
              <td>Jack 5 củ</td>
              <td>2</td>
              <td>500</td>
              <td>1000</td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  )
}

export default SubTable
