<template>
  <div>
    <v-card v-if="!$store.getters.task">
      <v-card-title>Generate task</v-card-title>
      <v-card-text>
        <template v-if="$store.state.taskLoading">
          <v-progress-linear :indeterminate="true" color="primary"></v-progress-linear>
        </template>
        <template v-else>
          <p>Generate a random task based on your preferences.</p>
          <br>
          <v-btn @click="onGenerateClick()" color="primary">Generate</v-btn>
        </template>
      </v-card-text>
    </v-card>

    <br>

    <v-fade-transition hide-on-leave>
      <Subtask v-if="$store.getters.subtask && !$store.state.taskLoading" :task="$store.getters.subtask" :twist="$store.getters.twist"></Subtask>
    </v-fade-transition>
  </div>
</template>
<script>
import {Tasks} from "@/tasks/tasks";
import Subtask from "@/components/Subtask.vue";

export default {
  name: "GenerateTaskMenu",
  components: {Subtask},
  data() {
    return {
    }
  },
  methods: {
    rollTask() {
      this.$store.dispatch("generateTask");
    },
    onGenerateClick() {
      this.rollTask();

      // this.$store.commit("setSeed", `${Math.random()}`);
    },
  }
}
</script>