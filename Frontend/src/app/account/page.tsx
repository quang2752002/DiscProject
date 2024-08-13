import React from 'react'
import Table from '@/components/Table'
import AdminLayout from '@/layouts/AdminLayout'
const tableData: TableData<User> = {
  tableName: 'account',
  columns: [
    'No.',
    'First Name',
    'Last Name',
    'Email',
    'Dob',
    'Sex',
    'Avatar',
    'Status',
    'Creation Date',
    'Action',
  ],
  rows: [
    {
      firstName: 'Trinh trAn',
      lastName: 'phu0ng tuAn',
      email: 'jackbocon@gmail.com',
      dob: '01/01/2997',
      sex: 'Female',
      avatar: '/5cu',
      isActive: 'Inactive',
      createdAt: '01/01/2997',
    },
  ],
}
const page = () => {
  return (
    <AdminLayout>
      <Table tableData={tableData} hasAddButton />
    </AdminLayout>
  )
    
}

export default page
