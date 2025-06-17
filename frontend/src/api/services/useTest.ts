import { useQuery } from "@tanstack/react-query"
import { TestDTO, TestService } from "../generated"

export const QKey = "useGetTest"

async function queryFn(payload: TestDTO) {

    try {
        const data = await TestService.testControllerTest(payload)
        return data
    } catch (error: any) {
        throw new error
    }
}

export default function useTest(payload: TestDTO) {
    return useQuery({
        queryKey: [QKey],
        queryFn: () => queryFn(payload)
    })
}
