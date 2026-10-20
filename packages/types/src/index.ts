import {z} from "zod"
export const TriggerType = z.object({
    zapId : z.string(),
    triggerId:z.string(),
    metadata:z.json()
});

export const ActionType = z.object({
    zapId : z.string(),
    actionId:z.string(),
    metadata:z.json(),
    sortingOrder : z.number()
});

export const ZapType = z.object({
    triggerId : z.string(),
    userId : z.number()
});

export const CreateZapType = z.object({
    trigger : TriggerType,
    actions : z.array(ActionType)
})

