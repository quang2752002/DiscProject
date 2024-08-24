import React from 'react'
type ComponentProps = {
  data: OrderItems[]
}
const SubTable: React.FC<ComponentProps> = ({ data = [] }: ComponentProps) => {
  return (
    <tr>
      <td colSpan={9}>
        <table
          className="table table-borderless table-secondary table-sm"
          style={{ width: '100%' }}
        >
          <thead>
            <tr>
              <th className="text-center">Product</th>
              <th className="text-center">Unit Price (USD)</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">Feedback</th>
              <th className="text-center">VoteStar</th>
            </tr>
          </thead>
          <tbody>
            {data.map((orderItem) => (
              <tr key={orderItem.id}>
                <td className="text-center">{orderItem.product}</td>
                <td className="text-center">{orderItem.unitPrice}</td>
                <td className="text-center">{orderItem.quantity}</td>
                <td className="text-center">{orderItem.feedback}</td>
                <td className="text-center">{orderItem.voteStar}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </td>
    </tr>
  )
}

export default SubTable
