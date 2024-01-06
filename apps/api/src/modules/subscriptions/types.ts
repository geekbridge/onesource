import { TgUserT } from '../../db'

export type CreateSubscriptionBodyT = { url: string; tgUserId: TgUserT['tgId'] }

export type GetSubscriptionsBodyT = Pick<TgUserT, 'tgId'>
