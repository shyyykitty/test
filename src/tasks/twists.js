import {Twist} from "@/tasks/Task";
import {Gaussian, Uniform} from "@/tasks/util";
import {
    AudioPornReq,
    ButtPlugReq,
    CumReq,
    EdgeReq, MirrorReq, NippleClampReq,
    NipplesReq,
    RuinOrgasmReq, TouchingReq,
    VideoPornReq
} from "@/tasks/requirements";
import {SleepNakedModifier} from "@/tasks/modifiers";

export const PinchNippleOnStopTwist = new Twist(
    "Each time you have to stop, pinch your nipples for {N} seconds.",
    [TouchingReq, NipplesReq],
    {N: Uniform(3, 10)}
)

export const NakedTwist = new Twist(
    "You have to complete the task fully naked.",
)

export const ButtPlugTwist = new Twist(
    "You have to complete the task while wearing a butt plug.",
    [ButtPlugReq, TouchingReq]
)
export const CumWithinXMinTwist = new Twist(
    "If you are not able to cum within {N} minutes, you are denied for the rest of today.",
    [],
    {N: Uniform(25, 90)}
)

export const RuinOrgasmAfterEdgeTwist = new Twist(
    "When you are done, complete the task again for {N} additional edges," +
    " and ruin your orgasm.",
    [TouchingReq, RuinOrgasmReq],
    {N: Uniform(2, 4)}
);
export const AllowedCumTwist = new Twist(
    "Without any additional stimulation, you are allowed to cum during the task if you are able to.",
    [CumReq],
)

export const EdgeBeforeTaskTwist = new Twist(
    "Edge yourself once, and hold it for at least 10 seconds before starting the task.",
    [TouchingReq, EdgeReq]
)

export const NippleClampTwist = new Twist(
    "You have to complete the task while wearing nipple clamps. Remove them for a few seconds every 15 minutes.",
    [NippleClampReq]
)

export const MirrorTwist = new Twist(
    "You have to complete the task while watching yourself in the mirror, or using your camera app.",
    [MirrorReq]
)

export const WaitNMinutesBetweenEdgesTwist = new Twist(
    "You must wait {N} minutes between each edge.",
    [],
    {N: Uniform(1,2)}
)

export const WatchVideoPornTwist = new Twist(
    "You have to watch porn for at least {N} minutes.",
    [VideoPornReq],
    {N: Uniform(20, 40)}
)

export const ListenAudioPornTwist = new Twist(
    "You have to listen to audio porn for at least {N} minutes during the task.",
    [AudioPornReq],
    {N: Uniform(20, 40)}
)

export const SleepNakedTwist = new Twist(
    "You have to sleep naked for the duration of the task.",
    [],
    {},
    {},
    {SleepNakedModifier}
)

export const VerySlowlyTwist = new Twist(
    "You have to do the task agonizingly slowly."
)

export const ContinueEdgingRuinTwist = new Twist(
    "You can choose to edge one more time and ride it for as long as you like, but you have to use one " +
    "fingertip and do slow circles. You are not allowed to stop touching for next {N} minutes. If you " +
    "go over the edge, remove your finger and ruin your orgasm.",
    [EdgeReq, RuinOrgasmReq, TouchingReq],
    {N: Gaussian(8, 3)}
)

export const TouchIfWetTwist = new Twist(
    "You are allowed to touch yourself during the task, but only after you create a visible wet " +
    "spot on your underwear.",
    [TouchingReq]
)

export const TouchIfDropTwist = new Twist(
    "You are allowed to touch yourself with your hands, but only after you manage to drip on your floor.",
    [TouchingReq]
)

export const NoEdgingTwist = new Twist(
    "You must pleasure yourself during the task, but you are not allowed to edge. If you " +
    "reach the edge by accident, you have to stop touching until the next task."
)