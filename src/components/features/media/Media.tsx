import type * as Reddit from '@/lib/reddit-types.ts'
import { IonIcon } from '@ionic/react'
import { useIntersectionObserver } from '@uidotdev/usehooks'
import { cn } from 'cnfn'
import { volumeHigh, volumeMute } from 'ionicons/icons'
import { useEffect, useRef, useState } from 'react'

export default function Media({ post, className }: { post: Reddit.Link, className?: string }) {
  if (post.data.post_hint === 'image') {
    return Image({ post, className })
  }

  if (post.data.post_hint === 'hosted:video') {
    return Video({ post, className })
  }

  if (post.data.is_gallery) {
    return Gallery({ post, className })
  }
}

function Image({ post, className }: { post: Reddit.Link, className?: string }) {
  return (
    <img
      loading="lazy"
      src={post.data.url}
      alt={`${post.data.subreddit_name_prefixed} - ${post.data.title}`}
      className={cn('w-full object-contain', className)}
      draggable="false"
      style={{
        aspectRatio: `
          ${post.data.preview.images[0].source.width}
          /
          ${post.data.preview.images[0].source.height}
        `,
      }}
    />
  )
}

function Video({ post, className }: { post: Reddit.Link, className?: string }) {
  const video = useRef<HTMLVideoElement>(null)
  const audio = useRef<HTMLVideoElement>(null)

  const [hasAudio, setHasAudio] = useState(true)
  const [isMuted, setIsMuted] = useState(true)

  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: '0px',
  })

  const [isPaused, setIsPaused] = useState<boolean>(true)

  useEffect(() => {
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setIsPaused(!entry?.isIntersecting)
  }, [entry])

  useEffect(() => {
    if (video.current && audio.current) {
      video.current[isPaused ? 'pause' : 'play']()
      audio.current[isPaused ? 'pause' : 'play']()
    }
  }, [isPaused])

  return (
    <div className={cn('relative block isolate bg-[var(--gray-6)]', className)} ref={ref}>
      {hasAudio && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            setIsMuted(prev => !prev)
          }}
          className="absolute z-[999] text-white flex top-auto items-center justify-center p-2 rounded-md size-10 bg-black/80 bottom-2 right-2"
        >
          {isMuted ? <IonIcon icon={volumeMute} /> : <IonIcon icon={volumeHigh} />}
        </button>
      )}

      <video
        loop
        draggable={false}
        ref={video}
        onPause={() => {
          setIsPaused(true)
        }}
        onPlay={() => {
          setIsPaused(false)
        }}
        playsInline
        style={{ aspectRatio: `${post.data.preview.images[0].source.width}/${post.data.preview.images[0].source.height}` }}
        className="max-h-full w-full   mx-auto"
      >
        <source src={`${post.data.url}/DASH_1080.mp4`} type="video/mp4" />
        <source src={`  ${post.data.url}/DASH_720.mp4`} type="video/mp4" />
        <source src={`${post.data.url}/DASH_480.mp4`} type="video/mp4" />
        <source src={`${post.data.url}/DASH_360.mp4`} type="video/mp4" />
        <source src={`${post.data.url}/DASH_270.mp4`} type="video/mp4" />
        <source src={`${post.data.url}/DASH_220.mp4`} type="video/mp4" />

        <track kind="captions" />
      </video>

      <video
        muted={isMuted}
        loop
        playsInline
        className="hidden"
        onPause={() => video.current?.pause()}
        ref={audio}
      >
        <source
          src={`${post.data.url}/DASH_AUDIO_64.mp4`}
          type="audio/mp4"
          onError={() => setHasAudio(false)}
        />
      </video>
    </div>
  )
}

function Gallery({ post, className }: { post: Reddit.Link, className?: string }) {
  // const items = post.data.gallery_data.items

  // WIP

  // return (
  //   <div className={cn(className)}>
  //     {items.map(item => (
  //       <img
  //         key={item.media_id}
  //         src={post.data.media_metadata[item.media_id].s.u.replaceAll('&amp;', '&')}
  //         loading="lazy"
  //         draggable="false"
  //         alt={`${post.data.subreddit_name_prefixed} - ${post.data.title}`}
  //       />
  //     ))}

  //     {/* <img src={post.data.media_metadata[0]} /> */}
  //   </div>
  // )

  return <>galleries are WIP</>
}
