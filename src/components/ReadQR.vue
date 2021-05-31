<template>
  <div class="h-100vh flex flex-col items-center justify-center p-8">
    <div class="mb-4 text-green-500 text-xl flex items-center"><img src="@/assets/logo-mini.png" class="mr-2" alt="logo"> Open QR</div>
    <div class="border-dark-800 border-width-2px border-dashed hover:border-green-400 
    :hover:bg-green-400 p-3 transition-all duration-500"
      :class="[file !== null ? 'w-auto h-auto': 'w-full h-full']"
    >
      <div class="flex justify-center items-center h-full cursor-pointer" 
      @click.stop="handdleClickUpload"
      >
         <div v-show="file === null">Click to upload your image qrcode</div>
         <img v-show="file !== null" class="img" :src="file" alt="alt image" srcset="" />
      </div>
    </div>
    <input ref="uploadinput" class="hidden" type="file" @change="uploadImg" />
    <div class="inline-block mt-4" v-if="link">
      <a :href="link">{{ link }}</a>
      <div class="m-1">Or</div>
      <button @click="copyText" class="ml-2 :hover:transform-gpu :hover:scale-75 font-bold">COPY 📑</button>
    </div>
    
    <input class="opacity-0" type="text" name="copy" ref="textToCopy" v-model="link">
    <Footer />
  </div>
</template>

<script>
import { ref } from "vue";
import { isUrl } from "../utills/isUrl";
import { readQRCode } from "../utills/readQRCode";
import useDialog from "../module/dialogConfirm";
import Footer from "./Footer"

export default {
  name: "ReadQR",
  components: {
    Footer
  },
  setup() {
    const { setOpen } = useDialog(); 

    let file = ref(null);
    let link = ref(null);

    const uploadinput = ref(null)
    let textToCopy = ref(null)

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

            const templateOption = {
              imageData,
              width: this.width,
              height: this.height,
            };
            const readResult = readQRCode(templateOption);
            openDialog(readResult);
          };
        };
        reader.readAsDataURL(fileCurrent);
      }
    };

    const openDialog = async (resultRead) => {
      if (resultRead) {
        if (isUrl(resultRead.data)) {
          if (
            window.confirm(
              `We found link ${resultRead.data}. Do you want to open this link?`
            )
          ) {
            link.value = resultRead.data;
            setTimeout(() => window.open(resultRead.data, "_blank"), 1000);
          } else {
            link.value = resultRead.data;
            return;
          }
        } else {
          link.value = null;
          window.alert(`${resultRead.data}`);
        }
      }
    };

    const handdleClickUpload = ()=> {
      uploadinput.value.click()
    }

    const copyText = ()=> {
      textToCopy.value.select();
      document.execCommand("copy");
      window.alert(`Copy 😋`);
    }

    return {
      copyText,
      textToCopy,
      uploadinput,
      handdleClickUpload,
      setOpen,
      file,
      uploadImg,
      link,
    };
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
</style>
