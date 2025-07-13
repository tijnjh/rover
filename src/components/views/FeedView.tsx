/* eslint-disable react-hooks-extra/no-direct-set-state-in-use-effect */
import type * as Reddit from '@/lib/reddit-types.ts'
import { IonContent, IonInfiniteScroll, IonInfiniteScrollContent, IonList, useIonToast } from '@ionic/react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { effetch } from 'tsuite'
import LoadingIndicator from '@/components/common/LoadingIndicator'
import Post from '@/components/features/post/Post'
import { useAuth } from '@/lib/auth-context'
import { presentError } from '@/lib/utils'

const POST_LIMIT = 8

export type SortOptions = 'best' | 'hot' | 'new' | 'top:hour' | 'top:day' | 'top:week' | 'top:month' | 'top:year' | 'top:all'

export default function FeedView({ queryKey, path, sort }: { queryKey: string[], path: string, sort?: SortOptions }) {
  const [entries, setEntries] = useState<Reddit.Link[]>([])
  const [lastEntryId, setLastEntryId] = useState<string>()
  const { apiBase } = useAuth()

  function getSortConfig() {
    if (!sort)
      return { pathSegment: '' }

    if (sort.startsWith('top:')) {
      const timePeriod = sort.split(':')[1]
      return {
        pathSegment: '/top',
        params: { t: timePeriod },
      }
    }

    return {
      pathSegment: `/${sort}`,
    }
  }

  function getRequestUrl() {
    const { pathSegment, params } = getSortConfig()

    const queryParams = new URLSearchParams({ limit: String(POST_LIMIT), ...params })

    if (lastEntryId) {
      queryParams.set('after', `t3_${lastEntryId}`)
    }

    return `${apiBase}${path}${pathSegment}?${queryParams.toString()}`
  }

  const { isPending, error, data, refetch, isRefetching, isRefetchError } = useQuery({
    queryKey,
    queryFn: () => effetch<Reddit.Thing & { data: { children: Reddit.Link[] } }>(getRequestUrl()),
    placeholderData: keepPreviousData,
  })

  useEffect(() => {
    refetch()
    setEntries([])
    setLastEntryId(undefined)
    console.log('Refetching feed with sort:', sort)
  }, [sort, refetch])

  const [present] = useIonToast()

  useEffect(() => {
    console.log(isPending)
  }, [isPending])

  useEffect(() => {
    if (data?.data.children) {
      setEntries(prevEntries => [...prevEntries, ...data.data.children])

      if (data.data.children.length > 0) {
        setLastEntryId(
          data.data.children[data.data.children.length - 1].data.id,
        )
      }
    }
  }, [data])

  if (error) {
    presentError('Error loading posts')
    return (
      <IonContent>
        <p className="mx-auto w-fit">Error loading posts.</p>
      </IonContent>
    )
  }

  if ((isPending && entries.length === 0) || isRefetching) {
    return <LoadingIndicator />
  }

  if (entries.length === 0) {
    refetch()
  }

  return (
    <>
      <IonList style={{ backgroundColor: 'transparent' }}>
        {entries.map(post => <Post key={post.data.id} post={post} />)}
      </IonList>

      <IonInfiniteScroll
        onIonInfinite={(event) => {
          refetch()
            .then(() => {
              event.target.complete()
            })
            .catch(() => {
              event.target.complete()
              present({
                message: 'Failed to load more posts.',
                duration: 2000,
              })
            })
        }}
      >
        <IonInfiniteScrollContent />
      </IonInfiniteScroll>
    </>
  )
}
