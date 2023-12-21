import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"

const storage = getStorage()

export default async function uploadIcon(iconUpload, userUid){
    const iconRef = ref(storage, `icons/${userUid}`)
    let url, error

    try{
        const snapshot = await uploadBytes(iconRef, iconUpload)

        const imageUrl = await getDownloadURL(snapshot.ref)
        url = imageUrl
    } catch(e){
        error = e
    }

    return {url, error}
}