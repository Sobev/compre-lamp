import { Service } from './request'

export const saveArticle = (text) => {
    return Service.post('/qd/ap/t', text, {
        headers: {
            "Content-Type": "application/text"
        }
    })
}

export const queryAnswer = (param) => {
    return Service.post('/qd/sch', param)
}