import {createStore} from "vuex";
import {Requirements} from "@/tasks/requirements";
import {setSeed, Uniform} from "@/tasks/util";
import {Tasks} from "@/tasks/tasks";
import * as Modifiers from "@/tasks/modifiers";
import modifier from "@/components/Modifier.vue";

function getNextTask(state, getters) {
    const possibleTasks = Object.entries(Tasks)
        .filter(([name, task]) => !task.requirements.some(req => !getters.finalRequirements.includes(req.name)))
        .filter(([name, task]) => !state.history.includes(name))

    const [name, task] = possibleTasks[Uniform(0, possibleTasks.length - 1)()];
    return name;
}

function getNextTwists(state, task, getters) {
    const twists = [];
    const possibleTwists = Object.entries(Tasks[task].twists).filter(
        ([name, twist]) => !twist.requirements.some(req => !getters.finalRequirements.includes(req.name))
    )

    for (let i = 0; i < possibleTwists.length; i++) {
        const idx = Uniform(0, possibleTwists.length - 1)();
        twists.push(possibleTwists[idx][0]);
        possibleTwists.splice(idx, 1);
    }
    return twists;
}

export const store = createStore({
    state() {
        return {
            requirements: [],
            twists: [],
            numTwists: 0,
            task: null,
            seed: null,
            history: [],
            completedTasks: 0,
            disabledTasks: [],
            disabledTwists: [],
            modifiers: [],
            theme: "pink"
        }
    },
    getters: {
        /**
         * @returns ModifierInstance[]
         */
        modifiers(state) {
            return state.modifiers;
        },
        requirementOverrides(state, getters) {
            return getters.requirementOverrideAdded.concat(getters.requirementOverrideRemoved)
        },
        requirementOverrideRemoved(state) {
            const overrides = [];

            state.modifiers.forEach(mod => {
                overrides.push(...Modifiers[mod.name].removeRequirements);
            });

            return overrides.map(req => req.name);
        },
        requirementOverrideAdded(state) {
            const overrides = [];

            state.modifiers.forEach(mod => {
                overrides.push(...Modifiers[mod.name].addRequirements);
            });

            return overrides.map(req => req.name);
        },
        finalRequirements(state, getters) {
            const removed = getters.requirementOverrideRemoved;
            const added = getters.requirementOverrideAdded.filter(req => !state.requirements.includes(req));

            return state.requirements
                .filter(req => !removed.includes(req))
                .concat(added);
        }
    },
    mutations: {
        load(state, newState) {
            Object.assign(state, newState)
        },
        addRequirement(state, req) {
            if (!state.requirements.includes(req.name)) {
                state.requirements.push(req.name);
                saveState();
            }
        },
        removeRequirement(state, req) {
            const index = state.requirements.indexOf(req.name);

            if (index > -1) {
                state.requirements.splice(index, 1);
                saveState();
            }
        },
        setTwists(state, twists) {
            state.twists = twists;
            saveState();
        },
        setTaskAndTwists(state, {task, twists}) {
            state.twists = twists;
            state.task = task;
            state.numTwists = 0;

            if (state.history.length >= 3) {
                state.history.shift();
            }
            state.history.push(task);

            saveState();
        },
        setSeed(state, seed) {
            state.seed = seed;
            setSeed(seed)
            saveState();
        },
        setNumTwists(state, num) {
            state.numTwists = num;
            saveState();
        },
        tick(state) {
            // no-op
        },
        resetTimer(state) {
            // no-op
        },
        incrementCompletedTasks(state) {
            state.completedTasks += 1;
        },
        disableTask(state, task) {
            if (!task) {
                debugger
            }

            if (!state.disabledTasks.includes(task)) {
                state.disabledTasks.push(task);
            }
            saveState();
        },
        enableTask(state, task) {
            if (state.disabledTasks.includes(task)) {
                state.disabledTasks.splice(state.disabledTasks.indexOf(task), 1);
            }
            saveState();
        },
        disableTwist(state, task) {

            if (!task) {
                debugger
            }

            if (!state.disabledTwists.includes(task)) {
                state.disabledTwists.push(task);
            }
            saveState();
        },
        enableTwist(state, task) {
            if (state.disabledTwists.includes(task)) {
                state.disabledTwists.splice(state.disabledTwists.indexOf(task), 1);
            }
        },
        createModifier(state, name) {
            if (!name) {
                debugger;
            }

            /**
             * @type Modifier
             */
            const modifier = Modifiers[name];

            if (!modifier) {
                debugger;
            }

            modifier.removeRequirements.forEach(req => {
                this.commit("removeRequirement", req);
            });
            modifier.addRequirements.forEach(req => {
                this.commit("addRequirement", req);
            });

            if (state.modifiers.find(m => m.name === name)) {
                // Overwrite modifier and reset timer
                state.modifiers = state.modifiers.filter(m => m.name !== name);
            }

            /** @type {ModifierInstance} */
            const instance = {
                name: name,
                startTime: Number(new Date()),
                startTask: state.completedTasks,
            }
            state.modifiers.push(instance);
            saveState();
        },
        removeModifier(state, name) {
            const index = state.modifiers.findIndex(m => m.name === name);

            if (index === -1) {
                debugger;
            }

            state.modifiers.splice(index, 1);
            saveState();
        },
        setTheme(state, name) {
            state.theme = name;
            saveState();
        },
    },
    actions: {
        rollTwist({commit, state}) {
            commit("setTwists", getNextTwists(state, state.task));
        },
        rollTaskAndTwist({commit, state, getters}) {
            const task = getNextTask(state, getters);
            const twists = getNextTwists(state, task, getters);

            commit("setTaskAndTwists", {task, twists});
            commit("resetTimer");
        }
    }
});

const DEFAULTS = {
    requirements: Array.from([].concat(...Object.values(Requirements)).map(req => req.name))
}

export function loadState() {
    if (!localStorage.getItem("kinky-tasks")) {
        store.commit("load", DEFAULTS);
    } else {
        const config = JSON.parse(localStorage.getItem("kinky-tasks"));
        store.commit("load", config);
    }
}

export function saveState() {
    localStorage.setItem("kinky-tasks", JSON.stringify(store.state));
}