<template>
  <v-expansion-panel>
    <v-expansion-panel-title>Appearance</v-expansion-panel-title>
    <v-expansion-panel-text>

      <v-list>
        <v-list-item>
          <v-select label="Theme"
                    :items="themes"
                    variant="outlined"
                    style="margin-top: 5px"
                    v-model="theme">
          </v-select>
        </v-list-item>
        <v-list-item>
          <v-checkbox
              color="primary"
              label="Developper mode" v-model="debug"></v-checkbox>
        </v-list-item>
      </v-list>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
<script>
import {mapGetters} from "vuex";

export default {
  name: "Appearance",
  computed: {
    debug: {
      get() {
        return this.$store.state.debug;
      },
      set(val) {
        this.$store.commit("setDebug", val);
      }
    },
    theme: {
      get() {
        return this.$store.state.theme;
      },
      set(val) {
        this.$store.commit("setTheme", val);
      }
    }
  },
  data() {
    return {
      themes: [
        {
          title: "Pink",
          value: "pink"
        },
        {
          title: "Blue",
          value: "darkBlue"
        },
      ]
    }
  }
}
</script>