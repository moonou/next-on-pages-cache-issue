"use server";
import { getRequestContext } from "@cloudflare/next-on-pages";

// import { revalidateTag } from "next/cache";

export async function clearCache() {
  // revalidateTag("jokes");
  const cloudflareKV =
    getRequestContext().env.TEST_KV;

  const list = await cloudflareKV.list();

  // idk is it safe here to just Promise.all them?
  for (const key of list.keys) {
    await cloudflareKV.delete(key.name);
  }
}
