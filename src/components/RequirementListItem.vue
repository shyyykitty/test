<template>
  <v-list-item>
    <template v-if="checkbox" v-slot:prepend>
      <v-list-item-action>
        <v-checkbox-btn :model-value="$store.state.requirements.includes(req.name)"></v-checkbox-btn>
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