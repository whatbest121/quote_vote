import { QuoteService, TestDTO } from "@/api/generated"
import { useQuery } from "@tanstack/react-query"

export const QKey = "useGetQuoteUser"
async function queryFn() {

    try {
        const data = await QuoteService.quoteControllerGetQuoteUser()
        return data
    } catch (error: any) {
        throw new error
    }
}

export default function useGetQuoteUser() {
    return useQuery({
        queryKey: [QKey],
        queryFn: () => queryFn()
    })
}
