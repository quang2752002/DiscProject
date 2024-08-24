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
import { categoryService } from '@/services/category.service'
import usePaginationStore from '@/store/usePaginationStore'
import Authentication from '@/components/Authentication'

type CategoryForm = {
  id: string
  name: string
  description: string
}
const initialCategoryForm: CategoryForm = {
  id: '',
  name: '',
  description: '',
}
const initialTableHeader = {
  tableName: 'categorie',
  tableSize: 0,
  tableColumns: ['No.', 'Name', 'Description', 'Status', 'Action'],
}
const page = () => {
  const { currentPage, pageName, setPageName, setCurrentPage, setTotalPages } =
    usePaginationStore()
  //table states
  const [visibleActionIndex, setVisibleActionIndex] = useState<number>(-1)
  //modal states
  const [categoryForm, setCategoryForm] =
    useState<CategoryForm>(initialCategoryForm)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isUpdateModal, setIsUpdateModal] = useState<boolean>(false)
  //search bar state
  const [searchString, setSearchString] = useState<string>()
  const keywords = useDebounce(searchString)
  //handle table functions
  const categories = useSWRCustom<ResponseData<Category>>('categories', () =>
    categoryService.getAllCategories()
  )
  //handle modal functions
  const handleModalClose = () => {
    setIsModalOpen(false)
  }
  const handleAddModalOpen = () => {
    setCategoryForm(initialCategoryForm)
    setIsModalOpen(true)
    setIsUpdateModal(false)
  }

  const handleUpdateModalOpen = (currentCategory: Category) => {
    setIsModalOpen(true)
    setIsUpdateModal(true)
    setVisibleActionIndex(-1)
    setCategoryForm({
      id: currentCategory.id + '',
      name: currentCategory.name,
      description: currentCategory.description ?? '',
    })
  }

  const handleAddCategory = async () => {
    let formData = getFormData()
    try {
      await categoryService.createCategory(formData)
      mutate('categories')
      showToast('success', 'Create new category successfully')
      setIsModalOpen(false)
    } catch (e: any) {
      console.log(e.message)
      showToast('error', 'Failed to create new category')
    }
  }

  const handleUpdateAccount = async () => {
    let formData = getFormData()
    try {
      await categoryService.updateCategory(categoryForm.id, formData)
      let currentCategory = categories.data!.data.find(
        (c) => c.id === parseInt(categoryForm.id)
      )
      currentCategory = {
        ...currentCategory!,
        name: categoryForm.name,
        description: categoryForm.description,
      }
      let newData = categories.data!.data.map((category) => {
        if (category.id === currentCategory.id) return currentCategory
        return category
      })
      mutate<ResponseData<Category>>(
        'categories',
        { ...categories.data!, data: newData },
        false
      )
      showToast('success', 'Update account successfully')
      setIsModalOpen(false)
    } catch (e) {
      showToast('error', 'Failed to create new account')
    }
  }

  const handleToggleStatus = async (currentCategory: Category) => {
    setVisibleActionIndex(-1)
    try {
      await categoryService.toggleStatus(currentCategory.id + '')
      let updatedCategory = {
        ...currentCategory,
        isActive: !currentCategory.isActive,
      }
      let newData = categories.data?.data.map((category) => {
        if (category.id === currentCategory.id) return updatedCategory
        return category
      })
      if (categories.data && newData) {
        mutate<ResponseData<Category>>(
          'categories',
          { ...categories.data, data: newData },
          false
        )
      }
      showToast('success', 'Change category status successfully')
    } catch (e) {
      console.log(e)
      showToast('error', 'Failed to change category status')
    }
  }
  const getFormData = (): FormData => {
    let formData = new FormData()
    formData.append('name', categoryForm.name)
    formData.append('description', categoryForm.description)
    return formData
  }
  //search bar function
  const handleFetchData = async (currentPage: number = 1) => {
    let params = {
      searchString: keywords ?? '',
      page: currentPage,
      size: 7,
    }
    try {
      let response: ResponseData<Category> =
        await categoryService.getAllCategories(params)
      setCurrentPage(currentPage)
      mutate('categories', response, false)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (pageName !== 'category') {
      setCurrentPage(1)
      setPageName('category')
    }

    if (categories.data) {
      setTotalPages(categories.data.totalPages)
    }
    if (keywords !== undefined) {
      handleFetchData(1)
    }
  }, [categories.data, keywords])

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

  if (categories.isLoading) return <Loading />
  if (categories.error || !categories.data)
    return <div className="p-3">Failed to loading data</div>
  return (
    <AdminLayout onChangeSearchString={setSearchString}>
      <Table
        tableHeader={{
          ...initialTableHeader,
          tableSize: categories.data.data.length ?? 0,
        }}
        handleOpenAddForm={handleAddModalOpen}
        hasAddButton
      >
        {categories.data.data.map((row, index) => (
          <React.Fragment key={row.id}>
            <tr>
              <td className="table-row-content small text-center">
                {index + 1}
              </td>
              <td className="table-row-content small text-center">
                {row.name}
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
        onCreate={handleAddCategory}
        onUpdate={handleUpdateAccount}
        update={isUpdateModal}
      >
        <h5 className="text-center text-uppercase mb-2">Add new Category</h5>
        <div className="form-group mb-3">
          <label className="text-uppercase font-weight-bold">
            Category name:
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter category name"
            value={categoryForm.name}
            onChange={(e) =>
              setCategoryForm({ ...categoryForm, name: e.target.value })
            }
          />
        </div>
        <div className="form-group mb-4">
          <label className="text-uppercase font-weight-bold">
            Description:
          </label>
          <textarea
            className="form-control"
            placeholder="Enter description"
            onChange={(e) =>
              setCategoryForm({ ...categoryForm, description: e.target.value })
            }
          >
            {categoryForm.description}
          </textarea>
        </div>
      </FormModal>
    </AdminLayout>
  )
}

export default page
