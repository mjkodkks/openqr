<template>
  <div class="layout">
    <input type="file" @change="uploadImg" />
    <img class="img" :src="file" alt="" srcset="" />
    <a :href="link">{{ link }}</a>
  </div>
</template>

<script>
import { ref, inject } from "vue";
import { isUrl } from "../utills/isUrl";

export default {
  name: "ReadQR",
  setup() {
    const jsQR = inject("jsQR");
    let file = ref(null);
    let link = ref(null);

    const uploadImg = (input) => {
      if (input.target.files && input.target.files[0]) {
        let fileCurrent = input.target.files[0];
        let reader = new FileReader();
        reader.onload = function (e) {
          file.value = e.target.result;

          let canvas = document.createElement("canvas");
          let context = canvas.getContext("2d");

          let image = new Image();
          image.src = file.value;
          image.onload = function () {
            // access image size here
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            const imageData = context.getImageData(
              0,
              0,
              canvas.width,
              canvas.height
            ).data;
            console.log(imageData);
            const templateOption = {
              imageData,
              width: this.width,
              height: this.height,
            };
            readQRCode(templateOption);
          };
        };
        reader.readAsDataURL(fileCurrent);
      }
    };

    const readQRCode = ({ imageData, width, height }) => {
      const code = jsQR(imageData, width, height);
      console.log(code);
      if (code) {
        console.log("Found QR code", code);
        if (isUrl(code.data)) {
          if (
            window.confirm(
              `We found link ${code.data}. Do you want to open this link?`
            )
          ) {
            link.value = code.data;
            setTimeout(() => window.open(code.data, "_blank"), 1000);
          } else {
            return;
          }
        } else {
          link.value = null;
          window.alert(`${code.data}`);
        }
      }
    };

    return { file, uploadImg, link };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.layout {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.img {
      width: 200px;
    padding: 20px;
}
</style>
