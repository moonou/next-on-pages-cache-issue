'use client';
import {clearCache} from "@/app/actions";


export default function Button() {


    const onClick = async () => {
        await clearCache()
    }

    return (
        <button onClick={onClick}>Clear Cache</button>
    )
}
