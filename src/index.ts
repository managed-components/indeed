import { ComponentSettings, Manager, MCEvent } from '@managed-components/types';

export const sendEvent = (id: string) => ({ client }: MCEvent) => {
  client.fetch(`https://conv.indeed.com/pagead/conv/${id}/?script=0`, {
    credentials: 'include',
    keepalive: true,
    mode: 'no-cors'
  })
}

export default async function (manager: Manager, settings: ComponentSettings) {
  manager.addEventListener('conversion', sendEvent(settings.conversion_id));
}