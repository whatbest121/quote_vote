import { QuoteService, TestDTO } from "@/api/generated"
import { useQuery } from "@tanstack/react-query"

export const QKey = "useGetQuote"
export type QueryPag = {
    search?: string;
    page?: string;
    limit?: string;
    sort?: string;
}
export type QuoteReturn = Awaited<ReturnType<typeof QuoteService.quoteControllerGetPaginatedQuotes>>["docs"][0]

async function queryFn(payload: QueryPag) {

    try {
        //@ts-ignore
        const data = await QuoteService.quoteControllerGetPaginatedQuotes(payload)
        return data
    } catch (error: any) {
        throw new error
    }
}

export default function useGetQuote(payload: QueryPag) {
    const queryKey = [
        QKey,
        payload?.limit,
        payload?.page,
        payload?.search,
        payload?.sort

    ]
    return useQuery({
        queryKey,
        queryFn: () => queryFn(payload)
    })
}
