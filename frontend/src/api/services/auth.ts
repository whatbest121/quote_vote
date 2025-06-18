import { ServerError } from "@/errors"
import { sleep } from "@/lib/utils"
import { useMutation } from "@tanstack/react-query"
import { AuthService, CreateUserDto } from "../generated"


async function loginAuth(payload: CreateUserDto) {
	console.log("🚀 ~ loginAuth ~ payload:", payload)
	await sleep(500)
	try {
		const a = await AuthService.authControllerLogin(payload)
		return a
	} catch (error) {
		if (error instanceof Error) {
			if (error.message === "Failed to fetch") {
				throw new ServerError()
			}
			throw error
		}
		throw error
	}
}
export default function useAuth() {
	return useMutation({
		mutationFn: loginAuth,
		retry: false,
	})
}
