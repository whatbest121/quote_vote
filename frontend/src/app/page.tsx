'use client'
import { useRouter } from "next/navigation"
import { useAuth } from "@/authentication/hook";
import QuoteVotingSystem from "@/components/dashboad";
export default function Home() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  if (!isAuthenticated) {
    router.push("/login")
  }
  return (
    <QuoteVotingSystem />
  );
}
