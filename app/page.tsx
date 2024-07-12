import Button from "@/app/components";

export const runtime = "edge";

export default async function Home() {
  const data = await fetch("https://v2.jokeapi.dev/joke/Any", {
    // next: { revalidate: 10, tags: ["jokes"] },

    cf: {
      // Always cache this fetch regardless of content type
      // for a max of 5 seconds before revalidating the resource
      cacheTtl: 60,
      cacheEverything: true,
      //Enterprise only feature, see Cache API for other plans
    },
  });

  return (
    <>
      <Button />
      <pre>{JSON.stringify(await data.json(), null, 2)}</pre>
    </>
  );
}
