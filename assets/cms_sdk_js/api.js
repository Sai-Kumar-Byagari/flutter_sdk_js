export const BaseURL = 'https://cmsdevapi.saven.in'

export const Endpoints = {
    Authentication: '/user/verify/mpin',
    GetBalance: '/card/get/balance',
    GetCardList: '/card/get/list',
    GetCardDetails: '/card/get/details',
    GetTransactions: '/card/get/unbilled/transactions',
    GetCvv: '/card/get/cvv',
    SetLimit: '/card/set/limit',
    GetLimit: '/card/get/limit',
    GetPreference: '/card/get/preference',
    GetStatement: '/card/get/statement',
    RequestPhysicalCard: '/request/physical/card',
    GetDue: '/card/get/due',
    UpdateStatement: '/card/update/statement/date',
    SetPin: '/card/set/pin',
    GetBillingDates: '/card/get/billing_dates',
    LockCard: '/card/lock',
    UnlockCard: '/card/unlock',
}