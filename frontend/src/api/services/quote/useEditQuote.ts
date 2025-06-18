import { EditQuoteDto, QuoteService } from "@/api/generated"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { QKey } from "./GetPaginatedQuotes"
async function mutationFn(payload: EditQuoteDto) {

    try {
        const data = await QuoteService.quoteControllerEditQuote(payload)
        return data
    } catch (error: any) {
        throw new error
    }
}

export default function useEditQuote() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QKey] })
        },
    })
}
