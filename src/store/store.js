import {createStore} from "vuex";
import {Requirements} from "@/tasks/requirements";
import {setSeed, Uniform, generateGraph, getValidPaths, randomSeed, random} from "@/tasks/util";
import {Tasks} from "@/tasks/tasks";
import * as Modifiers from "@/tasks/modifiers";
import * as Twists from "@/tasks/twists";


function hasRequirements(task, requirements) {
    const nodes = generateGraph(task);
    const paths = getValidPaths(nodes);

    // If at least one path is ok
    return paths.some(path => {
        // If every requirement of every subtask in path is met
        return path.every(subtask =>
            subtask.requirements.every(req => requirements.includes(req.name))
        )
    });
}

function getNextTask(state, getters) {
    const reqs = getters.finalRequirements;

    let possibleTasks = Object.entries(Tasks)
        .filter(([_, task]) => hasRequirements(task, reqs))
        .filter(([name, _]) => !state.history.includes(name))

    if (possibleTasks.length === 0) {
        // Remove history filter
        possibleTasks = Object.entries(Tasks)
            .filter(([_, task]) => hasRequirements(task, reqs));
    }

    if (possibleTasks.length === 0) {
        // FIXME
        debugger;
    }

    const [name, _] = possibleTasks[Uniform(0, possibleTasks.length - 1)()];
    return name;
}

function getNextSubtask(state, getters) {
    const possibleSubtasks = Object.entries(getters.possibleSteps)
        .filter(([_, step]) => step.subtask.requirements.every(req => getters.finalRequirements.includes(req.name)))
        .filter(([_, step]) => !state.disabledTasks.includes(step.name))

    if (possibleSubtasks.length === 0) {
        // FIXME
        debugger
    }

    const probSum = possibleSubtasks
        .map(([_, step]) => step.prob)
        .reduce((a, b) => a + b, 0)

    if (probSum > 1) {
        debugger
    }

    const numberOfUnspecifiedProbs = possibleSubtasks
        .map(([_, step]) => step.prob)
        .filter(prob => prob === 0)
        .length;

    let unspecifiedProb = 0;
    if (numberOfUnspecifiedProbs > 0) {
        unspecifiedProb = (1 - probSum) / numberOfUnspecifiedProbs;
    }

    const pmf = possibleSubtasks
        .map(([_, step]) => step.prob === 0 ? unspecifiedProb : step.prob);

    const cdf = pmf.map((sum => value => sum += value)(0));
    cdf[cdf.length - 1] = 1;

    const [i, _] = possibleSubtasks[cdf.findIndex(el => el >= random())];

    return Number(i);
}

function getNextTwist(state, getters) {
    const possibleTwists = getters.possibleTwists;

    if (possibleTwists.length === 0) {
        return null;
    }

    const [name, _] = possibleTwists[Uniform(0, possibleTwists.length - 1)()];

    return name;
}

