import type { ReflexInfo, ReflexId } from '../types';

export const REFLEX_DATABASE: Record<ReflexId, ReflexInfo> = {
  "fpr": {
    "id": "fpr",
    "name": "Fear Paralysis Reflex (FPR)",
    "aka": "The Intrauterine Withdrawal & Cellular Freeze Reflex",
    "tier": 1,
    "tierName": "Tier 1: Autonomic Safety (Survival Foundation)",
    "tierDescription": "The earliest primitive reflex emerging at 5 weeks gestation. Must integrate before Moro can successfully resolve. If retained, the child lives in a perpetual state of frozen panic, mutism, or withdrawal.",
    "description": "A cellular withdrawal reflex designed to protect the embryo from maternal stress. When retained, the child enters immediate physical or psychological 'freeze' when overwhelmed, leading to selective mutism, extreme separation anxiety, sensory hypersensitivity, and low stress tolerance.",
    "functionalSigns": [
      "Selective mutism or shutting down completely when pressured or in groups",
      "Extreme separation anxiety, agoraphobia, or refusal to try new activities",
      "Insecurity in crowds; freezes or curls into a ball when overwhelmed",
      "Chronic shallow breathing, holding breath when startled, or rapid heartbeat",
      "Low tolerance for sudden changes in routine, sounds, or visual stimulation"
    ],
    "assessment": {
      "setup": "Child is standing or sitting relaxed in a calm, quiet, dimly lit room.",
      "safetyCaution": "Do NOT use frightening or jarring stimuli. Observe subtle autonomic reactions without inducing panic. CONTRAINDICATION: If child dissociates or experiences panic, stop immediately. If using weighted gear or blankets, AAP standards strictly mandate maximum 10% of child's body weight.",
      "action": "Have child stand with eyes closed for 15 seconds. Observe breathing depth and muscle tone. Then softly tap the floor 3 feet away.",
      "techniqueTip": "Watch for breath-holding, pupil dilation, or shoulder shrugging up to ears.",
      "grading": {
        "grade0": "Integrated: Child breathes steadily, maintains relaxed posture, no freeze reaction.",
        "grade1": "Mild: Slight breath hold or subtle eye flutter, recovers within 2 seconds.",
        "grade2": "Moderate: Clear somatic freeze, body stiffens, breath catches, reluctance to move.",
        "grade3": "Level 3 (Prominent): Complete shutdown, refusal to engage, trembling, intense panic or tears."
      },
      "retainedCharacteristics": [
        "Sudden breath holding or gasping when startled",
        "Shoulders hike up towards ears; fists clench tightly",
        "Eyes dilate or child completely disconnects from conversation (shutdown)",
        "Extreme toe-curling or reluctance to stand on two feet"
      ],
      "integratedCharacteristics": [
        "Smooth, diaphragmatic belly breathing remains continuous",
        "Shoulders and jaw remain relaxed when unexpected sounds occur",
        "Maintains comfortable eye contact and reciprocal communication",
        "Body remains loose and grounded against gravity"
      ],
      "retainedVsIntegratedImageUrl": "/images/fear_paralysis_retained_vs_integrated.jpg",
      "assessmentVideoId": "ZkGDm3t2hb8",
      "assessmentVideoUrl": "https://www.youtube.com/watch?v=ZkGDm3t2hb8"
    },
    "exercisePathways": [
      {
        "id": "fpr_primary",
        "name": "Pathway 1: Somatic Melting & Side Cradle",
        "category": "primary_movement",
        "categoryLabel": "Primary Somatic Calming",
        "suitableFor": "Best for daily routine with moderately cooperative children",
        "durationSeconds": 180,
        "targetReps": "3 to 5 minutes daily",
        "metronomeBpm": 60,
        "compensationRedFlags": [
          "Child holding breath during rocking",
          "Arched stiff back resisting touch",
          "Fast erratic movements instead of slow 60 BPM rhythm"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Setup & Nesting",
            "postureDescription": "Child lies on side on a soft mat or bed in a loose fetal curl.",
            "actionInstruction": "Dim the lights, minimize noise, and speak in a soothing low voice.",
            "parentCue": "\"We are curling up like a little baby animal in a safe cave.\"",
            "diagramType": "mat_setup",
            "imageUrl": "/images/fear_paralysis.jpg",
            "alignmentCheck": "Loose fetal curl, dim lighting, soothing voice",
            "durationSeconds": 30,
            "breathCue": "Slow belly breaths in through nose"
          },
          {
            "stepNumber": 2,
            "phase": "begin",
            "title": "Dual-Hand Calming Contact",
            "postureDescription": "Parent places one warm flat hand on child's upper chest and other on back between shoulder blades.",
            "actionInstruction": "Apply gentle, continuous calming pressure (about 1-2 lbs of weight).",
            "parentCue": "\"Feel my warm hands holding you safe and steady.\"",
            "diagramType": "fetal_tuck",
            "imageUrl": "/images/fear_paralysis.jpg",
            "alignmentCheck": "Warm dual hands on chest and spine",
            "durationSeconds": 45,
            "breathCue": "Synchronize breathing with parent"
          },
          {
            "stepNumber": 3,
            "phase": "transient",
            "title": "Rhythmic Heartbeat Rocking",
            "postureDescription": "Slow rhythmic rocking at 60 beats per minute.",
            "actionInstruction": "Gently rock child's torso forward and backward with your hands for 2 minutes.",
            "parentCue": "\"Matching our breath to the ocean waves.\"",
            "diagramType": "rhythmic_infant_rock",
            "imageUrl": "/images/fear_paralysis.jpg",
            "alignmentCheck": "Gentle 60 BPM rocking cadence, loose neck",
            "durationSeconds": 60,
            "breathCue": "Slow exhale as torso rocks forward"
          },
          {
            "stepNumber": 4,
            "phase": "finish",
            "title": "Resting Grounding",
            "postureDescription": "Child rests completely loose and relaxed on side.",
            "actionInstruction": "Keep hands gently resting for 30 seconds of quiet stillness.",
            "parentCue": "\"Soft and heavy like melted butter in the sunshine.\"",
            "diagramType": "mat_setup",
            "imageUrl": "/images/fear_paralysis.jpg",
            "alignmentCheck": "Total muscle release, quiet belly breathing",
            "durationSeconds": 45,
            "breathCue": "Long sigh out through mouth"
          }
        ],
        "coachingCues": [
          "If child resists being touched, place hands lightly over clothing or over a blanket first.",
          "Never force stillness; slow down your own breathing and allow the child to co-regulate with your nervous system."
        ],
        "resistancePlayScript": "\ud83d\udc3b \"Hibernating Bear\": We are safe inside our cozy cave while winter wind blows softly outside.",
        "imageUrl": "/images/fear_paralysis.jpg"
      },
      {
        "id": "fpr_passive",
        "name": "Pathway 2: Passive Weighted Burrow & Head-Heart Nesting",
        "category": "assisted_passive",
        "categoryLabel": "Passive Sensory Burrow",
        "suitableFor": "Hypersensitive, non-speaking, or highly dysregulated children in sensory overwhelm",
        "durationSeconds": 150,
        "targetReps": "2 to 3 minutes during calm-down transitions",
        "metronomeBpm": 50,
        "compensationRedFlags": [
          "Child pushing blanket away with panic (stop immediately)",
          "Facial flushing or signs of overheating"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Weighted Cocoon Nesting",
            "postureDescription": "Child lies supine or side-lying draped in a comforting weighted blanket or lycra sheet.",
            "actionInstruction": "Ensure head and neck remain completely free and comfortable.",
            "parentCue": "\"Let's tuck under the magic cloud that makes all worries melt away.\"",
            "diagramType": "weighted_burrow",
            "imageUrl": "/images/fear_paralysis.jpg",
            "alignmentCheck": "Neck open, blanket draped evenly across body",
            "durationSeconds": 30,
            "breathCue": "Inhale peace, exhale tension"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Firm Deep Compression",
            "postureDescription": "Parent presses palms gently into child's shoulders and hips simultaneously.",
            "actionInstruction": "Hold steady pressure for 10 seconds, release for 5 seconds. Repeat 4 times.",
            "parentCue": "\"Safe and strong, grounded like a mountain.\"",
            "diagramType": "weighted_burrow",
            "imageUrl": "/images/fear_paralysis.jpg",
            "alignmentCheck": "Firm static pressure without squeezing joints",
            "durationSeconds": 60,
            "breathCue": "Exhale with the gentle compression"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Gentle Forehead-to-Sternum Stroke",
            "postureDescription": "Parent uses soft fingertips to stroke from crown of head down to brow line.",
            "actionInstruction": "Stimulates the parasympathetic vagal nerve pathway to disarm intrauterine fear.",
            "parentCue": "\"Smooth, calm forehead... safe and loved.\"",
            "diagramType": "fetal_tuck",
            "imageUrl": "/images/fear_paralysis.jpg",
            "alignmentCheck": "Child closes eyes, facial muscles soften",
            "durationSeconds": 60,
            "breathCue": "Audible soothing sigh"
          }
        ],
        "coachingCues": [
          "Deep pressure input activates Golgi tendon organs and shuts off sympathetic alarm signals.",
          "Never cover child's face or restrict voluntary exit."
        ],
        "resistancePlayScript": "\u26fa \"Campfire Cocoon\": We are snuggled in our sleeping bag listening to gentle rain outside.",
        "imageUrl": "/images/fear_paralysis.jpg"
      },
      {
        "id": "fpr_isometric_heart",
        "name": "Pathway 3: Head-to-Heart Bilateral Cross Pressure",
        "category": "isometric_resistance",
        "categoryLabel": "Isometric Neuro-Facilitation",
        "suitableFor": "Children who resist dynamic movement or display severe somatic freeze",
        "durationSeconds": 120,
        "targetReps": "4 cycles of 6-second holds with 10s rest",
        "metronomeBpm": 40,
        "compensationRedFlags": [
          "Child holding breath during isometric pressure",
          "Tense neck arching off mat"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Supine Neutral Spine",
            "postureDescription": "Child lies comfortably on back, knees gently bent and feet flat on floor.",
            "actionInstruction": "Check that jaw is unclenched and shoulders are away from ears.",
            "parentCue": "\"Soft belly, heavy heels resting on the mat.\"",
            "diagramType": "mat_setup",
            "imageUrl": "/images/fear_paralysis.jpg",
            "alignmentCheck": "Spine neutral, knees bent 45 degrees",
            "durationSeconds": 20,
            "breathCue": "Slow inhale through nose"
          },
          {
            "stepNumber": 2,
            "phase": "begin",
            "title": "Forehead & Sternum Dual Palm Contact",
            "postureDescription": "Parent places one palm lightly on child's forehead, other flat on upper sternum.",
            "actionInstruction": "Rest hands gently to establish comfortable skin or clothing contact.",
            "parentCue": "\"Feel the calm warmth connecting forehead and heart.\"",
            "diagramType": "isometric_press",
            "imageUrl": "/images/fear_paralysis.jpg",
            "alignmentCheck": "Hands centered, steady and warm",
            "durationSeconds": 20,
            "breathCue": "Prepare for gentle resist"
          },
          {
            "stepNumber": 3,
            "phase": "transient",
            "title": "6-Second Static Resistive Exhale",
            "postureDescription": "Child gently presses forehead up into parent's hand with 20% effort while exhaling.",
            "actionInstruction": "Zero joint displacement! Steady isometric hold for 6 seconds, then complete release.",
            "parentCue": "\"Press softly into my hand... 1, 2, 3, 4, 5, 6... and melt.\"",
            "diagramType": "isometric_press",
            "imageUrl": "/images/fear_paralysis.jpg",
            "alignmentCheck": "No head movement, gentle 20% pressure",
            "durationSeconds": 40,
            "breathCue": "Long slow exhale during the 6s hold",
            "compensationWarning": "Do not allow child to thrust neck or tense throat"
          },
          {
            "stepNumber": 4,
            "phase": "finish",
            "title": "Somatic Melt Rest",
            "postureDescription": "Child rests limp and loose, sensing the release of cellular tension.",
            "actionInstruction": "Allow 15 seconds of complete quiet before the next rep.",
            "parentCue": "\"Feel all the worry floating away like clouds.\"",
            "diagramType": "mat_setup",
            "imageUrl": "/images/fear_paralysis.jpg",
            "alignmentCheck": "Limbs heavy and fully supported",
            "durationSeconds": 40,
            "breathCue": "Deep natural diaphragmatic breathing"
          }
        ],
        "coachingCues": [
          "MNRI isometric resistance reprograms brainstem reflex circuits without triggering defensive startle.",
          "Effort should be gentle (20-30%); never turn this into a contest of strength."
        ],
        "resistancePlayScript": "\ud83d\udee1\ufe0f \"Castle Drawbridge\": We test our gentle castle door against the friendly breeze!",
        "imageUrl": "/images/fear_paralysis.jpg"
      },
      {
        "id": "fpr_rhythmic_infant_rock",
        "name": "Pathway 4: Supine Rhythmic Foot Bouncing (BRMT 60 BPM)",
        "category": "rhythmic_movement",
        "categoryLabel": "60 BPM Rhythmic Rocking",
        "suitableFor": "Resetting the cerebellum and vestibular-spinal tract at the 60 BPM womb rhythm",
        "durationSeconds": 180,
        "targetReps": "2 to 3 minutes continuous rhythmic rocking",
        "metronomeBpm": 60,
        "compensationRedFlags": [
          "Rocking too fast (must stay at steady 60 BPM cadence)",
          "Jerking feet instead of smooth fluid wave"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Supine Grounding",
            "postureDescription": "Child lies comfortably on back with legs straight and loose.",
            "actionInstruction": "Parent sits at child's feet facing their head.",
            "parentCue": "\"Let your legs be loose like cooked noodles.\"",
            "diagramType": "mat_setup",
            "imageUrl": "/images/fear_paralysis.jpg",
            "alignmentCheck": "Spine straight, child facing ceiling",
            "durationSeconds": 20,
            "breathCue": "Relaxed belly breathing"
          },
          {
            "stepNumber": 2,
            "phase": "begin",
            "title": "Calcaneal Heel Cup",
            "postureDescription": "Parent cups child's heels gently in palms, resting fingers under soles.",
            "actionInstruction": "Hold heels securely without squeezing ankles.",
            "parentCue": "\"I'm holding your feet safe and steady.\"",
            "diagramType": "sole_calcaneal_glide",
            "imageUrl": "/images/fear_paralysis.jpg",
            "alignmentCheck": "Soft cup grip under heels",
            "durationSeconds": 20,
            "breathCue": "Exhale deeply"
          },
          {
            "stepNumber": 3,
            "phase": "transient",
            "title": "60 BPM Cephalic Wave Pulsing",
            "postureDescription": "Gently push child's feet forward and release rhythmically at exactly 60 beats per minute.",
            "actionInstruction": "Creates a gentle wave traveling up through knees, hips, spine, and rocking the head gently.",
            "parentCue": "\"Gentle ocean boat rocking... up and down, nice and calm.\"",
            "diagramType": "rhythmic_infant_rock",
            "imageUrl": "/images/fear_paralysis.jpg",
            "alignmentCheck": "Rhythmic wave ripples to top of head smoothly",
            "durationSeconds": 100,
            "breathCue": "Inhale on up-pulse, exhale on down-pulse"
          },
          {
            "stepNumber": 4,
            "phase": "finish",
            "title": "Stillness Integration",
            "postureDescription": "Stop pulsing and rest hands on soles of feet for 30 seconds.",
            "actionInstruction": "Allows the brainstem and vestibular system to integrate the calming oscillation.",
            "parentCue": "\"Feel the calm buzzing in your body... so peaceful.\"",
            "diagramType": "mat_setup",
            "imageUrl": "/images/fear_paralysis.jpg",
            "alignmentCheck": "Total body stillness and relaxed breathing",
            "durationSeconds": 40,
            "breathCue": "Silent easy breaths"
          }
        ],
        "coachingCues": [
          "Innate 60 BPM rhythmic movement relies on passive rhythm to stimulate the reticular activating system.",
          "Ensure the head bobs gently with the wave; if neck is stiff, pause and cue a sigh."
        ],
        "resistancePlayScript": "\u26f5 \"Harbor Sailboat\": We are a calm boat gently bobbing at the dock in quiet harbor waters.",
        "imageUrl": "/images/fear_paralysis.jpg"
      },
      {
        "id": "fpr_desk_grounding",
        "name": "Pathway 5: Seated Butterfly Grounding & Desk Palmar Press",
        "category": "classroom_desk",
        "categoryLabel": "Classroom & Desk Reset",
        "suitableFor": "School desks, homework frustration, tests, or car rides without floor space",
        "durationSeconds": 90,
        "targetReps": "3 repetitions of 10-second grounding press",
        "metronomeBpm": 50,
        "compensationRedFlags": [
          "Shoulders hunching up to ears during press",
          "Holding breath instead of audible sigh"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Desk Chair Alignment",
            "postureDescription": "Sit tall in chair with both feet planted flat on floor and hands resting on desk.",
            "actionInstruction": "Uncross legs, slide bottom to back of chair, and relax shoulders.",
            "parentCue": "\"Plant your feet like strong tree roots into the ground.\"",
            "diagramType": "seated_starfish_desk",
            "imageUrl": "/images/fear_paralysis.jpg",
            "alignmentCheck": "90-degree hips and knees, flat soles",
            "durationSeconds": 20,
            "breathCue": "Breathe in through nose for count of 4"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Palm & Sole Dual Grounding",
            "postureDescription": "Press flat palms firmly into desk while pressing soles of feet firmly into floor.",
            "actionInstruction": "Apply steady 30% downward pressure for 8 seconds without moving posture.",
            "parentCue": "\"Push down into the desk and floor like an ancient stone pyramid.\"",
            "diagramType": "isometric_press",
            "imageUrl": "/images/fear_paralysis.jpg",
            "alignmentCheck": "Flat palms, elbows soft, firm floor contact",
            "durationSeconds": 40,
            "breathCue": "Hold breath softly for 2, then slow steady exhale"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "3 Audible Sighs & Heart Hand",
            "postureDescription": "Place right hand over heart and left hand on belly. Take 3 deep audible sighs.",
            "actionInstruction": "Stimulates vagal outflow to clear adrenergic fight-or-flight freeze.",
            "parentCue": "\"Hand on heart, deep breath in... and let out a big soft sigh: ahhhh.\"",
            "diagramType": "seated_starfish_desk",
            "imageUrl": "/images/fear_paralysis.jpg",
            "alignmentCheck": "Chest drops, jaw relaxes, shoulders drop",
            "durationSeconds": 30,
            "breathCue": "Audible vibrating sigh through mouth"
          }
        ],
        "coachingCues": [
          "Children can do this completely discreetly at school before tests or presentations.",
          "The dual proprioceptive input through palms and soles anchors the vestibular cortex."
        ],
        "resistancePlayScript": "\ud83c\udf33 \"Mighty Oak Tree\": Wind blows all around us, but our roots are sunk ten feet into solid ground.",
        "imageUrl": "/images/fear_paralysis.jpg"
      }
    ],
    "verification": {
      "durationWeeks": "4 to 6 weeks of consistent daily calming",
      "retestProtocol": "With child relaxed and eyes closed, generate a soft sound. Observe if child continues steady belly breathing without sudden breath holding, eye flutter, or shoulder hitching.",
      "criteriaForIntegration": "Child maintains regulated autonomic state under minor stress, speaks comfortably without mutism, and handles new environments without freezing."
    },
    "primaryVideo": {
      "youtubeId": "sP8IBcpFRpM",
      "youtubeUrl": "https://www.youtube.com/watch?v=sP8IBcpFRpM",
      "title": "Harkla: Fear Paralysis Reflex Integration Guide"
    }
  },
  "moro": {
    "id": "moro",
    "name": "Moro Reflex (Startle Reflex)",
    "aka": "The Infantile Fight-or-Flight & Adrenaline Surge Reflex",
    "tier": 1,
    "tierName": "Tier 1: Autonomic Safety (Survival Foundation)",
    "tierDescription": "The infant's primitive survival response to sudden loss of vestibular support. If retained, harmless sensory inputs trigger genuine biological panic, emotional dysregulation, and sensory defensiveness.",
    "description": "An involuntary protective response triggered by sudden head motion, bright flashes, or loud sounds. When retained, the child experiences chronic cortisol surges, motion sickness, mood swings, light/sound sensitivities, and difficulty falling asleep.",
    "functionalSigns": [
      "Extreme emotional volatility, sudden explosive meltdowns, or dramatic mood swings",
      "Sensory hypersensitivity to loud noises, bright lights, tags on clothes, or sudden movements",
      "Gravitational insecurity; fearful of swings, escalators, heights, or tipping backwards",
      "Chronic state of high alert; easily startled, poor sleep continuity, or nightmares",
      "Motion sickness, poor balance, or difficulty catching balls"
    ],
    "assessment": {
      "setup": "Child sits comfortably on an exercise mat, pillow behind them for safety.",
      "safetyCaution": "Ensure soft padding behind child. Support child's back if they have severe gravitational insecurity. CONTRAINDICATION: Absolute precaution for severe vestibular hypersensitivity or uncontrolled seizures triggered by backward head tilt.",
      "action": "With child sitting upright and eyes closed, gently tilt them backward 30 degrees toward the pillow. Observe limb reaction.",
      "techniqueTip": "Watch for arm flaring, sudden gasping, or immediate fear response.",
      "grading": {
        "grade0": "Integrated: Child's arms remain relaxed, maintains calm breathing, laughs or remains neutral.",
        "grade1": "Mild: Slight opening of hands or mild startle, recovers within 1 second.",
        "grade2": "Moderate: Arms flare outward involuntarily, sharp gasp, eyes widen with anxiety.",
        "grade3": "Level 3 (Prominent): Violent arm abduction, intense terror, screaming or tears, refusal to repeat."
      },
      "retainedCharacteristics": [
        "Arms fling outward involuntarily with fingers splayed wide",
        "Sudden sharp inhalation or audible gasp with dilated pupils",
        "Immediate emotional distress, anxiety, or fight-or-flight freeze",
        "Inability to inhibit startle response despite knowing the test is coming"
      ],
      "integratedCharacteristics": [
        "Arms remain relaxed at sides or gently placed on lap",
        "Smooth, uninterrupted breathing pattern maintained throughout backward tilt",
        "Calm facial expression; no panic or adrenaline surge",
        "Maintains postural control without flailing"
      ],
      "retainedVsIntegratedImageUrl": "/images/moro_retained_vs_integrated.jpg",
      "assessmentVideoId": "ZkGDm3t2hb8",
      "assessmentVideoUrl": "https://www.youtube.com/watch?v=ZkGDm3t2hb8&t=169s"
    },
    "exercisePathways": [
      {
        "id": "moro_starfish",
        "name": "Pathway 1: The Starfish Drill",
        "category": "primary_movement",
        "categoryLabel": "Primary Active Exercise",
        "suitableFor": "Standard evidence-based protocol for verbal and motor-capable children",
        "durationSeconds": 180,
        "targetReps": "5 to 8 slow repetitions (5 seconds open, 5 seconds close)",
        "metronomeBpm": 45,
        "compensationRedFlags": [
          "Rushing the opening or closing phase (must take full 5 seconds each way)",
          "Holding breath instead of deep diaphragmatic exhalation on closing",
          "Fingers splaying erratically instead of controlled extension"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Centered Setup & Neutral Start",
            "postureDescription": "Child sits comfortably or lies supine on a soft mat, shoulders relaxed, taking 2 calm diaphragmatic breaths to center.",
            "actionInstruction": "Sit or lie comfortably with arms resting at sides. Take a calm breath in and out.",
            "parentCue": "\"Let's find our peaceful ocean floor and get ready to be starfish.\"",
            "diagramType": "fetal_tuck",
            "imageUrl": "/images/moro_starfish.jpg",
            "alignmentCheck": "Spine neutral, shoulders relaxed away from ears, gaze soft",
            "durationSeconds": 10,
            "breathCue": "Inhale slowly through nose, soft exhale"
          },
          {
            "stepNumber": 2,
            "phase": "begin",
            "title": "Fetal Ball Tuck (Right Arm & Leg Crossed)",
            "postureDescription": "Curl tightly into a compact ball. Right arm crossed over left, right leg crossed over left, chin gently tucked to chest.",
            "actionInstruction": "Curl tight into a little sleeping starfish ball.",
            "parentCue": "\"Little tucked starfish asleep on the warm ocean floor.\"",
            "diagramType": "fetal_tuck",
            "imageUrl": "/images/moro_starfish.jpg",
            "alignmentCheck": "Right arm & right leg crossed over left, chin gently tucked",
            "durationSeconds": 15,
            "breathCue": "Inhale softly into back of ribs"
          },
          {
            "stepNumber": 3,
            "phase": "transient",
            "title": "Transient Starfish Opening (Slow 5s Flow)",
            "postureDescription": "Smoothly open arms and legs outward at a 45° angle. Fingers spread wide, head tilted back slightly over a slow 5-second count.",
            "actionInstruction": "Flow open wide like a giant starfish reaching through warm water.",
            "parentCue": "\"Starfish opens wide to say hello to the sunshine... 1, 2, 3, 4, 5!\"",
            "diagramType": "starfish_open",
            "imageUrl": "/images/moro_starfish.jpg",
            "alignmentCheck": "Limbs opening simultaneously, buttery smooth motion without sudden jerking",
            "durationSeconds": 30,
            "breathCue": "Slow diaphragmatic inhale expanding belly and chest"
          },
          {
            "stepNumber": 4,
            "phase": "finish",
            "title": "Full Starfish Hold & Cross-Limb Closure",
            "postureDescription": "Hold the full expansive starfish position for 3 seconds, then smoothly fold back into a tight embrace with OPPOSITE limb crossing (Left arm & leg over right).",
            "actionInstruction": "Hold your bright starfish pose, then hug back in with opposite arms crossed.",
            "parentCue": "\"Fold back into your cozy shell, hugging tight with big deep breath out: shhhhh.\"",
            "diagramType": "meatball_hug",
            "imageUrl": "/images/moro_starfish.jpg",
            "alignmentCheck": "Opposite limb cross (LEFT over right), chin tucked to sternum",
            "durationSeconds": 30,
            "breathCue": "Audible 5-second exhalation through pursed lips"
          }
        ],
        "coachingCues": [
          "CRITICAL: Limb crossing MUST alternate on every repetition (Right-over-Left on rep 1, Left-over-Right on rep 2) to balance bilateral hemispheres.",
          "Speed ruins this exercise: forcing a full 5-second count on opening and closing rewires the sympathetic brainstem."
        ],
        "resistancePlayScript": "\u2b50 \"Cosmic Starfish\": We are gentle space starfish expanding to catch shooting stars, then curling up into our stardust cocoon!",
        "imageUrl": "/images/moro_starfish.jpg",
        "transientSequenceImageUrl": "/images/moro_transient_steps.jpg"
      },
      {
        "id": "moro_passive_repatterning",
        "name": "Pathway 2: Parent-Led Cross-Body Swaddle Hug",
        "category": "assisted_passive",
        "categoryLabel": "Passive Co-Regulation",
        "suitableFor": "Hypersensitive, non-speaking, low muscle tone, or meltdown-prone children",
        "durationSeconds": 150,
        "targetReps": "4 to 6 gentle guided hugs",
        "metronomeBpm": 40,
        "compensationRedFlags": [
          "Forcing limb movement if child pulls away into hyper-extension",
          "Moving too abruptly (must maintain continuous reassuring touch)"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Supine Open Rest",
            "postureDescription": "Child lies supine on a soft mat with arms and legs gently opened wide.",
            "actionInstruction": "Parent sits at child's side with gentle hands on child's wrists and ankles.",
            "parentCue": "\"Resting loose like warm seaweed on the sand.\"",
            "diagramType": "starfish_open",
            "imageUrl": "/images/moro_starfish.jpg",
            "alignmentCheck": "Body relaxed, open posture, soft lighting",
            "durationSeconds": 20,
            "breathCue": "Inhale safety"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Slow Gentle Limb Crossing",
            "postureDescription": "Parent gently folds child's arms across their chest and brings knees toward belly.",
            "actionInstruction": "Guide limbs smoothly without tugging joints; hold the gentle hug for 5 seconds.",
            "parentCue": "\"Soft hug folding in... cozy and warm.\"",
            "diagramType": "meatball_hug",
            "imageUrl": "/images/moro_starfish.jpg",
            "alignmentCheck": "Cross arms over chest, knees soft, head supported",
            "durationSeconds": 40,
            "breathCue": "Long exhale together"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Deep Proprioceptive Hug Hold",
            "postureDescription": "Parent wraps arms around child in a firm, grounded compression hold.",
            "actionInstruction": "Hold firm calming embrace for 15 seconds, matching your breathing pace.",
            "parentCue": "\"Safe in the harbor, nothing can startle us here.\"",
            "diagramType": "weighted_burrow",
            "imageUrl": "/images/moro_starfish.jpg",
            "alignmentCheck": "Firm even pressure, deep co-regulation",
            "durationSeconds": 40,
            "breathCue": "Slow audible sigh"
          }
        ],
        "coachingCues": [
          "Provides the vital brainstem inhibition without activating autonomic startle defenses.",
          "If child is overstimulated, hum a low pitch (vagal tone stimulation) during the fold."
        ],
        "resistancePlayScript": "\ud83d\udc28 \"Koala Nest\": Baby koala tucks safe and sound into mama's cozy pouch.",
        "imageUrl": "/images/moro_starfish.jpg"
      },
      {
        "id": "moro_assisted_ball",
        "name": "Pathway 3: Peanut Ball Supine Extension & Roll",
        "category": "equipment_sensory",
        "categoryLabel": "Therapy Ball & Sensory Play",
        "suitableFor": "Sensory seekers, high energy kids, or children needing vestibular desensitization",
        "durationSeconds": 180,
        "targetReps": "6 to 8 slow rolls forward and backward",
        "metronomeBpm": 45,
        "compensationRedFlags": [
          "Child flinging head back violently without control",
          "Rocking too fast on the ball"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Peanut Ball Seated Setup",
            "postureDescription": "Child sits in the saddle dip of a peanut therapy ball, parent holding child's hips firmly.",
            "actionInstruction": "Check that child's feet can lightly touch floor or a soft mat for security.",
            "parentCue": "\"Sitting tall in the saddle of our gentle space pony.\"",
            "diagramType": "peanut_ball_rock",
            "imageUrl": "/images/moro_starfish.jpg",
            "alignmentCheck": "Hips centered in peanut groove, parent hands on pelvis",
            "durationSeconds": 20,
            "breathCue": "Inhale tall"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Slow Roll Back into Extension",
            "postureDescription": "Parent rolls ball slowly forward so child's back reclines over the curve, arms floating open.",
            "actionInstruction": "Roll back gently until child's chest opens; hold for 4 seconds.",
            "parentCue": "\"Reaching up to touch the soft sky... 1, 2, 3, 4!\"",
            "diagramType": "peanut_ball_rock",
            "imageUrl": "/images/moro_starfish.jpg",
            "alignmentCheck": "Controlled backward roll, arms relaxed open",
            "durationSeconds": 50,
            "breathCue": "Smooth inhale as chest opens over curve"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Forward Roll to Sitting Hug",
            "postureDescription": "Roll ball gently back to sitting; child tucks chin and hugs knees to chest.",
            "actionInstruction": "Return to sitting and encourage tight knee hug for 5 seconds.",
            "parentCue": "\"Back to center, tuck tight like a little seed!\"",
            "diagramType": "fetal_tuck",
            "imageUrl": "/images/moro_starfish.jpg",
            "alignmentCheck": "Upright sitting, chin tucked, knees hugged",
            "durationSeconds": 40,
            "breathCue": "Big exhale"
          }
        ],
        "coachingCues": [
          "Peanut balls provide lateral stability, preventing tipping while offering deep vestibular input.",
          "Always keep firm hands on child's hips throughout the roll."
        ],
        "resistancePlayScript": "\ud83d\ude80 \"Rocket Launch & Landing\": Reclining back for blast-off into space, then returning safely home!",
        "imageUrl": "/images/moro_starfish.jpg"
      },
      {
        "id": "moro_isometric_cross_press",
        "name": "Pathway 4: Cross-Limb Isometric Resistive Embrace",
        "category": "isometric_resistance",
        "categoryLabel": "Isometric Neuro-Facilitation",
        "suitableFor": "Children with dyspraxia, severe spasticity, or who rush and flail during dynamic Starfish",
        "durationSeconds": 120,
        "targetReps": "4 cycles of 6-second holds with 10s rest",
        "metronomeBpm": 40,
        "compensationRedFlags": [
          "Holding breath or clenching teeth during static resistance",
          "Arching lower spine off floor"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Supine Crossed Arms Setup",
            "postureDescription": "Child lies on back with knees bent, arms crossed firmly over chest.",
            "actionInstruction": "Parent places hands gently on the outside of child's bent elbows.",
            "parentCue": "\"Arms crossed like an ancient warrior at rest.\"",
            "diagramType": "meatball_hug",
            "imageUrl": "/images/moro_starfish.jpg",
            "alignmentCheck": "Spine flat, arms crossed, parent hands on lateral elbows",
            "durationSeconds": 20,
            "breathCue": "Inhale softly into ribs"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Gentle Outward Elbow Resistance (6s hold)",
            "postureDescription": "Child gently tries to push elbows outward against parent's steady hands with 25% effort.",
            "actionInstruction": "Static hold for 6 seconds without any joint motion. Parent matches force exactly.",
            "parentCue": "\"Gently push elbows out against my hands... 1, 2, 3, 4, 5, 6... and release.\"",
            "diagramType": "isometric_press",
            "imageUrl": "/images/moro_starfish.jpg",
            "alignmentCheck": "Zero joint displacement, steady 25% pressure",
            "durationSeconds": 40,
            "breathCue": "Long slow exhale through pursed lips"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Complete Release & Open Palms",
            "postureDescription": "Release all resistance, arms drop softly open to sides, palms facing up.",
            "actionInstruction": "Rest for 10 seconds of complete stillness before the next repetition.",
            "parentCue": "\"Melt into the warm sand, completely loose and safe.\"",
            "diagramType": "starfish_open",
            "imageUrl": "/images/moro_starfish.jpg",
            "alignmentCheck": "Palms open, jaw loose, resting belly breathing",
            "durationSeconds": 30,
            "breathCue": "Deep natural sigh"
          }
        ],
        "coachingCues": [
          "The isometric contraction activates sensory-motor cortex pathways to inhibit the startle reflex arc.",
          "Ensure the child's effort remains gentle (20-30%); excessive strain triggers compensation."
        ],
        "resistancePlayScript": "\ud83c\udff0 \"Friendly Fortress\": Pressing against the sturdy castle walls, knowing we are completely secure inside.",
        "imageUrl": "/images/moro_starfish.jpg"
      },
      {
        "id": "moro_desk_crab_shell",
        "name": "Pathway 5: Seated Crab-to-Shell Spinal Dissociation",
        "category": "classroom_desk",
        "categoryLabel": "Classroom & Desk Reset",
        "suitableFor": "Sensory overload at school, testing anxiety, or homework frustration at desk",
        "durationSeconds": 90,
        "targetReps": "4 slow seated repetitions",
        "metronomeBpm": 45,
        "compensationRedFlags": [
          "Tipping chair backward during extension",
          "Holding breath instead of 5-second exhale"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Seated Chair Extension",
            "postureDescription": "Sit upright at desk, extend legs straight out in front with heels on floor, arms reaching back.",
            "actionInstruction": "Inhale gently, expanding chest without throwing head back violently.",
            "parentCue": "\"Expand like a wide crab on the sandy beach... big breath in.\"",
            "diagramType": "seated_starfish_desk",
            "imageUrl": "/images/moro_starfish.jpg",
            "alignmentCheck": "Stable chair base, extended heels on floor, open chest",
            "durationSeconds": 20,
            "breathCue": "Inhale count of 4"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Slow Exhale into Tucked Shell",
            "postureDescription": "Slowly draw knees up, wrap arms around thighs, and tuck chin gently toward sternum.",
            "actionInstruction": "Count 5 seconds down into the tucked position while exhaling smoothly.",
            "parentCue": "\"Tuck into your cozy crab shell... 1, 2, 3, 4, 5... all quiet inside.\"",
            "diagramType": "seated_starfish_desk",
            "imageUrl": "/images/moro_starfish.jpg",
            "alignmentCheck": "Arms wrapping thighs, chin tucked, back rounded smoothly",
            "durationSeconds": 40,
            "breathCue": "Long slow 5-second exhale"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Deep Belly Breath Recovery",
            "postureDescription": "Hold the seated tuck for 5 seconds before sitting upright with calm hands on desk.",
            "actionInstruction": "Feel the grounded sensation in the pelvis and lower spine.",
            "parentCue": "\"Safe and steady at your desk, ready to focus.\"",
            "diagramType": "seated_starfish_desk",
            "imageUrl": "/images/moro_starfish.jpg",
            "alignmentCheck": "Calm seated posture, feet flat, relaxed shoulders",
            "durationSeconds": 30,
            "breathCue": "Slow diaphragmatic breath"
          }
        ],
        "coachingCues": [
          "Provides the exact motor inhibition of Starfish within a standard classroom chair.",
          "Can be used as a self-regulation tool before tests or following loud recess periods."
        ],
        "resistancePlayScript": "\ud83e\udd80 \"Hermit Crab\": Peak out to see the sunshine, then retract safe into our cozy shell.",
        "imageUrl": "/images/moro_starfish.jpg"
      }
    ],
    "verification": {
      "durationWeeks": "6 to 8 weeks of daily practice",
      "retestProtocol": "Repeat 30\u00b0 backward tilt test with child seated on mat, eyes closed. Check for arm flaring or panic response.",
      "criteriaForIntegration": "Zero arm flare on backward tilt; child remains calm and giggles or maintains steady diaphragmatic breathing. Significant reduction in sound sensitivity and meltdowns."
    },
    "primaryVideo": {
      "youtubeId": "WFWW1fr3dlw",
      "youtubeUrl": "https://www.youtube.com/watch?v=WFWW1fr3dlw",
      "title": "Harkla: Moro Reflex Explained & Integration Activities"
    }
  },
  "tlr": {
    "id": "tlr",
    "name": "Tonic Labyrinthine Reflex (TLR)",
    "aka": "The Vestibular Muscle-Tone Split Reflex",
    "tier": 1,
    "tierName": "Tier 1: Autonomic Safety (Survival Foundation)",
    "tierDescription": "Governs the child's gravitational relationship to the earth. Modulates flexor and extensor muscle tone in response to head tilt above or below the spine.",
    "description": "When head tilts forward, entire body curls into flexion; when head tilts backward, entire body stiffens into extension. When retained, causes toe-walking, severe slouching, poor spatial awareness, motion sickness, and dyspraxia.",
    "functionalSigns": [
      "Chronic toe-walking (TLR Extensor dominance)",
      "Severe slumping or 'melting' over desks while writing (TLR Flexor dominance / poor core stability)",
      "Poor spatial awareness; bumps into doorframes, walls, or other children constantly",
      "Motion sickness in cars, swings, or theme park rides; hates having head upside down",
      "Difficulty with multi-step motor planning, swimming, or balancing on one foot"
    ],
    "assessment": {
      "setup": "Child stands with feet together, arms straight out in front at shoulder height.",
      "safetyCaution": "Stand close to catch child if balance is lost. Ensure carpeted or padded surface. CONTRAINDICATION: Do NOT perform full neck extension or inverted positions if child has Down syndrome / Atlantoaxial Instability (AAI) or cervical hypermobility.",
      "action": "Child closes eyes. Have them slowly tilt head fully backward to look at ceiling (5 seconds), then tilt head fully forward to look at toes (5 seconds).",
      "techniqueTip": "Watch for loss of balance, toe lifting, knee bending, or arm swaying.",
      "grading": {
        "grade0": "Integrated: Child maintains steady balance with eyes closed; arms remain motionless at shoulder height.",
        "grade1": "Mild: Slight sway or minor arm dip (<2 inches), recovers without moving feet.",
        "grade2": "Moderate: Obvious arm dropping or rising >3 inches; child wobbles and opens eyes or takes a step.",
        "grade3": "Level 3 (Prominent): Complete loss of balance; child falls backward when looking up or knees buckle when looking down."
      },
      "retainedCharacteristics": [
        "Arms drift downward involuntarily when head tilts backward (extensor surge)",
        "Knees buckle or arms drop completely when head tilts forward (flexor collapse)",
        "Child loses balance completely with eyes closed when head moves off vertical",
        "Persistent toe-walking or locked hyperextended knees when standing"
      ],
      "integratedCharacteristics": [
        "Maintains rock-solid balance with eyes closed regardless of head angle",
        "Arms remain locked at shoulder height without drifting or trembling",
        "Smooth head tilt without triggering whole-body stiffening or curling",
        "Weight remains evenly balanced across heels and balls of feet"
      ],
      "retainedVsIntegratedImageUrl": "/images/tlr_retained_vs_integrated.jpg",
      "assessmentVideoId": "ZkGDm3t2hb8",
      "assessmentVideoUrl": "https://www.youtube.com/watch?v=ZkGDm3t2hb8&t=302s"
    },
    "exercisePathways": [
      {
        "id": "tlr_superman_meatball",
        "name": "Pathway 1: Superman Prone to Meatball Supine",
        "category": "primary_movement",
        "categoryLabel": "Primary Active Exercise",
        "suitableFor": "Standard evidence-based protocol for developing head-body dissociation",
        "durationSeconds": 180,
        "targetReps": "6 repetitions (3 Superman holds + 3 Meatball tucks)",
        "metronomeBpm": 45,
        "compensationRedFlags": [
          "Hyperextending neck (jutting chin forward instead of keeping neck long)",
          "Holding breath during Superman lift",
          "Inability to hold tuck without hands gripping ankles for dear life"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "begin",
            "title": "Prone Superman Flight Lift",
            "postureDescription": "Child lies prone on stomach. Simultaneously lift arms, chest, and straight legs 2-3 inches off mat with chin gently tucked. Hold for 5 seconds.",
            "actionInstruction": "Fly like Superman! Keep legs straight and knees off the mat. Breathe smoothly.",
            "parentCue": "\"Superman flying high over the city... 1, 2, 3, 4, 5!\"",
            "diagramType": "superman_prone",
            "imageUrl": "/images/tlr_superman.jpg",
            "alignmentCheck": "Knees off floor, arms extended, neck long with chin tucked",
            "durationSeconds": 30,
            "breathCue": "Inhale gently into chest; do NOT hold breath"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Smooth Flip to Supine Egg",
            "postureDescription": "Child smoothly rolls onto back and immediately curls into a tight 'Meatball' / 'Egg' tuck: hug knees to chest, tuck chin, lift head slightly off floor.",
            "actionInstruction": "Roll like a smooth log onto your back and pull into a tight meatball! Hold for 5 seconds.",
            "parentCue": "\"Smooth roll into a tight little meatball... holding strong for 5!\"",
            "diagramType": "meatball_hug",
            "imageUrl": "/images/tlr_superman.jpg",
            "alignmentCheck": "Knees tightly hugged, chin to chest, head floating 1 inch off floor",
            "durationSeconds": 30,
            "breathCue": "Slow audible exhale while holding tuck"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Rest on Mat",
            "postureDescription": "Child relaxes flat onto back with arms and legs limp on mat for 5 seconds before next rep.",
            "actionInstruction": "Completely release all muscle tension between holds.",
            "parentCue": "\"Melting into the soft floor... heavy and calm.\"",
            "diagramType": "mat_setup",
            "imageUrl": "/images/tlr_superman.jpg",
            "alignmentCheck": "Complete release of extensor and flexor tone",
            "durationSeconds": 20,
            "breathCue": "Deep belly breath"
          }
        ],
        "coachingCues": [
          "Dissociates the vestibular system from involuntary whole-body tone switches.",
          "If child cannot lift both arms and legs in Superman, start with arms only, then legs only, before combining."
        ],
        "resistancePlayScript": "\ud83e\uddb8 \"Superhero Transformation\": We fly through the clouds as Superman, then curl into our cosmic escape pod!",
        "imageUrl": "/images/tlr_superman.jpg"
      },
      {
        "id": "tlr_passive_cradle_flexion",
        "name": "Pathway 2: Supported Cradle Flexion Roll",
        "category": "assisted_passive",
        "categoryLabel": "Passive Proprioceptive Flexion",
        "suitableFor": "Children with extensor dominance, severe toe-walking, or hypotonic fatigue",
        "durationSeconds": 150,
        "targetReps": "4 to 6 assisted rolls",
        "metronomeBpm": 40,
        "compensationRedFlags": [
          "Forcing head forward if child arches neck aggressively",
          "Tugging on ankles (support behind knees instead)"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Supine Pillowed Head Rest",
            "postureDescription": "Child lies on back with head resting on a soft pillow to inhibit extensor tone.",
            "actionInstruction": "Check that child's shoulders are flat on the mat.",
            "parentCue": "\"Resting on our fluffy cloud pillow.\"",
            "diagramType": "mat_setup",
            "imageUrl": "/images/tlr_superman.jpg",
            "alignmentCheck": "Slight chin tuck created by pillow support",
            "durationSeconds": 20,
            "breathCue": "Inhale softly"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Assisted Knee Tuck & Head Support",
            "postureDescription": "Parent gently brings child's knees toward chest and supports the back of their head.",
            "actionInstruction": "Guide knees toward chest into a supported ball for 8 seconds.",
            "parentCue": "\"Curling into a gentle little bowling ball.\"",
            "diagramType": "meatball_hug",
            "imageUrl": "/images/tlr_superman.jpg",
            "alignmentCheck": "Hands cupping behind knees, head gently cradled",
            "durationSeconds": 40,
            "breathCue": "Long exhale"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Gentle Cradle Rock",
            "postureDescription": "Gently rock the curled body side-to-side for 15 seconds.",
            "actionInstruction": "Provides vestibular desensitization in a safe flexor posture.",
            "parentCue": "\"Rocking gently like a little boat on the water.\"",
            "diagramType": "rhythmic_infant_rock",
            "imageUrl": "/images/tlr_superman.jpg",
            "alignmentCheck": "Smooth side-to-side oscillation",
            "durationSeconds": 40,
            "breathCue": "Relaxed breathing"
          }
        ],
        "coachingCues": [
          "Inhibits persistent extensor posturing (common in chronic toe-walkers).",
          "Never push head forward past comfortable range."
        ],
        "resistancePlayScript": "\ud83d\udc23 \"Hatching Egg\": Little chick is curled safe inside the egg waiting for sunrise.",
        "imageUrl": "/images/tlr_superman.jpg"
      },
      {
        "id": "tlr_isometric_press",
        "name": "Pathway 3: Supine Occipital & Calcaneal Static Press",
        "category": "isometric_resistance",
        "categoryLabel": "Isometric Neuro-Facilitation",
        "suitableFor": "Children who cannot maintain Superman flight or have extreme joint laxity",
        "durationSeconds": 120,
        "targetReps": "4 cycles of 6-second holds with 10s rest",
        "metronomeBpm": 40,
        "compensationRedFlags": [
          "Arching lower back off mat during heel press",
          "Jutting chin upward into ceiling"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Neutral Spine Supine Alignment",
            "postureDescription": "Child lies flat on back with legs straight and arms resting at sides.",
            "actionInstruction": "Ensure spine is in neutral alignment with heels touching mat.",
            "parentCue": "\"Lie flat like a smooth ruler on the floor.\"",
            "diagramType": "mat_setup",
            "imageUrl": "/images/tlr_superman.jpg",
            "alignmentCheck": "Spine long, chin tucked, heels grounded",
            "durationSeconds": 20,
            "breathCue": "Deep belly inhale"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Head & Heel 5-Second Static Floor Press",
            "postureDescription": "Child gently presses back of head and both heels into floor with 30% effort.",
            "actionInstruction": "Zero lumbar arching! Static 5-second hold activating the posterior chain isometrically.",
            "parentCue": "\"Press head and heels into the floor like heavy stones... 1, 2, 3, 4, 5... and melt.\"",
            "diagramType": "isometric_press",
            "imageUrl": "/images/tlr_superman.jpg",
            "alignmentCheck": "Pelvis stays flat on mat, gentle 30% pressure",
            "durationSeconds": 40,
            "breathCue": "Steady exhale during the 5s hold"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Pelvic Neutral Release",
            "postureDescription": "Release all pressure, legs and neck soften completely.",
            "actionInstruction": "Rest for 10 seconds of stillness before the next repetition.",
            "parentCue": "\"Melt into warm pudding on the mat.\"",
            "diagramType": "mat_setup",
            "imageUrl": "/images/tlr_superman.jpg",
            "alignmentCheck": "Total muscle softness, easy breathing",
            "durationSeconds": 30,
            "breathCue": "Soft audible breath"
          }
        ],
        "coachingCues": [
          "Provides targeted extensor motor recruitment without the spinal hyperextension of prone flight.",
          "Watch that the lumbar spine remains in contact with the mat."
        ],
        "resistancePlayScript": "\u2693 \"Heavy Anchor\": We press our anchor into the sea floor to hold our ship steady.",
        "imageUrl": "/images/tlr_superman.jpg"
      },
      {
        "id": "tlr_equipment_ball",
        "name": "Pathway 4: Therapy Ball Prone Rolling Reach & High-Five",
        "category": "equipment_sensory",
        "categoryLabel": "Therapy Ball & Sensory Play",
        "suitableFor": "High energy sensory seekers, vestibular under-responders, and dyspraxic children",
        "durationSeconds": 180,
        "targetReps": "8 slow rolling reaches",
        "metronomeBpm": 45,
        "compensationRedFlags": [
          "Rolling too quickly and falling forward onto wrists",
          "Hyperextending neck"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Prone Draped Over Therapy Ball",
            "postureDescription": "Child lies stomach down over a 55cm therapy ball, feet resting on floor behind.",
            "actionInstruction": "Parent supports child's hips or thighs firmly.",
            "parentCue": "\"Draped over the big bouncy ball like a sleepy seal.\"",
            "diagramType": "peanut_ball_rock",
            "imageUrl": "/images/tlr_superman.jpg",
            "alignmentCheck": "Pelvis centered on ball, parent hands on hips",
            "durationSeconds": 20,
            "breathCue": "Inhale gently"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Forward Roll to Floor High-Five",
            "postureDescription": "Roll ball slowly forward until child's hands touch mat to give parent a double high-five.",
            "actionInstruction": "Keep body in strong straight plank line; hold high-five for 4 seconds.",
            "parentCue": "\"Roll forward into flight... High Five! 1, 2, 3, 4!\"",
            "diagramType": "airplane_prone",
            "imageUrl": "/images/tlr_superman.jpg",
            "alignmentCheck": "Arms weight-bearing, core engaged, chin tucked",
            "durationSeconds": 50,
            "breathCue": "Exhale as hands touch mat"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Roll Back to Prone Rest",
            "postureDescription": "Roll ball back until feet rest on floor and chest drapes over ball.",
            "actionInstruction": "Rest for 5 seconds before the next forward roll.",
            "parentCue": "\"Roll back to base camp and take a soft breath.\"",
            "diagramType": "peanut_ball_rock",
            "imageUrl": "/images/tlr_superman.jpg",
            "alignmentCheck": "Full body relaxation over curve of ball",
            "durationSeconds": 40,
            "breathCue": "Deep belly breath"
          }
        ],
        "coachingCues": [
          "Combines vestibular stimulation with upper extremity weight-bearing and core stability.",
          "Ensure the forward roll is slow and controlled."
        ],
        "resistancePlayScript": "\ud83d\udc2c \"Dolphin Leap\": Gliding over the ocean wave to high-five the friendly seal on the dock!",
        "imageUrl": "/images/tlr_superman.jpg"
      },
      {
        "id": "tlr_play_turtle",
        "name": "Pathway 5: Turtle Hiding in Lycra Tunnel Shell",
        "category": "active_play",
        "categoryLabel": "Proprioceptive Play",
        "suitableFor": "Younger children (ages 3-7) or children who refuse formal exercises",
        "durationSeconds": 150,
        "targetReps": "5 peek-a-boo turtle extensions",
        "metronomeBpm": 40,
        "compensationRedFlags": [
          "Neck hyperextension during head lift",
          "Getting tangled or panicked in tunnel (keep tunnel ends open)"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Crawl Inside Lycra Sensory Tunnel",
            "postureDescription": "Child crawls into a stretchy lycra tube or tunnel and curls into a tight ball.",
            "actionInstruction": "Ensure both ends of tunnel remain open and accessible.",
            "parentCue": "\"Crawl inside your cozy turtle shell!\"",
            "diagramType": "lycra_tunnel",
            "imageUrl": "/images/tlr_superman.jpg",
            "alignmentCheck": "Curled flexed posture inside lycra resistance",
            "durationSeconds": 30,
            "breathCue": "Soft quiet breath inside shell"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Head Extension Out of Shell",
            "postureDescription": "Child peeks head and chest out of the tunnel opening against the elastic lycra resistance.",
            "actionInstruction": "Look around for 5 seconds while extending thoracic spine against resistance.",
            "parentCue": "\"Peek your turtle head out to see if the sun is shining! 1, 2, 3, 4, 5!\"",
            "diagramType": "airplane_prone",
            "imageUrl": "/images/tlr_superman.jpg",
            "alignmentCheck": "Thoracic extension against lycra, chin tucked",
            "durationSeconds": 45,
            "breathCue": "Inhale as head peeks out"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Retract into Dark Cocoon",
            "postureDescription": "Child pulls head back inside tunnel and curls into tight flexor ball for 10 seconds.",
            "actionInstruction": "Full flexor curl inside sensory cocoon.",
            "parentCue": "\"Quick! Tuck back into your safe dark shell!\"",
            "diagramType": "fetal_tuck",
            "imageUrl": "/images/tlr_superman.jpg",
            "alignmentCheck": "Tight tuck, deep proprioceptive pressure from lycra",
            "durationSeconds": 30,
            "breathCue": "Big exhale"
          }
        ],
        "coachingCues": [
          "Lycra provides continuous 360-degree deep pressure feedback, making extension safe and inviting.",
          "Encourage slow deliberate peeks rather than sudden head flinging."
        ],
        "resistancePlayScript": "\ud83d\udc22 \"Tommy the Turtle\": Peeking out to see the sunny beach, then sleeping safe in our shell.",
        "imageUrl": "/images/tlr_superman.jpg"
      }
    ],
    "verification": {
      "durationWeeks": "6 to 8 weeks of daily practice",
      "retestProtocol": "Repeat standing head tilt test with eyes closed and arms extended at shoulder height. Observe arm drift and balance sway.",
      "criteriaForIntegration": "Zero loss of balance when head tilts backward or forward with eyes closed; arms stay locked at shoulder height without drifting; elimination of habitual toe-walking."
    },
    "primaryVideo": {
      "youtubeId": "xDkduQyZsQg",
      "youtubeUrl": "https://www.youtube.com/watch?v=xDkduQyZsQg",
      "title": "Harkla: TLR vs Landau Reflex Explained (Signs, Testing & Activities)"
    }
  },
  "landau": {
    "id": "landau",
    "name": "Landau Reflex",
    "aka": "The Prone Superman Anti-Gravity Extensor Bridge",
    "tier": 2,
    "tierName": "Tier 2: Gravitational Security & Spinal Freedom",
    "tierDescription": "Emerges at 3-10 months to bridge primitive tonic reflexes to mature postural verticality. Connects the head, spine, and lower extremities in synchronous anti-gravity extension.",
    "description": "When child is suspended horizontally prone, head lifts, spine extends, and legs lift straight. If retained past age 3, creates rigid stiffness, awkward running mechanics, tight hamstrings, and inability to isolate upper and lower body movements.",
    "functionalSigns": [
      "Stiff, awkward running mechanics with little or no knee flexion ('tin soldier' run)",
      "Poor coordination between upper and lower body (difficulty swimming breaststroke, jumping jacks)",
      "Chronic tension in lower back, hamstrings, or calves; difficulty touching toes",
      "Slumps or curls into a ball when sitting on floor; hates sitting cross-legged",
      "Difficulty dissociating head movement from back and leg extension"
    ],
    "assessment": {
      "setup": "Child lies prone on stomach on a comfortable exercise mat.",
      "safetyCaution": "Ensure neck is not over-extended. If child complains of lower back pain, stop immediately. CONTRAINDICATION: Avoid hyper-extension if child has active spinal fusion or abdominal discomfort.",
      "action": "Ask child to lift head and chest off the mat while keeping legs resting flat. Then ask them to lift legs while keeping chest flat.",
      "techniqueTip": "Observe whether lifting the head automatically forces the legs to fly up off the floor (retained Landau).",
      "grading": {
        "grade0": "Integrated: Child isolates head/chest lift independently while legs remain flat and relaxed on mat.",
        "grade1": "Mild: Legs twitch or rise slightly (<2 inches) when chest lifts, but child can suppress with verbal cue.",
        "grade2": "Moderate: Legs rise involuntarily 4-6 inches whenever chest lifts; cannot separate upper/lower body.",
        "grade3": "Level 3 (Prominent): Complete rigid extensor bow; head lift violently pulls entire lower body off mat into a rigid arc."
      },
      "retainedCharacteristics": [
        "Lifting head instantly causes legs to elevate involuntarily off the floor",
        "Rigid extension throughout the entire posterior chain with inability to isolate segments",
        "Inability to flex neck forward while in a prone position",
        "Extreme hamstring tightness and lumbar arching"
      ],
      "integratedCharacteristics": [
        "Effortless dissociation: can lift head/chest while keeping legs completely relaxed and flat on mat",
        "Can lift legs off mat while keeping upper chest and chin resting softly on mat",
        "Fluid, flexible spine with full range of forward flexion and backward extension",
        "Smooth, coordinated reciprocal leg and arm movements during running"
      ],
      "retainedVsIntegratedImageUrl": "/images/landau_retained_vs_integrated.jpg",
      "assessmentVideoId": "xDkduQyZsQg",
      "assessmentVideoUrl": "https://www.youtube.com/watch?v=xDkduQyZsQg"
    },
    "exercisePathways": [
      {
        "id": "landau_airplane",
        "name": "Pathway 1: Prone Airplane & Swimming Dolphin",
        "category": "primary_movement",
        "categoryLabel": "Primary Active Exercise",
        "suitableFor": "Strengthening postural thoracic extensor chain and head-pelvis dissociation",
        "durationSeconds": 180,
        "targetReps": "5 to 6 slow holds (5 seconds each)",
        "metronomeBpm": 50,
        "compensationRedFlags": [
          "Neck hyperextension (jutting chin up instead of keeping cervical spine long)",
          "Holding breath during extension lift",
          "Legs flying up off floor when instructed to keep them grounded"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Prone Runway Setup",
            "postureDescription": "Child lies prone on mat, arms extended out to sides like airplane wings.",
            "actionInstruction": "Look straight down at mat. Inhale gently through nose.",
            "parentCue": "\"Airplane on the runway, wings spread wide.\"",
            "diagramType": "mat_setup",
            "imageUrl": "/images/landau_airplane.jpg",
            "alignmentCheck": "Face down, arms 90 degrees out to sides, legs flat",
            "durationSeconds": 20,
            "breathCue": "Inhale softly through nose"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Airplane Flight Lift",
            "postureDescription": "Gently lift chest and arms 2-3 inches off mat with chin tucked. Keep feet resting lightly on mat.",
            "actionInstruction": "Hold smooth flight for 5 seconds while breathing steadily.",
            "parentCue": "\"Wings up! Flying smooth and steady through the clouds... 1, 2, 3, 4, 5.\"",
            "diagramType": "airplane_prone",
            "imageUrl": "/images/landau_airplane.jpg",
            "alignmentCheck": "Long neck, chin tucked, feet stay down on mat",
            "durationSeconds": 40,
            "breathCue": "Steady exhale during flight hold"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Runway Touchdown & Rest",
            "postureDescription": "Lower chest and arms softly back to mat, turning head to side to rest cheek.",
            "actionInstruction": "Rest for 5 seconds before next flight rep.",
            "parentCue": "\"Smooth landing on the soft grass.\"",
            "diagramType": "mat_setup",
            "imageUrl": "/images/landau_airplane.jpg",
            "alignmentCheck": "Complete muscular release onto floor",
            "durationSeconds": 30,
            "breathCue": "Soft belly breath"
          }
        ],
        "coachingCues": [
          "Focus on keeping chin tucked (long cervical spine) rather than looking up at ceiling.",
          "Gently hold child's ankles down if they struggle to keep legs grounded initially."
        ],
        "resistancePlayScript": "\u2708\ufe0f \"Sky Patrol Mission\": We are surveying the friendly jungle from our glider plane!",
        "imageUrl": "/images/landau_airplane.jpg"
      },
      {
        "id": "landau_passive_ball",
        "name": "Pathway 2: Peanut Ball Supported Prone Extension",
        "category": "equipment_sensory",
        "categoryLabel": "Therapy Ball & Sensory Play",
        "suitableFor": "Children with low muscle tone who fatigue quickly on flat floor",
        "durationSeconds": 150,
        "targetReps": "4 to 6 assisted extensions",
        "metronomeBpm": 45,
        "compensationRedFlags": [
          "Child rolling off side of peanut ball",
          "Arching lower back instead of upper thoracic spine"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Prone Draped Over Peanut Center",
            "postureDescription": "Child lies stomach-down across peanut center, feet touching floor behind.",
            "actionInstruction": "Parent supports pelvis firmly.",
            "parentCue": "\"Draped over the peanut saddle like a relaxed puppy.\"",
            "diagramType": "peanut_ball_rock",
            "imageUrl": "/images/landau_airplane.jpg",
            "alignmentCheck": "Pelvis supported, arms relaxed forward",
            "durationSeconds": 20,
            "breathCue": "Inhale ease"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Assisted Arm Flight Hold",
            "postureDescription": "Child reaches both arms forward or to sides, lifting upper chest off the ball curve.",
            "actionInstruction": "Hold 4 seconds with parent stabilizing hips.",
            "parentCue": "\"Reaching for the stars... 1, 2, 3, 4!\"",
            "diagramType": "airplane_prone",
            "imageUrl": "/images/landau_airplane.jpg",
            "alignmentCheck": "Thoracic extension supported by ball curve",
            "durationSeconds": 40,
            "breathCue": "Inhale as arms lift"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Relaxed Forward Drape",
            "postureDescription": "Child drapes torso completely over the front of ball, arms hanging loose.",
            "actionInstruction": "Rest for 10 seconds between repetitions.",
            "parentCue": "\"Melting like warm chocolate over the ball.\"",
            "diagramType": "peanut_ball_rock",
            "imageUrl": "/images/landau_airplane.jpg",
            "alignmentCheck": "Complete relaxation of paraspinal muscles",
            "durationSeconds": 30,
            "breathCue": "Long sigh"
          }
        ],
        "coachingCues": [
          "The peanut ball reduces the gravitational load, allowing isolated upper back activation.",
          "Ensure feet stay on floor to anchor lower extremities."
        ],
        "resistancePlayScript": "\ud83d\udc2c \"Friendly Dolphin\": Porpoising over gentle waves in the sunshine!",
        "imageUrl": "/images/landau_airplane.jpg"
      },
      {
        "id": "landau_isometric_scapular",
        "name": "Pathway 3: Prone Scapular & Gluteal Isometric Hold",
        "category": "isometric_resistance",
        "categoryLabel": "Isometric Neuro-Facilitation",
        "suitableFor": "Children with hypermobility, dyspraxia, or who struggle with active anti-gravity lift",
        "durationSeconds": 120,
        "targetReps": "4 cycles of 5-second static holds",
        "metronomeBpm": 40,
        "compensationRedFlags": [
          "Holding breath during static resistance",
          "Pelvis lifting completely off mat"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Prone Mat Alignment",
            "postureDescription": "Child lies prone with forehead resting on back of flat hands.",
            "actionInstruction": "Parent kneels beside child, placing one palm lightly on upper back between shoulder blades.",
            "parentCue": "\"Lying flat and calm like a resting sea turtle.\"",
            "diagramType": "mat_setup",
            "imageUrl": "/images/landau_airplane.jpg",
            "alignmentCheck": "Spine straight, forehead supported on hands",
            "durationSeconds": 20,
            "breathCue": "Breathe into back ribs"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Palm Resistance on Scapula & Heels",
            "postureDescription": "Parent provides gentle downward resistance on upper back while child gently presses up with 20% effort.",
            "actionInstruction": "Static 5-second hold with zero joint displacement, then complete release.",
            "parentCue": "\"Gently lift into my palm... 1, 2, 3, 4, 5... and melt.\"",
            "diagramType": "isometric_press",
            "imageUrl": "/images/landau_airplane.jpg",
            "alignmentCheck": "Static pressure, no neck hyperextension",
            "durationSeconds": 40,
            "breathCue": "Steady exhale during 5s hold"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Melting Floor Rest",
            "postureDescription": "Child relaxes flat onto mat, head resting on cheek.",
            "actionInstruction": "10 seconds of full relaxation before the next rep.",
            "parentCue": "\"Heavy and warm, melting into the soft floor.\"",
            "diagramType": "mat_setup",
            "imageUrl": "/images/landau_airplane.jpg",
            "alignmentCheck": "Complete release of extensor tension",
            "durationSeconds": 30,
            "breathCue": "Soft audible sigh"
          }
        ],
        "coachingCues": [
          "MNRI isometric activation isolates the deep multifidus and thoracic erector spinae.",
          "Pressure should be light and continuous (1-2 lbs of resistance)."
        ],
        "resistancePlayScript": "\ud83d\udee1\ufe0f \"Shield of Honor\": Lifting our gentle protective shield against the soft breeze.",
        "imageUrl": "/images/landau_airplane.jpg"
      },
      {
        "id": "landau_scooter_glide",
        "name": "Pathway 4: Prone Scooter Board Superman Gliding",
        "category": "active_play",
        "categoryLabel": "Proprioceptive Equipment Play",
        "suitableFor": "High energy sensory seekers, vestibular under-responders, and school clinics",
        "durationSeconds": 180,
        "targetReps": "6 scooter board glides across the room",
        "metronomeBpm": 50,
        "compensationRedFlags": [
          "Dipping chin down onto scooter board",
          "Dragging toes continuously along floor"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Prone Mounting on Scooter Board",
            "postureDescription": "Child lies stomach-down on a padded 4-wheel scooter board, pelvis centered.",
            "actionInstruction": "Keep hands on floor ready to push.",
            "parentCue": "\"Mount our magic glider board! Keep head lifted high.\"",
            "diagramType": "airplane_prone",
            "imageUrl": "/images/landau_airplane.jpg",
            "alignmentCheck": "Pelvis centered, head lifted, chin tucked",
            "durationSeconds": 20,
            "breathCue": "Inhale focus"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Dynamic Hand Propulsions Across Room",
            "postureDescription": "Child pushes floor with palms to glide forward across room while keeping legs extended behind.",
            "actionInstruction": "Glide 10 feet across carpet or smooth floor.",
            "parentCue": "\"Push and glide! Flying across the space station!\"",
            "diagramType": "scooter_board",
            "imageUrl": "/images/landau_airplane.jpg",
            "alignmentCheck": "Legs lifted off floor during glide, arms pushing",
            "durationSeconds": 50,
            "breathCue": "Exhale with each hand push"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Gliding Extension Hold",
            "postureDescription": "Coast to a stop with arms extended forward and legs held straight for 4 seconds.",
            "actionInstruction": "Hold static flight extension as board slows.",
            "parentCue": "\"Smooth coasting to the landing pad... 1, 2, 3, 4!\"",
            "diagramType": "airplane_prone",
            "imageUrl": "/images/landau_airplane.jpg",
            "alignmentCheck": "Full anti-gravity flight hold during coast",
            "durationSeconds": 40,
            "breathCue": "Long smooth exhale"
          }
        ],
        "coachingCues": [
          "Provides intense vestibular and proprioceptive inputs while training sustained thoracic extension.",
          "Ensure path is clear of obstacles."
        ],
        "resistancePlayScript": "\ud83d\ude80 \"Cosmic Glider\": Steering our space pod through the starry galaxy!",
        "imageUrl": "/images/landau_airplane.jpg"
      }
    ],
    "verification": {
      "durationWeeks": "6 to 8 weeks of consistent practice",
      "retestProtocol": "Repeat prone chest lift test. Observe whether legs remain relaxed on mat while upper chest extends.",
      "criteriaForIntegration": "Complete independent separation of upper chest and leg extension; improved running flexibility with fluid knee bending; ability to sit comfortably cross-legged."
    },
    "primaryVideo": {
      "youtubeId": "xDkduQyZsQg",
      "youtubeUrl": "https://www.youtube.com/watch?v=xDkduQyZsQg",
      "title": "Harkla: TLR vs Landau Reflex Explained (Signs, Testing & Activities)"
    }
  },
  "spinal_galant": {
    "id": "spinal_galant",
    "name": "Spinal Galant Reflex",
    "aka": "The Paraspinal Lumbar Wiggle & Fidget Reflex",
    "tier": 2,
    "tierName": "Tier 2: Gravitational Security & Spinal Freedom",
    "tierDescription": "Emerges at 20 weeks gestation to aid in the birth process by lateral trunk rotation. If retained, any touch to the lower back triggers involuntary hip wiggling, ticklishness, and inability to sit still.",
    "description": "When the skin along either side of the lumbar spine is stimulated, the infant's hips laterally flex toward that side. When retained, tight waistbands, chair backs, or light touch cause intense fidgeting, sensory sensitivity, bedwetting, and ADHD-like symptoms.",
    "functionalSigns": [
      "Extreme fidgeting in chairs; constantly shifting, squirming, or sitting on feet",
      "Intolerance of tight clothing, tags, elastic waistbands, or light touch to lower back",
      "Persistent bedwetting (nocturnal enuresis) past age 5-6 due to stimulation from bedsheets",
      "Extreme ticklishness along the spine, hips, or ribs",
      "Poor auditory processing or attention when seated in school chairs with backrests"
    ],
    "assessment": {
      "setup": "Child is in a stable quadruped (hands and knees) tabletop position on a mat.",
      "safetyCaution": "Do NOT use sharp objects. Use a soft fingertip or pencil eraser.",
      "action": "Stroke gently down one side of the spine, about 1 inch lateral from vertebrae, from mid-back to hip.",
      "techniqueTip": "Observe whether the child's hip twitches toward the stroked side, arching the spine laterally.",
      "grading": {
        "grade0": "Integrated: Child's torso and hips remain steady; no hip twitching, wiggling, or squirming.",
        "grade1": "Mild: Slight muscle twitch in lumbar paraspinals, but hips do not visibly swing.",
        "grade2": "Moderate: Obvious lateral hip swing of 1-2 inches toward stroked side; child laughs or squirming.",
        "grade3": "Level 3 (Prominent): Violent hip jerk >3 inches, spine buckles, child collapses to mat or jumps away tickled."
      },
      "retainedCharacteristics": [
        "Immediate lateral hip jerk toward the stimulated side",
        "Spine buckles or arches laterally away from neutral alignment",
        "Extreme ticklishness, shrieking, or inability to tolerate the stroke",
        "Involuntary pelvic tilting when light clothing touches the lumbar spine"
      ],
      "integratedCharacteristics": [
        "Rock-solid tabletop posture: spine and hips remain motionless during stroke",
        "Comfortable with light paraspinal touch without ticklish discomfort",
        "Ability to sit still in high-back chairs without fidgeting or squirming",
        "Reliable bladder control through the night without enuresis"
      ],
      "retainedVsIntegratedImageUrl": "/images/spinal_galant_retained_vs_integrated.jpg",
      "assessmentVideoId": "ZkGDm3t2hb8",
      "assessmentVideoUrl": "https://www.youtube.com/watch?v=ZkGDm3t2hb8&t=227s"
    },
    "exercisePathways": [
      {
        "id": "galant_snow_angels",
        "name": "Pathway 1: Synchronous 4-Limb Floor Snow Angels",
        "category": "primary_movement",
        "categoryLabel": "Primary Active Exercise",
        "suitableFor": "Standard protocol for integrating lumbar nerve pathways and bilateral coordination",
        "durationSeconds": 180,
        "targetReps": "10 slow synchronized sweeps (5 seconds out, 5 seconds in)",
        "metronomeBpm": 40,
        "compensationRedFlags": [
          "Asymmetric limb sweep (arms racing faster than legs)",
          "Wrists or heels lifting off floor (must stay in contact with carpet)",
          "Arching lower back off the floor during the sweep"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Supine Lumbar Grounding",
            "postureDescription": "Child lies flat on back on a firm carpet. Arms at sides, legs straight.",
            "actionInstruction": "Press lower back gently into the floor so there is no gap under the lumbar spine.",
            "parentCue": "\"Glue your lower back to the floor like a stamp.\"",
            "diagramType": "mat_setup",
            "imageUrl": "/images/spinal_galant.jpg",
            "alignmentCheck": "Lower back flat against carpet, heels resting",
            "durationSeconds": 20,
            "breathCue": "Inhale softly into back ribs"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Synchronous Lateral Floor Sweep",
            "postureDescription": "Slowly slide arms overhead and legs wide apart along the carpet simultaneously (5 seconds).",
            "actionInstruction": "Wrists and heels must remain glued to floor! Arms and legs must reach peak at exact same instant.",
            "parentCue": "\"Moving like slow-motion clock hands... sweeping fresh snow... 1, 2, 3, 4, 5.\"",
            "diagramType": "snow_angel_sweep",
            "imageUrl": "/images/spinal_galant.jpg",
            "alignmentCheck": "4 limbs move at identical speed, wrists/heels on floor",
            "durationSeconds": 45,
            "breathCue": "Inhale on opening sweep, exhale on closing sweep"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Return Sweep & Knee-Hug Rock",
            "postureDescription": "Slide limbs back to start (5 seconds). Hug knees to chest and gently rock side-to-side.",
            "actionInstruction": "Massages lumbar paraspinal muscles against the firm floor.",
            "parentCue": "\"Rocking gently side to side like a little rowboat.\"",
            "diagramType": "meatball_hug",
            "imageUrl": "/images/spinal_galant.jpg",
            "alignmentCheck": "Gentle lumbar rocking, steady breath",
            "durationSeconds": 35,
            "breathCue": "Slow diaphragmatic breath"
          }
        ],
        "coachingCues": [
          "CRUCIAL: Synchronous 4-limb pacing inhibits cortical momentum. Prevent arms from outracing legs.",
          "Firm carpet friction provides tactile desensitization to paraspinal mechanoreceptors."
        ],
        "resistancePlayScript": "\u2744\ufe0f \"Frosty Snow Angels\": We are creating perfect matching snow angel wings in fresh winter snow!",
        "imageUrl": "/images/spinal_galant.jpg"
      },
      {
        "id": "galant_passive_trunk_crescent",
        "name": "Pathway 2: Side-Lying Passive Lumbar Crescent Stretch",
        "category": "assisted_passive",
        "categoryLabel": "Passive Lumbar Desensitization",
        "suitableFor": "Hypersensitive, non-speaking, or bedwetting-prone children who resist active floor sweeps",
        "durationSeconds": 150,
        "targetReps": "6 gentle crescent stretches (3 each side)",
        "metronomeBpm": 40,
        "compensationRedFlags": [
          "Forcing lumbar curve if child complains of tightness",
          "Tickling child's back instead of firm reassuring touch"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Side-Lying Pillow Setup",
            "postureDescription": "Child lies on side, knees slightly bent, head supported comfortably on pillow.",
            "actionInstruction": "Parent kneels behind child's back with warm hands.",
            "parentCue": "\"Curling on our side like a sleepy puppy.\"",
            "diagramType": "fetal_tuck",
            "imageUrl": "/images/spinal_galant.jpg",
            "alignmentCheck": "Neutral spine, comfortable head support",
            "durationSeconds": 20,
            "breathCue": "Inhale ease"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Assisted Banana Lateral Curve Stretch",
            "postureDescription": "Parent gently guides child's shoulder and hip apart to create a gentle lateral curve (crescent).",
            "actionInstruction": "Hold gentle passive paraspinal stretch for 8 seconds, then return to neutral.",
            "parentCue": "\"Stretching long like a curved yellow banana... 1, 2, 3, 4, 5.\"",
            "diagramType": "snow_angel_sweep",
            "imageUrl": "/images/spinal_galant.jpg",
            "alignmentCheck": "Gentle paraspinal stretch without twisting spine",
            "durationSeconds": 40,
            "breathCue": "Exhale into the stretch"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Gentle Sacral Grounding Palm",
            "postureDescription": "Parent rests a warm, firm flat palm over child's lower sacrum for 15 seconds.",
            "actionInstruction": "Calms the S2-S4 parasympathetic micturition bladder reflexes.",
            "parentCue": "\"Warm sunbeam resting on your lower back... completely peaceful.\"",
            "diagramType": "fetal_tuck",
            "imageUrl": "/images/spinal_galant.jpg",
            "alignmentCheck": "Warm static palm, child relaxes into mat",
            "durationSeconds": 30,
            "breathCue": "Deep sigh"
          }
        ],
        "coachingCues": [
          "Provides the vital brainstem desensitization without activating the tickle reflex.",
          "Direct deep sacral palm contact down-regulates hyperactive bladder contractions."
        ],
        "resistancePlayScript": "\ud83c\udf19 \"Crescent Moon\": We curve like the sleepy crescent moon shining in the night sky.",
        "imageUrl": "/images/spinal_galant.jpg"
      },
      {
        "id": "galant_rhythmic_tail_wag",
        "name": "Pathway 3: Quadruped Pelvic Tail Wag (BRMT 60 BPM)",
        "category": "rhythmic_movement",
        "categoryLabel": "60 BPM Rhythmic Rocking",
        "suitableFor": "ADHD fidgeters, sensory seekers, and kids who cannot sit still in class",
        "durationSeconds": 180,
        "targetReps": "2 minutes of continuous 60 BPM rhythmic wagging",
        "metronomeBpm": 60,
        "compensationRedFlags": [
          "Moving shoulders instead of isolating pelvis",
          "Wagging too fast (must adhere to steady 60 BPM metronome)"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Four-Point Quadruped Tabletop",
            "postureDescription": "Hands under shoulders, knees directly under hips, flat tabletop back.",
            "actionInstruction": "Keep shoulders rock steady; only the pelvis will move.",
            "parentCue": "\"Sturdy wooden table... shoulders locked solid like granite.\"",
            "diagramType": "quadruped_table",
            "imageUrl": "/images/spinal_galant.jpg",
            "alignmentCheck": "Hands below shoulders, knees below hips, flat back",
            "durationSeconds": 20,
            "breathCue": "Inhale stability"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Rhythmic Lateral Pelvis Swings 60 BPM",
            "postureDescription": "Slowly wag hips from side to side at 60 beats per minute, isolating lumbar spine.",
            "actionInstruction": "Left hip wags out, then right hip wags out. Shoulders stay still.",
            "parentCue": "\"Happy puppy wagging its tail... tick-tock, tick-tock, nice and rhythmic!\"",
            "diagramType": "pelvic_tail_wag",
            "imageUrl": "/images/spinal_galant.jpg",
            "alignmentCheck": "Pelvic isolation, shoulders stationary, 60 BPM cadence",
            "durationSeconds": 100,
            "breathCue": "Inhale left wag, exhale right wag"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Child's Pose Spine Lengthening",
            "postureDescription": "Sink hips back onto heels, extend arms forward on mat, forehead resting on floor.",
            "actionInstruction": "Lengthen lumbar paraspinal muscles in deep flexion for 20 seconds.",
            "parentCue": "\"Resting puppy curled by the hearth.\"",
            "diagramType": "fetal_tuck",
            "imageUrl": "/images/spinal_galant.jpg",
            "alignmentCheck": "Hips to heels, lumbar spine lengthened",
            "durationSeconds": 40,
            "breathCue": "Long slow sigh"
          }
        ],
        "coachingCues": [
          "60 BPM rhythmic rocking for Spinal Galant directly rewires lumbar motor loops.",
          "Make sure the child does not shift their hands or rock forward and back."
        ],
        "resistancePlayScript": "\ud83d\udc15 \"Happy Puppy\": Wagging our tail to say hello to all our forest animal friends!",
        "imageUrl": "/images/spinal_galant.jpg"
      },
      {
        "id": "galant_isometric_trunk",
        "name": "Pathway 4: Lateral Trunk Isometric Resistance",
        "category": "isometric_resistance",
        "categoryLabel": "Isometric Neuro-Facilitation",
        "suitableFor": "Children with severe tickle sensitivity where active movement triggers hysterics",
        "durationSeconds": 120,
        "targetReps": "4 cycles of 6-second holds (2 each side)",
        "metronomeBpm": 40,
        "compensationRedFlags": [
          "Twisting pelvis or rolling onto back",
          "Holding breath during static contraction"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Side-Lying Neutral Spine",
            "postureDescription": "Child lies on right side with legs straight and head supported.",
            "actionInstruction": "Parent places one flat palm on top lateral hip (iliac crest).",
            "parentCue": "\"Lying straight like a pencil on its side.\"",
            "diagramType": "mat_setup",
            "imageUrl": "/images/spinal_galant.jpg",
            "alignmentCheck": "Hips stacked vertically, spine neutral",
            "durationSeconds": 20,
            "breathCue": "Inhale calmness"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Hip-to-Shoulder Static Resistance (6s hold)",
            "postureDescription": "Child gently attempts to hike top hip toward armpit against parent's steady resisting palm.",
            "actionInstruction": "Zero joint motion! 25% static effort for 6 seconds, then complete release.",
            "parentCue": "\"Gently hike hip into my hand... 1, 2, 3, 4, 5, 6... and melt.\"",
            "diagramType": "isometric_press",
            "imageUrl": "/images/spinal_galant.jpg",
            "alignmentCheck": "Static resistance against lateral hip, no spine twisting",
            "durationSeconds": 40,
            "breathCue": "Slow steady exhale during hold"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Paraspinal Release",
            "postureDescription": "Release all effort, rolling onto back to rest flat for 10 seconds before switching sides.",
            "actionInstruction": "Feel the release of lumbar nerve sensitivity.",
            "parentCue": "\"Completely relaxed like warm sunshine.\"",
            "diagramType": "mat_setup",
            "imageUrl": "/images/spinal_galant.jpg",
            "alignmentCheck": "Spine flat, muscles loose",
            "durationSeconds": 30,
            "breathCue": "Deep belly breath"
          }
        ],
        "coachingCues": [
          "MNRI isometric contraction engages the quadratus lumborum without skin stroking.",
          "Ideal for highly ticklish children who shriek when touched directly on the back."
        ],
        "resistancePlayScript": "\ud83c\udff0 \"Drawbridge Lever\": Gently pressing the castle bridge into place with steady warrior power.",
        "imageUrl": "/images/spinal_galant.jpg"
      },
      {
        "id": "galant_sensory_tunnel",
        "name": "Pathway 5: Army Belly Crawl Obstacle Tunnel",
        "category": "active_play",
        "categoryLabel": "Sensory Tactile Desensitization",
        "suitableFor": "High-energy sensory seekers, tactile defensive children, and active playrooms",
        "durationSeconds": 150,
        "targetReps": "4 crawls through low tunnel",
        "metronomeBpm": 45,
        "compensationRedFlags": [
          "Lifting onto hands and knees (must stay completely flat on stomach)",
          "Rushing and crashing"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Flat Prone Belly Position",
            "postureDescription": "Child lies flat on stomach in front of a low blanket tunnel or lycra sheet.",
            "actionInstruction": "Keep belly flat against carpet.",
            "parentCue": "\"Army commando flat on the ground, ready to sneak through the tunnel!\"",
            "diagramType": "mat_setup",
            "imageUrl": "/images/spinal_galant.jpg",
            "alignmentCheck": "Belly, hips, and chest in continuous floor contact",
            "durationSeconds": 20,
            "breathCue": "Inhale stealth"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Crawl Under Weighted Lycra Blanket",
            "postureDescription": "Child army crawls on belly beneath a weighted blanket or lycra fabric.",
            "actionInstruction": "Continuous friction against the lower back desensitizes tactile receptors.",
            "parentCue": "\"Slither forward smooth and silent... feeling the blanket hug your back!\"",
            "diagramType": "weighted_burrow",
            "imageUrl": "/images/spinal_galant.jpg",
            "alignmentCheck": "Deep tactile friction across lumbar region, reciprocal crawling",
            "durationSeconds": 50,
            "breathCue": "Steady rhythmic breathing"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Full Body Prone Extension",
            "postureDescription": "Exit the tunnel and stretch out long on stomach, resting cheek on floor.",
            "actionInstruction": "Rest for 10 seconds of peaceful stillness.",
            "parentCue": "\"Mission accomplished! Resting in the safe basecamp.\"",
            "diagramType": "airplane_prone",
            "imageUrl": "/images/spinal_galant.jpg",
            "alignmentCheck": "Spine long, fully relaxed against carpet",
            "durationSeconds": 30,
            "breathCue": "Deep audible breath"
          }
        ],
        "coachingCues": [
          "Carpet friction + weighted blanket resistance rapidly desensitizes hyper-excitable paraspinal cutaneous nerves.",
          "Encourage long gliding belly pulls rather than erratic wriggling."
        ],
        "resistancePlayScript": "\ud83e\udd8e \"Secret Agent Lizard\": Sneaking through the covert jungle tunnel to deliver the secret message!",
        "imageUrl": "/images/spinal_galant.jpg"
      }
    ],
    "verification": {
      "durationWeeks": "6 to 8 weeks of daily practice",
      "retestProtocol": "Repeat paraspinal stroke test in quadruped tabletop position. Observe hip twitching and ticklishness.",
      "criteriaForIntegration": "Zero hip twitch or spine buckling when stroked along lumbar spine; comfortable wearing pants with elastic waistbands; cessation of nocturnal bedwetting; dramatic improvement in seated classroom focus."
    },
    "primaryVideo": {
      "youtubeId": "hopxSwLLSWI",
      "youtubeUrl": "https://www.youtube.com/watch?v=hopxSwLLSWI",
      "title": "Harkla: Spinal Galant Reflex Explained"
    }
  },
  "amphibian": {
    "id": "amphibian",
    "name": "Amphibian Reflex",
    "aka": "The Prone Pelvic Tilt & Crawling Motor Driver",
    "tier": 2,
    "tierName": "Tier 2: Gravitational Security & Spinal Freedom",
    "tierDescription": "Emerges at 4-6 months as Spinal Galant begins to integrate. Enables independent pelvic tilt and leg flexion essential for true cross-pattern crawling and walking.",
    "description": "When child is prone, lifting one side of the pelvis causes the leg on that same side to flex at hip and knee. If non-integrated, results in clumsy crawling (bear crawling, bunny hopping), poor pelvic stability, tight hip flexors, and delayed bilateral integration.",
    "functionalSigns": [
      "Clumsy, awkward crawling history (scooted on bottom, bunny-hopped, or skipped crawling entirely)",
      "Poor pelvic stability; walks with an exaggerated waddling gait or excessive anterior pelvic tilt",
      "Difficulty with reciprocal leg movements (riding a tricycle/bicycle, swimming scissor kicks)",
      "Tight hip flexors and weak gluteal muscles",
      "Poor coordination when climbing stairs (steps with same foot on every step instead of alternating)"
    ],
    "assessment": {
      "setup": "Child lies completely flat on stomach (prone) on mat with legs straight.",
      "safetyCaution": "Ensure gentle lifting of the pelvis; do not twist spine aggressively.",
      "action": "Gently lift one side of child's pelvis (iliac crest) 1-2 inches off the mat.",
      "techniqueTip": "Observe whether the knee on that same side automatically bends and slides forward along the mat.",
      "grading": {
        "grade0": "Integrated: Lifting the pelvis triggers smooth, voluntary flexion of the homolateral knee toward 90\u00b0.",
        "grade1": "Mild: Knee twitches or bends slightly (<30\u00b0), but child does not complete the slide without prompting.",
        "grade2": "Moderate: Knee does not bend; leg remains stiff and lifts off the floor as a rigid unit.",
        "grade3": "Level 3 (Prominent): Complete absence of knee flexion; pelvis lifts but legs remain locked straight; child rolls over."
      },
      "retainedCharacteristics": [
        "Leg remains completely stiff and locked straight when pelvis is lifted",
        "Opposite leg bends instead of the stimulated side (confused hemispheric wiring)",
        "Child rolls onto side or back to escape the pelvic tilt",
        "Inability to dissociate pelvis from lumbar spine"
      ],
      "integratedCharacteristics": [
        "Effortless, automatic homolateral knee flexion: lifting the right pelvis instantly causes right knee to slide up to 90\u00b0",
        "Left leg remains relaxed, flat, and straight on the mat throughout the motion",
        "Smooth alternating mechanics during crawling, running, and climbing stairs",
        "Pelvis remains stable during single-leg balance and kicking"
      ],
      "retainedVsIntegratedImageUrl": "/images/amphibian_retained_vs_integrated.jpg",
      "assessmentVideoId": "7oOSBuzGUys",
      "assessmentVideoUrl": "https://www.youtube.com/watch?v=7oOSBuzGUys"
    },
    "exercisePathways": [
      {
        "id": "amphibian_lizard_slide",
        "name": "Pathway 1: Prone Homolateral Amphibian Slide",
        "category": "primary_movement",
        "categoryLabel": "Primary Active Exercise",
        "suitableFor": "Developing independent pelvic dissociation and crawling mechanics",
        "durationSeconds": 180,
        "targetReps": "8 alternating slides (4 Right, 4 Left)",
        "metronomeBpm": 45,
        "compensationRedFlags": [
          "Lifting pelvis completely off floor instead of sliding knee along mat",
          "Rolling onto side instead of keeping chest flat on mat",
          "Moving opposite limbs instead of homolateral side"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Prone Belly Alignment",
            "postureDescription": "Child lies flat on stomach on mat, arms resting straight overhead.",
            "actionInstruction": "Keep belly and chest flat against the mat.",
            "parentCue": "\"Lying like a sleepy lizard on a warm rock.\"",
            "diagramType": "mat_setup",
            "imageUrl": "/images/amphibian_crawling.jpg",
            "alignmentCheck": "Flat belly, arms extended, legs straight",
            "durationSeconds": 20,
            "breathCue": "Inhale ease"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Right 90\u00b0 Knee & Elbow Floor Slide",
            "postureDescription": "Slide RIGHT knee and RIGHT elbow up along the mat to 90\u00b0. Left arm and leg stay straight flat.",
            "actionInstruction": "Hold for 5 seconds. Keep pelvis flat on floor.",
            "parentCue": "\"Slide right knee and elbow up... lizard crawling on the tree branch... 1, 2, 3, 4, 5.\"",
            "diagramType": "amphibian_slide",
            "imageUrl": "/images/amphibian_crawling.jpg",
            "alignmentCheck": "Right knee at 90 degrees, pelvis flat, left leg straight",
            "durationSeconds": 40,
            "breathCue": "Exhale as knee slides up"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Left 90\u00b0 Homolateral Slide",
            "postureDescription": "Slide right side straight, then smoothly slide LEFT knee and elbow up to 90\u00b0.",
            "actionInstruction": "Hold for 5 seconds. Breathe smoothly.",
            "parentCue": "\"Smooth switch to the left side... steady and slow... 1, 2, 3, 4, 5.\"",
            "diagramType": "amphibian_slide",
            "imageUrl": "/images/amphibian_crawling.jpg",
            "alignmentCheck": "Left knee at 90 degrees, chest grounded",
            "durationSeconds": 40,
            "breathCue": "Inhale straight, exhale slide"
          }
        ],
        "coachingCues": [
          "Limbs must slide along the surface of the mat rather than lifting into the air.",
          "Chest and chin stay resting on mat to isolate pelvic movement."
        ],
        "resistancePlayScript": "\ud83e\udd8e \"Chameleon Crawl\": Creeping silently along the rainforest branch toward the target!",
        "imageUrl": "/images/amphibian_crawling.jpg"
      },
      {
        "id": "amphibian_passive_pelvic_glide",
        "name": "Pathway 2: Passive Pelvic Glide & Knee Flexion",
        "category": "assisted_passive",
        "categoryLabel": "Passive Neurological Repatterning",
        "suitableFor": "Hypotonic, non-speaking, or dyspraxic children needing assisted repatterning",
        "durationSeconds": 150,
        "targetReps": "6 assisted slides (3 each side)",
        "metronomeBpm": 40,
        "compensationRedFlags": [
          "Forcing knee flexion if child exhibits pain or joint stiffness",
          "Lifting child's hips too high off mat"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Prone Rest Alignment",
            "postureDescription": "Child lies prone with forehead resting on hands. Legs relaxed straight.",
            "actionInstruction": "Parent kneels at child's side with hands on child's hip and behind knee.",
            "parentCue": "\"Resting loose like a soft sleepy turtle.\"",
            "diagramType": "mat_setup",
            "imageUrl": "/images/amphibian_crawling.jpg",
            "alignmentCheck": "Spine straight, child relaxed on stomach",
            "durationSeconds": 20,
            "breathCue": "Inhale softly"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Passive Pelvic Tilt & Knee Slide",
            "postureDescription": "Parent gently lifts child's right hip 1 inch and guides right knee to slide up along mat to 90\u00b0.",
            "actionInstruction": "Hold the 90\u00b0 position for 5 seconds before gently returning leg straight.",
            "parentCue": "\"Helping our little frog leg bend smooth and easy... 1, 2, 3, 4, 5.\"",
            "diagramType": "amphibian_slide",
            "imageUrl": "/images/amphibian_crawling.jpg",
            "alignmentCheck": "Smooth knee slide, opposite leg stays relaxed",
            "durationSeconds": 40,
            "breathCue": "Exhale with the guided bend"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Passive Lumbar Lengthening",
            "postureDescription": "Return leg straight and rest a warm flat palm on child's lower back for 10 seconds.",
            "actionInstruction": "Ensures parasympathetic calming between repetitions.",
            "parentCue": "\"Safe and steady, feeling warm sunshine on your back.\"",
            "diagramType": "mat_setup",
            "imageUrl": "/images/amphibian_crawling.jpg",
            "alignmentCheck": "Both legs flat and straight",
            "durationSeconds": 30,
            "breathCue": "Deep sigh"
          }
        ],
        "coachingCues": [
          "Stimulates the proprioceptive stretch receptors in the hip adductors and gluteals.",
          "Move slowly and gently without jerky motions."
        ],
        "resistancePlayScript": "\ud83d\udc38 \"Gentle Lilypad Leap\": Helping our frog rest on the warm green lilypad.",
        "imageUrl": "/images/amphibian_crawling.jpg"
      },
      {
        "id": "amphibian_supine_cross",
        "name": "Pathway 3: Supine Cross-Lateral Amphibian Bicycle",
        "category": "active_play",
        "categoryLabel": "Active Cross-Lateral Coordination",
        "suitableFor": "Children transitioning from homolateral to true cross-pattern crawling and walking",
        "durationSeconds": 180,
        "targetReps": "10 slow controlled cross touches (5 each side)",
        "metronomeBpm": 45,
        "compensationRedFlags": [
          "Rushing the bicycle motion into erratic kicking",
          "Arching lower back off the floor"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Supine Grounding",
            "postureDescription": "Child lies on back, knees bent, feet flat on floor, hands resting behind ears.",
            "actionInstruction": "Glue lower back flat into the mat.",
            "parentCue": "\"Back glued flat to the mat like a strong bridge.\"",
            "diagramType": "mat_setup",
            "imageUrl": "/images/amphibian_crawling.jpg",
            "alignmentCheck": "Lower back flat on mat, elbows wide",
            "durationSeconds": 20,
            "breathCue": "Inhale stability"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Slow Opposite Knee-to-Elbow Touch",
            "postureDescription": "Lift RIGHT knee toward chest while bringing LEFT elbow across to gently touch knee (5s hold).",
            "actionInstruction": "Slow deliberate midline crossing. Opposite leg stays grounded.",
            "parentCue": "\"Right knee meets left elbow for a friendly high five... 1, 2, 3, 4, 5.\"",
            "diagramType": "cross_crawl_march",
            "imageUrl": "/images/amphibian_crawling.jpg",
            "alignmentCheck": "Elbow touches opposite knee across midline",
            "durationSeconds": 45,
            "breathCue": "Exhale on touch"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Smooth Alternate Side Cadence",
            "postureDescription": "Return to center, then slowly bring LEFT knee to RIGHT elbow (5s hold).",
            "actionInstruction": "Keep movement buttery smooth without jerking neck.",
            "parentCue": "\"Left knee meets right elbow... steady and slow... 1, 2, 3, 4, 5.\"",
            "diagramType": "cross_crawl_march",
            "imageUrl": "/images/amphibian_crawling.jpg",
            "alignmentCheck": "Opposite side cross, smooth cadence",
            "durationSeconds": 45,
            "breathCue": "Inhale center, exhale cross"
          }
        ],
        "coachingCues": [
          "Bridges the homolateral Amphibian reflex into mature contralateral hemispheric integration.",
          "Speed destroys this exercise; the slower the cadence, the greater the cerebellar rewiring."
        ],
        "resistancePlayScript": "\ud83d\udeb2 \"Cross-Country Bicycle\": Pedaling our smooth slow-motion bicycle up the mountain trail!",
        "imageUrl": "/images/amphibian_crawling.jpg"
      },
      {
        "id": "amphibian_isometric_knee_drive",
        "name": "Pathway 4: Homolateral Knee-Drive Resistance",
        "category": "isometric_resistance",
        "categoryLabel": "Isometric Neuro-Facilitation",
        "suitableFor": "Children with weak pelvic control, hypotonia, or asymmetric walking gait",
        "durationSeconds": 120,
        "targetReps": "4 cycles of 6-second holds (2 each leg)",
        "metronomeBpm": 40,
        "compensationRedFlags": [
          "Holding breath or tensing face",
          "Pelvis lifting completely off floor"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Prone 90\u00b0 Knee Flexion Setup",
            "postureDescription": "Child lies prone with right knee bent 90\u00b0 out to side along mat.",
            "actionInstruction": "Parent places one flat palm in front of child's bent knee.",
            "parentCue": "\"Lizard knee ready to drive forward.\"",
            "diagramType": "amphibian_slide",
            "imageUrl": "/images/amphibian_crawling.jpg",
            "alignmentCheck": "Right knee at 90 degrees, parent hand on front of knee",
            "durationSeconds": 20,
            "breathCue": "Inhale into belly"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "6-Second Forward Knee Drive Against Hand",
            "postureDescription": "Child gently tries to push bent knee forward into parent's resisting hand with 25% effort.",
            "actionInstruction": "Static hold for 6 seconds without moving forward. Zero joint displacement.",
            "parentCue": "\"Drive knee forward into my hand... 1, 2, 3, 4, 5, 6... and melt.\"",
            "diagramType": "isometric_press",
            "imageUrl": "/images/amphibian_crawling.jpg",
            "alignmentCheck": "Isometric pressure against palm, pelvis flat",
            "durationSeconds": 40,
            "breathCue": "Steady exhale during 6s hold"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Leg Extension & Calcaneal Stretch",
            "postureDescription": "Slide leg back straight, gently flexing foot for 10 seconds of rest before switching sides.",
            "actionInstruction": "Feel the release of tension in hip flexors and groin.",
            "parentCue": "\"Slide leg long and loose... completely relaxed.\"",
            "diagramType": "mat_setup",
            "imageUrl": "/images/amphibian_crawling.jpg",
            "alignmentCheck": "Both legs straight and grounded",
            "durationSeconds": 30,
            "breathCue": "Deep belly breath"
          }
        ],
        "coachingCues": [
          "MNRI isometric knee driving establishes cortical control over the psoas and iliacus muscles.",
          "Never allow the child to push with violent or jarring force."
        ],
        "resistancePlayScript": "\ud83d\ude82 \"Steam Engine Piston\": Driving the friendly locomotive wheels smoothly along the track!",
        "imageUrl": "/images/amphibian_crawling.jpg"
      }
    ],
    "verification": {
      "durationWeeks": "6 to 8 weeks of daily practice",
      "retestProtocol": "Repeat prone pelvic lift test. Observe whether lifting pelvis triggers immediate homolateral knee flexion.",
      "criteriaForIntegration": "Automatic, fluid 90\u00b0 homolateral knee flexion when pelvis is lifted; mature reciprocal mechanics during crawling, stair climbing, and bicycle riding; stable pelvic alignment during walking."
    },
    "primaryVideo": {
      "youtubeId": "7oOSBuzGUys",
      "youtubeUrl": "https://www.youtube.com/watch?v=7oOSBuzGUys",
      "title": "Harkla: Primitive Reflex Integration Play Strategies"
    }
  },
  "atnr": {
    "id": "atnr",
    "name": "Asymmetrical Tonic Neck Reflex (ATNR)",
    "aka": "The Fencer Reflex & Bilateral Midline Gatekeeper",
    "tier": 3,
    "tierName": "Tier 3: Bilateral Hemispheric & Sagittal Separation",
    "tierDescription": "Governs the split between the left and right sides of the brain and body. Essential for reading, writing, tracking across midline, and hand-eye coordination.",
    "description": "When head turns to one side, arm and leg on that 'face side' extend, while arm and leg on the 'skull side' flex into a fencer pose. If retained, the child cannot cross the visual or physical midline, struggles with reading fluency, has a hooked handwriting grip, and exhibits mixed handedness.",
    "functionalSigns": [
      "Difficulty crossing the physical or visual midline (skips words when reading, tracks across page by turning whole head)",
      "Awkward handwriting grip; rotates paper 90 degrees or writes with a hooked wrist",
      "Difficulty catching a ball (turns head away, causing arms to straighten awkwardly or miss)",
      "Poor balance when riding a bicycle (turning head causes handlebars to swerve involuntarily)",
      "Mixed or delayed hand, eye, or foot dominance past age 6"
    ],
    "assessment": {
      "setup": "Child stands in a stable quadruped (hands and knees) tabletop position on a soft mat.",
      "safetyCaution": "Ensure elbows are unlocked with slight natural soft flexion. CONTRAINDICATION: Avoid rapid or forced neck turning. Never force head rotation past natural comfortable range.",
      "action": "Child looks straight down at mat. Parent or child slowly turns head 90 degrees to the RIGHT and holds for 5 seconds. Repeat to the LEFT.",
      "techniqueTip": "Observe whether turning the head causes the skull-side elbow to collapse or the face-side elbow to lock rigid.",
      "grading": {
        "grade0": "Integrated: Child turns head fully 90\u00b0 in both directions while elbows remain completely steady and locked in place.",
        "grade1": "Mild: Skull-side elbow bends slightly (<20\u00b0 flexion) but child quickly corrects without falling.",
        "grade2": "Moderate: Skull-side elbow collapses significantly (>30\u00b0), torso twists, or hips shift noticeably.",
        "grade3": "Level 3 (Prominent): Skull-side arm completely buckles to floor; child collapses or cannot isolate head from limbs."
      },
      "retainedCharacteristics": [
        "Skull-side elbow bends or collapses completely when head turns",
        "Hips swing or shift laterally away from the direction of head rotation",
        "Face-side arm locks into rigid, hyperextended elbow stiffness",
        "Child tilts or rotates torso instead of isolating cervical neck rotation"
      ],
      "integratedCharacteristics": [
        "Full 90\u00b0 cervical rotation in both directions with zero flexion or shift in supporting arms",
        "Shoulders and pelvic girdle remain perfectly square to the mat",
        "Fluid visual tracking across the horizontal midline without head movement",
        "Relaxed, mature pencil grip with forearm resting naturally on the page"
      ],
      "retainedVsIntegratedImageUrl": "/images/atnr_retained_vs_integrated.jpg",
      "assessmentVideoId": "ZkGDm3t2hb8",
      "assessmentVideoUrl": "https://www.youtube.com/watch?v=ZkGDm3t2hb8&t=24s"
    },
    "exercisePathways": [
      {
        "id": "atnr_lizard",
        "name": "Pathway 1: Quadruped Lizard Crawl with Head Rotation",
        "category": "primary_movement",
        "categoryLabel": "Primary Active Exercise",
        "suitableFor": "Standard evidence-based protocol for midline crossing and bilateral brain integration",
        "durationSeconds": 180,
        "targetReps": "10 slow alternating lizard glides (5 Right, 5 Left)",
        "metronomeBpm": 45,
        "compensationRedFlags": [
          "Rushing the head turn (must take full 5 seconds per side)",
          "Elbows collapsing when turning head",
          "Shoulders twisting instead of pure neck rotation"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Stable Quadruped Tabletop",
            "postureDescription": "Child starts on hands and knees with hands under shoulders, knees under hips, flat back.",
            "actionInstruction": "Lock elbows gently in a soft, stable position. Look straight down between hands.",
            "parentCue": "\"Sturdy lizard on a rock, four paws grounded solid.\"",
            "diagramType": "quadruped_table",
            "imageUrl": "/images/atnr_lizard.jpg",
            "alignmentCheck": "Hands below shoulders, flat back, soft unlocked elbows",
            "durationSeconds": 15,
            "breathCue": "Inhale softly into ribs"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Slow 90\u00b0 Head Turn & Gliding Crawl",
            "postureDescription": "Slowly turn head 90\u00b0 to the RIGHT to look at right thumb. Slide right hand forward 3 inches without bending the left elbow (slow count of 5).",
            "actionInstruction": "Keep left arm rock steady! Hold the fencer crawl for 5 seconds.",
            "parentCue": "\"Lizard looks right to spot a cricket... left arm stays strong like a tree branch... 1, 2, 3, 4, 5.\"",
            "diagramType": "head_turn_lizard",
            "imageUrl": "/images/atnr_lizard.jpg",
            "alignmentCheck": "Face turned 90 degrees right, skull-side (left) elbow remains straight and steady",
            "durationSeconds": 30,
            "breathCue": "Exhale as head turns; steady diaphragmatic breathing during hold"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Head Turn to Opposite Side",
            "postureDescription": "Return head to center, then slowly rotate head 90\u00b0 to the LEFT, sliding left hand forward while right arm remains rock steady.",
            "actionInstruction": "Switch sides smoothly. Keep back flat without dropping belly.",
            "parentCue": "\"Smooth turn to the left... right arm locked strong like steel... 1, 2, 3, 4, 5.\"",
            "diagramType": "head_turn_lizard",
            "imageUrl": "/images/atnr_lizard.jpg",
            "alignmentCheck": "Face turned 90 degrees left, skull-side (right) elbow remains unbent",
            "durationSeconds": 30,
            "breathCue": "Slow breath cycle"
          }
        ],
        "coachingCues": [
          "CRITICAL: The arm on the SKULL side will desperately want to collapse. Remind child: 'Keep the back arm strong like a marble column!'",
          "Head rotation MUST be pure cervical rotation; do not allow the child to drop their chin or roll their shoulders."
        ],
        "resistancePlayScript": "\ud83e\udd8e \"Jungle Chameleon\": We are camouflaged lizards scanning the canopy for flying bugs without shaking the branch!",
        "imageUrl": "/images/atnr_lizard.jpg"
      },
      {
        "id": "atnr_passive_fencer",
        "name": "Pathway 2: Supine Assisted Fencer Pose",
        "category": "assisted_passive",
        "categoryLabel": "Passive Co-Regulation Repatterning",
        "suitableFor": "Dyspraxic, non-speaking, low tone, or resistant children who cannot hold quadruped tabletop",
        "durationSeconds": 150,
        "targetReps": "6 gentle guided head turns (3 each side)",
        "metronomeBpm": 40,
        "compensationRedFlags": [
          "Forcing head rotation if child exhibits neck resistance or grimaces",
          "Moving too quickly between sides"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Supine Neutral Alignment",
            "postureDescription": "Child lies comfortably on back on a soft mat, arms resting at sides, legs straight.",
            "actionInstruction": "Parent sits at child's head, placing warm palms gently on either side of child's temples.",
            "parentCue": "\"Resting loose like warm seaweed in gentle ocean waves.\"",
            "diagramType": "mat_setup",
            "imageUrl": "/images/atnr_lizard.jpg",
            "alignmentCheck": "Neutral spine, relaxed shoulders away from ears",
            "durationSeconds": 20,
            "breathCue": "Inhale safety"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Passive Head Turn with Cross-Limb Extension",
            "postureDescription": "Parent slowly turns child's head 60-90\u00b0 to the RIGHT. Gently guide child's right arm straight out to side, while leaving left arm softly bent at side.",
            "actionInstruction": "Hold the relaxed fencer position for 8 seconds, providing reassurance.",
            "parentCue": "\"Gentle turn to the right... looking at the sunshine... 1, 2, 3, 4, 5.\"",
            "diagramType": "head_turn_lizard",
            "imageUrl": "/images/atnr_lizard.jpg",
            "alignmentCheck": "Smooth passive head turn, face-side arm extended, skull-side arm relaxed",
            "durationSeconds": 40,
            "breathCue": "Slow exhale together"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Opposite Side Assisted Repatterning",
            "postureDescription": "Smoothly bring head back to center for 3 seconds of rest, then gently guide head to the LEFT.",
            "actionInstruction": "Extend left arm, bend right arm. Hold for 8 seconds.",
            "parentCue": "\"Gentle turn to the left... feeling completely calm and supported.\"",
            "diagramType": "head_turn_lizard",
            "imageUrl": "/images/atnr_lizard.jpg",
            "alignmentCheck": "Opposite side fencer alignment, no neck strain",
            "durationSeconds": 40,
            "breathCue": "Deep belly breath"
          }
        ],
        "coachingCues": [
          "Provides the vital brainstem repatterning without the stress of weight-bearing.",
          "If child resists head turning, stroke their forehead softly and wait for a sigh before initiating the turn."
        ],
        "resistancePlayScript": "\ud83e\udd3a \"The Sleeping Knight\": The noble knight rests on the cloud bed, gently looking toward the morning dawn.",
        "imageUrl": "/images/atnr_lizard.jpg"
      },
      {
        "id": "atnr_standing_laser",
        "name": "Pathway 3: Standing Fencer Stance with Midline Visual Tracking",
        "category": "active_play",
        "categoryLabel": "Active Visual-Motor Midline Crossing",
        "suitableFor": "School-age children with reading reversals (b/d confusion), poor sports tracking, or skipping lines",
        "durationSeconds": 180,
        "targetReps": "8 slow midline visual sweeps",
        "metronomeBpm": 45,
        "compensationRedFlags": [
          "Turning whole body or feet instead of isolating head and eyes",
          "Bending the extended face-side arm during the visual sweep"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Upright Standing Fencer Stance",
            "postureDescription": "Child stands upright with right foot forward and left foot turned 90\u00b0 behind. Right arm extends straight forward toward wall.",
            "actionInstruction": "Lock right arm straight, pointing index finger at wall. Left hand rests on hip.",
            "parentCue": "\"Olympic fencer ready on the line! Arm straight as a laser beam.\"",
            "diagramType": "cross_crawl_march",
            "imageUrl": "/images/atnr_lizard.jpg",
            "alignmentCheck": "Stable standing base, extended arm pointing at wall target",
            "durationSeconds": 20,
            "breathCue": "Inhale focus"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Laser Pointer Wall Tracking Across Midline",
            "postureDescription": "Parent shines a laser dot or flashlight on wall; child turns head and arm across midline to track dot for 5 seconds.",
            "actionInstruction": "Track dot smoothly across visual midline without bending pointing arm.",
            "parentCue": "\"Follow the magic star across the sky with your laser beam... 1, 2, 3, 4, 5.\"",
            "diagramType": "head_turn_lizard",
            "imageUrl": "/images/atnr_lizard.jpg",
            "alignmentCheck": "Smooth horizontal midline crossing, pointing arm locked straight",
            "durationSeconds": 45,
            "breathCue": "Steady exhale during tracking sweep"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Controlled Switch to Opposite Side",
            "postureDescription": "Switch feet: left foot forward, left arm extended straight, right hand on hip. Repeat visual sweep to opposite side.",
            "actionInstruction": "Maintain smooth motor control during stance transition.",
            "parentCue": "\"Switch to left fencer! Lock laser arm straight and steady.\"",
            "diagramType": "cross_crawl_march",
            "imageUrl": "/images/atnr_lizard.jpg",
            "alignmentCheck": "Opposite fencer stance, steady arm extension",
            "durationSeconds": 45,
            "breathCue": "Deep belly breath"
          }
        ],
        "coachingCues": [
          "Directly trains the saccadic visual pathways required for fluent reading without line skipping.",
          "Ensure the child's eyes track the dot rather than just moving their arm blindly."
        ],
        "resistancePlayScript": "\u2694\ufe0f \"Laser Sword Master\": Pointing our glowing saber across the galaxy to defend the space station!",
        "imageUrl": "/images/atnr_lizard.jpg"
      },
      {
        "id": "atnr_isometric_fencer",
        "name": "Pathway 4: Dual-Limb Oppositional Isometric Press",
        "category": "isometric_resistance",
        "categoryLabel": "Isometric Neuro-Facilitation",
        "suitableFor": "Children with severe spasticity, dyspraxia, or who collapse completely in quadruped",
        "durationSeconds": 120,
        "targetReps": "4 cycles of 6-second holds (2 each side)",
        "metronomeBpm": 40,
        "compensationRedFlags": [
          "Holding breath or arching lower spine off floor",
          "Tensing jaw or clenching teeth"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Supine Fencer Posture",
            "postureDescription": "Child lies on back, head turned 90\u00b0 right. Right arm extended straight at side; left arm bent at elbow next to ear.",
            "actionInstruction": "Parent places one resisting hand against right fist and other against left bent elbow.",
            "parentCue": "\"Ready in our knight's armor on the mat.\"",
            "diagramType": "head_turn_lizard",
            "imageUrl": "/images/atnr_lizard.jpg",
            "alignmentCheck": "Fencer alignment, parent hands resisting both limbs",
            "durationSeconds": 20,
            "breathCue": "Inhale into chest"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Resist Skull Elbow & Face Fist (6s hold)",
            "postureDescription": "Child gently presses right fist forward and left elbow back into parent's hands with 25% effort.",
            "actionInstruction": "Zero joint motion! 6-second static isometric hold against parent's steady resistance.",
            "parentCue": "\"Gently press into both my hands... 1, 2, 3, 4, 5, 6... and melt.\"",
            "diagramType": "isometric_press",
            "imageUrl": "/images/atnr_lizard.jpg",
            "alignmentCheck": "Static dual resistance, no head or body movement",
            "durationSeconds": 40,
            "breathCue": "Long steady exhale during 6s hold"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Symmetrical Supine Neutral Rest",
            "postureDescription": "Bring head to center, arms resting loosely at sides for 10 seconds before switching sides.",
            "actionInstruction": "Feel the neurological release of limb opposition.",
            "parentCue": "\"Completely heavy and relaxed like warm sand.\"",
            "diagramType": "mat_setup",
            "imageUrl": "/images/atnr_lizard.jpg",
            "alignmentCheck": "Both arms symmetrical, head centered",
            "durationSeconds": 30,
            "breathCue": "Deep belly breath"
          }
        ],
        "coachingCues": [
          "MNRI isometric dual-limb resistance reprograms the vestibular-spinal reflex arc at the brainstem level.",
          "Pressure should be light (1-2 lbs of static force)."
        ],
        "resistancePlayScript": "\ud83d\udee1\ufe0f \"Twin Fortress Gates\": Holding the two friendly castle doors perfectly steady against the breeze.",
        "imageUrl": "/images/atnr_lizard.jpg"
      },
      {
        "id": "atnr_desk_fencer",
        "name": "Pathway 5: Seated Desk Fencer Head Turn & Arm Glide",
        "category": "classroom_desk",
        "categoryLabel": "Classroom & Desk Reset",
        "suitableFor": "Handwriting fatigue, hooked pencil grip, reading reversal resets at school desks",
        "durationSeconds": 90,
        "targetReps": "4 slow repetitions (2 each side)",
        "metronomeBpm": 45,
        "compensationRedFlags": [
          "Rotating shoulders instead of isolating neck rotation",
          "Hooking wrist on desk"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Upright Desk Chair Posture",
            "postureDescription": "Sit tall at desk, feet flat on floor, palms resting flat on desk surface.",
            "actionInstruction": "Keep shoulders relaxed and square to desk.",
            "parentCue": "\"Sit tall like a proud captain at the helm.\"",
            "diagramType": "seated_fencer_desk",
            "imageUrl": "/images/atnr_lizard.jpg",
            "alignmentCheck": "90-degree hips and knees, flat palms on desk",
            "durationSeconds": 20,
            "breathCue": "Inhale tall through crown of head"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Slow 5-Second Head Turn Right with Arm Slide",
            "postureDescription": "Slowly turn head 90\u00b0 RIGHT while sliding right hand forward 4 inches on desk. Left hand stays flat and stationary.",
            "actionInstruction": "Isolate head rotation! Left arm does not bend or twitch.",
            "parentCue": "\"Turn head right, slide right hand forward... left arm stays steady... 1, 2, 3, 4, 5.\"",
            "diagramType": "seated_fencer_desk",
            "imageUrl": "/images/atnr_lizard.jpg",
            "alignmentCheck": "Right head turn, right hand slides, left arm remains steady",
            "durationSeconds": 35,
            "breathCue": "Slow exhale as head turns"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Slow 5-Second Head Turn Left with Arm Slide",
            "postureDescription": "Return to center, then slowly turn head 90\u00b0 LEFT while sliding left hand forward on desk.",
            "actionInstruction": "Keep shoulders square to the desk edge.",
            "parentCue": "\"Turn head left, slide left hand forward... right hand stays rock solid... 1, 2, 3, 4, 5.\"",
            "diagramType": "seated_fencer_desk",
            "imageUrl": "/images/atnr_lizard.jpg",
            "alignmentCheck": "Left head turn, left hand slides, right arm stays steady",
            "durationSeconds": 35,
            "breathCue": "Deep belly breath on center return"
          }
        ],
        "coachingCues": [
          "Provides the exact neurological dissociation needed for handwriting without leaving the classroom desk.",
          "Do 2 reps right before writing assignments or handwriting tests."
        ],
        "resistancePlayScript": "\ud83d\udd2d \"Lookout Tower\": Captain turns telescope right to scan the horizon, then turns left to check the stars!",
        "imageUrl": "/images/atnr_lizard.jpg"
      }
    ],
    "verification": {
      "durationWeeks": "6 to 8 weeks of daily practice",
      "retestProtocol": "Repeat quadruped head turn test. Observe elbow flexion and hip shifting.",
      "criteriaForIntegration": "Zero elbow flexion or hip drift when head is turned 90\u00b0 in either direction; smooth visual tracking across midline without moving head; relaxed, unhooked handwriting posture."
    },
    "primaryVideo": {
      "youtubeId": "DQQFcN72gno",
      "youtubeUrl": "https://www.youtube.com/watch?v=DQQFcN72gno",
      "title": "Harkla: What is the Asymmetrical Tonic Neck Reflex (ATNR)? Signs, Symptoms & Integration Explained"
    }
  },
  "stnr": {
    "id": "stnr",
    "name": "Symmetrical Tonic Neck Reflex (STNR)",
    "aka": "The Cat-Cow Reflex & Classroom Desk Slump Reflex",
    "tier": 3,
    "tierName": "Tier 3: Bilateral Hemispheric & Sagittal Separation",
    "tierDescription": "Governs the split between the top half and bottom half of the body. Bridges the transition from prone crawling to upright sitting and standing.",
    "description": "When head bends forward (flexion), arms bend and legs straighten. When head tilts backward (extension), arms straighten and legs bend. When retained, the child cannot dissociate upper and lower body, resulting in the classic 'W-sitting' posture, slumping over desks, ADHD restlessness, and poor distance vision focus.",
    "functionalSigns": [
      "The classic 'Classroom Slumper': rests head on arm or lays chest flat on desk while writing",
      "Persistent 'W-sitting' on the floor (sitting with bottom between heels and knees splayed wide)",
      "Extreme difficulty copying from chalkboard to desk notebook (head moving up/down triggers posture collapse)",
      "Clumsy eating; drops food or spills liquids because looking down causes arms to bend awkwardly",
      "Poor upper body strength; struggles with monkey bars, pushups, swimming, or catching balls"
    ],
    "assessment": {
      "setup": "Child is in a stable quadruped (hands and knees) tabletop position on an exercise mat.",
      "safetyCaution": "Ensure knees and wrists are comfortably padded. CONTRAINDICATION: Stop immediately if child experiences knee, wrist, or cervical strain. If child has VP shunt or feeding tube (G-tube), avoid sudden abdominal compression.",
      "action": "Child looks straight down. Slowly lift head toward ceiling (5 seconds), then slowly tuck chin to chest (5 seconds).",
      "techniqueTip": "Observe whether hips rock backward onto heels when head lifts, or hips rock forward onto wrists when head drops.",
      "grading": {
        "grade0": "Integrated: Child moves head up and down fully while spine and hips remain completely motionless in tabletop.",
        "grade1": "Mild: Slight pelvic wobble or minor elbow twitch (<1 inch), but child maintains tabletop position.",
        "grade2": "Moderate: Obvious pelvic rocking: hips rock back onto heels when head lifts, or hips thrust forward when chin tucks.",
        "grade3": "Level 3 (Prominent): Complete postural collapse: child collapses backward into sitting or falls forward onto stomach."
      },
      "retainedCharacteristics": [
        "Hips rock backward onto heels whenever head extends upward (cow position)",
        "Elbows bend and collapse toward floor whenever chin tucks toward chest (cat position)",
        "Inability to keep hips directly stacked over knees during head movement",
        "Persistent habitual W-sitting when placed on the floor"
      ],
      "integratedCharacteristics": [
        "Hips remain rock-solid, stacked directly above knees at 90\u00b0 throughout full cervical movement",
        "Arms remain straight with soft unlocked elbows as head moves through complete range of motion",
        "Effortless transition of visual gaze from far distance (board) to near distance (notebook)",
        "Comfortable cross-legged or upright bench sitting without slouching or resting head on desk"
      ],
      "retainedVsIntegratedImageUrl": "/images/stnr_retained_vs_integrated.jpg",
      "assessmentVideoId": "ZkGDm3t2hb8",
      "assessmentVideoUrl": "https://www.youtube.com/watch?v=ZkGDm3t2hb8&t=91s"
    },
    "exercisePathways": [
      {
        "id": "stnr_cat_cow",
        "name": "Pathway 1: Quadruped Cat-Cow with Fixed Hip Isolation",
        "category": "primary_movement",
        "categoryLabel": "Primary Active Exercise",
        "suitableFor": "Standard evidence-based protocol for upper-lower body dissociation",
        "durationSeconds": 180,
        "targetReps": "8 slow cycles (5 seconds Cat, 5 seconds Cow)",
        "metronomeBpm": 40,
        "compensationRedFlags": [
          "Hips rocking back onto heels during Cow (must stay stacked over knees)",
          "Elbows bending during Cat (arms must stay straight)",
          "Rushing the motion instead of slow 5-second cadence"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "begin",
            "title": "Fixed Tabletop Starting Position",
            "postureDescription": "Child on hands and knees. Hands directly under shoulders, knees directly under hips. Back flat like a dining table.",
            "actionInstruction": "Lock hips directly over knees! Do not allow bottom to drift backward.",
            "parentCue": "\"Sturdy wooden table... glue knees to the floor directly under hips!\"",
            "diagramType": "quadruped_table",
            "imageUrl": "/images/stnr_cat_cow.jpg",
            "alignmentCheck": "Hips stacked vertically above knees at 90 degrees, hands under shoulders",
            "durationSeconds": 15,
            "breathCue": "Inhale gently into belly"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Slow Cat Arch with Chin Tuck (5s)",
            "postureDescription": "Slowly round spine up toward ceiling like an angry Halloween cat. Tuck chin to chest and look at belly button (count of 5). ARMS STAY STRAIGHT!",
            "actionInstruction": "Arch back up to the ceiling while exhaling slowly. Keep arms locked straight.",
            "parentCue": "\"Angry Halloween cat arches back high to the moon... push arms straight... 1, 2, 3, 4, 5!\"",
            "diagramType": "cat_cow_flex",
            "imageUrl": "/images/stnr_cat_cow.jpg",
            "alignmentCheck": "Spine rounded high, chin tucked to sternum, elbows locked straight",
            "durationSeconds": 30,
            "breathCue": "Long slow exhale through mouth while arching"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Slow Cow Dip with Head Lift (5s)",
            "postureDescription": "Slowly dip belly toward floor, lift chest and head up to look forward (count of 5). HIPS MUST NOT ROCK BACK ONTO HEELS!",
            "actionInstruction": "Belly dips down, look up toward wall. Keep hips frozen over knees.",
            "parentCue": "\"Happy cow dips belly to eat sweet grass... hips stay frozen like statues... 1, 2, 3, 4, 5!\"",
            "diagramType": "cat_cow_extend",
            "imageUrl": "/images/stnr_cat_cow.jpg",
            "alignmentCheck": "Chest lifted, head up, hips remained vertically above knees (no sitting back)",
            "durationSeconds": 30,
            "breathCue": "Slow diaphragmatic inhale through nose while dipping"
          }
        ],
        "coachingCues": [
          "CRITICAL: The child's hips WILL try to rock back onto their heels when looking up. Place your hand behind their hips as a gentle physical wall to prevent backward drift.",
          "Speed destroys this drill: the entire therapeutic benefit comes from holding the isometric dissociation for a full 5-count."
        ],
        "resistancePlayScript": "\ud83d\udc31\ud83d\udc2e \"Halloween Cat & Friendly Cow\": We transform from a spooky moonlit cat arching high, to a calm gentle cow enjoying green pasture!",
        "imageUrl": "/images/stnr_cat_cow.jpg"
      },
      {
        "id": "stnr_passive_lap_rocking",
        "name": "Pathway 2: Lap-Draped Passive Spinal Dissociation",
        "category": "assisted_passive",
        "categoryLabel": "Passive Co-Regulation",
        "suitableFor": "Children who collapse immediately in quadruped, have low muscle tone, or severe W-sitting history",
        "durationSeconds": 150,
        "targetReps": "6 gentle lap flexion-extensions",
        "metronomeBpm": 40,
        "compensationRedFlags": [
          "Pushing child's head beyond comfortable cervical range",
          "Child resisting and stiffening into arch"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Draped Over Parent's Knees",
            "postureDescription": "Child lies stomach-down draped across parent's knees, arms and legs hanging relaxed.",
            "actionInstruction": "Parent sits on floor or chair with knees together, supporting child's torso securely.",
            "parentCue": "\"Draped like a soft warm towel over mama's knees.\"",
            "diagramType": "fetal_tuck",
            "imageUrl": "/images/stnr_cat_cow.jpg",
            "alignmentCheck": "Pelvis and chest supported, limbs relaxed",
            "durationSeconds": 20,
            "breathCue": "Inhale ease"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Gentle Passive Head Flexion & Sacral Grounding",
            "postureDescription": "Parent gently supports child's head, encouraging chin to chest while holding pelvis steady.",
            "actionInstruction": "Hold gentle flexion for 6 seconds, then return to neutral.",
            "parentCue": "\"Soft chin tuck... safe and grounded... 1, 2, 3, 4, 5.\"",
            "diagramType": "meatball_hug",
            "imageUrl": "/images/stnr_cat_cow.jpg",
            "alignmentCheck": "Gentle passive head tuck without moving pelvis",
            "durationSeconds": 40,
            "breathCue": "Slow exhale"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Gentle Passive Head Lift",
            "postureDescription": "Gently support child's forehead to lift head to neutral horizontal plane while keeping legs limp.",
            "actionInstruction": "Hold for 6 seconds without triggering extensor spasm.",
            "parentCue": "\"Looking up to see the sunshine... 1, 2, 3, 4, 5.\"",
            "diagramType": "airplane_prone",
            "imageUrl": "/images/stnr_cat_cow.jpg",
            "alignmentCheck": "Neutral head extension, lower extremities remain limp",
            "durationSeconds": 40,
            "breathCue": "Deep belly breath"
          }
        ],
        "coachingCues": [
          "Provides the vital brainstem dissociation without requiring wrist or arm weight-bearing.",
          "Direct deep sacral palm contact down-regulates involuntary extensor tone."
        ],
        "resistancePlayScript": "\ud83d\udc28 \"Koala Nap\": Baby koala rests over the tree branch while warm tropical breezes blow.",
        "imageUrl": "/images/stnr_cat_cow.jpg"
      },
      {
        "id": "stnr_bear_crab_walk",
        "name": "Pathway 3: Animal Walk Transitions Bear-to-Crab",
        "category": "active_play",
        "categoryLabel": "Active Motor Planning & Play",
        "suitableFor": "High energy sensory seekers, ADHD kids, and play-based therapy sessions",
        "durationSeconds": 180,
        "targetReps": "6 transitions across 10-foot mat",
        "metronomeBpm": 50,
        "compensationRedFlags": [
          "Knees dropping to floor during Bear Walk",
          "Bottom dragging on carpet during Crab Walk"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Bear Walk on Hands and Toes",
            "postureDescription": "Child walks on hands and feet with legs straight and bottom held high in air.",
            "actionInstruction": "Walk forward 5 steps like a lumbering bear, head looking slightly forward.",
            "parentCue": "\"Mighty bear walking through the forest with straight strong legs!\"",
            "diagramType": "quadruped_table",
            "imageUrl": "/images/stnr_cat_cow.jpg",
            "alignmentCheck": "Straight knees, weight distributed across hands and feet",
            "durationSeconds": 30,
            "breathCue": "Inhale stride"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Smooth Pivot Flip to Crab Walk",
            "postureDescription": "Without sitting on floor, pivot around into a Crab Walk: tummy facing ceiling, hands and feet supporting body.",
            "actionInstruction": "Lift hips off floor and hold static crab bridge for 5 seconds.",
            "parentCue": "\"Flip like a pancake into a sunny crab... hips high! 1, 2, 3, 4, 5!\"",
            "diagramType": "seated_starfish_desk",
            "imageUrl": "/images/stnr_cat_cow.jpg",
            "alignmentCheck": "Hips elevated, head neutral, strong tricep support",
            "durationSeconds": 45,
            "breathCue": "Exhale on pivot flip"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Slow Crawl Forward",
            "postureDescription": "Walk backward 5 steps as a crab, then flip back to bear.",
            "actionInstruction": "Maintains continuous reciprocal core and limb activation.",
            "parentCue": "\"Crab crawling back to the ocean... steady and strong!\"",
            "diagramType": "quadruped_table",
            "imageUrl": "/images/stnr_cat_cow.jpg",
            "alignmentCheck": "Reciprocal stepping, core engaged",
            "durationSeconds": 45,
            "breathCue": "Deep steady breathing"
          }
        ],
        "coachingCues": [
          "Forces dynamic cerebellar motor switching between prone and supine gravitational planes.",
          "Encourage slow deliberate steps rather than racing."
        ],
        "resistancePlayScript": "\ud83d\udc3b\ud83e\udd80 \"Bear & Crab Adventure\": The great mountain bear visits the coastal crab for a friendly beach race!",
        "imageUrl": "/images/stnr_cat_cow.jpg"
      },
      {
        "id": "stnr_isometric_quadruped",
        "name": "Pathway 4: Quadruped Cervical Static Resistance",
        "category": "isometric_resistance",
        "categoryLabel": "Isometric Neuro-Facilitation",
        "suitableFor": "Children who violently rock hips or collapse during dynamic Cat-Cow",
        "durationSeconds": 120,
        "targetReps": "4 cycles of 6-second holds (2 flexion, 2 extension)",
        "metronomeBpm": 40,
        "compensationRedFlags": [
          "Hips shifting forward or backward",
          "Holding breath during static head resistance"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Tabletop Alignment with Fixed Spine",
            "postureDescription": "Child is on hands and knees with flat back. Parent kneels beside child.",
            "actionInstruction": "Check that spine is completely motionless.",
            "parentCue": "\"Rock solid tabletop that cannot be moved.\"",
            "diagramType": "quadruped_table",
            "imageUrl": "/images/stnr_cat_cow.jpg",
            "alignmentCheck": "Spine flat, knees stacked below hips",
            "durationSeconds": 20,
            "breathCue": "Inhale stability"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Downward Forehead Resistance (6s hold)",
            "postureDescription": "Parent places palm on child's forehead. Child gently presses upward into hand with 20% effort.",
            "actionInstruction": "Zero spine movement! Static 6-second hold activating cervical extensors isometrically.",
            "parentCue": "\"Gently press forehead into my palm... 1, 2, 3, 4, 5, 6... and melt.\"",
            "diagramType": "isometric_press",
            "imageUrl": "/images/stnr_cat_cow.jpg",
            "alignmentCheck": "Static cervical resistance, zero hip displacement",
            "durationSeconds": 40,
            "breathCue": "Steady exhale during 6s hold"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Upward Suboccipital Resistance (6s hold)",
            "postureDescription": "Parent places hand under child's chin. Child gently presses chin down with 20% effort.",
            "actionInstruction": "Static hold for 6 seconds, then complete release.",
            "parentCue": "\"Gently press chin down into my palm... 1, 2, 3, 4, 5, 6... and melt.\"",
            "diagramType": "isometric_press",
            "imageUrl": "/images/stnr_cat_cow.jpg",
            "alignmentCheck": "Static cervical flexion resistance, flat spine",
            "durationSeconds": 40,
            "breathCue": "Deep belly breath on release"
          }
        ],
        "coachingCues": [
          "MNRI isometric head resistance establishes cortical control over cervical-spinal reflexes without triggering pelvic momentum.",
          "Resistance should be gentle and steady (1-2 lbs of static force)."
        ],
        "resistancePlayScript": "\ud83c\udff0 \"Drawbridge Counterweight\": Testing our castle tower balance against the gentle river breeze.",
        "imageUrl": "/images/stnr_cat_cow.jpg"
      },
      {
        "id": "stnr_desk_cat_cow",
        "name": "Pathway 5: Desk-Edge Cat-Cow & Chin Tuck Reset",
        "category": "classroom_desk",
        "categoryLabel": "Classroom & Desk Reset",
        "suitableFor": "Desk slouching, homework fatigue, copying from chalkboard, classroom resets",
        "durationSeconds": 90,
        "targetReps": "4 slow seated repetitions",
        "metronomeBpm": 40,
        "compensationRedFlags": [
          "Slumping entire body onto desk surface",
          "Hyperextending neck when looking up"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Seated Hands-on-Desk Setup",
            "postureDescription": "Sit upright in chair, feet flat on floor, hands resting flat on edge of desk.",
            "actionInstruction": "Keep shoulders away from ears and sit right on sitting bones.",
            "parentCue": "\"Plant your feet like roots, hands flat on your launchpad.\"",
            "diagramType": "seated_starfish_desk",
            "imageUrl": "/images/stnr_cat_cow.jpg",
            "alignmentCheck": "Flat feet, 90-degree knees, palms on desk",
            "durationSeconds": 20,
            "breathCue": "Inhale tall through spine"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Desk Cat Exhale & Sternum Tuck",
            "postureDescription": "Round upper back away from desk, tuck chin to chest, push palms gently into desk edge (5s hold).",
            "actionInstruction": "Exhale fully as spine curves into C-shape.",
            "parentCue": "\"Round your back like a sleepy cat... chin to chest... 1, 2, 3, 4, 5.\"",
            "diagramType": "seated_starfish_desk",
            "imageUrl": "/images/stnr_cat_cow.jpg",
            "alignmentCheck": "Upper back rounded, arms straight pushing desk, chin tucked",
            "durationSeconds": 35,
            "breathCue": "Long slow exhale"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Desk Cow Inhale & Crown Reach",
            "postureDescription": "Lift chest, draw shoulder blades together, look slightly up toward top of wall (5s hold). Feet remain flat.",
            "actionInstruction": "Open chest wide without arching lower back off chair.",
            "parentCue": "\"Open chest wide to the sunshine... head lifted proud... 1, 2, 3, 4, 5!\"",
            "diagramType": "seated_starfish_desk",
            "imageUrl": "/images/stnr_cat_cow.jpg",
            "alignmentCheck": "Thoracic extension, pelvis anchored to chair",
            "durationSeconds": 35,
            "breathCue": "Deep refreshing inhale"
          }
        ],
        "coachingCues": [
          "Directly cures the 'Classroom Slump' by re-establishing upright postural tone in a chair.",
          "Perform right before reading or handwriting tasks."
        ],
        "resistancePlayScript": "\ud83d\ude80 \"Mission Control Reset\": Astronaut checks monitors, aligns posture, and prepares for smooth navigation!",
        "imageUrl": "/images/stnr_cat_cow.jpg"
      }
    ],
    "verification": {
      "durationWeeks": "6 to 8 weeks of daily practice",
      "retestProtocol": "Repeat quadruped head lift and tuck test. Check for hip rocking or elbow collapse.",
      "criteriaForIntegration": "Zero hip rocking or elbow collapse when head extends or flexes in quadruped tabletop; child sits upright at desk without resting head on arm; spontaneous elimination of habitual W-sitting."
    },
    "primaryVideo": {
      "youtubeId": "hgg3TRqb7TM",
      "youtubeUrl": "https://www.youtube.com/watch?v=hgg3TRqb7TM",
      "title": "Harkla: What is the STNR Reflex? Signs & OT Activities"
    }
  },
  "palmar": {
    "id": "palmar",
    "name": "Palmar Grasp Reflex",
    "aka": "The Involuntary Fist Clench & Babkin Palm-Mouth Synergy Reflex",
    "tier": 4,
    "tierName": "Tier 4: Distal Extremities & Cortical Bridge",
    "tierDescription": "Governs the fine-motor dexterity of the hands and their neurological link to speech and articulation (Babkin synergy).",
    "description": "When an object touches the infant's palm, the fingers involuntarily curl into a death grip. When retained, causes pencil gripping so tight it breaks pencil leads, hand cramping, speech dyspraxia, and mouth movement (tongue sticking out, jaw clenching) during fine motor tasks.",
    "functionalSigns": [
      "White-knuckle pencil grip; grips pencils so tightly that fingers turn white or pencil lead snaps constantly",
      "Hand cramps, tremors, or fatigue within 2-3 minutes of handwriting or drawing",
      "The 'Babkin Synergy': moves mouth, bites lip, sticks tongue out, or grinds teeth when cutting with scissors or writing",
      "Poor fine-motor manual dexterity; struggles with buttoning shirts, zipping jackets, tying shoelaces",
      "Tactile defensiveness to sticky, messy, or textured substances (glue, fingerpaint, playdough, slime)"
    ],
    "assessment": {
      "setup": "Child rests hand palm-up on a table, fingers relaxed and open.",
      "safetyCaution": "Use light, gentle tactile touch. Avoid tickling child's hand aggressively.",
      "action": "Use a pencil tip or fingertip to stroke lightly across the palm just below the base of the fingers from pinky to index.",
      "techniqueTip": "Observe whether the fingers twitch or curl inward involuntarily into a fist, or if child's mouth twitches.",
      "grading": {
        "grade0": "Integrated: Child's hand remains completely open and relaxed; zero finger twitching or curling.",
        "grade1": "Mild: Slight twitch in pinky or ring finger, but hand does not close into a fist.",
        "grade2": "Moderate: Fingers curl inward 50% toward the palm; child feels a strong urge to squeeze fist shut.",
        "grade3": "Level 3 (Prominent): Instant, involuntary fisting; fingers clamp shut tight; child cannot inhibit the reflexive grasp."
      },
      "retainedCharacteristics": [
        "Immediate involuntary flexion of all four fingers curling into palm",
        "Thumb adducts tightly across the palm into a fist",
        "Simultaneous mouth movement (lips purse, jaw clenches, or tongue juts out)",
        "Child pulls hand away in tactile distress or discomfort"
      ],
      "integratedCharacteristics": [
        "Fingers remain completely relaxed, motionless, and open during palm stroke",
        "Mouth, jaw, and tongue remain completely still and independent of hand touch",
        "Relaxed, dynamic tripod pencil grasp with open web-space between thumb and index finger",
        "Fluid handwriting endurance for 15+ minutes without hand cramping or fatigue"
      ],
      "retainedVsIntegratedImageUrl": "/images/palmar_retained_vs_integrated.jpg",
      "assessmentVideoId": "ZkGDm3t2hb8",
      "assessmentVideoUrl": "https://www.youtube.com/watch?v=ZkGDm3t2hb8&t=381s"
    },
    "exercisePathways": [
      {
        "id": "palmar_opposition",
        "name": "Pathway 1: Isolated Finger Opposition & Star Squeeze",
        "category": "primary_movement",
        "categoryLabel": "Primary Active Exercise",
        "suitableFor": "Standard protocol for developing independent finger isolation and relaxing flexor tone",
        "durationSeconds": 180,
        "targetReps": "5 complete cycles per hand (finger-by-finger opposition + star burst)",
        "metronomeBpm": 45,
        "compensationRedFlags": [
          "Clumping all fingers together into thumb instead of isolated sequential pads",
          "Moving mouth or jaw while tapping fingers (Babkin compensation)"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "begin",
            "title": "Open Palm Star Spread",
            "postureDescription": "Child holds hand open in front of chest, palm facing inward. Spread fingers as wide as possible like a shining star for 3 seconds.",
            "actionInstruction": "Spread all 5 fingers wide apart! Feel the stretch across the palm.",
            "parentCue": "\"Star shining bright in the night sky... stretch fingers wide!\"",
            "diagramType": "starfish_open",
            "imageUrl": "/images/palmar_hand.jpg",
            "alignmentCheck": "Fingers splayed wide, web space open, wrist straight",
            "durationSeconds": 15,
            "breathCue": "Inhale as fingers spread"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Sequential Thumb-to-Finger Pads Touch",
            "postureDescription": "Touch the pad of thumb to the pad of index finger (form an 'O'), hold for 2s. Then middle finger (2s), ring finger (2s), pinky (2s). KEEP OTHER FINGERS OPEN!",
            "actionInstruction": "Make a gentle circle with thumb and index, then middle, ring, pinky. Keep mouth relaxed and loose.",
            "parentCue": "\"Magic circle... tap index, middle, ring, pinky... soft jaw!\"",
            "diagramType": "finger_opposition",
            "imageUrl": "/images/palmar_hand.jpg",
            "alignmentCheck": "Only active finger touches thumb, other 3 fingers remain extended, mouth closed and still",
            "durationSeconds": 45,
            "breathCue": "Breathe smoothly through nose"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Soft Stress Ball Pulsing Squeeze",
            "postureDescription": "Place a soft foam sensory ball in palm. Squeeze gently for 3 seconds, then release and spread fingers wide.",
            "actionInstruction": "Squeeze soft, then explode fingers open into a giant star!",
            "parentCue": "\"Squeeze the soft cloud... and burst open into a star!\"",
            "diagramType": "starfish_open",
            "imageUrl": "/images/palmar_hand.jpg",
            "alignmentCheck": "Complete release of fist between pulses",
            "durationSeconds": 30,
            "breathCue": "Exhale on squeeze, inhale on spread"
          }
        ],
        "coachingCues": [
          "CRITICAL: Watch the child's mouth! If their tongue sticks out or lips move during finger opposition, pause and say: 'Keep your tongue resting quietly on the roof of your mouth.' This breaks the Babkin hand-mouth reflex synergy.",
          "Opposition must be pad-to-pad (making a round 'O'), not tip-to-tip."
        ],
        "resistancePlayScript": "\u2728 \"Magic Wand Fingers\": Each finger taps the magic thumb crystal to cast a peaceful sparkling spell!",
        "imageUrl": "/images/palmar_hand.jpg"
      },
      {
        "id": "palmar_babkin_acupressure",
        "name": "Pathway 2: Thenar Acupressure & Babkin Palmar Sweep",
        "category": "assisted_passive",
        "categoryLabel": "Passive Co-Regulation",
        "suitableFor": "Severe pencil grip clenchers, dyspraxic children, and children with tactile defensiveness",
        "durationSeconds": 150,
        "targetReps": "3 minutes of soothing palm and finger strokes",
        "metronomeBpm": 40,
        "compensationRedFlags": [
          "Child clenching fist aggressively (use softer, lighter touch)",
          "Grimacing or holding breath"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Relaxed Upward Palm Support",
            "postureDescription": "Child rests forearm on a pillow, palm facing up with fingers relaxed.",
            "actionInstruction": "Parent supports the back of child's hand with warm gentle palms.",
            "parentCue": "\"Resting your hand on the soft velvet pillow.\"",
            "diagramType": "palm_acupressure",
            "imageUrl": "/images/palmar_hand.jpg",
            "alignmentCheck": "Forearm grounded, palm relaxed open",
            "durationSeconds": 20,
            "breathCue": "Inhale ease"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Circular Deep Thumb Pressure on Thenar Eminence",
            "postureDescription": "Parent uses thumb to apply firm, slow circular pressure to the fleshy base of child's thumb (thenar muscle).",
            "actionInstruction": "Make 10 slow circles on the thumb muscle to melt involuntary flexor spasm.",
            "parentCue": "\"Warm thumb circles melting the tension away... soft and warm.\"",
            "diagramType": "palm_acupressure",
            "imageUrl": "/images/palmar_hand.jpg",
            "alignmentCheck": "Deep thenar pressure without pinching",
            "durationSeconds": 50,
            "breathCue": "Exhale with each circular stroke"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Distal Finger Stroking to Fingertips",
            "postureDescription": "Stroke gently from center of palm outward along each finger to the tip, ending with a soft tug.",
            "actionInstruction": "Lengthens the flexor tendons and desensitizes tactile palm receptors.",
            "parentCue": "\"Smoothing out every little finger like soft silk ribbon.\"",
            "diagramType": "finger_opposition",
            "imageUrl": "/images/palmar_hand.jpg",
            "alignmentCheck": "Gentle elongation of each finger",
            "durationSeconds": 40,
            "breathCue": "Deep relaxing breath"
          }
        ],
        "coachingCues": [
          "Thenar acupressure directly inhibits the hypertonic median nerve motor branch.",
          "Pair with a gentle auditory cue like soft humming to dissociate the Babkin reflex arc."
        ],
        "resistancePlayScript": "\ud83c\udf0a \"Ocean Pebble Smoothing\": We are gentle ocean waves polishing smooth river stones in our palm.",
        "imageUrl": "/images/palmar_hand.jpg"
      },
      {
        "id": "palmar_putty_treasure",
        "name": "Pathway 3: Therapy Putty Deep Treasure Excavation",
        "category": "equipment_sensory",
        "categoryLabel": "Sensory Resistance Play",
        "suitableFor": "Tactile seekers, children with weak finger isolation, handwriting fatigue",
        "durationSeconds": 180,
        "targetReps": "Find 6 buried beads/coins in firm resistance putty",
        "metronomeBpm": 50,
        "compensationRedFlags": [
          "Using palm to squish instead of isolated pincer grasp",
          "Mouth moving or tongue jutting out during excavation"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Firm Putty Ball Preparation",
            "postureDescription": "Child rolls therapy putty into a firm ball on desk or placemat.",
            "actionInstruction": "Parent buries 6 small beads or coins deep inside the putty.",
            "parentCue": "\"Treasure is hidden deep inside the magic asteroid!\"",
            "diagramType": "finger_opposition",
            "imageUrl": "/images/palmar_hand.jpg",
            "alignmentCheck": "Putty firm, wrist in neutral extension",
            "durationSeconds": 20,
            "breathCue": "Inhale focus"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Isolated Two-Finger Pincer Pulls",
            "postureDescription": "Child uses thumb and index finger only to pinch, pull, and excavate the hidden treasure.",
            "actionInstruction": "Keep jaw loose and mouth relaxed while fingers work against putty resistance.",
            "parentCue": "\"Pinch and pull with your eagle claw! Soft jaw, quiet tongue.\"",
            "diagramType": "therapy_putty",
            "imageUrl": "/images/palmar_hand.jpg",
            "alignmentCheck": "Pincer grasp isolation, relaxed facial muscles",
            "durationSeconds": 50,
            "breathCue": "Exhale on putty pull"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Full Palm Pancake Flattening",
            "postureDescription": "Flatten putty into a pancake using wide flat palm and extended fingers.",
            "actionInstruction": "Push down with open hand to inhibit flexor curling.",
            "parentCue": "\"Flatten the giant pancake flat and wide!\"",
            "diagramType": "palm_acupressure",
            "imageUrl": "/images/palmar_hand.jpg",
            "alignmentCheck": "Flat palm, fingers wide, wrist extended",
            "durationSeconds": 40,
            "breathCue": "Big satisfying exhale"
          }
        ],
        "coachingCues": [
          "Therapy putty offers graded proprioceptive resistance, rapidly building intrinsic hand strength.",
          "Switch to thumb + middle finger for the second half of excavation."
        ],
        "resistancePlayScript": "\ud83d\udc8e \"Gemstone Mine\": Exploring deep in the diamond mine to pull out sparkling royal jewels!",
        "imageUrl": "/images/palmar_hand.jpg"
      },
      {
        "id": "palmar_isometric_babkin",
        "name": "Pathway 4: Palmar-Babkin Jaw Synergy Dissociation",
        "category": "isometric_resistance",
        "categoryLabel": "Isometric Neuro-Facilitation",
        "suitableFor": "Children whose tongue sticks out, jaw clenches, or mouth moves when writing",
        "durationSeconds": 120,
        "targetReps": "4 cycles of 6-second holds with 10s rest",
        "metronomeBpm": 40,
        "compensationRedFlags": [
          "Clenching jaw or teeth during palm squeeze",
          "Holding breath instead of easy breathing"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Bilateral Open Palm Hold",
            "postureDescription": "Child sits upright with elbows bent at 90\u00b0, palms facing up.",
            "actionInstruction": "Parent places thumbs firmly in the center of child's palms; fingers wrap around outside of hands.",
            "parentCue": "\"Resting palms open and relaxed on the launchpad.\"",
            "diagramType": "palm_acupressure",
            "imageUrl": "/images/palmar_hand.jpg",
            "alignmentCheck": "Palms centered, jaw relaxed and slightly open",
            "durationSeconds": 20,
            "breathCue": "Inhale ease"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Simultaneous 6s Palm Squeeze with Soft Open Jaw",
            "postureDescription": "Child gently squeezes parent's thumbs with 25% effort while intentionally keeping jaw completely relaxed and mouth slightly open.",
            "actionInstruction": "Static 6-second squeeze. Zero facial tension! Parent monitors child's mouth.",
            "parentCue": "\"Squeeze thumbs gentle... keep jaw soft and open... 1, 2, 3, 4, 5, 6... and melt.\"",
            "diagramType": "isometric_press",
            "imageUrl": "/images/palmar_hand.jpg",
            "alignmentCheck": "Squeeze in palms, jaw loose, lips parted softly",
            "durationSeconds": 40,
            "breathCue": "Audible soft exhale: 'haaa' during squeeze"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Wide Finger Spread & Exhale",
            "postureDescription": "Explode fingers wide open, shaking hands out loosely for 10 seconds of rest.",
            "actionInstruction": "Complete neurological dissociation of hand grasp from oral-motor clenching.",
            "parentCue": "\"Shake out the magic stardust... totally loose and calm.\"",
            "diagramType": "starfish_open",
            "imageUrl": "/images/palmar_hand.jpg",
            "alignmentCheck": "Loose wrists, smiling relaxed face",
            "durationSeconds": 30,
            "breathCue": "Deep belly breath"
          }
        ],
        "coachingCues": [
          "The Babkin reflex neurologically binds the hand and mouth. This exercise directly breaks that neurological link.",
          "Encourage an audible soft sigh ('haaa') to guarantee jaw relaxation."
        ],
        "resistancePlayScript": "\ud83d\udddd\ufe0f \"Secret Key Turning\": Turning the magic key with our hands while whistling softly like the wind!",
        "imageUrl": "/images/palmar_hand.jpg"
      },
      {
        "id": "palmar_wall_push",
        "name": "Pathway 5: Palm-Flat Isometric Wall Pushups",
        "category": "classroom_desk",
        "categoryLabel": "Proprioceptive Weight-Bearing & Reset",
        "suitableFor": "Desk handwriting fatigue, white-knuckle pencil grip, classroom sensory breaks",
        "durationSeconds": 90,
        "targetReps": "5 slow wall push holds (5s each)",
        "metronomeBpm": 45,
        "compensationRedFlags": [
          "Curling fingers or lifting palms off wall",
          "Shrugging shoulders up to ears"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Standing Facing Wall Arm's Length",
            "postureDescription": "Stand 2 feet away from a wall, feet flat on floor shoulder-width apart.",
            "actionInstruction": "Place flat palms against the wall at shoulder height.",
            "parentCue": "\"Stand tall facing the sturdy castle wall.\"",
            "diagramType": "isometric_press",
            "imageUrl": "/images/palmar_hand.jpg",
            "alignmentCheck": "Feet flat, core engaged, palms level with shoulders",
            "durationSeconds": 20,
            "breathCue": "Inhale stability"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Palm Flat Spread Against Wall (Fingers Wide)",
            "postureDescription": "Spread all 10 fingers as wide as possible against wall. Press whole palm (thenar and hypothenar) flat into wall.",
            "actionInstruction": "Bend elbows slowly to bring nose toward wall, then push back until arms are straight (5s hold).",
            "parentCue": "\"Push into the wall like moving a mountain... 1, 2, 3, 4, 5!\"",
            "diagramType": "palm_acupressure",
            "imageUrl": "/images/palmar_hand.jpg",
            "alignmentCheck": "Fingers splayed wide, palms glued flat, wrists extended 90 degrees",
            "durationSeconds": 40,
            "breathCue": "Inhale bend, exhale press"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Slow Isometric Wall Press & Pushaway",
            "postureDescription": "Push away from wall, letting arms hang loose at sides, shaking out fingers.",
            "actionInstruction": "Feel the grounded proprioceptive wakefulness in the hands.",
            "parentCue": "\"Shake out your fingers... soft and ready to write beautifully!\"",
            "diagramType": "starfish_open",
            "imageUrl": "/images/palmar_hand.jpg",
            "alignmentCheck": "Relaxed fingers, open web spaces",
            "durationSeconds": 30,
            "breathCue": "Deep refreshing breath"
          }
        ],
        "coachingCues": [
          "Weight-bearing with 90\u00b0 wrist extension and splayed fingers provides deep Golgi tendon organ inhibition to flexor muscles.",
          "Ideal 60-second transition exercise before beginning handwriting worksheets."
        ],
        "resistancePlayScript": "\ud83e\uddf1 \"Moving the Secret Wall\": Pressing the secret temple door open with mighty superhero hands!",
        "imageUrl": "/images/palmar_hand.jpg"
      }
    ],
    "verification": {
      "durationWeeks": "6 to 8 weeks of daily practice",
      "retestProtocol": "Repeat palm stroke test with light object. Observe finger curling and facial movements.",
      "criteriaForIntegration": "Zero finger curling or twitching on palm stimulation; complete dissociation of hand and mouth movements during fine motor work; relaxed tripod pencil grip without hand cramps."
    },
    "primaryVideo": {
      "youtubeId": "XS2nM_suVTc",
      "youtubeUrl": "https://www.youtube.com/watch?v=XS2nM_suVTc",
      "title": "Harkla: What Is the Palmer Grasp Reflex? Signs & OT Activities"
    }
  },
  "plantar_babinski": {
    "id": "plantar_babinski",
    "name": "Plantar & Babinski Reflexes",
    "aka": "The Foot Arch, Toe Curling & Balance Foundation Reflexes",
    "tier": 4,
    "tierName": "Tier 4: Distal Extremities & Cortical Bridge",
    "tierDescription": "Governs the stability of the feet against the ground. Essential for mature balance, arch formation, gait biomechanics, and ankle mobility.",
    "description": "Plantar grasp curls toes when ball of foot is pressed; Babinski fans toes upward when lateral sole is stroked. When retained past toddlerhood, causes severe toe-walking, flat feet, sensory issues with socks and shoes, ankle instability, and frequent tripping.",
    "functionalSigns": [
      "Persistent toe-walking (inability to establish heel-strike when walking)",
      "Extreme sensitivity to shoes and socks (cannot stand seams, takes shoes off constantly, hates walking barefoot on grass or sand)",
      "Flat feet (collapsed arches) or overly high rigid arches with curled claw toes",
      "Poor balance; ankles wobble or roll inward (pronation); trips over own feet frequently",
      "Cramping in feet or calves during walking, running, or ice skating"
    ],
    "assessment": {
      "setup": "Child is seated comfortably barefoot on a chair, feet resting on parent's lap.",
      "safetyCaution": "Use gentle, firm pressure to avoid ticklish discomfort.",
      "action": "Stroke firmly with a finger or blunt object along the outer edge of the sole from heel up toward little toe, then curve across ball of foot to big toe.",
      "techniqueTip": "Observe whether the big toe dorsiflexes (points up to ceiling) and the other toes fan out (Babinski), or all toes clamp into a tight claw curl (Plantar).",
      "grading": {
        "grade0": "Integrated: Toes remain completely relaxed or gently curl downward; no big toe extension or fanning.",
        "grade1": "Mild: Slight twitch in big toe or minor toe flare (<1 inch), recovers immediately.",
        "grade2": "Moderate: Big toe clearly lifts upward and other toes fan out; child laughs or pulls foot away tickled.",
        "grade3": "Level 3 (Prominent): Violent Babinski response: big toe juts up, all toes flare wide, ankle violently twitches or withdraws."
      },
      "retainedCharacteristics": [
        "Big toe extends upward toward shin while other four toes flare wide (Babinski)",
        "All five toes curl violently into a tight claw grip (Plantar grasp)",
        "Child pulls foot away in intense ticklishness or distress",
        "Persistent toe-walking or collapsed flat foot arches"
      ],
      "integratedCharacteristics": [
        "Toes remain completely neutral, relaxed, or gently curl down toward floor",
        "Zero fanning or extension of the big toe during lateral sole stroke",
        "Mature heel-to-toe gait with smooth heel strike during running and walking",
        "Strong, resilient foot arches with comfortable tolerance for socks and shoes"
      ],
      "retainedVsIntegratedImageUrl": "/images/plantar_retained_vs_integrated.jpg",
      "assessmentVideoId": "t2luajmBIyc",
      "assessmentVideoUrl": "https://www.youtube.com/watch?v=t2luajmBIyc"
    },
    "exercisePathways": [
      {
        "id": "plantar_towel",
        "name": "Pathway 1: Calcaneal Grounded Towel Scrunch & Marble Pickup",
        "category": "primary_movement",
        "categoryLabel": "Primary Active Exercise",
        "suitableFor": "Standard evidence-based protocol for strengthening foot intrinsics and integrating toe grasp",
        "durationSeconds": 180,
        "targetReps": "10 towel scrunches + 6 marble pickups per foot",
        "metronomeBpm": 45,
        "compensationRedFlags": [
          "Lifting heel off floor during scrunch (HEEL MUST STAY GLUED TO MAT)",
          "Curling toes violently instead of smooth rhythmic pulling"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Seated Foot Alignment on Towel",
            "postureDescription": "Child sits in chair with knees at 90\u00b0, bare foot resting on a hand towel laid flat on a smooth floor.",
            "actionInstruction": "Glue the heel firmly to the edge of the towel. Heel stays frozen on floor!",
            "parentCue": "\"Heel glued to the floor like heavy anchor. Only toes will move!\"",
            "diagramType": "towel_curl",
            "imageUrl": "/images/plantar_exercise.jpg",
            "alignmentCheck": "Heel firmly grounded, 90-degree knee angle, flat towel",
            "durationSeconds": 15,
            "breathCue": "Inhale tall through spine"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Slow Rhythmic Toe Curls Pulling Towel",
            "postureDescription": "Use all 5 toes to scrunch the towel toward the heel in rhythmic pulses. Pull the entire towel in under the foot.",
            "actionInstruction": "Scrunch, release, reach forward, scrunch again. Keep heel glued down!",
            "parentCue": "\"Toes like caterpillar feet... scrunching the magic carpet closer... 1, 2, 3!\"",
            "diagramType": "towel_curl",
            "imageUrl": "/images/plantar_exercise.jpg",
            "alignmentCheck": "Heel remains anchored, intrinsic arch lifts on every scrunch",
            "durationSeconds": 45,
            "breathCue": "Exhale as toes curl, inhale as toes spread forward"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Marble Pincer Grip and Basket Drop",
            "postureDescription": "Pick up a marble or cotton ball with toes (between big toe and 2nd toe), lift foot 3 inches, and drop into a small cup.",
            "actionInstruction": "Pinch the marble with toes, lift, and drop into the cup. Repeat 5 times.",
            "parentCue": "\"Crane claw picks up the shiny gemstone... drop it safe in the treasure cup!\"",
            "diagramType": "marble_pickup",
            "imageUrl": "/images/plantar_exercise.jpg",
            "alignmentCheck": "Clean toe pinch, ankle stability, controlled release",
            "durationSeconds": 45,
            "breathCue": "Smooth natural breathing"
          }
        ],
        "coachingCues": [
          "CRITICAL: The heel MUST remain glued to the floor. If the heel lifts, the calf muscles take over and bypass the intrinsic arch muscles.",
          "If towel scrunching is too difficult on carpet, place the towel on a smooth hardwood or tile floor."
        ],
        "resistancePlayScript": "\ud83d\udc1b \"Hungry Caterpillar Foot\": Our friendly caterpillar foot crawls along the leaf to gather tasty morning dew drops!",
        "imageUrl": "/images/plantar_exercise.jpg"
      },
      {
        "id": "plantar_passive_grounding",
        "name": "Pathway 2: Calcaneal Deep Pressure & Metatarsal Mobilization",
        "category": "assisted_passive",
        "categoryLabel": "Passive Proprioceptive Grounding",
        "suitableFor": "Extreme toe-walkers, children who scream during sock wearing, and hypersensitive feet",
        "durationSeconds": 150,
        "targetReps": "3 minutes per foot",
        "metronomeBpm": 40,
        "compensationRedFlags": [
          "Tickling the sole (touch must be deep, firm, and grounding)",
          "Child curling toes into tight claw (stroke from heel to toe to lengthen)"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Seated Foot Cradle",
            "postureDescription": "Child sits comfortably with foot resting on parent's lap. Parent holds heel with one palm.",
            "actionInstruction": "Warm your hands before touching child's bare foot.",
            "parentCue": "\"Holding our soft foot safe and warm in mama's hands.\"",
            "diagramType": "sole_calcaneal_glide",
            "imageUrl": "/images/plantar_exercise.jpg",
            "alignmentCheck": "Supportive heel cup, relaxed ankle",
            "durationSeconds": 20,
            "breathCue": "Inhale ease"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Calcaneal Heel Compression (Firm 5s hold)",
            "postureDescription": "Parent applies firm, grounding compression straight up through the heel bone (calcaneus).",
            "actionInstruction": "Hold firm calming heel pressure for 5 seconds, release for 2 seconds. Repeat 6 times.",
            "parentCue": "\"Heavy anchor grounding your foot solid into the earth... 1, 2, 3, 4, 5.\"",
            "diagramType": "sole_calcaneal_glide",
            "imageUrl": "/images/plantar_exercise.jpg",
            "alignmentCheck": "Firm axial pressure through heel without twisting ankle",
            "durationSeconds": 50,
            "breathCue": "Exhale with compression"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Lateral Border Plantar Glide from Heel to 5th Toe",
            "postureDescription": "Slow, firm thumb glide along the outside lateral border of the sole, sweeping out to the 5th toe.",
            "actionInstruction": "Inhibits Babinski fanning by providing continuous deep proprioceptive input.",
            "parentCue": "\"Smoothing out the walking path... soft and long.\"",
            "diagramType": "sole_calcaneal_glide",
            "imageUrl": "/images/plantar_exercise.jpg",
            "alignmentCheck": "Slow stroke along lateral edge, no toe fanning",
            "durationSeconds": 40,
            "breathCue": "Deep sigh"
          }
        ],
        "coachingCues": [
          "Deep calcaneal pressure activates the heel-strike proprioceptors necessary to extinguish toe-walking.",
          "Always use firm pressure; light feathered touch will trigger intense ticklish withdrawal."
        ],
        "resistancePlayScript": "\ud83d\udc3e \"Bear Paw Smoothing\": Polishing the big strong bear paw so it can walk quietly through the snowy forest.",
        "imageUrl": "/images/plantar_exercise.jpg"
      },
      {
        "id": "plantar_sensory_ball",
        "name": "Pathway 3: Spiky Foot Roller & Arch Desensitization",
        "category": "equipment_sensory",
        "categoryLabel": "Therapy Ball & Sensory Play",
        "suitableFor": "Tactile defensive feet, sensory seekers, flat feet, and balance wobble",
        "durationSeconds": 180,
        "targetReps": "2 minutes per foot of slow rolling",
        "metronomeBpm": 45,
        "compensationRedFlags": [
          "Rolling too quickly and losing the ball",
          "Holding breath instead of deep breathing"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Barefoot Standing/Seated Over Textured Ball",
            "postureDescription": "Child stands holding a chair for balance, placing sole over a firm spiky massage ball.",
            "actionInstruction": "Place ball right under the center arch of the foot.",
            "parentCue": "\"Foot rests over our magic bumpy massage planet.\"",
            "diagramType": "sole_calcaneal_glide",
            "imageUrl": "/images/plantar_exercise.jpg",
            "alignmentCheck": "Foot centered over ball, balance supported by chair",
            "durationSeconds": 20,
            "breathCue": "Inhale balance"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Calcaneal Heel-to-Toe Slow Roll",
            "postureDescription": "Roll ball slowly forward from heel to ball of foot and back, applying gentle weight (slow 5s glide).",
            "actionInstruction": "Roll back and forth slowly, feeling all the little bumps awaken the foot arch.",
            "parentCue": "\"Rolling like a slow wheel on the trail... 1, 2, 3, 4, 5.\"",
            "diagramType": "spiky_roller",
            "imageUrl": "/images/plantar_exercise.jpg",
            "alignmentCheck": "Slow deliberate glide across the entire plantar fascia",
            "durationSeconds": 50,
            "breathCue": "Exhale as ball rolls forward"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Static 5s Plantar Deep Pressure Hold",
            "postureDescription": "Stop ball directly under heel and press downward with 30% body weight for 5 seconds.",
            "actionInstruction": "Hold firm grounding pressure, then release.",
            "parentCue": "\"Press down strong like planting a flag on the mountain!\"",
            "diagramType": "sole_calcaneal_glide",
            "imageUrl": "/images/plantar_exercise.jpg",
            "alignmentCheck": "Heel compression, steady upright balance",
            "durationSeconds": 40,
            "breathCue": "Deep belly breath"
          }
        ],
        "coachingCues": [
          "Spiky textured balls desensitize hypersensitive tactile receptors while waking up intrinsic foot muscles.",
          "If child is too ticklish standing, start seated in a chair first."
        ],
        "resistancePlayScript": "\u26bd \"Soccer Champion Foot Polish\": Conditioning our foot muscles for world-class balance and kicking!",
        "imageUrl": "/images/plantar_exercise.jpg"
      },
      {
        "id": "plantar_isometric_resistance",
        "name": "Pathway 4: Plantar Flexor & Calcaneal Static Hold",
        "category": "isometric_resistance",
        "categoryLabel": "Isometric Neuro-Facilitation",
        "suitableFor": "Children with collapsed flat arches, pronation, or severe toe-walking",
        "durationSeconds": 120,
        "targetReps": "4 cycles of 6-second holds (2 curl, 2 lift)",
        "metronomeBpm": 40,
        "compensationRedFlags": [
          "Twisting ankle inwards or outwards",
          "Holding breath during static contraction"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Seated Foot Support",
            "postureDescription": "Child sits with foot flat on floor. Parent places flat fingers under child's toes.",
            "actionInstruction": "Support heel with other hand to keep it anchored.",
            "parentCue": "\"Heel glued down, ready for gentle toe power.\"",
            "diagramType": "sole_calcaneal_glide",
            "imageUrl": "/images/plantar_exercise.jpg",
            "alignmentCheck": "Heel on floor, parent fingers under toes",
            "durationSeconds": 20,
            "breathCue": "Inhale ease"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Gentle Resistance Under Toes (5s Curl Hold)",
            "postureDescription": "Child gently curls toes down into parent's fingers with 20% effort for 5 seconds.",
            "actionInstruction": "Static hold with zero motion! Lifts the foot arch isometrically.",
            "parentCue": "\"Press toes gently down into my fingers... 1, 2, 3, 4, 5... and melt.\"",
            "diagramType": "isometric_press",
            "imageUrl": "/images/plantar_exercise.jpg",
            "alignmentCheck": "Intrinsic arch activation, heel stays flat",
            "durationSeconds": 40,
            "breathCue": "Steady exhale during 5s hold"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Gentle Resistance on Top of Toes (5s Lift Hold)",
            "postureDescription": "Parent places fingers on top of toes. Child gently lifts toes up toward shin for 5 seconds.",
            "actionInstruction": "Static hold activating tibialis anterior to extinguish toe-walking.",
            "parentCue": "\"Lift toes up into my fingers... 1, 2, 3, 4, 5... and release.\"",
            "diagramType": "isometric_press",
            "imageUrl": "/images/plantar_exercise.jpg",
            "alignmentCheck": "Dorsiflexor activation, no whole-body stiffening",
            "durationSeconds": 40,
            "breathCue": "Deep belly breath on release"
          }
        ],
        "coachingCues": [
          "MNRI isometric co-contraction rebalances the agonist-antagonist ratio between flexors and extensors.",
          "Ensures the ankle joint stabilizes in a neutral biomechanical position."
        ],
        "resistancePlayScript": "\u2693 \"Drawbridge Anchor\": Testing our ship's rudder against the gentle tide.",
        "imageUrl": "/images/plantar_exercise.jpg"
      }
    ],
    "verification": {
      "durationWeeks": "6 to 8 weeks of daily practice",
      "retestProtocol": "Repeat lateral border sole stroke test. Check for big toe lift or toe fanning.",
      "criteriaForIntegration": "Zero Babinski fanning or claw curling when sole is stroked; comfortable walking barefoot on various textures; disappearance of chronic toe-walking; normal resilient foot arches."
    },
    "primaryVideo": {
      "youtubeId": "t2luajmBIyc",
      "youtubeUrl": "https://www.youtube.com/watch?v=t2luajmBIyc",
      "title": "Harkla: Babinski & Plantar Reflex Explained"
    }
  },
  "rooting": {
    "id": "rooting",
    "name": "Rooting & Sucking Reflexes",
    "aka": "The Perioral Search, Feeding & Articulation Reflexes",
    "tier": 4,
    "tierName": "Tier 4: Distal Extremities & Cortical Bridge",
    "tierDescription": "Governs feeding and nursing survival in the newborn. Must integrate for mature speech articulation, swallowing, chewing, and oral-sensory regulation.",
    "description": "When the cheek or corner of the mouth is touched, the infant automatically turns head toward the touch with mouth open to latch. When retained, causes extreme picky eating (gagging on textures), thumb sucking past age 5, drooling, speech articulation delays, and chronic chewing on shirts/sleeves.",
    "functionalSigns": [
      "Extreme picky eating; gags easily on mixed textures, prefers only purees or crunchy bland carbs",
      "Persistent oral fixation: chews on shirt collars, sleeves, pencils, fingers, or toys past age 4",
      "Speech articulation difficulties (slurred speech, tongue thrust, lisp, difficulty with 'r', 'l', 'th' sounds)",
      "Excessive drooling, messy eating, or difficulty swallowing pills/tablets",
      "Hypersensitivity around mouth; hates having face washed, teeth brushed, or food on lips"
    ],
    "assessment": {
      "setup": "Child is sitting relaxed facing parent in a calm environment.",
      "safetyCaution": "Use gentle, clean finger touch. Stop if child gags or becomes distressed.",
      "action": "Lightly stroke with a clean fingertip from the corner of child's mouth outward along cheek toward ear. Repeat on other side and on upper/lower lip.",
      "techniqueTip": "Observe whether the mouth involuntarily twitches, pursed lips follow the finger, or child turns head toward touch.",
      "grading": {
        "grade0": "Integrated: Mouth and head remain completely still; no lip twitching, head turning, or mouth opening.",
        "grade1": "Mild: Slight twitch at corner of lip or subtle facial tick, but head does not turn.",
        "grade2": "Moderate: Mouth opens or pursed lips clearly follow the finger; child turns head toward stroke.",
        "grade3": "Level 3 (Prominent): Instant, involuntary head turn toward touch with mouth wide open; tongue thrusts forward."
      },
      "retainedCharacteristics": [
        "Head automatically turns toward cheek stroke with mouth open to latch",
        "Lip corner twitches or puckers toward the stimulating finger",
        "Tongue thrusts forward or child begins involuntary sucking movements",
        "Extreme oral hypersensitivity; gags when toothbrush or food touches lips"
      ],
      "integratedCharacteristics": [
        "Face remains completely relaxed and motionless when cheeks or lips are touched",
        "Clear, articulate speech without tongue thrust or lisping",
        "Enjoys diverse food textures without gagging or spitting out food",
        "Cessation of habitual chewing on clothing, fingers, or pencils"
      ],
      "retainedVsIntegratedImageUrl": "/images/rooting_retained_vs_integrated.jpg",
      "assessmentVideoId": "iXOEAnEJD48",
      "assessmentVideoUrl": "https://www.youtube.com/watch?v=iXOEAnEJD48"
    },
    "exercisePathways": [
      {
        "id": "rooting_facial_massage",
        "name": "Pathway 1: Perioral Diamond Sweep & Fish Pucker",
        "category": "primary_movement",
        "categoryLabel": "Primary Active Exercise",
        "suitableFor": "Standard evidence-based protocol for desensitizing perioral facial nerves and speech articulation",
        "durationSeconds": 180,
        "targetReps": "6 complete diamond facial circuits + 5 fish puckers",
        "metronomeBpm": 40,
        "compensationRedFlags": [
          "Rushing the strokes with light ticklish touch (must use firm, slow, continuous pressure)",
          "Child turning head toward the stroke (gently remind child to keep nose pointing forward)"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Warm Palm Facial Contact",
            "postureDescription": "Child sits upright facing parent. Parent rubs palms together to warm them, then rests warm hands on child's cheeks for 10 seconds.",
            "actionInstruction": "Apply gentle, calming warmth to relax facial and jaw muscles.",
            "parentCue": "\"Feel my warm hands holding your cheeks like gentle sunshine.\"",
            "diagramType": "facial_circle",
            "imageUrl": "/images/rooting_exercise.jpg",
            "alignmentCheck": "Warm hands on cheeks, jaw unclenched, calm eye contact",
            "durationSeconds": 20,
            "breathCue": "Inhale through nose together"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Four-Point Diamond Finger Strokes Around Lips",
            "postureDescription": "Using clean thumbs or index fingers, stroke FIRMLY around lips in a diamond pattern: (1) Above upper lip outward, (2) Below lower lip outward, (3) Down cheek from nose to chin.",
            "actionInstruction": "Firm, continuous pressure (not ticklish!). Child keeps head facing straight forward.",
            "parentCue": "\"Drawing our gentle diamond frame around our smiling lips... nose stays straight!\"",
            "diagramType": "facial_circle",
            "imageUrl": "/images/rooting_exercise.jpg",
            "alignmentCheck": "Firm stroke around lips without head turning, relaxed jaw",
            "durationSeconds": 45,
            "breathCue": "Exhale as fingers glide across cheek"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Pursed Fish Lips & Straw Blow Release",
            "postureDescription": "Child puckers lips tight like a little fish for 3 seconds, then blows a long slow stream of air out through pursed lips (whistle or bubble blow).",
            "actionInstruction": "Pucker tight, then blow smooth air out like blowing bubbles in milk.",
            "parentCue": "\"Funny fish lips... 1, 2, 3... now blow the gentle wind: whooooo!\"",
            "diagramType": "straw_bubble_blow",
            "imageUrl": "/images/rooting_exercise.jpg",
            "alignmentCheck": "Symmetrical lip pucker, controlled 5-second exhalation",
            "durationSeconds": 30,
            "breathCue": "Audible 5-second blow through pursed lips"
          }
        ],
        "coachingCues": [
          "CRITICAL: Always use firm, steady pressure. Light touch stimulates the reflex, whereas firm deep pressure inhibits and desensitizes it.",
          "Perform before meals or tooth brushing to reduce oral defensiveness."
        ],
        "resistancePlayScript": "\ud83d\udc20 \"Bubbles the Friendly Fish\": Pucker your fish lips to swim through the coral reef, then blow gentle sea bubbles!",
        "imageUrl": "/images/rooting_exercise.jpg"
      },
      {
        "id": "rooting_passive_calming_stroke",
        "name": "Pathway 2: Bilateral Mandibular Calming Stroke",
        "category": "assisted_passive",
        "categoryLabel": "Passive Co-Regulation",
        "suitableFor": "Severe picky eaters, toddlers, children with speech apraxia, or hypersensitive gag reflex",
        "durationSeconds": 150,
        "targetReps": "3 minutes of soothing bilateral jaw strokes",
        "metronomeBpm": 40,
        "compensationRedFlags": [
          "Applying touch with cold hands",
          "Child pulling away in distress (stop and resume with gentle cheek hold first)"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Pillowed Supine Head Support",
            "postureDescription": "Child lies on back with head on soft pillow. Parent sits at child's head looking down with soothing voice.",
            "actionInstruction": "Speak in a low, gentle tone.",
            "parentCue": "\"Resting on our cloud pillow, completely safe and cozy.\"",
            "diagramType": "mat_setup",
            "imageUrl": "/images/rooting_exercise.jpg",
            "alignmentCheck": "Head supported, neck neutral, shoulders relaxed",
            "durationSeconds": 20,
            "breathCue": "Inhale calmness"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Bilateral Firm Calming Sweeps from Temples to Jaw",
            "postureDescription": "Parent strokes both cheeks SIMULTANEOUSLY from temples down the jawline to the chin with flat fingertips.",
            "actionInstruction": "Bilateral synchronous touch prevents head turning and calms the trigeminal nerve.",
            "parentCue": "\"Gentle soothing strokes down your cheeks... soft like silk... 1, 2, 3, 4, 5.\"",
            "diagramType": "facial_circle",
            "imageUrl": "/images/rooting_exercise.jpg",
            "alignmentCheck": "Simultaneous bilateral strokes, firm soothing pressure",
            "durationSeconds": 45,
            "breathCue": "Long exhale together"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Firm Bilateral Chin Grounding Cup",
            "postureDescription": "Rest warm fingertips firmly under child's chin for 15 seconds.",
            "actionInstruction": "Provides deep proprioceptive grounding to the mentalis and digastric muscles.",
            "parentCue": "\"Safe and loved, smiling softly.\"",
            "diagramType": "facial_circle",
            "imageUrl": "/images/rooting_exercise.jpg",
            "alignmentCheck": "Soft facial expression, chin resting comfortably",
            "durationSeconds": 30,
            "breathCue": "Soft audible breath"
          }
        ],
        "coachingCues": [
          "Simultaneous bilateral stimulation eliminates the unilateral 'search' trigger of the rooting reflex.",
          "Very effective when done right before bed to eliminate nighttime teeth grinding."
        ],
        "resistancePlayScript": "\ud83c\udf19 \"Moonbeam Facial Glow\": Gentle starlight sweeps down our cheeks to prepare us for peaceful dreaming.",
        "imageUrl": "/images/rooting_exercise.jpg"
      },
      {
        "id": "rooting_oral_straw_play",
        "name": "Pathway 3: Heavy Work Thick Smoothie Straw & Pinwheel Whistle",
        "category": "equipment_sensory",
        "categoryLabel": "Oral-Motor Sensory Equipment",
        "suitableFor": "Children who chew on shirt collars, suck thumbs, or have speech clarity delays",
        "durationSeconds": 180,
        "targetReps": "5 thick smoothie pulls + 5 long pinwheel blows",
        "metronomeBpm": 45,
        "compensationRedFlags": [
          "Biting down on straw with molars instead of lip seal suction",
          "Short gasping blows instead of sustained 5-second exhalation"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Upright Ergonomic Seating",
            "postureDescription": "Child sits upright at table with feet flat on floor and head centered.",
            "actionInstruction": "Provide a thick smoothie, applesauce, or milkshake in a cup with a narrow straw.",
            "parentCue": "\"Sit tall, ready for our superhero straw challenge!\"",
            "diagramType": "seated_starfish_desk",
            "imageUrl": "/images/rooting_exercise.jpg",
            "alignmentCheck": "Upright posture, 90-degree hips and knees",
            "durationSeconds": 20,
            "breathCue": "Inhale through nose"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Thick Smoothie Sucking Through Thin Straw",
            "postureDescription": "Child uses lip suction (not teeth) to drink thick smoothie through straw for 5 sustained pulls.",
            "actionInstruction": "Provides heavy work to the buccinator, orbicularis oris, and tongue retractors.",
            "parentCue": "\"Mighty suction power! Pull the tasty smoothie up like a vacuum cleaner!\"",
            "diagramType": "straw_bubble_blow",
            "imageUrl": "/images/rooting_exercise.jpg",
            "alignmentCheck": "Lip seal on straw, cheek muscles contracting, no head tilting",
            "durationSeconds": 50,
            "breathCue": "Swallow smoothly, breathe through nose"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Sustained Pinwheel Blowing Exhale",
            "postureDescription": "Blow steadily on a pinwheel or blow a ping-pong ball across table with a sustained 5s breath.",
            "actionInstruction": "Directs oral motor breath control for articulation and lung capacity.",
            "parentCue": "\"Spin the colorful pinwheel as fast as you can for 5 seconds... whoooo!\"",
            "diagramType": "straw_bubble_blow",
            "imageUrl": "/images/rooting_exercise.jpg",
            "alignmentCheck": "Continuous 5-second exhalation, cheeks engaged",
            "durationSeconds": 40,
            "breathCue": "Long sustained exhalation"
          }
        ],
        "coachingCues": [
          "Heavy work oral-motor exercises rapidly replace clothing chewing and thumb sucking with functional proprioception.",
          "Use high-viscosity liquids (pudding, Greek yogurt, fruit smoothies)."
        ],
        "resistancePlayScript": "\ud83c\udf2a\ufe0f \"Wind Turbine Generator\": Powering the whole city by spinning the giant pinwheel with our breath!",
        "imageUrl": "/images/rooting_exercise.jpg"
      },
      {
        "id": "rooting_isometric_cheek",
        "name": "Pathway 4: Lingual-Buccinator Static Resistance",
        "category": "isometric_resistance",
        "categoryLabel": "Isometric Neuro-Facilitation",
        "suitableFor": "Speech articulation delays, tongue thrust, drooling, and persistent oral hyper-reactivity",
        "durationSeconds": 120,
        "targetReps": "4 cycles of 5-second holds (2 right cheek, 2 left cheek)",
        "metronomeBpm": 40,
        "compensationRedFlags": [
          "Clenching jaw or teeth during tongue press",
          "Head turning toward the resisting finger"
        ],
        "transientSteps": [
          {
            "stepNumber": 1,
            "phase": "setup",
            "title": "Calm Face-to-Face Engagement",
            "postureDescription": "Child sits facing parent. Parent rests index finger lightly against outside of child's right cheek.",
            "actionInstruction": "Ensure child's head stays centered.",
            "parentCue": "\"Head straight, ready for the tongue power challenge!\"",
            "diagramType": "facial_circle",
            "imageUrl": "/images/rooting_exercise.jpg",
            "alignmentCheck": "Head upright, parent finger on outside of cheek",
            "durationSeconds": 20,
            "breathCue": "Inhale ease"
          },
          {
            "stepNumber": 2,
            "phase": "transient",
            "title": "Tongue-in-Cheek Push Against Parent Finger (5s hold)",
            "postureDescription": "Child pushes tip of tongue into the inside of right cheek, pressing out against parent's resisting finger.",
            "actionInstruction": "Parent provides gentle counter-pressure for 5 seconds. Head stays motionless.",
            "parentCue": "\"Push your tongue into my finger like hiding a marble in your cheek... 1, 2, 3, 4, 5!\"",
            "diagramType": "isometric_press",
            "imageUrl": "/images/rooting_exercise.jpg",
            "alignmentCheck": "Tongue pressing inside cheek against finger, zero head movement",
            "durationSeconds": 40,
            "breathCue": "Breathe gently through nose"
          },
          {
            "stepNumber": 3,
            "phase": "finish",
            "title": "Symmetrical Smile & Jaw Release",
            "postureDescription": "Child releases tongue, smiles wide, and swallows softly before switching to left cheek.",
            "actionInstruction": "Strengthens cortical control over the hypoglossal and facial nerves.",
            "parentCue": "\"Big happy smile... swallow and relax!\"",
            "diagramType": "facial_circle",
            "imageUrl": "/images/rooting_exercise.jpg",
            "alignmentCheck": "Symmetrical smile, swallow without tongue thrust",
            "durationSeconds": 30,
            "breathCue": "Soft easy breath"
          }
        ],
        "coachingCues": [
          "MNRI lingual-buccinator resistance strengthens tongue lateralization and elevation required for mature speech sounds.",
          "Head MUST remain still; do not let child turn into the finger."
        ],
        "resistancePlayScript": "\ud83c\udf6c \"Hidden Bubblegum\": Hiding the secret bubblegum in our cheek so nobody can find it!",
        "imageUrl": "/images/rooting_exercise.jpg"
      }
    ],
    "verification": {
      "durationWeeks": "6 to 8 weeks of daily practice",
      "retestProtocol": "Repeat cheek stroke test with clean finger. Check for mouth twitching, head turning, or sucking response.",
      "criteriaForIntegration": "Zero head turn or mouth twitching when cheek is stroked; dramatic improvement in speech clarity and articulation; tolerance for diverse food textures; cessation of shirt chewing and thumb sucking."
    },
    "primaryVideo": {
      "youtubeId": "iXOEAnEJD48",
      "youtubeUrl": "https://www.youtube.com/watch?v=iXOEAnEJD48",
      "title": "Harkla: What Is the Rooting Reflex? Signs & OT Tips"
    }
  }
};
