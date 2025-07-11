import { ServerError } from "@/errors"
import { sleep } from "@/lib/utils"
import { useMutation } from "@tanstack/react-query"
import { AuthService, CreateUserDto, LoginResponseDto } from "../generated"


async function loginAuth(payload: CreateUserDto) {
	await sleep(500)
	try {
		const a = await AuthService.authControllerLogin(payload)
		return a as LoginResponseDto
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
