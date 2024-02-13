<template>
  <v-list-item :disabled="$store.getters.requirementOverrides.includes(req.name)">
    <template v-if="checkbox" v-slot:prepend>
      <v-list-item-action>
        <v-checkbox-btn :model-value="$store.getters.finalRequirements.includes(req.name)" color="primary"></v-checkbox-btn>
      </v-list-item-action>
    </template>

    <v-list-item-title>{{ (prefix ?? "") + (prefix ? req.name.toLowerCase() : req.name) }}</v-list-item-title>
    <v-list-item-subtitle :title="req.text">{{ req.text }}</v-list-item-subtitle>
  </v-list-item>
</template>
<script>
export default {
  name: 'RequirementListItem',
  props: ["req", "checkbox", "prefix"]
}
</script>