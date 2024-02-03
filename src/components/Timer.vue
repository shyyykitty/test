<template>
  <div class="timer">
    <v-progress-circular
        :rotate="0"
        :size="100"
        :width="15"
        :model-value="timerValue / initialValue * 100"
        :color="paused ? 'blue-grey-lighten-1' : 'primary'"
    >
      <span :class="{blink: timerValue === 0}">
      {{ timerHumanValue() }}
      </span>
    </v-progress-circular>
    <div class="timer-buttons" v-if="!forced">
      <v-btn v-if="!paused" @click="onPauseClick()">
        <v-icon>mdi-pause</v-icon>
        pause
      </v-btn>
      <v-btn v-else @click="onStartClick()" :disabled="timerValue === 0">
        <v-icon>mdi-play</v-icon>
        start
      </v-btn>

      <v-btn @click="onRestartClick()" :disabled="!paused || timerValue === initialValue">
        <v-icon>mdi-restart</v-icon>
        restart
      </v-btn>
    </div>
  </div>
</template>
<script>
export default {
  name: "Timer",
  props: {
    initialValue: {},
    forced: Boolean
  },
  data() {
    return {
      timerValue: this.initialValue,
      paused: true,
      tabActive: true,
      lastActive: null
    }
  },
  watch: {
    initialValue() {
      this.reset();
    }
  },
  mounted() {
    this.$store.subscribe((mutation) => {
      if (mutation.type === "tick" && !this.paused && this.tabActive) {
        this.timerValue = Math.max(0, this.timerValue - 1);

        if (this.timerValue === 0) {
          this.paused = true;
        }
      }

      if (mutation.type === "resetTimer") {
        this.reset();
      }
    });

    document.addEventListener("visibilitychange", () => {

      if (this.paused) {
        return;
      }

      if (document.visibilityState === "visible") {
        // active
        this.tabActive = true;
        const inactiveDuration = Math.floor((Number(new Date()) - this.lastActive) / 1000);
        this.timerValue = Math.max(this.timerValue - inactiveDuration, 0);
        this.lastActive = null;

      } else {
        // inactive
        this.tabActive = false;
        this.lastActive = Number(new Date());
      }
    });

    this.reset();
  },
  methods: {
    reset() {
      this.timerValue = this.initialValue;
      this.paused = true;

      if (this.forced) {
        window.setTimeout(() => {
              this.paused = false;
            },
            // Give some time for the user to read the text, then start the timer
            5000);
      }
    },
    onRestartClick() {
      this.timerValue = this.initialValue;
    },
    onPauseClick() {
      this.paused = true;
    },
    timerHumanValue() {
      const minutes = Math.floor(this.timerValue / 60);
      const seconds = this.timerValue % 60;

      if (minutes > 0) {
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      } else if (seconds > 0) {
        return `${seconds}s`;
      }

      return "time's up!";
    },
    onStartClick() {
      this.paused = false;
    },
  }
}
</script>

<style scoped>

.timer-buttons {
  display: flex;
  flex-direction: column;
  padding: 1em;
  gap: 5px;
}

.timer {
  display: flex;
  justify-content: center;
  margin-top: 1em;
  margin-bottom: 1em
}

.blink {
  color: initial;
  animation: blinker 1s step-start infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>