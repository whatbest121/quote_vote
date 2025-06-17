import { ServerError } from "@/errors"
import { sleep } from "@/lib/utils"
import { useMutation } from "@tanstack/react-query"
import { AuthService, CreateUserDto } from "../generated"


async function register(payload: CreateUserDto) {
	await sleep(500)
	try {
		const a = await AuthService.authControllerRegister(payload)
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
export default function registerAuth() {
	return useMutation({
		mutationFn: register,
		retry: false,
	})
}
