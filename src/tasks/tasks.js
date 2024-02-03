import {Task, Twist} from "@/tasks/Task";
import {
    AudioPornReq, ButtPlugReq,
    AnalReq, ClitReq,
    CrossDressReq,
    CumReq, DildoReq,
    EdgeReq, HeadphonesReq, PenetrationReq, PenisReq,
    PictureReq,
    PillowReq,
    PotReq, RopeReq, RuinOrgasmReq, SmallBrushReq,
    VaginaReq,
    VibeReq, VideoPornReq, WashingMachineReq, NipplesReq, TouchingReq
} from "@/tasks/requirements";
import {
    AllowedCumTwist,
    ButtPlugTwist,
    CumWithinXMinTwist,
    EdgeBeforeTaskTwist,
    MirrorTwist,
    NakedTwist,
    PinchNippleOnStopTwist,
    RuinOrgasmAfterEdgeTwist,
    ListenAudioPornTwist,
    WatchVideoPornTwist,
    SleepNakedTwist,
    VerySlowlyTwist,
    NippleClampTwist, ContinueEdgingRuinTwist, TouchIfWetTwist, TouchIfDropTwist, NoEdgingTwist
} from "@/tasks/twists";
import {Gaussian, Uniform} from "@/tasks/util";


export const LewPicTask = new Task(
    "Take {N} lewd pictures of yourself.",
    [PictureReq],
    {N: Gaussian(4, 2)},
    {NakedTwist, ButtPlugTwist, EdgeBeforeTaskTwist}
)

export const HumpObjectsTask = new Task(
    "Spend {N} minutes humping different objects in your room.",
    [],
    {N: Gaussian(12, 2)},
    {NakedTwist, AllowedCumTwist, PinchNippleOnStopTwist, ButtPlugTwist, EdgeBeforeTaskTwist}
)

export const HumpPillowTask = new Task(
    "Go hump a pillow for {N} minutes.",
    [PillowReq],
    {N: Uniform(5, 20)},
    {PinchNippleOnStopTwist, AllowedCumTwist, ButtPlugTwist, NakedTwist, RuinOrgasmAfterEdgeTwist,
        EdgeBeforeTaskTwist, MirrorTwist, VerySlowlyTwist}
)

export const SimpleEdgeTask = new Task(
    "Edge {N} times.",
    [EdgeReq],
    {N: Uniform(2, 10)},
    {PinchNippleOnStopTwist, NakedTwist, ButtPlugTwist, MirrorTwist}
)

export const VibeDenialTask = new Task(
    "Hold your vibrator on yourself for {N} minutes, after you cum," +
    " keep it on and add 1 day of denial for each remaining minute.",
    [CumReq, VibeReq, PotReq, TouchingReq],
    {N: Uniform(5, 20)},
    {EdgeBeforeTaskTwist, MirrorTwist, ButtPlugTwist}
)

export const SpankClitTask = new Task(
    "Spread your legs as wide as possible, and spank your clit {N} times.",
    [VaginaReq, ClitReq],
    {N: Gaussian(20, 4)},
    {NakedTwist, ButtPlugTwist, EdgeBeforeTaskTwist, MirrorTwist}
)

export const CrossDressPicsTask = new Task(
    "Wear something that is typically worn by the opposite gender, " +
    "take some cute selfies in your slutty cross-dress outfit.",
    [CrossDressReq, PictureReq],
    {},
    {EdgeBeforeTaskTwist, ButtPlugTwist}
)

export const CumFromAssPlayTask = new Task(
    "Get on all fours and fuck your ass with a finger or dildo for at least 10 minutes, or until" +
    " you cum from the stimulation.",
    [CumReq, AnalReq, TouchingReq],
    {},
    {CumWithinXMinTwist, NakedTwist, EdgeBeforeTaskTwist, MirrorTwist}
)

export const SuckDildoTask = new Task(
    "Practice giving head to a dildo or two fingers for {N} minutes. Go as deep as possible.",
    [],
    {N: Uniform(5, 20)},
    {NakedTwist, ButtPlugTwist, EdgeBeforeTaskTwist, TouchIfWetTwist}
)


export const EdgeMakeupBrushTask = new Task(
    "Edge {N} times by using a small brush on yourself.",
    [SmallBrushReq, EdgeReq, TouchingReq],
    {N: Uniform(3, 10)},
    {NakedTwist, ButtPlugTwist, PinchNippleOnStopTwist, RuinOrgasmAfterEdgeTwist, MirrorTwist, VerySlowlyTwist}
)

