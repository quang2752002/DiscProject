import { toast } from 'react-toastify'
const showToast = (type: string, content: string) => {
  const toastConfig: any = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'light',
  }
  if (type === 'success') {
    toast.success(content, toastConfig)
  }
  if (type === 'error') {
    toast.error(content, toastConfig)
  }
}
export default showToast
