<template>
  <v-card>
    <v-card-title>Debug menu</v-card-title>

    <v-card-text>

      <v-btn color="error" variant="outlined" @click="onReset">Reset</v-btn>

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

export default {
  name: "DebugMenu",
  methods: {
    onReset() {
      localStorage.removeItem("kinky-tasks");
      loadState();
      window.location.reload();
    }
  }
}
</script>

<style scoped>

</style>