import { CreateQuoteDto, QuoteService, TestDTO, VoteService } from "@/api/generated"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { QKey, QueryPag } from "../quote/GetPaginatedQuotes"

async function mutationFn(quoteId: string) {
    try {
        const data = await VoteService.voteControllerVote({ quote_id: quoteId })
        return data
    } catch (error: any) {
        throw error
    }
}

export default function useVote(payload: QueryPag) {
    const queryKey = [
        QKey,
        payload?.limit,
        payload?.page,
        payload?.search,
        payload?.sort

    ]
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn,
        onSuccess: () => {
            if (payload) {
                queryClient.invalidateQueries({ queryKey }) // รีเฟรชเฉพาะ query นี้
            } else {
                queryClient.invalidateQueries({ queryKey: [QKey] }) // รีเฟรชทั้งหมดที่ใช้ QKey
            }
        },
    })
}
