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

    <v-footer>
      <span class="footer">
        All user data is saved offline in your browser and never shared
        •
        Distributed under the MIT license
        •
        <a href="https://github.com/shyyykitty/test" target="_blank">Source code</a>
      </span>
    </v-footer>
  </v-app>
</template>

<script>
import {loadState} from "@/store/store";
import {setSeed, toBase64} from "@/tasks/util";
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
  async created() {
    loadState();
    setSeed(this.$store.state.seed)

    const s = JSON.stringify(this.$store.state);
    const b = await toBase64(s);

    console.log("{" + b + "}")
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

.footer {
  font-size: 70%;
  opacity: 66%
}
</style>
