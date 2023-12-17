import { NewTgUserT, TgUserT } from 'api'
import { api } from './api'

export async function createTgUser(newTgUserData: NewTgUserT) {
  return (await api.post<TgUserT>(`/tg-users`, newTgUserData)).data
}

export async function getTgUserById(id: number) {
  return (await api.get<TgUserT>(`/tg-users/${id}`)).data
}
