import { QuoteService, TestDTO, VoteService } from "@/api/generated"
import { useQuery } from "@tanstack/react-query"

export const QKey = "useHasVoted"
async function queryFn(quoteId: string) {

    try {
        const data = await VoteService.voteControllerHasVoted(quoteId)
        return data
    } catch (error: any) {
        throw new error
    }
}

export default function useHasVoted(quoteId: string) {
    return useQuery({
        queryKey: [QKey],
        queryFn: () => queryFn(quoteId)
    })
}
