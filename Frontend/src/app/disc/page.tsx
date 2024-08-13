'use client'
import React, { useEffect, useState } from 'react'
import Table from '@/components/Table'
import AdminLayout from '@/layouts/AdminLayout'
import axiosInstance from '@/api/axiosInstance'
const tableData: TableData<Disc> = {
  tableName: 'disc',
  columns: [
    'No.',
    'Name',
    'Category',
    'Author',
    'Price',
    'Stock',
    'Image',
    'Creation Date',
    'Status',
    'Action',
  ],
  rows: [
    {
      name: 'ThienLy oi',
      category: 'Music',
      author: 'J97',
      price: '5000',
      stock: 1,
      image: '/',
      creationDate: '01/01/1997',
      status: 'Active',
    },
    {
      name: 'ThienLy oi',
      category: 'Music',
      author: 'J97',
      price: '5000',
      stock: 1,
      image: '/',
      creationDate: '01/01/1997',
      status: 'Active',
    },
    {
      name: 'ThienLy oi',
      category: 'Music',
      author: 'J97',
      price: '5000',
      stock: 1,
      image: '/',
      creationDate: '01/01/1997',
      status: 'Active',
    },
  ],
}
const initialTableData: TableData<Disc> = {
  tableName: 'disc',
  columns: [
    'No.',
    'Name',
    'Category',
    'Author',
    'Price',
    'Stock',
    'Image',
    'Creation Date',
    'Status',
    'Action',
  ],
  rows: [],
}
const page = () => {
  const [tableData, setTableData] = useState<TableData<Disc>>(initialTableData)
  useEffect(() => {
    axiosInstance
      .get('/product?idType=0&idCategory=0&index=1&size=8')
      .then((res) => {
        const discs = res.data.products.$values
        const rows: Disc[] = discs.map((disc: any) => ({
          name: disc.name,
          category: disc.categoryId,
          author: disc.author,
          price: disc.price,
          stock: disc.quantity,
          image: !disc.attachments ? ' ' : disc?.attachments[0],
          creationDate: '01/01/1997',
          status: disc.isActive ? 'active' : 'inactive',
        }))
        const newTableData = { ...tableData, rows: rows }
        setTableData(newTableData)
      })
  }, [])
  return (
    <AdminLayout>
      <Table tableData={tableData} hasAddButton />
      
    </AdminLayout>
  )
}

export default page
