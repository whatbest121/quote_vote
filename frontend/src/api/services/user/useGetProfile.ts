import { UserService, UserData } from "@/api/generated"
import { useQuery } from "@tanstack/react-query"

export const QKey = "useGetProfile"

async function queryFn() {
    try {
        const data = await UserService.usersControllerGetProfile()
        return data as UserData
    } catch (error: any) {
        throw new error
    }
}

export default function useGetProfile() {
    return useQuery({
        queryKey: [QKey],
        queryFn,
        enabled: false,
        retry: false,
        staleTime: 5 * 60 * 1000, 
    })
} 