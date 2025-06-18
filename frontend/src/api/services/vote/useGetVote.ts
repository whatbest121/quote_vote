import { QuoteService, TestDTO, VoteService } from "@/api/generated"
import { useQuery } from "@tanstack/react-query"

export const QKey = "useGetVote"
async function queryFn(id: string) {

    try {
        const data = await VoteService.voteControllerGetVote(id)
        return data
    } catch (error: any) {
        throw new error
    }
}

export default function useGetVote(id: string) {
    return useQuery({
        queryKey: [QKey],
        queryFn: () => queryFn(id)
    })
}
