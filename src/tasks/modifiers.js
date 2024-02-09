export class Modifier {

    /**
     * @param text {string}
     * @param taskDuration {number|null}
     * @param timeDuration {number|null}
     * @param showProgress {boolean}
     */
    constructor(text, taskDuration = null, timeDuration = null, showProgress = true) {
        this.text = text;
        this.taskDuration = taskDuration
        this.timeDuration = timeDuration;
        this.showProgress = showProgress;
    }
}

/**
 * @typedef {Object} ModifierInstance
 * @property {string} name
 * @property {number} startTime
 * @property {number} startTask
 */

// const HOUR = 60 * 60 * 1000;
const HOUR = 100 * 1000;

export const CumAfterNextTaskModifier = new Modifier(
    "You are allowed to cum after you complete this task",
    1
)

export const KeepLewdPicAsWallpaper = new Modifier(
    "Keep a lewd picture of yourself as your phone wallpaper.",
    null,
    24 * HOUR
)

/**
 * When a task is completed, add a modifier.
 * Modifiers are like twists, but lasts more than one task.
 * Modifiers can block certain requirements.
 * The modifiers are displayed on top of the page
 * A given modifier lasts for a certain number of tasks, or for a given duration
 */