import {TouchingReq} from "@/tasks/requirements";

export class Modifier {

    /**
     * @param text {string}
     * @param taskDuration {number|null}
     * @param timeDuration {number|null}
     * @param showProgress {boolean}
     * @param addRequirements {Requirement[]}
     * @param removeRequirements {Requirement[]}
     */
    constructor(text, taskDuration = null, timeDuration = null,
                showProgress = true, addRequirements = [], removeRequirements = []) {
        this.text = text;
        this.taskDuration = taskDuration
        this.timeDuration = timeDuration;
        this.showProgress = showProgress;
        this.addRequirements = addRequirements;
        this.removeRequirements = removeRequirements;
    }
}

/**
 * @typedef {Object} ModifierInstance
 * @property {string} name
 * @property {number} startTime
 * @property {number} startTask
 */

const HOUR = 60 * 60 * 1000;

export const CumAfterNextTaskModifier = new Modifier(
    "You are allowed to cum after you complete this task",
    1
)

export const KeepLewdPicAsWallpaperModifier = new Modifier(
    "Keep a lewd picture of yourself as your phone wallpaper.",
    null,
    24 * HOUR
)

export const NoTouchModifier = new Modifier(
    "You are not allowed to touch sensitive areas.",
    null,
    24 * HOUR,
    true,
    [],
    [TouchingReq]
)

export const SleepNakedModifier = new Modifier(
    "You have to sleep naked.",
    null,
    24 * HOUR,
    true,
)

/**
 * When a task is completed, add a modifier.
 * Modifiers are like twists, but lasts more than one task.
 * Modifiers can block certain requirements.
 * The modifiers are displayed on top of the page
 * A given modifier lasts for a certain number of tasks, or for a given duration
 */