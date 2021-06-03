export const isImage = (file) => {
    return !!file.type.match('image.*');
}