export default function (fileName,imgName) {
    return new URL(`/src/assets/img/${fileName}/${imgName}`,
        import.meta.url).href;
}