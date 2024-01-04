import { InsertTgUserT, InsertUserT } from '../../db'

export type CreateTgUserBodyT = Pick<
  InsertTgUserT,
  'tgId' | 'username' | 'isBot' | 'isPremium'
> &
  Pick<InsertUserT, 'firstName' | 'lastName' | 'languageCode'>