export const store = createStore({
    state() {
        return {
            seed: null,
            taskName: null,
            stepName: null,
            backStack: [],
            returnTo: null,
            subtaskIndex: null,
            twistName: null,
            modifiers: [],

            disabledTasks: [],
            disabledTwists: [],
            requirements: [],

            theme: "pink",
            debug: import.meta.env.DEV,

            history: [],
            completedTasks: 0,
            
            taskLoading: false,

            helpSkip: true,
        }
    },
    getters: {
        task(state) {
            if (state.taskName === null) {
                return null;
            }
            return Tasks[state.taskName];
        },
        twist(state) {
            if (state.twistName === null) {
                return null;
            }
            return Twists[state.twistName];
        },
        possibleTwists(state, getters) {
            if (!getters.subtask) {
                return [];
            }

            return Object.entries(getters.subtask.twists)
                .filter(([_, twist]) => twist.requirements.every(req => getters.finalRequirements.includes(req.name)))
                .filter(([name, _]) => !state.disabledTwists.includes(name))
        },
        subtask(state, getters) {
            return getters._step?.subtask;
        },
        subtaskName(state, getters) {
            return getters._step?.name;
        },
        _step(state) {
            if (state.taskName === null || state.stepName === null || state.subtaskIndex === null) {
                return null;
            }
            return Tasks[state.taskName][state.stepName][state.subtaskIndex];
        },
        stepActions(state, getters) {
            /**
             * @type {Step}
             */
            const step = getters._step;
            if (!step) {
                return null;
            }

            return step.actions;
        },
        /**
         * @returns Step[]
         */
        possibleSteps(state) {
            if (state.taskName === null || state.stepName === null) {
                return null;
            }
            return Tasks[state.taskName][state.stepName];
        },

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
        },
        modifiersOnTaskComplete(state, getters) {
            const subtask = getters.subtask;
            const twist = getters.twist;
            
            const modifiers = [];

            if (subtask) {
                Object.keys(subtask.modifiers).forEach(name => {
                    modifiers.push(name);
                });
            }
            if (twist) {
                Object.keys(twist.modifiers).forEach(name => {
                    modifiers.push(name);
                });
            }

            return modifiers;
        }
    },
    mutations: {
        setHelpSkip(state, value) {
            state.helpSkip = value;
            saveState();
        },
        setDebug(state, value) {
            state.debug = value;
            saveState();
        },
        load(state, newState) {
            Object.assign(state, newState)
            setSeed(state.seed);
            state.taskLoading = false;
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
        setTwist(state, name) {
            state.twistName = name;
            saveState();
        },
        setStep(state, name) {
            state.stepName = name;
            saveState();
        },
        setSubtask(state, index) {
            state.subtaskIndex = index;
            saveState();
        },
        setTask(state, name) {
            state.taskName = name;

            if (state.history.length >= 3) {
                state.history.shift();
            }
            state.history.push(name);

            saveState();
        },
        setSeed(state, seed) {
            state.seed = seed;
            setSeed(seed)
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
            saveState();
        },
        disableSubtask(state, task) {
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
            saveState();
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
        pushStep(state) {
            state.backStack.push({
                stepName: state.stepName,
                subtaskIndex: state.subtaskIndex,
                twistName: state.twistName,
                returnTo: state.returnTo,
                seed: state.seed,
                completedTasks: state.completedTasks,
                modifiers: state.modifiers
            });
            saveState();
        },
        popStep(state) {
            Object.assign(state, state.backStack.pop());
            setSeed(state.seed);
            saveState();
        },
        resetBackStack(state) {
            state.backStack.length = 0;
            saveState();
        },
        setReturnTo(state, name) {
            state.returnTo = name;
            saveState();
        },
        setTaskLoading(state, loading) {
            state.taskLoading = loading;
        }
    },
    actions: {
        popStep({state, commit}) {
            const topOfStack = state.backStack[state.backStack.length-1];
            commit("popStep");
            return topOfStack;
        },
        /**
         * @param commit
         * @param state
         * @param dispatch
         * @param action {Action}
         */
        async doAction({commit, state, dispatch, getters}, action) {

            if (action.step === "$back" || (action.step === "$return" && state.returnTo === null)) {
                commit("popStep");
                return;
            }

            let step = action.step === "$return"
                ? state.returnTo
                : action.step;

            if (step === "$end") {

                // Create modifiers
                getters.modifiersOnTaskComplete.forEach(name => {
                    commit("createModifier", name);
                });

                await dispatch("generateTask");
                return;
            }

            commit("pushStep");

            commit("incrementCompletedTasks");
            commit("setReturnTo", action.returnTo);
            commit("setSubtask", null);
            commit("setStep", step);

            await dispatch("rerollSubtask");
        },
        rollTwist({commit, state, getters}) {
            commit("setTwist", getNextTwist(state, getters));
        },
        async rerollSubtask({commit, state, getters}) {
            commit("setTaskLoading", true);
            await new Promise(r => setTimeout(r, 50));

            commit("setSubtask", getNextSubtask(state, getters))
            commit("setSeed", randomSeed());
            commit("setTwist", null);

            commit("setTaskLoading", false);
        },

        async generateTask({commit, state, getters}) {
            commit("setTaskLoading", true);
            await new Promise(r => setTimeout(r, 100));
            
            commit("setTask", getNextTask(state, getters));
            commit("setStep", "$start");
            commit("setSubtask", getNextSubtask(state, getters))
            commit("setSeed", randomSeed());
            commit("setTwist", null);

            commit("resetBackStack");
            commit("resetTimer");
            commit("setTaskLoading", false);
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