import { allRouter, dashboard } from "./constRouters"
import { getAIResponse } from "./getAIResponse"
import { getStatusColor } from "./getStatusColor"
import {
    saveAuthData,
    removeAuthData,
    getAuthData
} from "./localStore"


export { dashboard, allRouter, saveAuthData, removeAuthData, getAuthData, getAIResponse, getStatusColor }