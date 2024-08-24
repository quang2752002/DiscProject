import { create } from 'zustand'

interface PaginationState {
  pageName: string
  currentPage: number
  totalPages: number
  handleChangePage: (page: number) => void
  setPageName: (name: string) => void
  setCurrentPage: (page: number) => void
  setTotalPages: (total: number) => void
}

const usePaginationStore = create<PaginationState>((set) => ({
  pageName: '',
  currentPage: 1,
  totalPages: 1,
  handleChangePage: (page: number) => {
    set((state) => ({ currentPage: page }))
  },
  setPageName: (name: string) => set({ pageName: name }),
  setCurrentPage: (page: number) => set({ currentPage: page }),
  setTotalPages: (total: number) => set({ totalPages: total }),
}))

export default usePaginationStore
