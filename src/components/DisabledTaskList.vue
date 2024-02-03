<template>
  <v-expansion-panel>
    <v-expansion-panel-title>Disabled {{ twist ? 'twists' : 'tasks' }}</v-expansion-panel-title>
    <v-expansion-panel-text>
      <v-list density="compact" v-if="items.length > 0">
        <DisabledTaskListItem :name="task" v-for="task in items" :twist="twist" @enable="onEnableTask($event)"/>
      </v-list>
      <span class="text-muted" v-else>
          No disabled {{ twist ? 'twists' : 'tasks' }}
      </span>

      <v-snackbar v-model="showUndo" :timeout="2000">
        {{ twist ? 'Twist' : 'Task' }} enabled.
        <template v-slot:actions>
          <v-btn
              color="red"
              variant="text"
              @click="onUndo"
          >
            Undo
          </v-btn>
        </template>
      </v-snackbar>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
<script>
import {Requirements} from "@/tasks/requirements";
import DisabledTaskListItem from "@/components/DisabledTaskListItem.vue";

export default {
  name: "DisabledTaskList",
  props: {
    twist: Boolean
  },
  components: {
    DisabledTaskListItem
  },
  data() {
    return {
      Requirements,
      reqs: {},
      showUndo: false,
      undoValue: null
    }
  },
  computed: {
    items() {
      return this.twist
          ? this.$store.state.disabledTwists
          : this.$store.state.disabledTasks;
    }
  },
  methods: {
    onEnableTask(task) {
      if (this.twist) {
        this.$store.commit("enableTwist", task)
      } else {
        this.$store.commit("enableTask", task)
      }

      this.showUndo = true;
      this.undoValue = task;
    },
    onUndo() {
      this.showUndo = false;

      if (this.twist) {
        this.$store.commit("disableTwist", this.undoValue);
      } else {
        this.$store.commit("disableTask", this.undoValue);
      }
    }
  }
}
</script>