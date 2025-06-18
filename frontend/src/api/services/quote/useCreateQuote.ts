import { CreateQuoteDto, QuoteService, TestDTO } from "@/api/generated"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { QKey, QueryPag } from "./GetPaginatedQuotes"

async function mutationFn(payload: CreateQuoteDto) {

    try {
        const data = await QuoteService.quoteControllerCreateQuote(payload)
        return data
    } catch (error: any) {
        throw new error
    }
}

export default function useCreateQuote(payload?: QueryPag) {
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
            queryClient.invalidateQueries({ queryKey })
        },
    })
}
