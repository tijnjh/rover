import type * as Reddit from '@/lib/reddit-types.ts'
import { IonContent, IonInfiniteScroll, IonInfiniteScrollContent, IonList, useIonToast } from '@ionic/react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { haptic } from 'ios-haptics'
import { useEffect, useState } from 'react'
import { effetch } from 'tsuite'
import LoadingIndicator from '@/components/common/LoadingIndicator'
import Post from '@/components/features/post/Post'

const POST_LIMIT = 8

export default function FeedView({ queryKey, url }: { queryKey: string[], url: string }) {
  const [entries, setEntries] = useState<Reddit.Link[]>([])
  const [lastEntryId, setLastEntryId] = useState<string>()

  const { isPending, error, data, refetch } = useQuery({
    queryKey,
    queryFn: () =>
      effetch<Reddit.Thing & { data: { children: Reddit.Link[] } }>(
        `${url}?limit=${POST_LIMIT}&after=t3_${lastEntryId ?? '0'}`,
      ),
    placeholderData: keepPreviousData,
  })

  const [present] = useIonToast()

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
    haptic.error()
    present({
      message: `Failed to load post: ${error}`,
    })
    return (
      <IonContent>
        <p className="mx-auto w-fit">Error loading posts.</p>
      </IonContent>
    )
  }

  if (isPending && entries.length === 0) {
    return <LoadingIndicator />
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
