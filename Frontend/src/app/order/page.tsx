import React from 'react'
import Table from '@/components/Table'
import Static from '@/components/Static'
import AdminLayout from '@/layouts/AdminLayout'
const tableData: TableData<Order> = {
  tableName: 'account',
  columns: [
    'No.',
    'Order date',
    'Customer',
    'Payment method',
    'Total (usd)',
    'Status',
    'Action',
    ' ',
  ],
  rows: [
    {
      orderDate: 'string',
      customer: 'string',
      paymentMethod: 'string',
      total: 5000,
      status: 'string',
    },
    {
      orderDate: 'string',
      customer: 'string',
      paymentMethod: 'string',
      total: 5000,
      status: 'string',
    },
  ],
}
const page = () => {
  return (
    <AdminLayout userName='Truong'>
      <Static />
      <Table tableData={tableData} hasDateInput hasChevron />
    </AdminLayout>
  )
}

export default page
