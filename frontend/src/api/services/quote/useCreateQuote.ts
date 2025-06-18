import { CreateQuoteDto, QuoteService, TestDTO } from "@/api/generated"
import { useMutation, useQuery } from "@tanstack/react-query"

export const QKey = "useCreateQuote"
async function mutationFn(payload: CreateQuoteDto) {

    try {
        const data = await QuoteService.quoteControllerCreateQuote(payload)
        return data
    } catch (error: any) {
        throw new error
    }
}

export default function useCreateQuote() {
    return useMutation({
        mutationFn
    })
}
