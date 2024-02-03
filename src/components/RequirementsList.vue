<template>
  <v-list>
    <template
        v-for="(req, i) in task.requirements"
        :key="req.name"
    >
      <RequirementListItem :req="req" prefix="Disable " @click="$emit('on-remove-req', req)"/>

      <v-divider></v-divider>
    </template>
    <v-list-item @click="$emit('on-skip-task')">
      <v-list-item-title>Disable this specific {{twist ? "twist" : "task"}}</v-list-item-title>
<!--      <v-list-item-subtitle>I am not comfortable with this specific {{twist ? "twist" : "task"}}.</v-list-item-subtitle>-->
    </v-list-item>
  </v-list>
</template>
<script>
import RequirementListItem from "@/components/RequirementListItem.vue"

export default {
  name: 'RequirementsList',
  components: {RequirementListItem},
  props: ["task", "twist"]
}
</script>