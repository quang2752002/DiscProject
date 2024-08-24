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
import { typeService } from '@/services/type.service'
import { categoryService } from '@/services/category.service'
import usePaginationStore from '@/store/usePaginationStore'
import Authentication from '@/components/Authentication'

type TypeForm = {
  id?: string
  name: string
  categoryIds: string[]
  description?: string
}
const initialTypeForm: TypeForm = {
  id: '',
  name: '',
  categoryIds: [],
  description: '',
}
const initialTableHeader = {
  tableName: 'type',
  tableSize: 0,
  tableColumns: ['No.', 'Name', 'Category', 'Description', 'Status', 'Action'],
}

const page = () => {
  const { currentPage, pageName, setPageName, setCurrentPage, setTotalPages } =
    usePaginationStore()
  //table states
  const [visibleActionIndex, setVisibleActionIndex] = useState<number>(-1)
  //modal states
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isUpdateModal, setIsUpdateModal] = useState<boolean>(false)
  const [typeForm, setTypeForm] = useState<TypeForm>(initialTypeForm)
  //search bar state
  const [searchString, setSearchString] = useState<string>()
  const keywords = useDebounce(searchString)
  //handle table functions
  const types = useSWRCustom<ResponseData<Type>>('types', () =>
    typeService.getAllTypes()
  )
  const categories = useSWRCustom<ResponseData<Type>>('categories', () =>
    categoryService.getAllCategories()
  )
  //handle modal functions
  const handleSetCategoryIds = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    var newTypeForm = { ...typeForm }
    let value = event.target.value.trim()
    if (!newTypeForm.categoryIds.includes(value)) {
      newTypeForm.categoryIds.push(value)
    } else {
      newTypeForm.categoryIds = newTypeForm.categoryIds.filter(
        (item) => item !== value
      )
    }
    console.log(newTypeForm)
    setTypeForm(newTypeForm)
  }
  const handleModalClose = () => {
    setTypeForm(initialTypeForm)
    setIsModalOpen(false)
  }
  const handleAddModalOpen = () => {
    setVisibleActionIndex(-1)
    setIsModalOpen(true)
    setIsUpdateModal(false)
  }

  const handleUpdateModalOpen = (currentType: Type) => {
    setTypeForm({
      id: currentType.id + '',
      name: currentType.name,
      categoryIds: currentType.category.map((category) => category.id + ''),
      description: currentType.description,
    })

    setIsModalOpen(true)
    setIsUpdateModal(true)
    setVisibleActionIndex(-1)
  }

  const handleAddType = async () => {
    let formData = getFormData()
    try {
      await typeService.createType(formData)
      mutate('types')
      showToast('success', 'Create new type successfully')
      handleModalClose()
    } catch (e) {
      showToast('error', 'Failed to create type account')
    }
  }

  const handleUpdateType = async () => {
    let formData = getFormData()
    try {
      let response = await typeService.updateType(typeForm.id!, formData)
      let updatedType = types.data?.data.find(
        (type) => type.id == parseInt(typeForm.id ?? '0')
      )
      if (response && updatedType) {
        updatedType.category = response.categoryTypes.map(
          (ct: any) => ct.category
        )
        updatedType.isActive = response.isActive
        updatedType.name = response.name
        updatedType.description = typeForm.description
      }
      let newData = types.data?.data.map((type) => {
        if (type.id == updatedType?.id) return updatedType
        return type
      })
      if (types.data && newData) {
        mutate<ResponseData<Type>>(
          'types',
          { ...types.data, data: newData },
          false
        )
      }
      showToast('success', 'Update type successfully')
      setIsModalOpen(false)
    } catch (e) {
      showToast('error', 'Failed to update type account')
    }
  }

  const handleToggleStatus = async (currentType: Type) => {
    try {
      setVisibleActionIndex(-1)
      await typeService.toggleStatus(currentType.id + '')
      let updatedType = { ...currentType, isActive: !currentType.isActive }
      let newData = types.data!.data.map((type) => {
        if (type.id === updatedType.id) return updatedType
        return type
      })
      mutate<ResponseData<Type>>(
        'types',
        { ...types.data!, data: newData },
        false
      )
      showToast('success', 'Change type status successfully')
    } catch (e) {
      showToast('error', 'Failed to change type status')
    }
  }

  const getFormData = (): FormData => {
    let formData = new FormData()
    formData.append('name', typeForm.name)
    formData.append('description', typeForm.description ?? '')
    if (typeForm.categoryIds.length > 0) {
      typeForm.categoryIds.forEach((id) => {
        formData.append('categoryIds', id)
      })
    }
    return formData
  }

  //search bar function
  const handleFetchData = async (currentPage: number) => {
    let params = {
      searchString: keywords ?? '',
      page: currentPage,
      size: 10,
    }
    try {
      let response: ResponseData<Type> = await typeService.getAllTypes(params)
      mutate<ResponseData<Type>>('types', response, false)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (pageName !== 'type') {
      setCurrentPage(1)
      setPageName('type')
    }
    if (types.data && categories.data) {
      setTotalPages(types.data.totalPages)
    }
  }, [types.data, categories.data])

  useEffect(() => {
    if (keywords !== undefined) {
      handleFetchData(1)
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
  if (types.isLoading) return <Loading />
  if (types.error || !types.data)
    return <div className="p-3">Failed to loading data</div>
  return (
    <AdminLayout onChangeSearchString={setSearchString}>
      <Table
        tableHeader={{
          ...initialTableHeader,
          tableSize: types.data.data.length ?? 0,
        }}
        handleOpenAddForm={handleAddModalOpen}
        hasAddButton
      >
        {types.data.data.map((row, index) => (
          <React.Fragment key={row.id}>
            <tr>
              <td className="table-row-content small text-center">
                {index + 1}
              </td>
              <td className="table-row-content small text-center">
                {row.name}
              </td>
              <td className="table-row-content small text-center">
                {row.category.map((c, index) => {
                  if (index === row.category.length - 1) return `${c.name}`
                  else return `${c.name}, `
                })}
              </td>
              <td className="table-row-content small text-center">
                {row.description}
              </td>

              <td className="table-row-content small text-center">
                {row.isActive ? 'active' : 'inactive'}
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
                        onClick={() => handleUpdateModalOpen(row)}
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
        onCreate={handleAddType}
        onUpdate={handleUpdateType}
        update={isUpdateModal}
      >
        <h5 className="text-center text-uppercase mb-2">
          Add new {initialTableHeader.tableName}
        </h5>

        <div className="form-group mb-4">
          <label className="text-uppercase font-weight-bold">Name:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter type name"
            value={typeForm.name}
            onChange={(e) => setTypeForm({ ...typeForm, name: e.target.value })}
          />
        </div>
        <div className="form-group mb-4">
          <label className="text-uppercase font-weight-bold">Category: </label>
          <select
            className="form-control"
            value={typeForm.categoryIds}
            onChange={(e) => handleSetCategoryIds(e)}
            multiple
          >
            {categories.data?.data.map((c) => (
              <option
                value={c.id}
                selected={typeForm.categoryIds.includes(c.id + '')}
              >
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mb-4">
          <label className="text-uppercase font-weight-bold">
            Description:
          </label>
          <textarea
            className="form-control"
            placeholder="Enter description"
            onChange={(e) =>
              setTypeForm({ ...typeForm, description: e.target.value })
            }
          >
            {typeForm.description}
          </textarea>
        </div>
      </FormModal>
    </AdminLayout>
  )
}

export default page
