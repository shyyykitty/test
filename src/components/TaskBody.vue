<template>
  <template v-for="(part, i) in _text.split('BREAK')">
    <p v-html="part"></p>
    <v-divider v-if="i+2 < _text.split('BREAK').length" style="margin-top: 10px; margin-bottom: 10px"></v-divider>
  </template>
</template>
<script>

export default {
  name: "TaskBody",
  props: {
    text: {},
    twists: {
      default: []
    }
  },
  computed: {
    _text() {
      let text = this.text;

      if (this.twists.includes("AllowedCumTwist")) {
        text = text.replace(/(you are not allowed to cum)/ig, "<s>$1</s>")
      }

      return text;
    }
  }
}
</script>