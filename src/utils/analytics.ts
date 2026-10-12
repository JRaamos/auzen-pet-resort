import { pageMetadata } from '../config/seo'
import { siteConfig } from '../config/site'

export type AnalyticsEventName = 'page_view' | 'view_hotel' | 'view_daycare' | 'whatsapp_click' | 'phone_click' | 'email_click' | 'location_click' | 'cta_click' | 'gallery_open' | 'video_toggle' | 'reservation_start'
type Consent = 'granted' | 'denied'
type Params = Record<string, string | boolean>
declare global {
  interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void }
}
const consentKey = 'auzen:consent:v1'
const attributionKey = 'auzen:attribution:v1'
const measurementId = import.meta.env.VITE_GA4_ID || ''
const containerId = import.meta.env.VITE_GTM_ID || ''
export const analyticsConfigured = /^G-[A-Z0-9]+$/.test(measurementId) || /^GTM-[A-Z0-9]+$/.test(containerId)
let initialized = false
let lastPage = ''
let currentPath = '/'
let currentTitle = ''
let attribution: Record<string, string> = {}

// Accept only Auzen campaign vocabulary, never arbitrary user-provided query text.
const campaignValues: Record<string, string[]> = {
  utm_source: ['google', 'instagram', 'facebook', 'google_business', 'bing', 'apple'],
  utm_medium: ['cpc', 'organic', 'social', 'referral'],
  utm_campaign: ['auzen_pesquisa_local_teste_01', 'perfil_empresa', 'social_organico'],
  utm_content: ['hotel', 'creche', 'bio', 'post_01', 'post_02', 'post_03', 'post_04', 'post_05', 'post_06', 'post_07'],
}
export function safeAttribution(search: string) {
  const query = new URLSearchParams(search)
  const result: Record<string, string> = {}
  for (const [key, allowed] of Object.entries(campaignValues)) {
    const value = query.get(key)
    if (value && allowed.includes(value)) result[key] = value
  }
  const clickId = query.get('gclid')
  if (clickId && /^[a-zA-Z0-9_-]{20,200}$/.test(clickId)) result.gclid = clickId
  return result
}
export function readConsent(): Consent | null {
  if (typeof window === 'undefined') return null
  try {
    const choice = JSON.parse(localStorage.getItem(consentKey) || 'null')
    return choice && ['granted', 'denied'].includes(choice.value) && Date.now() - choice.at < 180 * 86400000 ? choice.value : null
  } catch { return null }
}
function command(...args: unknown[]) { window.gtag?.(...args) }
export function openConsentPreferences() { window.dispatchEvent(new Event('auzen:open-consent')) }
function captureAttribution() {
  const incoming = safeAttribution(window.location.search)
  try {
    const stored = JSON.parse(sessionStorage.getItem(attributionKey) || '{}')
    attribution = Object.keys(incoming).length ? incoming : Object.keys(attribution).length ? attribution : safeAttribution(new URLSearchParams(stored).toString())
    sessionStorage.setItem(attributionKey, JSON.stringify(attribution))
  } catch { attribution = incoming }
}
function initialize() {
  if (initialized || !analyticsConfigured || readConsent() !== 'granted') return
  initialized = true
  window.dataLayer = window.dataLayer || []
  // Google's queue contract uses Arguments objects, not event payload objects.
  // eslint-disable-next-line prefer-rest-params
  window.gtag = function () { window.dataLayer!.push(arguments) }
  command('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' })
  command('consent', 'update', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' })
  command('set', 'ads_data_redaction', true)
  captureAttribution()
  const script = document.createElement('script')
  script.async = true
  script.id = 'auzen-analytics-script'
  if (/^GTM-[A-Z0-9]+$/.test(containerId)) {
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
    script.src = `https://www.googletagmanager.com/gtm.js?id=${containerId}`
  } else {
    command('js', new Date())
    command('config', measurementId, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, page_location: safePageLocation(), page_referrer: safeReferrer() })
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  }
  document.head.appendChild(script)
}
function safeReferrer() {
  try { return new URL(document.referrer).origin } catch { return '' }
}
function safePath(path: string) { return pageMetadata[path] ? path : '/404' }
function safePageLocation() {
  const query = new URLSearchParams(attribution).toString()
  return `${siteConfig.siteUrl}${safePath(currentPath)}${query ? `?${query}` : ''}`
}
export function setConsent(value: Consent) {
  try { localStorage.setItem(consentKey, JSON.stringify({ value, at: Date.now() })) } catch { /* Browsers may disable persistence. */ }
  if (value === 'granted') { initialize(); trackPage(currentPath, currentTitle) }
  else {
    command('consent', 'update', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' })
    attribution = {}
    try { sessionStorage.removeItem(attributionKey) } catch { /* optional storage */ }
    for (const cookie of document.cookie.split(';')) {
      const key = cookie.split('=')[0].trim()
      if (!/^(_ga|_gid|_gat|_gcl)/.test(key)) continue
      for (const domain of ['', window.location.hostname, `.${window.location.hostname}`, '.auzenpetresort.com.br'])
        document.cookie = `${key}=; Max-Age=0; Path=/${domain ? `; Domain=${domain}` : ''}`
    }
    // Unload vendor scripts and their automatic listeners after revocation.
    if (initialized) window.location.reload()
  }
  window.dispatchEvent(new Event('auzen:consent-change'))
}
export function trackEvent(name: AnalyticsEventName, context: string, service = 'general') {
  if (typeof window === 'undefined' || readConsent() !== 'granted' || !analyticsConfigured) return
  initialize()
  const params: Params = {
    page_path: safePath(currentPath), page_location: safePageLocation(),
    button_location: /^[a-z_]{1,40}$/.test(context) ? context : 'other',
    service: ['hotel', 'daycare'].includes(service) ? service : 'general',
    ...Object.fromEntries(Object.entries(attribution).filter(([key]) => key !== 'gclid')),
  }
  if (name === 'page_view') { params.page_title = currentTitle; params.page_referrer = lastPage || safeReferrer() }
  if (import.meta.env.VITE_ANALYTICS_DEBUG === 'true') params.debug_mode = true
  if (/^GTM-[A-Z0-9]+$/.test(containerId)) window.dataLayer!.push({ event: name, ...params })
  else command('event', name, params)
  window.dispatchEvent(new CustomEvent('auzen:analytics', { detail: { name, ...params } }))
}
export function trackPage(path: string, title: string) {
  // Keep the landing attribution only in memory until the visitor accepts storage.
  if (!Object.keys(attribution).length && typeof window !== 'undefined') attribution = safeAttribution(window.location.search)
  currentPath = path
  currentTitle = title
  if (readConsent() !== 'granted' || !analyticsConfigured) return
  initialize()
  if (lastPage === `${siteConfig.siteUrl}${safePath(path)}`) return
  trackEvent('page_view', 'page')
  lastPage = `${siteConfig.siteUrl}${safePath(path)}`
  if (path === '/hotel') trackEvent('view_hotel', 'page', 'hotel')
  if (path === '/creche') trackEvent('view_daycare', 'page', 'daycare')
}
// One delegated handler covers CTAs, including the validated booking handoff.
export function installClickTracking() {
  const handler = (event: MouseEvent) => {
    const link = event.target instanceof Element ? event.target.closest('a') : null
    if (!link) return
    const href = link.getAttribute('href') || ''
    if (href.startsWith('https://wa.me/') && event.defaultPrevented) return
    const position = link.dataset.analyticsLocation || (link.closest('footer') ? 'footer' : link.closest('header') ? 'header' : link.hasAttribute('data-floating-contact') ? 'floating_button' : 'content')
    const selected = document.querySelector<HTMLInputElement>('input[name="service"]:checked')?.value
    const service = link.dataset.service || (currentPath === '/hotel' ? 'hotel' : currentPath === '/creche' ? 'daycare' : currentPath === '/reservar' ? selected : 'general')
    if (/^https:\/\/wa\.me\//.test(href)) trackEvent('whatsapp_click', position, service)
    else if (href.startsWith('tel:')) trackEvent('phone_click', position)
    else if (href.startsWith('mailto:')) trackEvent('email_click', position)
    else if (/^https:\/\/(www\.)?google\.com\/maps/.test(href)) trackEvent('location_click', position)
    else if (href.startsWith('/reservar')) trackEvent('reservation_start', position, href.includes('daycare') ? 'daycare' : href.includes('hotel') ? 'hotel' : service)
    else if (href.startsWith('/hotel') || href.startsWith('/creche') || href.startsWith('https://www.instagram.com/')) trackEvent('cta_click', position, service)
  }
  document.addEventListener('click', handler)
  return () => document.removeEventListener('click', handler)
}
