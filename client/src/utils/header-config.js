import { getAccessToken } from "./auth";

export const config = {
    headers: {
        Authorization: `Bearer ${getAccessToken()}`
    }
}