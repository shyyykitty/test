<template>

  <v-container style="max-width: 1000px">

    <v-card color="secondary" style="margin-bottom: 2em">
      <v-card-text>TODO</v-card-text>
      <v-card-text>
        <ul>
          <li>Completing a task/twist can give you a Modifier</li>
          <li>Modifiers last N completed tasks, or N amount of time</li>
        </ul>
      </v-card-text>
    </v-card>

    <GenerateTaskMenu/>
  </v-container>
</template>

<script setup>

import GenerateTaskMenu from "@/views/GenerateTaskMenu.vue";

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