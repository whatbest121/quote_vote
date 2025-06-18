import { EditQuoteDto, QuoteService } from "@/api/generated"
import { useMutation } from "@tanstack/react-query"

async function mutationFn(payload: EditQuoteDto) {

    try {
        const data = await QuoteService.quoteControllerEditQuote(payload)
        return data
    } catch (error: any) {
        throw new error
    }
}

export default function useEditQuote() {
    return useMutation({
        mutationFn
    })
}
