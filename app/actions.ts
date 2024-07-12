"use server";

// import { revalidateTag } from "next/cache";

export async function clearCache(val: string) {
  // revalidateTag("jokes");
  caches.delete('jokes')
}
