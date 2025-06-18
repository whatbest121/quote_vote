import { QuoteService, TestDTO } from "@/api/generated"
import { useQuery } from "@tanstack/react-query"

export const QKey = "useGetQuote"
type Query = Parameters<typeof QuoteService.quoteControllerGetPaginatedQuotes>[number]
export type QuoteReturn = Awaited<ReturnType<typeof QuoteService.quoteControllerGetPaginatedQuotes>>["docs"][0]

async function queryFn(payload: Query) {

    try {
        const data = await QuoteService.quoteControllerGetPaginatedQuotes(payload)
        return data
    } catch (error: any) {
        throw new error
    }
}

export default function useGetQuote(payload: Query) {
    return useQuery({
        queryKey: [QKey],
        queryFn: () => queryFn(payload)
    })
}