export const WashingMachineDildoTask = new Task(
    "Sit on your washing machine while you have your dildo in for {N} minutes.",
    [WashingMachineReq, DildoReq, TouchingReq],
    {N: Uniform(8, 20)},
    {NakedTwist, PinchNippleOnStopTwist, AllowedCumTwist, EdgeBeforeTaskTwist}
)

export const VibeAndRideDildoTask = new Task(
    "Use a vibrator to tease yourself while you ride your dildo for {N} minutes.",
    [DildoReq, VibeReq, PenetrationReq, TouchingReq],
    {N: Uniform(5, 20)},
    {PinchNippleOnStopTwist, NakedTwist, EdgeBeforeTaskTwist}
)

export const NipplePlayTask = new Task(
    "Play with your nipples for {N} minutes.",
    [NipplesReq, TouchingReq],
    {N: Uniform(3, 15)},
    {NakedTwist, EdgeBeforeTaskTwist, AllowedCumTwist, VerySlowlyTwist, TouchIfWetTwist}
)

export const AudioPublicTask = new Task(
    "Go to a public place (store, public transport etc.), put on headphones and listen to audio porn for at" +
    "least 10 minutes.",
    [HeadphonesReq, AudioPornReq],
    {},
    {EdgeBeforeTaskTwist, ButtPlugTwist}
)

export const NoTouchTask = new Task(
    "Do not touch yourself, except for cleaning, for the next 24h.",
    [],
    {},
    {ListenAudioPornTwist, WatchVideoPornTwist, SleepNakedTwist}
)

export const EdgeAndPicsTask = new Task(
    "Edge yourself as many times as possible for the next 15 minutes, then take lewd a picture of yourself " +
    "and set it as your wallpaper on your phone for the next 24h.",
    [EdgeReq, PictureReq, TouchingReq],
    {},
    {NakedTwist, ButtPlugTwist, PinchNippleOnStopTwist, NippleClampTwist, RuinOrgasmAfterEdgeTwist,
        ContinueEdgingRuinTwist}
)

export const RideEdgeTask = new Task(
    "You are allowed to edge only once today, so to ride it for as long as possible.",
    [EdgeReq],
    {},
    {NakedTwist, ButtPlugTwist, NippleClampTwist, ContinueEdgingRuinTwist, MirrorTwist}
)

export const LowIntensityVibeTask = new Task(
    "Hold a vibrator on yourself on the absolute lowest setting. If you reach the edge, hold it for as long" +
    " as possible without cumming, then stop. Otherwise, stop after {N} minutes.",
    [EdgeReq, VibeReq, TouchingReq],
    {N: Uniform(10, 20)},
    {NakedTwist, ButtPlugTwist, NippleClampTwist}
)

export const DildoStanding = new Task(
    "Fuck yourself with a dildo while standing for at least {N} minutes.",
    [PenetrationReq, TouchingReq],
    {N: Uniform(5, 15)},
    {NippleClampTwist, VerySlowlyTwist, MirrorTwist, NakedTwist, EdgeBeforeTaskTwist,
        PinchNippleOnStopTwist, TouchIfDropTwist, AllowedCumTwist}
)

export const PublicPlug = new Task(
    "Go for a walk while wearing a butt plug. When this task is done, you are allowed to touch and edge " +
    "until you remove the plug.",
    [ButtPlugReq, TouchingReq],
    {},
    {ListenAudioPornTwist, EdgeBeforeTaskTwist}
)

export const NipplePlayStep1Task = new Task(
    "Caress and play with your body without touching your crotch area until you are wet. " +
    "Remove your shirt, scoop up the wetness with your fingers on both hands and very gently roll your nipples " +
    "between your index and thumb. Close your eyes and enjoy the feeling. Do this for {N} minutes.",
    [NipplesReq, TouchingReq],
    {N: Uniform(3, 8)},
    {NakedTwist,}
)

export const NipplePlayStep2Task = new Task(
    "Wipe down your fingers and nipples. Hold your nipples between your index and thumb for a few seconds, " +
    "then pinch hard enough to make you wince. Gently hold them again for 2 seconds, then pinch for 2 seconds. Repeat for " +
    "{N} minutes, while increasing the intensity if can handle it. After the this is done, you are allowed to touch " +
    "yourself with your hands for exactly {X} seconds before starting the next task.",
    [],
    {N: Uniform(2, 4), X: Gaussian(3, 1)},
    {ButtPlugTwist, AllowedCumTwist}
)

export const NipplePlayStep3Task = new Task(
    "Twist your nipples to the left a few degrees, hold for a few seconds, then twist to the right. Repeat " +
    "while increasing the angle each time until you reach 180°. There are no breaks in between twists. After the task " +
    "is done, you are allowed to touch yourself with your hands for exactly {X} seconds before starting the next task.",
    [],
    {X: Gaussian(4, 1)},
    {AllowedCumTwist}
)

