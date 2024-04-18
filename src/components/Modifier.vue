<template>
  <v-card style="margin-bottom: 1em">
    <v-card-text :class="{completed}">
      <p><b>{{completed ? 'Completed: ' : ''}}</b>{{ text }}</p>

      <template v-if="!completed && showProgress">

        <br>
        <v-progress-linear :model-value="progress * 100" color="secondary" height="22">
          <template v-slot:default="{ value }">
            <span v-html="label"></span>
          </template>
        </v-progress-linear>
      </template>
    </v-card-text>

    <v-card-actions v-if="completed">
      <v-btn @click="onDismiss()" color="secondary" variant="elevated" style="margin-left: auto;">
        Dismiss
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import * as Modifiers from "@/tasks/modifiers";
import {humanTime} from "@/tasks/util";

export default {
  name: "Modifier",
  props: ["modifier"],
  data() {
    return {
      progress: 0,
      label: "",
      unsubscribe: null
    }
  },
  mounted() {
    this.update();

    this.unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type === "tick") {
        this.update();
      }
    });
  },
  unmounted() {
    this.unsubscribe();
  },
  computed: {
    text() {
      return Modifiers[this.modifier.name].text
    },
    completed() {
      return this.progress >= 1.0;
    },
    showProgress() {
      return Modifiers[this.modifier.name].showProgress;
    }
  },
  methods: {
    update() {
      this.progress = this.getProgress();
      this.label = this.getLabel();
    },
    onDismiss() {
      this.$store.commit("removeModifier", this.modifier.name)
    },
    getProgress() {
      return Modifiers[this.modifier.name].getProgress(this.modifier, this.$store.state);
    },
    getLabel() {
      /** @type Modifier */
      const mod = Modifiers[this.modifier.name];

      if (mod.timeDuration) {
        return `${humanTime(mod.getRemainingTimeSec(this.modifier.startTime))} remaining`
      }

      const remainingTasks = mod.getRemainingTasks(this.$store.state.completedTasks, this.modifier.startTask);
      return `${remainingTasks} task${remainingTasks > 1 ? 's' : ''} remaining`;
    }
  }
}
</script>

<style scoped>
.completed {
  opacity: 0.5;
}
</style>