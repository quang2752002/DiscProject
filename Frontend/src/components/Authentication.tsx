'use client'
import React, { useEffect } from 'react'
import '@/layouts/layout.css'
import { getAuthor } from '@/utils/getAuthor'
import { useRouter } from 'next/navigation'
import showToast from '@/utils/showToast'
import Loading from './Loading'

type Props = {
  children: React.ReactNode
}

const Authentication: React.FC<Props> = ({ children }) => {
  const router = useRouter()
  const { isAuthored } = getAuthor()
  useEffect(() => {
    if (!isAuthored) {
      showToast('error', 'Access denied')
      router.push('/login')
    }
  }, [router])
  if (!isAuthored) return <Loading />
  return <>{children}</>
}

export default Authentication
