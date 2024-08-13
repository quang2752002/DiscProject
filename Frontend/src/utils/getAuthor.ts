import { RoleName } from '@/constants/Constant'
import getCurrentUser from '@/utils/getCurrentUser'
export const getAuthor = () => {
  var isAuthored = true
  var currentUser = getCurrentUser()
  if (
    !currentUser ||
    currentUser!.role !== RoleName.ADMIN ||
    currentUser!.exp <= new Date()
  ) {
    isAuthored = false
  }
  return { isAuthored, currentUser }
}
