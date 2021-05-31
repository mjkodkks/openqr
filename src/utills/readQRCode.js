import jsQR from "jsqr";

export const readQRCode = ({ imageData, width, height }) => {
    return jsQR(imageData, width, height);
};
