<template>
  <v-tooltip :text="tooltip">
    <template v-slot:activator="{ props }">
      <v-list-item v-bind="props">
        <v-list-item-title>{{ name }}</v-list-item-title>
        <template v-slot:append>
          <v-btn
              @click="onClick()"
              icon="mdi-delete"
              variant="text"
          ></v-btn>
        </template>
      </v-list-item>
    </template>
  </v-tooltip>
</template>
<script>
import {Tasks} from "@/tasks/tasks";
import * as Twists from "@/tasks/twists";

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

      return Tasks[this.name].template;
    }
  },
  methods: {
    onClick() {
      this.$emit("enable", this.name)
    }
  }
}
</script>