<template>
  <v-card>
    <v-card-title>Debug menu</v-card-title>

    <v-card-text>

      <div style="display: flex; gap: 10px">
        <v-btn color="error" variant="outlined" @click="onReset">Reset</v-btn>
        <v-btn color="secondary" variant="outlined" @click="onChangeSeed">Change seed</v-btn>
        <v-btn color="secondary" variant="outlined" @click="onRemoveTwist">Remove twist</v-btn>
      </div>

      <div style="margin-bottom: 1em"></div>

      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-title>State</v-expansion-panel-title>
          <v-expansion-panel-text>
            <pre>{{$store.state}}</pre>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-title>Twists</v-expansion-panel-title>
          <v-expansion-panel-text>
            <h4>Possible</h4>
            <pre>{{ $store.getters.possibleTwists.map(([name, twist]) => name) }}</pre>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-title>Actions</v-expansion-panel-title>
          <v-expansion-panel-text>

            <p>
              <b>Step:</b> {{$store.state.stepName}}
            </p>

            <h4>Back stack</h4>
            <pre>{{ $store.state.backStack }}</pre>

            <h4>Actions</h4>
            <pre>{{ $store.getters.stepActions }}</pre>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>

    </v-card-text>
  </v-card>
</template>

<script>
import {loadState} from "@/store/store";
import {randomSeed} from "@/tasks/util";

export default {
  name: "DebugMenu",
  methods: {
    onReset() {
      localStorage.removeItem("kinky-tasks");
      loadState();
      window.location.reload();
    },
    async onChangeSeed() {
      this.$store.commit("setTaskLoading", true);
      this.$store.commit("setSeed", randomSeed());
      await new Promise(r => setTimeout(r, 100));
      this.$store.commit("setTaskLoading", false);
    },
    onRemoveTwist() {
      this.$store.commit("setTwist", null);
    }
  }
}
</script>

<style scoped>

</style>