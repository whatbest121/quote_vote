import { setAccessToken } from "@/lib/utils"

const key = "token"

export function getStoredToken() {
	if (typeof window === 'undefined') {
		return null
	}
	return localStorage.getItem(key)
}

export function setStoredToken(token: string | null) {
	if (typeof window === 'undefined') {
		return
	}
	if (token) {
		localStorage.setItem(key, token)
		setAccessToken(token)
	} else {
		localStorage.removeItem(key)
	}
}

