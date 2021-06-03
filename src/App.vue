<template>
  <div class="app dark:bg-gray-800 dark:text-white">
    <DarkModeSwitch
      @switched="onSwitched"
      v-bind:initialState="isDarkModeEnabled"
    />
    <router-view />
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import DarkModeSwitch from "./components/DankModeSwitch";
export default {
  name: "App",
  components: { DarkModeSwitch },
  setup() {
    let isDarkModeEnabled = ref(false);

    onMounted(() => {
      if (localStorage.getItem("nightMode") === null) {
        localStorage.setItem("nightMode", JSON.stringify(false));
      }
      const themeFromLocal = localStorage.getItem("nightMode") === "true";
      setTheme(themeFromLocal);
    });

    const onSwitched = (isDarkMode) => {
      setTheme(isDarkMode);
    };

    const removeClass = () => {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.remove("light");
    };

    const setTheme = (isDarkMode) => {
      removeClass();
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.add("light");
      }
    };

    return {
      isDarkModeEnabled,
      onSwitched,
    };
  },
};
</script>

<style lang="scss">
:root {
  --toggle-size: 1rem;
  --switch-w: 4em;
  --switch-h: 2em;
  --switch-handle-scale: 0.65;
  --switch-off-handle-x: -0.125em;
  --switch-on-handle-x: calc(100% - 0.125em);
  --switch-transition-duration: 0.2s;
}
html {
  font-family: "Roboto", sans-serif;
}
.app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #ffff;
  transition: background 0.5s;
}
</style>
