import Button from "@/app/components";


export const runtime = "edge";

export default async function Home() {

    const data = await fetch('https://v2.jokeapi.dev/joke/Any',
        {next: {revalidate: 10, tags: ['jokes']}})

    return (
        <>
            <Button/>
            <pre>
                {JSON.stringify(await data.json(), null, 2)}
            </pre>
        </>
    );
}


