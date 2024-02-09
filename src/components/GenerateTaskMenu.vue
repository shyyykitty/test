<template>
  <div>
    <v-card>
      <v-card-title>Generate task</v-card-title>
      <v-card-text>
        <template v-if="loading">
          <v-progress-linear :indeterminate="true" color="primary"></v-progress-linear>
        </template>
        <template v-else>
          <p>Generate a random task based on your preferences.</p>
          <br>
          <v-btn @click="onGenerateClick()">Generate</v-btn>
        </template>
      </v-card-text>
    </v-card>

    <br>

    <Task v-if="task" :task="task" :twists="twists" @done="onTaskDone()"></Task>
  </div>
</template>
<script>
import {Tasks} from "@/tasks/tasks";
import {Uniform} from "@/tasks/util";
import Task from "@/components/Task.vue";

export default {
  name: "GenerateTaskMenu",
  components: {Task},
  data() {
    return {
      loading: false
    }
  },
  computed: {
    task() {
      if (this.$store.state.task) {
        return Tasks[this.$store.state.task]
      }
      return null;
    },
    twists() {
      if (this.$store.state.twists) {
        return this.$store.state.twists.map(name => Tasks[this.$store.state.task].twists[name])
      }
      return null;
    }
  },
  methods: {
    onGenerateClick() {
      this.$store.dispatch("rollTask");
      this.$store.dispatch("rollTwist");
      this.$store.commit("resetTimer");

      // this.$store.commit("setSeed", `${Math.random()}`);
    },
    onTaskDone() {
      this.$store.commit("incrementCompletedTasks")

      const task = Tasks[this.$store.state.task];
      Object.keys(task.modifiers).forEach(name => {
        this.$store.commit("createModifier", name);
      });

      this.$store.dispatch("rollTask");
      this.$store.dispatch("rollTwist");
      this.$store.commit("resetTimer");
    }
  }
}
</script>