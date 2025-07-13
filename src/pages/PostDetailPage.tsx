import type * as Reddit from '@/lib/reddit-types.ts'
import { IonBackButton, IonButtons, IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { useQuery } from '@tanstack/react-query'
import { haptic } from 'ios-haptics'
import { effetch } from 'tsuite'
import LoadingIndicator from '@/components/common/LoadingIndicator'
import Comment from '@/components/features/comment/Comment'
import Post from '@/components/features/post/Post'
import { useAuth } from '@/lib/auth-context'
import { presentError } from '@/lib/utils'

type PostDetailResult = [
  {
    data: {
      children: [Reddit.Link]
    }
  },
  {
    data: {
      children: [Reddit.Comment]
    }
  },
]

export default function PostDetailPage({
  subreddit,
  id,
}: {
  subreddit: string
  id: string
}) {
  const { apiBase } = useAuth()

  const { data, error, isPending } = useQuery({
    queryKey: [`detail-${id}`],
    queryFn: () =>
      effetch<PostDetailResult>(
        `${apiBase}/r/${subreddit}/comments/${id}.json`,
      ),
  })

  if (error) {
    haptic.error()
    presentError('Failed to load post')
    return
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Back" />
          </IonButtons>
          <IonTitle>
            {data?.[0].data.children[0].data.num_comments}
            {' '}
            Comments
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent color="light">
        {isPending
          ? <LoadingIndicator />
          : (
              <>
                <IonList className="mb-4!">
                  <Post post={data[0].data.children[0]} inDetail />
                </IonList>

                <IonList>
                  {data[1]?.data.children.map((comment: Reddit.Comment) => (
                    <Comment key={comment.data.id} comment={comment} />
                  ))}
                </IonList>
              </>
            )}
      </IonContent>
    </IonPage>
  )
}
