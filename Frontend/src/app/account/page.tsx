'use client'
import React, { useEffect, useState } from 'react'
import Table from '@/components/Table'
import AdminLayout from '@/layouts/AdminLayout'
import useSWRCustom from '@/hooks/useSWRCustom'
import { accountService } from '@/services/account.service'
import { roleService } from '@/services/role.service'
import Loading from '@/components/Loading'
import FormModal from '@/components/FormModal'

import showToast from '@/utils/showToast'
import { mutate } from 'swr'
import useDebounce from '@/hooks/useDebounce'
import { formatDate } from '@/utils/formatDate'
import Authentication from '@/components/Authentication'
import usePaginationStore from '@/store/usePaginationStore'

type AccountForm = {
  id?: string
  firstName: string
  lastName: string
  email: string
  password: string
  oldPassword?: string
  dob: string
  sex: string
  roleId: string
  avatar: File | null | undefined
}
const initialTableHeader = {
  tableName: 'account',
  tableSize: 0,
  tableColumns: [
    'No.',
    'First Name',
    'Last Name',
    'Email',
    'Dob',
    'Sex',
    'Avatar',
    'Role',
    'Status',
    'Creation Date',
    'Action',
  ],
}
const initialAccountForm: AccountForm = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  oldPassword: '',
  dob: formatDate(new Date()),
  sex: 'MALE',
  roleId: '',
  avatar: null,
}
const page = () => {
  const { currentPage, pageName, setPageName, setCurrentPage, setTotalPages } =
    usePaginationStore()
  //table states
  const [visibleActionIndex, setVisibleActionIndex] = useState<number>(-1)
  //modal states
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isUpdateModal, setIsUpdateModal] = useState<boolean>(false)
  const [accountForm, setAccountForm] = useState<AccountForm>({
    ...initialAccountForm,
  })
  //search bar state
  const [searchString, setSearchString] = useState<string>()
  const keywords = useDebounce(searchString)
  //handle table functions
  const accounts = useSWRCustom<ResponseData<User>>('accounts', () =>
    accountService.getAllAccount()
  )
  const roles = useSWRCustom<Role[]>('roles', () => roleService.getAllRole())
  //handle modal functions
  const handleSetAccountForm = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
    key: keyof AccountForm
  ) => {
    var newAccForm = { ...accountForm }
    switch (key) {
      case 'avatar':
        let eventValue = (event as React.ChangeEvent<HTMLInputElement>).target
        newAccForm.avatar = eventValue ? eventValue.files?.[0] : null
        break
      case 'roleId':
      case 'sex':
        newAccForm[key] = (
          event as React.ChangeEvent<HTMLSelectElement>
        ).target?.value
        break
      default:
        newAccForm[key] = (
          event as React.ChangeEvent<HTMLInputElement>
        ).target?.value
        break
    }
    console.log(newAccForm)
    setAccountForm(newAccForm)
  }
  const handleModalClose = () => {
    setIsModalOpen(false)
  }
  const handleAddModalOpen = () => {
    setAccountForm({ ...initialAccountForm, roleId: roles.data?.[0].id + '' })
    setIsModalOpen(true)
    setIsUpdateModal(false)
  }
  const handleUpdateModalOpen = (accountId: number) => {
    setAccountForm({ ...initialAccountForm, roleId: roles.data?.[0].id + '' })
    setIsModalOpen(true)
    setIsUpdateModal(true)
    setVisibleActionIndex(-1)
    let currentAccount = accounts.data!.data.find((acc) => acc.id === accountId)
    if (currentAccount) {
      setAccountForm({
        id: currentAccount.id + '',
        firstName: currentAccount.firstName,
        lastName: currentAccount.lastName,
        email: currentAccount.email,
        password: '',
        oldPassword: '',
        dob: formatDate(new Date(currentAccount.dob)),
        sex: currentAccount.sex,
        roleId: currentAccount.role.id + '',
        avatar: null,
      })
    }
  }
  const handleAddAccount = async () => {
    let formData = getFormData()
    try {
      let response = await accountService.createAccount(formData)
      mutate('accounts')
      showToast('success', 'Create new account successfully')
      setIsModalOpen(false)
    } catch (e) {
      showToast('error', 'Failed to create new account')
    }
  }

  const handleUpdateAccount = async () => {
    let formData = getFormData()
    let accountId = parseInt(accountForm.id || '0')
    try {
      let response = await accountService.updateAccount(accountId, formData)
      mutate('accounts')
      showToast('success', 'Update account successfully')
      setIsModalOpen(false)
    } catch (e) {
      showToast('error', 'Failed to create new account')
    }
  }

  const handleChangeRole = async (currentAccount: User, roleId: number) => {
    console.log(roleId)
    try {
      let response = await accountService.changeAccountRole(
        currentAccount.id,
        roleId
      )
      console.log(response)
      let newAccountData = accounts.data!.data.map((acc) => {
        if (acc.id === currentAccount.id)
          return { ...currentAccount, role: response.role }
        return acc
      })
      mutate<ResponseData<User>>(
        'accounts',
        { ...accounts.data!, data: newAccountData },
        false
      )
      showToast('success', 'Change account role successfully')
    } catch (e) {
      showToast('error', 'Failed to change account role')
    }
  }
  const handleToggleStatus = async (currentAccount: User) => {
    try {
      setVisibleActionIndex(-1)
      let response = await accountService.toggleStatus(currentAccount.id)
      let newAccountData = accounts.data!.data.map((acc) => {
        if (acc.id === currentAccount.id)
          return { ...currentAccount, isActive: !currentAccount.isActive }
        return acc
      })
      mutate<ResponseData<User>>(
        'accounts',
        { ...accounts.data!, data: newAccountData },
        false
      )
      showToast('success', 'Change account status successfully')
    } catch (e) {
      showToast('error', 'Failed to change account status')
    }
  }
  const getFormData = (): FormData => {
    let formData = new FormData()
    formData.append('firstName', accountForm.firstName)
    formData.append('lastName', accountForm.lastName)
    formData.append('email', accountForm.email)
    formData.append('password', accountForm.password)
    formData.append('sex', accountForm.sex)
    formData.append('dob', accountForm.dob)
    formData.append('roleId', accountForm.roleId)
    if (accountForm.avatar) {
      formData.append('avatar', accountForm.avatar)
    }
    return formData
  }
  //search bar function
  const handleFetchData = async (currentPage: number = 1) => {
    try {
      let response: ResponseData<User> = await accountService.getAllAccount({
        searchString: keywords ?? '',
        page: currentPage,
        size: 10,
      })
      mutate<ResponseData<User>>('accounts', response, false)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (pageName !== 'account') {
      setCurrentPage(1)
      setPageName('account')
    }
    if (accounts.data) {
      setTotalPages(accounts.data.totalPages)
    }
  }, [accounts.data])

  useEffect(() => {
    if (keywords !== undefined) {
      handleFetchData()
    }
  }, [keywords])

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

  if (accounts.isLoading) return <Loading />
  if (accounts.error || !accounts.data || !roles.data)
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
          tableSize: accounts.data.data.length ?? 0,
        }}
        handleOpenAddForm={handleAddModalOpen}
        hasAddButton
      >
        {accounts.data.data.map((row, index) => (
          <React.Fragment key={row.id}>
            <tr>
              <td className="table-row-content small text-center">
                {index + 1}
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
              <td className="table-row-content small text-center">{`${
                row.dob ? formatDate(new Date(row.dob), 2) : ''
              }`}</td>
              <td className="table-row-content small text-center">
                {row.sex || ''}
              </td>
              <td className="table-row-content small text-center">
                {row.avatar && (
                  <img
                    src={
                      row.avatar ? `https://localhost:7090/${row.avatar}` : ''
                    }
                    width="50em"
                    alt="img"
                  />
                )}
              </td>
              <td className="table-row-content small text-center">
                <select
                  value={row.role.id}
                  className="form-control text-center p-0"
                  onChange={(e) =>
                    handleChangeRole(row, parseInt(e.target.value))
                  }
                >
                  {roles.data!.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </td>
              <td className="table-row-content small text-center">
                {row.isActive ? 'active' : 'inactive'}
              </td>
              <td className="table-row-content small text-center">
                {`${
                  row.createdAt ? formatDate(new Date(row.createdAt), 2) : ''
                }`}
              </td>

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
                      width: '14em',
                    }}
                  >
                    <li>
                      <button
                        className="btn  mb-2"
                        onClick={() => handleUpdateModalOpen(row.id)}
                      >
                        <i className="bi bi-pencil-square"></i> Edit
                      </button>
                    </li>
                    <li>
                      <button
                        className="btn"
                        onClick={() => handleToggleStatus(row)}
                      >
                        <i className="bi bi-trash3"></i>{' '}
                        {row.isActive ? 'Deactivate' : 'Activate'}
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
        onCreate={handleAddAccount}
        onUpdate={handleUpdateAccount}
        update={isUpdateModal}
      >
        <h5 className="text-center text-uppercase mb-2">
          Add new {initialTableHeader.tableName}
        </h5>
        <div className="form-group mb-3">
          <label className="text-uppercase font-weight-bold">First name:</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter first name"
            value={accountForm.firstName}
            onChange={(e) => handleSetAccountForm(e, 'firstName')}
          />
        </div>
        <div className="form-group mb-4">
          <label className="text-uppercase font-weight-bold">Last name:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter last name"
            value={accountForm.lastName}
            onChange={(e) => handleSetAccountForm(e, 'lastName')}
          />
        </div>
        {!isUpdateModal && (
          <div className="form-group mb-4">
            <label className="text-uppercase font-weight-bold">Email:</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={accountForm.email}
              onChange={(e) => handleSetAccountForm(e, 'email')}
            />
          </div>
        )}

        {isUpdateModal && (
          <div className="form-group mb-4">
            <label className="text-uppercase font-weight-bold">
              Old Password:
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="············"
              value={accountForm.oldPassword}
              onChange={(e) => handleSetAccountForm(e, 'oldPassword')}
            />
          </div>
        )}

        <div className="form-group mb-4">
          <label className="text-uppercase font-weight-bold">Password:</label>
          <input
            type="password"
            className="form-control"
            placeholder="············"
            value={accountForm.password}
            onChange={(e) => handleSetAccountForm(e, 'password')}
          />
        </div>

        <div className="form-group mb-4">
          <label className="text-uppercase font-weight-bold">DOB:</label>
          <input
            type="date"
            className="form-control"
            placeholder="Enter disc price"
            value={accountForm.dob}
            onChange={(e) => handleSetAccountForm(e, 'dob')}
          />
        </div>
        <div className="form-group mb-4">
          <label className="text-uppercase font-weight-bold">Sex:</label>
          <select
            className="form-control"
            value={accountForm.sex}
            onChange={(e) => handleSetAccountForm(e, 'sex')}
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div className="form-group mb-4">
          <label className="text-uppercase font-weight-bold">Role:</label>
          <select
            className="form-control"
            value={accountForm.roleId}
            onChange={(e) => handleSetAccountForm(e, 'roleId')}
          >
            {roles.data!.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group mb-4">
          <label className="text-uppercase font-weight-bold">Avatar:</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => handleSetAccountForm(e, 'avatar')}
            multiple
          />
        </div>

        {/* {isUpdate && (
              <div className="form-group mb-4">
                <label className="text-uppercase font-weight-bold">Quantity:</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter disc price"
                  value={discForm.quantity}
                  onChange={(e) => handleSetAccountForm(e, 'quantity')}
                />
              </div>
            )} */}
      </FormModal>
    </AdminLayout>
  )
}

export default page
