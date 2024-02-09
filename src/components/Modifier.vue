<template>
  <v-card style="margin-bottom: 1em" color="#FCE4EC">
    <v-card-text>
      <!--      <p>{{ modifier }}</p>-->
      <p>{{ text }}</p>
      <br>


      <v-progress-linear :model-value="progress * 100" color="#9C27B0" height="15">
        <template v-slot:default="{ value }">
          <span v-html="label"></span>
        </template>
      </v-progress-linear>
    </v-card-text>
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
      label: ""
    }
  },
  mounted() {
    this.update();

    this.$store.subscribe((mutation) => {
      if (mutation.type === "tick") {
        this.update();
      }
    });
  },
  computed: {
    text() {
      return Modifiers[this.modifier.name].text
    }
  },
  methods: {
    update() {
      this.progress = this.getProgress();
      this.label = this.getLabel();

      if (this.progress >= 1.0) {
        // TODO
        console.log("DONE!!")
      }
    },
    getProgress() {
      /** @type Modifier */
      const mod = Modifiers[this.modifier.name];

      if (mod.timeDuration) {
        const remainingTime = (this.modifier.startTime + mod.timeDuration) - Number(new Date());
        return (mod.timeDuration - remainingTime) / mod.timeDuration;
      }

      return this.state.completedTasks / (this.modifier.startTask + mod.taskDuration);
    },
    getLabel() {
      /** @type Modifier */
      const mod = Modifiers[this.modifier.name];

      if (mod.timeDuration) {
        const remainingTime = (this.modifier.startTime + mod.timeDuration) - Number(new Date());
        return `${humanTime(remainingTime / 1000)} remaining`
      }

      const remainingTasks = this.state.completedTasks / (this.modifier.startTask + mod.taskDuration);
      return `${remainingTasks} task${remainingTasks > 1 ? 's' : ''} remaining`;
    }
  }
}
</script>

<style scoped>

</style>