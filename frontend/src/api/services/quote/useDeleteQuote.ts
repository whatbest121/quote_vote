import { EditQuoteDto, QuoteService } from "@/api/generated"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { QKey, QueryPag } from "./GetPaginatedQuotes"

async function mutationFn(id: string,) {

    try {
        const data = await QuoteService.quoteControllerDeleteQuote(id)
        return data
    } catch (error: any) {
        throw new error
    }
}

export default function useDeleteQuote(payload?: QueryPag) {
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
