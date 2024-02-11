<template>
  <div>
    <v-card v-if="!task">
      <v-card-title>Generate task</v-card-title>
      <v-card-text>
        <template v-if="loading">
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
        const twists = Tasks[this.$store.state.task].twists;

        return this.$store.state.twists.map(name => {
          if (!twists || !(name in twists)) {
            debugger;
          }

          return twists[name]
        })
      }
      debugger
      return null;
    }
  },
  methods: {
    onGenerateClick() {
      this.$store.dispatch("rollTaskAndTwist");

      // this.$store.commit("setSeed", `${Math.random()}`);
    },
    onTaskDone() {
      this.$store.commit("incrementCompletedTasks")

      const task = Tasks[this.$store.state.task];
      Object.keys(task.modifiers).forEach(name => {
        this.$store.commit("createModifier", name);
      });

      this.$store.dispatch("rollTaskAndTwist");
    }
  }
}
</script>