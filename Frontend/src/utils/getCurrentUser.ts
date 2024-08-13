import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
type UserInfo = { name: string; email: string; role: string; exp: Date }
export const getCurrentUser = (): UserInfo | null => {
  let token = Cookies.get('token')
  if (!token) return null
  const decoded = jwtDecode<{ [key: string]: any }>(token!)
  const userInfo = {
    name: decoded.name,
    email: decoded.email,
    role: decoded.role,
    exp: new Date(decoded.exp * 1000),
  }
  return userInfo
}
export default getCurrentUser
