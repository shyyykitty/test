<template>
  <v-expansion-panel>

    <v-expansion-panel-title>Danger zone</v-expansion-panel-title>
    <v-expansion-panel-text>
      <v-list>
        <v-list-item>

          <v-list-item-title>Reset game</v-list-item-title>
          <v-list-item-subtitle>
            Reset to default settings.
          </v-list-item-subtitle>

          <template #append>

            <v-dialog width="500">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" color="error" variant="outlined">Reset</v-btn>
              </template>

              <template v-slot:default="{ isActive }">
                <v-card title="Confirmation">
                  <v-card-text>
                    This will reset your settings to the defaults. This action is irreversable.
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        text="Confirm"
                        color="error"
                        variant="outlined"
                        @click="onReset()"
                    ></v-btn>
                    <v-btn
                        text="Cancel"
                        @click="isActive.value = false"
                    ></v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </template>
        </v-list-item>
      </v-list>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
<script>
import {loadState, store} from "@/store/store";

export default {
  name: "DangerZone",
  methods: {
    onReset() {
      localStorage.removeItem("kinky-tasks");
      loadState();
      window.location.reload();
    }
  }
}
</script>