'use client';
import {clearCache} from "@/app/actions";


export default function Button() {


    const onClick = async () => {
        await clearCache('jokes')
    }

    return (
        <button onClick={onClick}>Clear Cache</button>
    )
}