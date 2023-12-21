import { getDownloadURL, getStorage, ref } from "firebase/storage"

const storage = getStorage()

export default async function getIcon(userUid){
    let url

    try{
        url = await getDownloadURL(ref(storage, `icons/${userUid}`))
    } catch(e){
        url = await getDownloadURL(ref(storage, "icons/icon.png"))
    }

    return {url}
}