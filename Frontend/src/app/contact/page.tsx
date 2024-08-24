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
import { contactService } from '@/services/contact.service'
import { formatDate } from '@/utils/formatDate'
import usePaginationStore from '@/store/pagination.store'
import Authentication from '@/components/Authentication'

type DateInput = {
  fromDate: string
  toDate: string
}
const initialTableHeader = {
  tableName: 'contact',
  tableSize: 0,
  tableColumns: [
    'No.',
    'Date',
    'First Name',
    'Last Name',
    'Email',
    'Subject',
    'Message',
    'Status',
    'Action',
  ],
}

const page = () => {
  const { pageName, setPageName, setCurrentPage, setTotalPages } =
    usePaginationStore()
  //table states
  const [visibleActionIndex, setVisibleActionIndex] = useState<number>(-1)
  //modal states
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [currentContact, setCurrentContact] = useState<Contact>()
  const [dateInputs, setDateInputs] = useState<DateInput>({
    fromDate: '',
    toDate: '',
  })
  //search bar state
  const [searchString, setSearchString] = useState<string>()
  const keywords = useDebounce(searchString)
  //handle table functions
  const { data, error, isLoading } = useSWRCustom<ResponseData<Contact>>(
    'contacts',
    () => contactService.getAllContacts()
  )

  const handleFetchData = async (currentPage: number = 1) => {
    try {
      let response = await contactService.getAllContacts({
        fromDate: dateInputs.fromDate,
        toDate: dateInputs.toDate,
        searchString: searchString ?? '',
        page: currentPage,
        size: 10,
      })
      mutate<ResponseData<Contact>>('contacts', response, false)
    } catch {
      showToast('error', 'Failed to fetch data')
    }
  }
  //handle modal functions

  const handleModalClose = () => {
    setIsModalOpen(false)
    setVisibleActionIndex(-1)
  }

  const handleModalOpen = (contact: Contact) => {
    setVisibleActionIndex(-1)
    setCurrentContact(contact)
    setIsModalOpen(true)
  }

  const handleRemoveContact = async (contactId: number) => {
    try {
      await contactService.removeContact(contactId)
      let newContactData = data!.data.filter(
        (contact) => contact.id !== contactId
      )

      mutate<ResponseData<Contact>>(
        'contacts',
        { ...data!, data: newContactData },
        false
      )
      showToast('success', 'Remove contact successfully')
      handleModalClose()
    } catch (e) {
      showToast('error', 'Failed to remove contact')
    }
  }

  const handleChangeContactStatus = async (
    currentContact: Contact,
    currentStatus: string
  ) => {
    var statusCode = 1
    if (currentStatus === 'PROCESSING') statusCode = 2
    if (currentStatus === 'PROCESSED') statusCode = 3
    try {
      await contactService.changeContactStatus(currentContact.id, statusCode)
      let newContactData = data!.data.map((contact) => {
        if (contact.id === currentContact.id)
          return { ...currentContact, status: currentStatus }
        return contact
      })
      mutate<ResponseData<Contact>>(
        'contacts',
        { ...data!, data: newContactData },
        false
      )
      showToast('success', 'Change contact status successfully')
      handleModalClose()
    } catch (e) {
      showToast('error', 'Failed to contact status')
    }
  }

  useEffect(() => {
    if (pageName !== 'contact') {
      setCurrentPage(1)
      setPageName('contact')
    }
    if (data) {
      setTotalPages(data.totalPages)
    }
  }, [data])

  useEffect(() => {
    if (
      keywords !== undefined ||
      (dateInputs.fromDate.length > 0 && dateInputs.toDate.length > 0)
    ) {
      handleFetchData()
    }
  }, [keywords, dateInputs])

  useEffect(() => {
    const paginationStore = usePaginationStore
    const unsubscribe = paginationStore.subscribe((state, prevState) => {
      if (state.currentPage != prevState.currentPage) {
        handleFetchData(state.currentPage)
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])

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
                {formatDate(new Date(row.createdAt), 2)}
              </td>
              <td className="table-row-content small text-center">
                {row.firstName}
              </td>
              <td className="table-row-content small text-center">
                {row.lastName}
              </td>
              <td className="table-row-content small text-center">
                {row.email}
              </td>
              <td className="table-row-content small text-center">
                {row.subject.length > 20
                  ? `${row.subject.slice(0, 19)}...`
                  : row.subject}
              </td>
              <td className="table-row-content small text-center">
                {row.message.length > 20
                  ? `${row.message.slice(0, 19)}...`
                  : row.message}
              </td>
              <td className="table-row-content small text-center">
                <select
                  className="form-control text-center p-0"
                  value={row.status}
                  onChange={(e) =>
                    handleChangeContactStatus(row, e.target.value)
                  }
                >
                  <option value="NOT PROCESSED">Not processed</option>
                  <option value="PROCESSING">Processing</option>
                  <option value="PROCESSED">Processed</option>
                </select>
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
                        className="btn  mb-2"
                        onClick={() => handleModalOpen(row)}
                      >
                        <i className="bi bi-pencil-square"></i> Detail
                      </button>
                    </li>
                    <li>
                      <button
                        className="btn"
                        onClick={() => handleRemoveContact(row.id)}
                      >
                        <i className="bi bi-trash3"></i> Remove
                      </button>
                    </li>
                  </menu>
                )}
              </td>
            </tr>
          </React.Fragment>
        ))}
      </Table>
      <FormModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        update={false}
        noSubmitButton
      >
        <h5 className="text-center text-uppercase mb-2">
          {initialTableHeader.tableName} detail
        </h5>
        <div className="p-5">
          <div className="form-group mb-4">
            <label className="text-uppercase font-weight-bold">
              First name:
            </label>
            <p>{currentContact?.firstName}</p>
          </div>

          <div className="form-group mb-4">
            <label className="text-uppercase font-weight-bold">
              Last name:
            </label>
            <p>{currentContact?.lastName}</p>
          </div>

          <div className="form-group mb-4">
            <label className="text-uppercase font-weight-bold">Email:</label>
            <p>{currentContact?.email}</p>
          </div>
          <div className="form-group mb-4">
            <label className="text-uppercase font-weight-bold">Subject:</label>
            <p>{currentContact?.subject}</p>
          </div>
          <div className="form-group mb-4">
            <label className="text-uppercase font-weight-bold">Message:</label>
            <p>{currentContact?.message}</p>
          </div>
          <div className="form-group mb-4">
            <label className="text-uppercase font-weight-bold">
              Creation date:
            </label>
            <p>{formatDate(new Date(currentContact?.createdAt ?? ''), 2)}</p>
          </div>
          <div className="form-group mb-4">
            <label className="text-uppercase font-weight-bold">Status</label>
            <p>{currentContact?.status}</p>
          </div>
        </div>
      </FormModal>
    </AdminLayout>
  )
}

export default page