export const NipplePlayStep4Task = new Task(
    "Pinch and slowly pull your nipples as far away from your body as possible. " +
    "Hold for a few seconds, then pull even further, then let go. Repeat 4 times, and alternate between pulling " +
    "them forward and to the side. Repeat 4 times, but instead of letting go, slowly loosen your grip until " +
    "they are pulled back. Finally, pull your nipples just about as far as you can, then pull a bit harder for 2 " +
    "seconds, return to the previous position, then pull again. Do this for {N} minutes. After the task " +
    "is done, you are allowed to touch yourself with your hands for exactly {X} seconds before starting the next task.",
    [],
    {N: Uniform(2, 3), X: Gaussian(5, 1)},
    {AllowedCumTwist}
)

export const NipplePlayStep5Task = new Task(
    "Gently hold your right nipple and slowly rub it with your other hand for a few seconds. Stop rubbing and " +
    "flick your nipple 5 times. Use the hand that was holding it to pinch your nipple with your middle finger and " +
    "thumb, then do a finger click motion 5 times. Repeat for the left nipple. Now do {N} flicks and {N} finger clicks on " +
    "each side without holding them. You don't get to touch this time. Instead, slap your butt {X} times.",
    [],
    {N: Uniform(5, 12), X: Gaussian(10, 5)},
)

export const NipplePlayStep6Task = new Task(
    "Good job! You are allowed to touch for {X} seconds before starting this task. [Actually, you " +
    "can touch for 20 seconds.] [If you are reading this sentence, then you lost your chance to touch, sorry!][ " +
    "Now, move to a kneeling position with your legs spread and start pinching your nipples hard enough to make you " +
    "wince, then pinch a bit harder. Twist both nipples 180° one direction, then 180° in the other direction. Keep " +
    "pinching at the same time. Start pulling your nipples to a tolerable distance. Pull them further for a second, " +
    "then bring them back. Remember to keep twisting and pinching. Next, pinch them harshly before lightly flicking " +
    "them. Repeat this entire task between {Y} and {Z} times. The number you choose will determine how long you are " +
    "allowed to edge.] [Now you get your reward. the number of times you repeated the task is equal to the number of " +
    "minutes you can touch yourself.]",
    [],
    {X: Gaussian(5, 3), Y: Uniform(3, 8), Z: Uniform(8, 20)},
    {NoEdgingTwist}
)

export const JoiDildoTask = new Task(
    "If you have a chastity device, wear it now. [Place a dildo right above your cock, use lube and start " +
    "gently stroking. Take your time and enjoy the feeling.] [Find a JOI audio or video, listen with headphones and " +
    "follow the instructions. Close your eyes and imagine that you are really stroking yourself. Make a performance. " +
    "Moan and squirm. At the end of the audio, when you are allowed to cum, moan loudly and pretend that you are " +
    "tensing up and are having orgasm spasms. Take some time to breathe and clean off the dildo.] [Now, as a reward, " +
    "you can unlock yourself and listen to the same clip again, but this time you can stroke your real cock. You are " +
    "allowed to cum, you earned it. Make a mess and clean yourself off before reading the next part.] [Did you follow " +
    "all the task instructions carefully? Try to remember how loudly you moaned and how much you squirmed just now. Would" +
    " an outside observer be able to tell when you came and when you were pretending? If you were significantly louder or" +
    " had more convincing spasms when cumming the second time, then you have to ruin your next orgasm as a punishment.]",
    [DildoReq, AudioPornReq, PenisReq, CumReq, TouchingReq],
    {},
    {ButtPlugTwist, NakedTwist, EdgeBeforeTaskTwist, NippleClampTwist}
)

