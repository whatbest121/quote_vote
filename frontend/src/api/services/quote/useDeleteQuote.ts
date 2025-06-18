import { EditQuoteDto, QuoteService } from "@/api/generated"
import { useMutation } from "@tanstack/react-query"

async function mutationFn(id: string,) {

    try {
        const data = await QuoteService.quoteControllerDeleteQuote(id)
        return data
    } catch (error: any) {
        throw new error
    }
}

export default function useDeleteQuote() {
    return useMutation({
        mutationFn
    })
}
