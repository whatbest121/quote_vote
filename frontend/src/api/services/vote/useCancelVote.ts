import { CreateQuoteDto, QuoteService, TestDTO, VoteService } from "@/api/generated"
import { useMutation, useQuery } from "@tanstack/react-query"

async function mutationFn(quoteId: string) {

    try {
        const data = await VoteService.voteControllerCancelVote(quoteId)
        return data
    } catch (error: any) {
        throw new error
    }
}

export default function useVote() {
    return useMutation({
        mutationFn
    })
}
