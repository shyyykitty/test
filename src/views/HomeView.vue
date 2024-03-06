<template>
  <v-container style="max-width: 1000px">

    <DebugMenu v-if="$store.state.debug" style="margin-bottom: 1em"/>

    <Modifier :modifier="mod" v-for="mod in $store.state.modifiers"></Modifier>

    <GenerateTaskMenu/>
  </v-container>
</template>

<script>
import GenerateTaskMenu from "@/components/GenerateTaskMenu.vue";
import Modifier from "@/components/Modifier.vue";
import DebugMenu from "@/components/DebugMenu.vue";

export default {
  name: "HomeView",
  components: {
    Modifier,
    GenerateTaskMenu,
    DebugMenu
  }
}

</script>


<style>
.spoiler {
  background-color: rgb(128, 128, 128);
  color: transparent;
  cursor: pointer;
}

.unspoiler {
  background-color: inherit;
  color: inherit;
  cursor: inherit;

  transition: background-color 1s ease-out;
}

</style>