export const CumTask = new Task(
    "[As soon as you are done reading this sentence, strip completely naked and start touching nice and fast.] " +
    "[Get to the edge as quickly as you can, then and add one twist to this task.]",
    [EdgeReq, TouchingReq],
    {},
    {
        // TODO: interactive countdown
        "CumInXSecTwist": new Twist("[You are allowed to cum within the next {X} seconds. If you cannot cum in time, get to the " +
            "edge and ride it for 10 seconds.]", [CumReq], {X: Uniform(20, 40)}),

        "RuinNowTwist": new Twist("[Ruin your orgasm immediately.]", [RuinOrgasmReq]),
        ContinueEdgingRuinTwist,
        "EdgeThenCumAfterNextTaskTwist": new Twist("[Edge {N} times.] [You can cum after you complete the next task. Stay naked.]", [CumReq], {N: Gaussian(5, 3)}),
        "SlowCirclesCumTwist": new Twist("[Start a stopwatch.] [Very slowly massage yourself with one finger in your most sensitive spot " +
            "using a circular motion. Do this lightly; do not apply any pressure. Every time you get close, go slower " +
            "and ease the pressure. <b>Do not stop moving your finger</b>. You will reach a point where you are barely " +
            "touching, and barely moving your finger. Try to hold on as long as possible. When you start losing " +
            "control and go over the edge, you are allowed to start rubbing hard and fast, but only if you have been " +
            "rubbing for at least {N} minutes. Otherwise, continue rubbing at the same pace: you are not allowed " +
            "to speed up or slow down.]",
            [RuinOrgasmReq, CumReq],
            {N: Gaussian(3, 2)}),
        // TODO: online timer
        "RuinThenCumTwist": new Twist("[Start touching yourself gently and slowly. Set a timer on your phone for 8 minutes. " +
            "Start slowly increasing up the intensity so that you are ready to cum when the timer finishes.] " +
            "[When it does, get to a hard edge and gently ruin your orgasm. If you have been denied for at least " +
            "{N} day(s), you can get a full orgasm as soon as you regain your senses. Otherwise, you can choose to " +
            "ruin your orgasm one more time before starting the next task.]", [RuinOrgasmReq, CumReq],
            {N: Gaussian(2, 1)}),
        "VibratorCumTwist": new Twist("[Edge one more time with a vibrator.] [Hold the vibrator firmly against your most " +
            "sensitive area and ride the edge as long as possible while ramping down the vibration intensity." +
            "When you start to orgasm, ramp up to maximum intensity for 15 seconds.]", [VibeReq, CumReq])
    }
)

export const DenialVibe = new Task(
    "Make sure that your vibrator is fully charged and ready to go. Tie both of your legs firmly, either" +
    " together or to your bed. Caress yourself over your thighs and chest. Bring yourself to the edge using your" +
    " favorite toy (you are not allowed to use the vibrator yet) or technique. Edge again {N} times, make yourself" +
    " pent-up, soaked and desperate to cum. Continue to tease yourself for as long as you wish. When you can't take " +
    "it anymore, tie the vibrator to your most sensitive area and set up a repeating pattern: 1 second high intensity, " +
    "4 seconds off (if using XToys, you can use <a href='https://xtoys.app/patterns/-NIRdH6MoZzZTM6-jGOv'>this pattern</a>). " +
    "Safely tie your hands or hold them behind your head. Stay like this for at least {X} minutes. Of course, you " +
    "are not allowed to cum.",
    [VibeReq, RopeReq, TouchingReq],
    {N: Gaussian(10, 2), X: Gaussian(30, 20)},
    {ButtPlugTwist, AllowedCumTwist}
)


// TODO: Add multiple steps
export const CumInPants = new Task(
    "Get two pairs of underwear and put on your pants so that you have 3 layers of fabric on you. Start " +
    "rubbing through your clothes. You can use a vibrator. If you reach the edge, keep going and attempt to make" +
    " yourself cum in your underwear. After {N} minutes, remove a layer and continue rubbing. After {N}*3 minutes," +
    " if you have not been able to cum through your clothes, you can choose to ruin your orgasm, but you are " +
    "not allowed to have a full orgasm during this task anymore.",
    [CumReq, TouchingReq],
    {N: Uniform(10, 15)},
    {ButtPlugTwist, NippleClampTwist}
)

export const RecordAndEdgeToVideo = new Task(
    "Pleasure yourself and video record it. You can use your favourite toy. You can edge up to 2 times.BREAK" +
    "Edge once while watching the video.",
    [PictureReq, EdgeReq, TouchingReq]
)

export const Tasks = {
    CumInPants,
    DenialVibe,
    LewPicTask,
    HumpPillowTask,
    SimpleEdgeTask,
    VibeDenialTask,
    SpankClitTask,
    CrossDressPicsTask,
    CumFromAssPlayTask,
    SuckDildoTask,
    EdgeMakeupBrushTask,
    WashingMachineDildoTask,
    HumpObjectsTask,
    VibeAndRideDildoTask,
    AudioPublicTask,
    NipplePlayTask,
    NoTouchTask,
    EdgeAndPicsTask,
    RideEdgeTask,
    LowIntensityVibeTask,
    DildoStanding,
    PublicPlug,
    // [
    //     NipplePlayStep1Task,
    //     NipplePlayStep2Task,
    //     NipplePlayStep3Task,
    //     NipplePlayStep4Task,
    //     NipplePlayStep5Task,
    //     NipplePlayStep6Task,
    // ],
    JoiDildoTask,
    CumTask
}