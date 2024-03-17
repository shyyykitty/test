<template>
  <v-card class="task">
    <v-card-title style="display: flex; justify-content: space-between">
      <span>Task</span>

      <div>
        <v-tooltip
            v-model="showSkipHelpTooltip"
            location="top"
        >
          <template v-slot:activator="{ props }">
            <div v-bind="props"></div>
          </template>
          <span>Click here to skip this task</span>
        </v-tooltip>

        <v-dialog width="500">
          <template v-slot:activator="{ props }">
            <v-icon v-bind="props" @click="onOpenSkipMenu()">more_vert</v-icon>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card title="Skip task">
              <RequirementsList @on-skip-task="onSkipTask(); isActive.value = false"
                                @on-remove-req="onRemoveReq($event, true); isActive.value = false"
                                :task="task"/>
            </v-card>
          </template>
        </v-dialog>
      </div>
    </v-card-title>

    <v-card-text>
      <TaskBody :text="text"></TaskBody>

      <!-- TODO: how to handle multiple timers?-->
      <Timer v-if="task.getTimers().length > 0" :initial-value="task.getTimers()[0]"/>
    </v-card-text>

    <!-- Twist -->
    <v-card-text v-if="twist">
      <div style="font-size: 1.1rem; margin-bottom: 10px">Twist</div>

      <v-card>
        <!-- skip menu -->
        <div style="float: right; font-size: 1.25rem; padding-top: 0.5rem">
          <v-dialog width="500">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props">more_vert</v-icon>
            </template>

            <template v-slot:default="{ isActive }">
              <v-card title="Skip twist">
                <RequirementsList @on-skip-task="onSkipTwist(); isActive.value = false"
                                  @on-remove-req="onRemoveReq($event, false); onSkipTwist(); isActive.value = false"
                                  :task="twist"
                                  :twist="true"/>
              </v-card>
            </template>
          </v-dialog>
        </div>

        <v-card-text>
          <TaskBody :text="twist.text()"></TaskBody>
        </v-card-text>
      </v-card>
    </v-card-text>

    <v-card-text v-else-if="$store.getters.possibleTwists.length > 0">
      <v-btn @click="onAddTwist()" style="margin-left: auto;" color="primary" variant="outlined">
        <v-icon>add</v-icon>
        Add twist
      </v-btn>
    </v-card-text>

    <!-- Actions-->
    <v-card-actions>
      <v-btn
          v-if="$store.state.backStack.length > 0"
          @click="goBack()"
          color="grey"
          variant="outlined"
      >
        Back
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn v-for="action in $store.getters.stepActions"
             @click="doAction(action)"
             color="primary"
             :variant="action.label === 'Continue' || action.step === '$end' ? 'elevated' : 'outlined'"
      >
        {{ action.label }}
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
  name: "SubTask",
  components: {Timer, TaskBody, RequirementsList},
  props: ["task", "twist"],
  computed: {
    text() {
      return this.task.text();
    }
  },
  data() {
    return {
      showSnackBar: false,
      showSkipHelpTooltip: false,
      timerValue: 0
    }
  },
  mounted() {
    window.setTimeout(() => {
      if (this.$store.state.helpSkip) {
        this.showSkipHelpTooltip = true;
      }
    }, 5000);
  },
  methods: {
    onOpenSkipMenu() {
      this.showSkipHelpTooltip = false;
      this.$store.commit("setHelpSkip", false);
    },
    async onSkipTask() {
      this.$store.commit("disableSubtask", this.$store.getters.subtaskName);
      await this.$store.dispatch("rerollSubtask");
    },
    onSkipTwist() {
      this.$store.commit("disableTwist", this.$store.state.twistName);
      this.$store.dispatch("rollTwist");
    },
    doAction(action) {
      this.$store.dispatch("doAction", action);
    },
    goBack() {
      this.$store.dispatch("doAction", {step: "$back"});
    },
    async onRemoveReq(req, rerollTask) {
      this.$store.commit("removeRequirement", req);
      this.showSnackBar = true;
      if (rerollTask) {
        await this.$store.dispatch("rerollSubtask");
      }
    },
    onAddTwist() {
      this.$store.dispatch("rollTwist");
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