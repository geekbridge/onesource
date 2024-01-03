import { InsertTgUserT, TgUserT } from 'api/src/db/schema'
import { api } from './api'

export async function createTgUser(newTgUserData: InsertTgUserT) {
  return (await api.post<TgUserT>(`/tg-users`, newTgUserData)).data
}

export async function getTgUserById(id: number) {
  return (await api.get<TgUserT>(`/tg-users/${id}`)).data
}
