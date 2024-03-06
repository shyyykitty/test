<template>
  <v-tooltip :text="tooltip" :max-width="400">
    <template v-slot:activator="{ props }">
      <v-list-item v-bind="props">
        <v-list-item-title>{{ name }}</v-list-item-title>
        <template v-slot:append>
          <v-btn
              @click="onClick()"
              icon="delete"
              variant="text"
              color="primary"
          ></v-btn>
        </template>
      </v-list-item>
    </template>
  </v-tooltip>
</template>
<script>
import * as Twists from "@/tasks/twists";
import * as Subtasks from "@/tasks/tasks";

export default {
  name: "DisabledTaskListItem",
  props: {
    "name": {},
    "twist": Boolean
  },
  data() {
    return {
      showTooltip: false
    }
  },
  computed: {
    tooltip() {
      if (this.twist) {
        return Twists[this.name].template;
      }

      return Subtasks[this.name].template;
    }
  },
  methods: {
    onClick() {
      this.$emit("enable", this.name)
    }
  }
}
</script>