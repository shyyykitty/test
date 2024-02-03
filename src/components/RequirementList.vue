<template>
  <v-expansion-panel>
    <v-expansion-panel-title>Task Toggles</v-expansion-panel-title>
    <v-expansion-panel-text>
      <v-list density="compact">
        <template v-for="group in Object.keys(Requirements)">
          <v-list-subheader>{{ group }}</v-list-subheader>
          <RequirementListItem @click="onClick(req)" :req="req" :checkbox="true" v-for="req in Requirements[group]"/>
        </template>
      </v-list>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
<script>
import {Requirements} from "@/tasks/requirements";
import RequirementListItem from "@/components/RequirementListItem.vue";

export default {
  name: "RequirementList",
  components: {
    RequirementListItem
  },
  data() {
    return {
      Requirements,
      reqs: {}
    }
  },
  methods: {
    onClick(req) {
      if (!this.$store.state.requirements.includes(req.name)) {
        this.$store.commit("addRequirement", req);
      } else {
        this.$store.commit("removeRequirement", req);
      }
    }
  }
}
</script>