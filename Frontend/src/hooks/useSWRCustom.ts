import useSWR from 'swr'
const useSWRCustom = <T>(key: string, fetcher: any) => {
  const { data, error, isLoading } = useSWR<T>(key, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  })
  return { data, error, isLoading }
}

export default useSWRCustom
