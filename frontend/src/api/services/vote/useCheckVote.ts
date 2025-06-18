import { VoteService } from "@/api/generated"
import { useQuery } from "@tanstack/react-query"

export const QKey = "useCheckVote"
async function queryFn(id: string) {

    try {
        const data = await VoteService.voteControllerChackVote()
        return data
    } catch (error: any) {
        throw new error
    }
}

export default function useCheckVote(id: string) {
    return useQuery({
        queryKey: [QKey],
        queryFn: () => queryFn(id)
    })
}
