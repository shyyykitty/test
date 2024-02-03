import {ObjectReq, Requirement} from "@/tasks/Task";

export const PictureReq = new Requirement("Pictures", "Taking pictures of yourself.")
export const EdgeReq = new Requirement("Edging", "Edging.")
export const CumReq = new Requirement("Cumming", "Cumming.")
export const RuinOrgasmReq = new Requirement("Ruined orgasm", "Ruining an orgasm.")
export const PotReq = new Requirement("Post-orgasm torture", "Doing overstimulation after an orgasm.")
export const VaginaReq = new Requirement("Vagina", "Interact with vagina.")

export const PenisReq = new Requirement("Penis", "Interact with penis.")

export const ClitReq = new Requirement("Clit", "Interact with clitoris.")
export const NipplesReq = new Requirement("Nipple play", "Interact with nipples.")
export const VibeReq = new ObjectReq("Vibrator", "a vibrator")

export const RopeReq = new ObjectReq("Rope", "rope")
export const PillowReq = new ObjectReq("Pillow", "a pillow")

export const NippleClampReq = new ObjectReq("Nipple clamps", "nipple clamps")

export const CrossDressReq = new Requirement("Cross-dressing", "Cross-dressing.")


export const AnalReq = new Requirement("Anal play", "Doing anal play.")

export const PenetrationReq = new Requirement("Penetration", "Doing penetration, with toys or otherwise (anus/vagina).")

export const SmallBrushReq = new ObjectReq("Small brush", "a small brush");
export const WashingMachineReq = new Requirement("Washing machine", "Having access to a washing machine.");

export const DildoReq = new ObjectReq("Dildo", "a dildo");

export const ButtPlugReq = new ObjectReq("Butt plug", "a butt plug");

export const HeadphonesReq = new ObjectReq("Headphones", "headphones")

export const VideoPornReq = new Requirement("Video porn", "Listening to audio porn.")
export const AudioPornReq = new Requirement("Audio porn", "Listening to audio porn.")

export const MirrorReq = new Requirement("Mirror", "Looking at yourself in the mirror.")

export const TouchingReq = new Requirement("Touching", "Touching sensitive areas.")

export const Requirements = {
    "Items": [
        ButtPlugReq,
        DildoReq,
        HeadphonesReq,
        PillowReq,
        NippleClampReq,
        RopeReq,
        SmallBrushReq,
        VibeReq,
        WashingMachineReq,
    ],
    "Body parts": [
        ClitReq,
        NipplesReq,
        PenisReq,
        VaginaReq,
    ],
    "Actions": [
        AnalReq,
        AudioPornReq,
        CrossDressReq,
        CumReq,
        EdgeReq,
        MirrorReq,
        PenetrationReq,
        PictureReq,
        PotReq,
        RuinOrgasmReq,
        TouchingReq,
        VideoPornReq,
    ]
}