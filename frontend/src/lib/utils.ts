import { OpenAPI } from "@/api/generated"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function setAccessToken(token: string) {
  OpenAPI.TOKEN = token
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
