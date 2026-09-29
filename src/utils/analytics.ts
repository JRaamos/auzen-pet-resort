export type AnalyticsEventName = 'whatsapp_click' | 'gallery_open' | 'video_toggle'

export interface AnalyticsEventDetail {
  name: AnalyticsEventName
  context: string
}

export const trackEvent = (name: AnalyticsEventName, context: string) => {
  window.dispatchEvent(
    new CustomEvent<AnalyticsEventDetail>('auzen:analytics', {
      detail: { name, context },
    }),
  )
}
