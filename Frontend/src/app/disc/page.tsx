'use client'
import React, { useEffect, useState } from 'react'
import Table from '@/components/Table'
import AdminLayout from '@/layouts/AdminLayout'
import FormModal from '@/components/FormModal'
import useSWRCustom from '@/hooks/useSWRCustom'
import { productService } from '@/services/disc.service'
import { categoryService } from '@/services/category.service'
import Loading from '@/components/Loading'
import showToast from '@/utils/showToast'
import { mutate } from 'swr'
import useDebounce from '@/hooks/useDebounce'
import { formatDate } from '@/utils/formatDate'
import usePaginationStore from '@/store/usePaginationStore'
import Authentication from '@/components/Authentication'

type DiscForm = {
  id: string
  name: string
  categoryId: string
  author: string
  price: string
  quantity: string
  uploadFiles: FileList | null
  description: string
}

const initialTableHeader = {
  tableName: 'disc',
  tableSize: 0,
  tableColumns: [
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
}

const initialDiscForm: DiscForm = {
  id: '',
  name: '',
  categoryId: '',
  author: '',
  price: '',
  quantity: '',
  uploadFiles: null,
  description: '',
}

const page = () => {
  const { currentPage, pageName, setPageName, setCurrentPage, setTotalPages } =
    usePaginationStore()
  const [isModalOpen, setIsModelOpen] = useState<boolean>(false)
  const [discForm, setDiscForm] = useState<DiscForm>(initialDiscForm)
  const [isUpdate, SetIsUpdate] = useState<boolean>(false)
  const [visibleActionIndex, setVisibleActionIndex] = useState<number>(-1)
  const [searchString, setSearchString] = useState<string>()
  const keyword = useDebounce(searchString)

  //call API
  const categoryData = useSWRCustom<ResponseData<Category>>('categories', () =>
    categoryService.getAllCategories()
  )
  const { data, error, isLoading } = useSWRCustom<ResponseData<Disc>>(
    'discs',
    () => productService.getAllProducts()
  )

  const handleSetDiscForm = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    key: keyof DiscForm
  ) => {
    var newDisForm = { ...discForm }
    switch (key) {
      case 'id':
        break
      case 'uploadFiles':
        newDisForm.uploadFiles = (
          event as React.ChangeEvent<HTMLInputElement>
        ).target?.files
        break
      case 'categoryId':
        newDisForm[key] = (
          event as React.ChangeEvent<HTMLSelectElement>
        ).target?.value
        break
      case 'description':
        newDisForm[key] = (
          event as React.ChangeEvent<HTMLTextAreaElement>
        ).target?.value
        break
      default:
        newDisForm[key] = (
          event as React.ChangeEvent<HTMLInputElement>
        ).target?.value
        break
    }
    setDiscForm(newDisForm)
  }

  const createFormData = (): FormData => {
    const formData = new FormData()
    formData.append('name', discForm.name)
    formData.append('categoryId', discForm.categoryId + '')
    formData.append('author', discForm.author)
    formData.append('price', discForm.price + '')
    formData.append('description', discForm.description)
    if (discForm.uploadFiles && discForm.uploadFiles.length > 0) {
      for (let i = 0; i < discForm.uploadFiles.length; i++) {
        formData.append('upload', discForm.uploadFiles[i])
      }
    }
    return formData
  }

  const handleCloseForm = () => {
    setDiscForm({
      ...initialDiscForm,
      categoryId: categoryData.data?.data[0].id + '',
    })
    setIsModelOpen(false)
  }

  const handleOpenAddForm = () => {
    SetIsUpdate(false)
    setIsModelOpen(true)
  }

  const handleOpenUpdateForm = async (currentDisc: Disc) => {
    const newFormDisc: DiscForm = {
      id: currentDisc!.id,
      name: currentDisc!.name,
      categoryId: currentDisc!.category.id + '',
      author: currentDisc!.author,
      price: currentDisc!.price + '',
      quantity: currentDisc!.quantity + '',
      uploadFiles: null,
      description: currentDisc?.description ?? '',
    }
    setDiscForm(newFormDisc)
    SetIsUpdate(true)
    setIsModelOpen(true)
    setVisibleActionIndex(-1)
  }

  const handleSubmitDiscForm = async () => {
    const formData = createFormData()
    try {
      const response = await productService.createProduct(formData)
      showToast('success', 'Add new disc successfully')
      mutate('discs')
      setDiscForm({
        ...initialDiscForm,
        categoryId: categoryData.data?.data[0].id + '',
      })
      setIsModelOpen(false)
    } catch (err) {
      showToast('error', 'Failed to add new disc')
    }
  }

  const handleUpdateDiscForm = async () => {
    const formData = createFormData()
    formData.append('id', discForm.id)
    formData.append('quantity', discForm.quantity)
    try {
      const response = await productService.updateProduct(formData)
      let updateDisc = data?.data.find((disc) => disc.id === discForm.id)
      let currentCategory = categoryData?.data?.data.find(
        (c) => c.id === parseInt(discForm.categoryId)
      )
      if (updateDisc && currentCategory) {
        updateDisc = {
          ...updateDisc,
          name: discForm.name,
          category: currentCategory,
          author: discForm.author,
          price: parseInt(discForm.price),
          description: discForm.description,
          quantity: parseInt(discForm.quantity),
          attachments: response.attachments,
        }
      }
      let newDiscData = data?.data.map((disc) => {
        if (disc.id === updateDisc?.id) return updateDisc
        return disc
      })
      mutate('discs', { ...data, data: newDiscData }, false)
      showToast('success', 'Update disc successfully')
      setDiscForm({
        ...initialDiscForm,
        categoryId: categoryData.data?.data[0].id + '',
      })
      setIsModelOpen(false)
    } catch (err: any) {
      showToast('error', err.message)
    }
  }

  const handleToggleDiscStatus = async (discId: number) => {
    try {
      setVisibleActionIndex(-1)
      await productService.toggleStatusProduct(discId)
      let newData = data?.data.map((disc) => {
        if (disc.id === discId) {
          return { ...disc, isActive: !disc.isActive }
        }
        return disc
      })
      mutate('discs', { ...data, data: newData }, false)
      showToast('success', 'Change disc status successfully')
    } catch (err) {
      console.log(err)
      showToast('error', 'Failed to change disc status')
    }
  }

  const handleFetchData = async (page: number = 1) => {
    let params = {
      searchString: keyword ?? '',
      categoryId: 0,
      page: page,
      size: 10,
    }
    try {
      console.log('on fetch data')
      const response = await productService.getAllProducts(params)
      mutate<ResponseData<Disc>>('discs', response, false)
      setTotalPages(response.totalPages)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (pageName !== 'disc') {
      setCurrentPage(1)
      setPageName('disc')
    }
    if (data && categoryData.data) {
      setTotalPages(data.totalPages)
      setDiscForm({
        ...discForm,
        categoryId: categoryData.data.data[0].id + '',
      })
    }
  }, [data, categoryData.data])

  useEffect(() => {
    if (keyword !== undefined) {
      handleFetchData(1)
    }
  }, [keyword])

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

  if (isLoading) return <Loading />
  if (error || !data) return <div className="p-3">Failed to loading data</div>
  return (
    <AdminLayout onChangeSearchString={setSearchString}>
      <Table
        tableHeader={{
          ...initialTableHeader,
          tableSize: data.data.length,
        }}
        handleOpenAddForm={handleOpenAddForm}
        hasAddButton
      >
        {data.data.map((row, index) => (
          <React.Fragment key={index}>
            <tr>
              <td className="table-row-content small text-center">
                {index + 1}
              </td>
              <td className="table-row-content small text-center">
                {row.name}
              </td>
              <td className="table-row-content small text-center">
                {row.category.name}
              </td>
              <td className="table-row-content small text-center">
                {row.author}
              </td>
              <td className="table-row-content small text-center">
                {row.price}
              </td>
              <td className="table-row-content small text-center">
                {row.quantity}
              </td>
              <td className="table-row-content small text-center">
                {row.attachments && row.attachments.length != 0 && (
                  <img
                    src={
                      row.attachments && row.attachments.length > 0
                        ? `https://localhost:7090/${row.attachments[0].path}`
                        : ''
                    }
                    width="40em"
                    alt="img"
                  />
                )}
              </td>
              <td className="table-row-content small text-center">
                {formatDate(new Date(row.createdAt), 2)}
              </td>
              <td className="table-row-content small text-center">
                {row.isActive ? 'active' : 'inactive'}
              </td>

              <td
                className="table-row-content small text-center "
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
                        onClick={() => handleOpenUpdateForm(row)}
                      >
                        <i className="bi bi-pencil-square"></i> Edit
                      </button>
                    </li>
                    <li>
                      <button
                        className="btn"
                        onClick={() => handleToggleDiscStatus(row.id)}
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
        onClose={handleCloseForm}
        onCreate={handleSubmitDiscForm}
        onUpdate={handleUpdateDiscForm}
        update={isUpdate}
      >
        <h5 className="text-center text-uppercase mb-2">
          Add new {initialTableHeader.tableName}
        </h5>
        <div className="form-group mb-3">
          <label className="text-uppercase font-weight-bold">Disc name:</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter disc name"
            value={discForm.name}
            onChange={(e) => handleSetDiscForm(e, 'name')}
          />
        </div>
        <div className="form-group mb-4">
          <label className="text-uppercase font-weight-bold">Category:</label>
          <select
            className="form-control"
            value={discForm.categoryId}
            onChange={(e) => handleSetDiscForm(e, 'categoryId')}
          >
            {categoryData.data &&
              categoryData.data.data.map((c) => (
                <option value={c.id}>{c.name}</option>
              ))}
          </select>
        </div>

        <div className="form-group mb-4">
          <label className="text-uppercase font-weight-bold">Author:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter author name"
            value={discForm.author}
            onChange={(e) => handleSetDiscForm(e, 'author')}
          />
        </div>
        <div className="form-group mb-4">
          <label className="text-uppercase font-weight-bold">Price:</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter disc price"
            value={discForm.price}
            onChange={(e) => handleSetDiscForm(e, 'price')}
          />
        </div>

        {isUpdate && (
          <div className="form-group mb-4">
            <label className="text-uppercase font-weight-bold">Quantity:</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter disc price"
              value={discForm.quantity}
              onChange={(e) => handleSetDiscForm(e, 'quantity')}
            />
          </div>
        )}

        <div className="form-group mb-4">
          <label className="text-uppercase font-weight-bold">
            Upload image:
          </label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => handleSetDiscForm(e, 'uploadFiles')}
            multiple
          />
        </div>
        <div className="form-group mb-4">
          <label className="text-uppercase font-weight-bold">Description</label>
          <textarea
            className="form-control"
            placeholder="Enter description here"
            onChange={(e) => handleSetDiscForm(e, 'description')}
          >
            {discForm.description}
          </textarea>
        </div>
      </FormModal>
    </AdminLayout>
  )
}

export default page
