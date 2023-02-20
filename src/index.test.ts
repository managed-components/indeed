import { MCEvent } from '@managed-components/types'
import { sendEvent } from '.'

const settings = { conversion_id: '12345' }

const dummyClient = {
  title: 'Zaraz "Test" /t Page',
  timestamp: 1670502437,
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
  language: 'en-GB',
  referer: '',
  ip: '127.0.0.1',
  emitter: 'browser',
  url: new URL('http://127.0.0.1:1337'),
  screenHeight: 1080,
  screenWidth: 2560,
  fetch: () => undefined,
  set: () => undefined,
  execute: () => undefined,
  return: () => {},
  get: () => undefined,
  attachEvent: () => {},
  detachEvent: () => {},
}

describe('Indeed MC conversion event handler works correctly', () => {
  let fetchRequest: any
  const fakeEvent = new Event('conversion', {}) as MCEvent
  fakeEvent.client = {
    ...dummyClient,
    fetch: (url, opts) => {
      fetchRequest = { url, opts }
      return undefined
    },
  }

  sendEvent(settings.conversion_id)(fakeEvent)

  it('creates the request correctly', async () => {
    expect(fetchRequest).toBeTruthy()
    expect(fetchRequest?.opts?.mode).toEqual('no-cors')
    expect(fetchRequest?.opts?.keepalive).toEqual(true)
    expect(fetchRequest?.opts?.credentials).toEqual('include')

    const url = new URL(fetchRequest.url)

    expect(url.origin).toEqual('https://conv.indeed.com')
    expect(url.pathname).toEqual(`/pagead/conv/${settings.conversion_id}/`)
    expect(url.searchParams.get('script')).toEqual('0')
  })
})