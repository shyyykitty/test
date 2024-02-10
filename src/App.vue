<template>
  <v-app :theme="$store.state.theme">
    <v-app-bar app color="primary">
      <v-app-bar-nav-icon @click="showDrawer = !showDrawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer app :width="400" v-model="showDrawer" temporary>
      <v-expansion-panels variant="popout">
        <RequirementList style="margin-top: 10px"/>
        <DisabledTaskList></DisabledTaskList>
        <DisabledTaskList twist></DisabledTaskList>
        <Appearance/>
        <DangerZone></DangerZone>
      </v-expansion-panels>

    </v-navigation-drawer>

    <v-main>
      <RouterView/>
    </v-main>
  </v-app>
</template>

<script>
import {loadState} from "@/store/store";
import {setSeed} from "@/tasks/util";
import RequirementList from "@/components/RequirementList.vue";
import DisabledTaskList from "@/components/DisabledTaskList.vue";
import DangerZone from "@/components/DangerZone.vue";
import Appearance from "@/components/Appearance.vue";

export default {
  name: "App",
  components: {
    Appearance,
    DangerZone,
    RequirementList,
    DisabledTaskList
  },
  created() {
    loadState();
    setSeed(this.$store.state.seed)
  },
  data() {
    return {
      showDrawer: true
    }
  }
}
</script>

<style>
.v-list-item-subtitle {
  white-space: inherit;
}

.v-navigation-drawer__content {
  /** overflow-y: scroll !important; */
}

.text-muted {
  color: #757575;
}
</style>
