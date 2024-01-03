import { InsertUserT, UserT } from 'api/src/db/schema'

import { api } from './api'

export async function createUser(newUserData: InsertUserT) {
  return (await api.post<UserT>(`/users`, newUserData)).data
}

export async function getUserById(id: UserT['id']) {
  return (await api.get<UserT>(`/users/${id}`)).data
}
