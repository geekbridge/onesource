import { TgUserT } from 'api/src/db/schema'
import { CreateTgUserBodyT } from 'api/src/modules/tg-users'

import { api } from './api'

export async function createTgUser(newTgUserData: CreateTgUserBodyT) {
  return (await api.post<TgUserT>(`/tg-users`, newTgUserData)).data
}

export async function getTgUserById(tgId: TgUserT['tgId']) {
  return (await api.get<TgUserT>(`/tg-users/${tgId}`)).data
}
