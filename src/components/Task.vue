<template>
  <v-card class="task">
    <v-card-title style="display: flex; justify-content: space-between">
      <span>Task</span>
      <v-dialog width="500">
        <template v-slot:activator="{ props }">
          <v-icon v-bind="props">mdi-dots-vertical</v-icon>
        </template>

        <template v-slot:default="{ isActive }">
          <v-card title="Skip task">
            <RequirementsList @on-skip-task="onSkipTask(); isActive.value = false"
                              @on-remove-req="onRemoveReq($event); isActive.value = false"
                              :task="task"/>
          </v-card>
        </template>
      </v-dialog>
    </v-card-title>

    <v-card-text>
      <TaskBody :text="text" :twists="$store.state.twists.slice(0, this.numTwists)"></TaskBody>

      <!-- TODO: how to handle multiple timers?-->
      <Timer v-if="task.getTimers().length > 0" :initial-value="task.getTimers()[0]"/>
    </v-card-text>

    <!-- Twists -->
    <v-card-text v-if="numTwists > 0">
      <div style="font-size: 1.1rem; margin-bottom: 10px">Twist{{ numTwists > 1 ? 's' : '' }}</div>

      <v-card v-for="(twist, idx) in displayedTwists" style="margin-bottom: 15px">

        <!-- skip menu -->
        <div style="float: right; font-size: 1.25rem; padding-top: 0.5rem">
          <v-dialog width="500">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props">mdi-dots-vertical</v-icon>
            </template>

            <template v-slot:default="{ isActive }">
              <v-card title="Skip twist">
                <RequirementsList @on-skip-task="onSkipTwist(idx); isActive.value = false"
                                  @on-remove-req="onRemoveReq($event); onSkipTwist(); isActive.value = false"
                                  :task="twist"
                                  :twist="true"/>
              </v-card>
            </template>
          </v-dialog>
        </div>

        <v-card-text v-if="twist">
          <TaskBody :text="twist.text()"></TaskBody>
        </v-card-text>
      </v-card>
    </v-card-text>

    <v-card-text v-else>
      <v-btn @click="onAddTwist()" style="margin-left: auto;" color="primary">
        <v-icon>mdi-plus</v-icon>
        Add twist
      </v-btn>
    </v-card-text>

    <v-card-actions>
      <v-btn @click="onTaskDone()" style="margin-left: auto;" color="primary" variant="elevated">
        Task completed
      </v-btn>
    </v-card-actions>

    <v-snackbar
        v-model="showSnackBar"
        timer
        timeout="4000"
    >
      Your preferences have been updated.
    </v-snackbar>
  </v-card>
</template>

<script>
import RequirementsList from "@/components/RequirementsList.vue";
import TaskBody from "@/components/TaskBody.vue";
import Timer from "@/components/Timer.vue";

export default {
  name: "Task",
  components: {Timer, TaskBody, RequirementsList},
  props: ["task", "twists"],
  computed: {
    text() {
      return this.task.text() ?? ""
    },
    numTwists() {
      return Math.min(this.twists.length, this.$store.state.numTwists);
    },
    displayedTwists() {
      return this.twists.slice(0, this.numTwists)
    }
  },
  data() {
    return {
      showSnackBar: false,
      timerValue: 0
    }
  },
  methods: {
    onSkipTask() {
      this.$store.commit("disableTask", this.$store.state.task);
      this.$store.dispatch("rollTask");
    },
    onSkipTwist(index) {
      console.log("SKIP")
      console.log(this.$store.state.twists)
      console.log(index)
      console.log(this.$store.state.twists[index])
      this.$store.commit("disableTwist", this.$store.state.twists[index]);
      this.$store.dispatch("rollTwist");
    },
    onTaskDone() {
      this.$emit("done");
    },
    onRemoveReq(req) {
      this.$store.commit("removeRequirement", req);
      this.showSnackBar = true;
    },
    onAddTwist() {
      this.$store.commit("setNumTwists", 1);
    }
  }
}

</script>

<style scoped>
.task {
  margin-bottom: 1em; /* Temp */
}

.button-row {
  display: flex;
  gap: 10px;
}
</style>

<style>
.v-list-item-title {
  white-space: inherit !important;
}
</style>