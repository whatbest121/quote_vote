import { type Action, type State, useSystemStore } from "@/stores/system"
import * as React from "react"
import { getStoredToken } from "./fn"
import { setAccessToken } from "@/lib/utils"

export interface AuthContext {
	isAuthenticated: boolean
	auth: State["auth"]
	login: Action["setLogin"]
	logout: Action["setLogout"]
}

export const AuthContext = React.createContext<AuthContext | null>(null)

interface AuthProviderProps {
	children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
	const { auth, setLogin, setLogout, setSystem } = useSystemStore()

	const isAuthenticated = !!auth.token
	if (auth.token) {
		setAccessToken(auth.token)
	}

	const logout = setLogout

	const login = setLogin

	React.useEffect(() => {
		const token = getStoredToken()
		setSystem({ auth: { token: getStoredToken() } })
		if (token) {
			setAccessToken(token)
		}
	}, [setSystem])

	return (
		<AuthContext.Provider value={{ isAuthenticated, auth, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}
