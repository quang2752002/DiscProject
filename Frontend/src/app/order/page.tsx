'use client'
import React, { useEffect, useState } from 'react'
import Table from '@/components/Table'
import AdminLayout from '@/layouts/AdminLayout'
import useSWRCustom from '@/hooks/useSWRCustom'
import Loading from '@/components/Loading'
import FormModal from '@/components/FormModal'
import showToast from '@/utils/showToast'
import { mutate } from 'swr'
import useDebounce from '@/hooks/useDebounce'

import { formatDate } from '@/utils/formatDate'
import { orderService } from '@/services/orderservice'
import SubTable from '@/components/SubTable'
import { OrderTransition } from '@/constants/Constant'
import usePaginationStore from '@/store/usePaginationStore'
import Authentication from '@/components/Authentication'

type DateInput = {
  fromDate: string
  toDate: string
}
const initialTableHeader = {
  tableName: 'order',
  tableSize: 0,
  tableColumns: [
    'No.',
    'Order Date',
    'user',
    'payment Method',
    'transaction',
    'status',
    'total (usd)',
    'Action',
    '',
  ],
}

const page = () => {
  //table states
  const { currentPage, pageName, setPageName, setCurrentPage, setTotalPages } =
    usePaginationStore()
  const [visibleActionIndex, setVisibleActionIndex] = useState<number>(-1)
  const [visibleSubTable, setVisibleSubTable] = useState<boolean[]>([])
  //modal states
  const [dateInputs, setDateInputs] = useState<DateInput>({
    fromDate: '',
    toDate: '',
  })
  //search bar state
  const [searchString, setSearchString] = useState<string>()
  const keywords = useDebounce(searchString)

  //handle table functions
  const handlerToggleSubTable = (index: number) => {
    var newVisibleSubTable = [...visibleSubTable]
    newVisibleSubTable[index] = !newVisibleSubTable[index]
    setVisibleSubTable(newVisibleSubTable)
  }
  const { data, error, isLoading } = useSWRCustom<ResponseData<Order>>(
    'orders',
    () => orderService.getAllOrders()
  )

  const handleFetchData = async (page: number) => {
    try {
      let response = await orderService.getAllOrders({
        fromDate: dateInputs.fromDate,
        toDate: dateInputs.toDate,
        searchString: searchString ?? '',
        page: page,
        size: 10,
      })
      console.log(response.data)
      mutate<ResponseData<Order>>('orders', response, false)
    } catch {
      showToast('error', 'Failed to fetch data')
    }
  }

  const handleToggleOrderStatus = async (orderId: number) => {
    try {
      setVisibleActionIndex(-1)
      await orderService.toggleOrderStatus(orderId)
      mutate('orders')
      showToast('success', 'Change order status successfully')
    } catch (e) {
      showToast('error', 'Failed to change order status')
    }
  }

  const handleChangeOrderTransition = async (
    orderId: number,
    status: string
  ) => {
    var statusCode = 1
    if (status === OrderTransition.PREPARING) statusCode = 2
    if (status === OrderTransition.DELIVERING) statusCode = 3
    if (status === OrderTransition.DELIVERED) statusCode = 4
    try {
      await orderService.changeOrderTransition(orderId, statusCode)
      mutate('orders')
      showToast('success', 'Change order transaction successfully')
    } catch (e) {
      showToast('error', 'Failed to change order transaction')
    }
  }

  useEffect(() => {
    if (pageName !== 'order') {
      setCurrentPage(1)
      setPageName('order')
    }
    if (data) {
      setTotalPages(data.totalPages)
      setVisibleSubTable(
        visibleSubTable.length > 0
          ? [...visibleSubTable]
          : Array(data.data.length).fill(false)
      )
    }
  }, [data])

  useEffect(() => {
    if (
      keywords !== undefined ||
      (dateInputs.fromDate.length > 0 && dateInputs.toDate.length > 0)
    ) {
      handleFetchData(1)
    }
  }, [keywords, dateInputs])

  useEffect(() => {
    const paginationStore = usePaginationStore
    const unsubscribe = paginationStore.subscribe((state, prevState) => {
      console.log('Current Page:', state.currentPage)
      console.log('Previous Page:', prevState.currentPage)
      if (state.currentPage != prevState.currentPage) {
        handleFetchData(state.currentPage)
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])
  console.log(data)
  if (isLoading) return <Loading />
  if (error || !data)
    return (
      <Authentication>
        <div className="p-3">Failed to loading data</div>
      </Authentication>
    )
  return (
    <AdminLayout onChangeSearchString={setSearchString}>
      <Table
        tableHeader={{
          ...initialTableHeader,
          tableSize: data.data.length ?? 0,
        }}
        dateInputs={dateInputs}
        onInputChange={setDateInputs}
        hasDateInput
      >
        {data.data.map((row, index) => (
          <React.Fragment key={row.id}>
            <tr>
              <td className="table-row-content small text-center">
                {index + 1}
              </td>
              <td className="table-row-content small text-center">
                {formatDate(new Date(row.orderDate), 2)}
              </td>
              <td className="table-row-content small text-center">
                {`${row.user.firstName} ${row.user.lastName}`}
              </td>
              <td className="table-row-content small text-center">
                {row.paymentMethod}
              </td>
              <td className="table-row-content small text-center">
                <select
                  className="form-control text-center p-0"
                  value={row.transaction}
                  onChange={(e) =>
                    handleChangeOrderTransition(row.id, e.target.value)
                  }
                >
                  <option value={OrderTransition.PROCESSING}>Processing</option>
                  <option value={OrderTransition.PREPARING}>Preparing</option>
                  <option value={OrderTransition.DELIVERING}>Delivering</option>
                  <option value={OrderTransition.DELIVERED}>Delivered</option>
                </select>
              </td>
              <td className="table-row-content small text-center">
                {row.isActive ? 'active' : 'inactive'}
              </td>
              <td className="table-row-content small text-center">
                {row.total}
              </td>

              <td
                className="table-row-content small text-center"
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
                      width: '14em',
                    }}
                  >
                    <li>
                      <button
                        className="btn"
                        onClick={() => handleToggleOrderStatus(row.id)}
                      >
                        <i className="bi bi-trash3"></i>{' '}
                        {row.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                    </li>
                  </menu>
                )}
              </td>
              <td>
                {visibleSubTable[index] ? (
                  <i
                    className="bi bi-chevron-down"
                    onClick={() => handlerToggleSubTable(index)}
                    style={{ cursor: 'pointer' }}
                  />
                ) : (
                  <i
                    className="bi bi-chevron-right"
                    onClick={() => handlerToggleSubTable(index)}
                    style={{ cursor: 'pointer' }}
                  />
                )}
              </td>
            </tr>
            {visibleSubTable[index] && <SubTable data={row.orderItems} />}
          </React.Fragment>
        ))}
      </Table>
    </AdminLayout>
  )
}

export default page
