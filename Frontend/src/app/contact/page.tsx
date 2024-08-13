import React from 'react'
import Table from '@/components/Table'
import AdminLayout from '@/layouts/AdminLayout'
const tableData: TableData<Contact> = {
  tableName: 'contact',
  columns: [
    'No.',
    'FirstName',
    'LastName',
    'Email',
    'Subject',
    'Message',
    'Action',
  ],
  rows: [
    {
      firstName: 'string',
      lastName: 'string',
      email: 'string',
      subject: 'string',
      message: 'string',
    },
  ],
}
const page = () => {
  return (
    <AdminLayout>
      <Table tableData={tableData} hasAddButton hasDateInput />
    </AdminLayout>
  )
}

export default page
