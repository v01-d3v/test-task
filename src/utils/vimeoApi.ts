import { setWithExpiry } from "./setToLocalStorage";

export async function getVideoMeta(uri: string, width?: number) {
    const cachedVideoMeta = localStorage.getItem(uri);
    const cachedVideoMetaJSON = cachedVideoMeta && JSON.parse(cachedVideoMeta);

    if(cachedVideoMetaJSON?.expiry && new Date().getTime() < cachedVideoMetaJSON.expiry) { // Check if JSON is present and 'fresh' in local storage
        return cachedVideoMetaJSON.value;  // Use cached response
    } else {
        const response = await fetch(`https://vimeo.com/api/oembed.json?url=${encodeURI(uri)}&width=${width}`, {
            method: "GET",
        })
    
        const json = await response.json();
        setWithExpiry(uri, json); // Cache actual response in local storage
        return json;

    }
}
