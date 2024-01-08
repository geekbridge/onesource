import { CreateSubscriptionBodyT } from 'api/src/modules/subscriptions'
import { SubscriptionsT } from 'api/src/db'

import { api } from './api'

export async function subscribe(data: CreateSubscriptionBodyT) {
  return (await api.post<SubscriptionsT>(`/subscriptions`, data)).data
}
