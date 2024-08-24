'use client'
import { useRouter } from 'next/navigation'
import Loading from '@/components/Loading'
import { useEffect } from 'react'
import { getAuthor } from '@/utils/getAuthor'
export default function Home() {
  const { isAuthored } = getAuthor()
  const router = useRouter()
  useEffect(() => {
    if (isAuthored) router.push('/disc')
    else router.push('/login')
  }, [])
  return <Loading />
}
