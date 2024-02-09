<template>

  <v-container style="max-width: 1000px">

    <v-card color="secondary" style="margin-bottom: 2em">
      <v-card-text>TODO</v-card-text>
      <v-card-text>
        <ul>
          <li>Modifiers last N completed tasks</li>
        </ul>
      </v-card-text>
    </v-card>

    <Modifier :modifier="mod" v-for="mod in $store.state.modifiers"></Modifier>

    <GenerateTaskMenu/>
  </v-container>
</template>

<script>
import GenerateTaskMenu from "@/components/GenerateTaskMenu.vue";
import Modifier from "@/components/Modifier.vue";

export default {
  name: "HomeView",
  components: {
    Modifier,
    GenerateTaskMenu
  },
  mounted() {
    console.log("Home!")
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