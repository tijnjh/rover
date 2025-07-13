import { useIonToast } from '@ionic/react'
import { haptic } from 'ios-haptics'

export function formatNumber(number: number) {
  if (number <= 1000) {
    return number
  }

  if (number <= 1000000) {
    const num = number / 1000
    return `${num.toFixed(1)}K`
  }

  const num = number / 1000000
  return `${num.toFixed(1)}M`
}

export function presentError(message: string) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [present] = useIonToast()

  haptic.error()

  present({
    message: `Failed to load post: ${message}`,
    animated: true,
    color: 'danger',
    position: 'top',
    duration: 2000,
  })
}
