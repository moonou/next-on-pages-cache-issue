import Button from "@/app/components";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

const getFetcher = ({
  previewToken,
}: {
  previewToken?: string;
} = {}): typeof fetch => {
  if (previewToken)
    return (url, init) =>
      fetch(url, {
        ...(init ?? {}),
        cache: "no-cache",
        headers: {
          ...(init?.headers ?? {}),
          Authorization: `JWT ${previewToken}`,
        },
      });

  const cloudflareKV = getRequestContext().env.TEST_KV;

  return async (url, init) => {
    if (init?.method && init?.method !== "GET") return fetch(url, init);

    const href =
      url instanceof Request ? url.url : url instanceof URL ? url.href : url;

    const valueByURL = await cloudflareKV.get(href);

    if (valueByURL)
      return {
        json: () => JSON.parse(valueByURL),
        ok: true,
        status: 200,
      } as Response;

    const response = await fetch(href, { ...init, cache: "no-cache" });

    const json = await response.clone().json();

    await cloudflareKV.put(href, JSON.stringify(json));

    return response;
  };
};

async function getData() {
  const res = await getFetcher()("https://v2.jokeapi.dev/joke/Any");
  return res.json();
}

export default async function Home() {
  const data = await getData();

  return (
    <>
      <Button /><pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
