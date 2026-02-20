import type { Module, Question } from "@/lib/types"

function makeModule(id: string, title: string, summary: string, qs: Question[]): Module {
  return { id, title, summary, estimatedMinutes: Math.ceil(qs.length * 0.7), questions: qs }
}

const B: Question[] = [
  { id: "b1", prompt: "What number do you call for emergencies in India?", options: ["100", "112", "911", "108"], correctIndex: 1 },
  { id: "b2", prompt: "During an earthquake, the first action is:", options: ["Run outside", "Drop, Cover, Hold On", "Stand near glass", "Use elevator"], correctIndex: 1 },
  { id: "b3", prompt: "If sea water suddenly pulls back from the shore, you should:", options: ["Go watch", "Swim", "Move inland/up", "Stay"], correctIndex: 2 },
  { id: "b4", prompt: "In a flood, you should:", options: ["Walk through moving water", "Turn around, don’t drown", "Drive fast", "Camp by river"], correctIndex: 1 },
  { id: "b5", prompt: "If clothes catch fire:", options: ["Run", "Stop, Drop, and Roll", "Jump on bed", "Wave arms"], correctIndex: 1 },
  { id: "b6", prompt: "A basic go‑bag should have:", options: ["Snacks & water", "Important docs", "Flashlight & batteries", "All of these"], correctIndex: 3 },
  { id: "b7", prompt: "Lightning safety: best place is:", options: ["Under a tree", "Open field", "Inside enclosed building", "On rooftop"], correctIndex: 2 },
  { id: "b8", prompt: "In a fire drill at school you should:", options: ["Push", "Panic", "Line up & follow teacher", "Hide"], correctIndex: 2 },
  { id: "b9", prompt: "Cyclone winds: stay:", options: ["Near windows", "On balcony", "In interior room", "On terrace"], correctIndex: 2 },
  { id: "b10", prompt: "For small cut first aid:", options: ["Dirty cloth", "Clean + pressure", "Random ointment", "Ignore"], correctIndex: 1 },
  { id: "b11", prompt: "Earthquake safe spot indoors:", options: ["Under sturdy table", "Near glass", "By tall shelf", "Balcony"], correctIndex: 0 },
  { id: "b12", prompt: "Tsunami warning: go:", options: ["To beach", "To pier", "Inland/high ground", "Stay"], correctIndex: 2 },
  { id: "b13", prompt: "During heatwave, you should:", options: ["Wear dark layers", "Avoid water", "Rest in shade & drink water", "Sit in car"], correctIndex: 2 },
  { id: "b14", prompt: "Landslide area: walk:", options: ["On steep slope", "On riverbank", "Away to stable ground", "Under cliff"], correctIndex: 2 },
  { id: "b15", prompt: "Emergency kit docs include:", options: ["Report cards", "Old magazines", "IDs & contacts", "Stickers"], correctIndex: 2 },
  { id: "b16", prompt: "Gas leak smell: you should:", options: ["Light a match", "Turn off gas & ventilate", "On phone nearby", "Ignore"], correctIndex: 1 },
  { id: "b17", prompt: "If trapped by smoke:", options: ["Walk upright", "Crawl low", "Jump window", "Hide"], correctIndex: 1 },
  { id: "b18", prompt: "Flooded road while driving:", options: ["Follow car", "Turn around", "Drive fast", "Park in water"], correctIndex: 1 },
  { id: "b19", prompt: "Earthquake outdoors:", options: ["Under power lines", "Open area away from buildings", "Near walls", "Under tree"], correctIndex: 1 },
  { id: "b20", prompt: "Emergency message sources:", options: ["Rumors", "Verified alerts/news", "Random social posts", "None"], correctIndex: 1 },
]

const I: Question[] = [
  { id: "i1", prompt: "The ‘triangle of life’ myth is:", options: ["Official guidance", "Outdated/incorrect", "Same as Drop Cover Hold", "For outdoors"], correctIndex: 1 },
  { id: "i2", prompt: "Best place for earthquake kit at school:", options: ["Locked away", "Accessible common area", "Random room", "Basement only"], correctIndex: 1 },
  { id: "i3", prompt: "Tornado/Cyclone safest interior location:", options: ["Interior small room", "Glass hallway", "Under skylight", "Balcony"], correctIndex: 0 },
  { id: "i4", prompt: "If someone is in shock:", options: ["Give alcohol", "Lay down & elevate legs (if safe)", "Shake them", "Ignore"], correctIndex: 1 },
  { id: "i5", prompt: "Food safety in outage:", options: ["Open fridge often", "Keep closed & use perishable first", "Refreeze thawed food", "Taste test"], correctIndex: 1 },
  { id: "i6", prompt: "Chemical spill nearby:", options: ["Go investigate", "Shelter-in-place as instructed", "Post videos", "Drive through"], correctIndex: 1 },
  { id: "i7", prompt: "During aftershocks:", options: ["Return immediately", "Expect more & stay cautious", "Party", "Use lifts"], correctIndex: 1 },
  { id: "i8", prompt: "Flood go‑bag extras:", options: ["Life jacket if available", "Sand sample", "Heels", "Candles only"], correctIndex: 0 },
  { id: "i9", prompt: "Wildfire smoke indoors:", options: ["Open all windows", "Seal leaks & use masks/filters", "Burn incense", "Exercise"], correctIndex: 1 },
  { id: "i10", prompt: "First aid for sprain:", options: ["RICE (rest/ice/compress/elevate)", "Run", "Hot compress instantly", "Ignore"], correctIndex: 0 },
  { id: "i11", prompt: "Lightning if no shelter:", options: ["Lie flat", "Crouch low on balls of feet", "Stand tall", "Hold metal"], correctIndex: 1 },
  { id: "i12", prompt: "Earthquake lab safety:", options: ["Secure cylinders & shelves", "Ignore anchoring", "Block exits", "Store glass high"], correctIndex: 0 },
  { id: "i13", prompt: "Evacuation with pets:", options: ["Leave them", "Plan carriers & supplies", "Open door only", "Tie outside"], correctIndex: 1 },
  { id: "i14", prompt: "Water purification emergency:", options: ["Boil 1 min", "Add sugar", "Shake only", "Paint filter"], correctIndex: 0 },
  { id: "i15", prompt: "Phone use during crisis:", options: ["Stream videos", "Text over call to reduce load", "Call all contacts", "Random groups"], correctIndex: 1 },
  { id: "i16", prompt: "Campus assembly point should be:", options: ["Near buildings", "Open safe area", "Basement", "Car park under shade"], correctIndex: 1 },
  { id: "i17", prompt: "If trapped under debris:", options: ["Shout continuously", "Tap on pipe/wall periodically", "Run", "Use lighter"], correctIndex: 1 },
  { id: "i18", prompt: "Flooded electrical risks:", options: ["Touch outlets", "Avoid water near power, turn mains off if safe", "Use devices in water", "Ignore"], correctIndex: 1 },
  { id: "i19", prompt: "First aid nosebleed:", options: ["Head back", "Head forward & pinch nose", "Pack nose", "Lie flat"], correctIndex: 1 },
  { id: "i20", prompt: "Tsunami multi-waves:", options: ["Only one wave", "Multiple waves possible", "Always tiny", "Schedule known"], correctIndex: 1 },
]

const A: Question[] = [
  { id: "a1", prompt: "NDMA stands for:", options: ["National Disaster Management Authority", "National Defense Medical Agency", "New Delhi Medical Assoc.", "National Data Mgmt Authority"], correctIndex: 0 },
  { id: "a2", prompt: "Seismic retrofitting priority:", options: ["Non-structural first", "Life-safety critical elements", "Cosmetics", "None"], correctIndex: 1 },
  { id: "a3", prompt: "Incident Command System helps by:", options: ["Random roles", "Standardizing command & coordination", "Only for fires", "Only police"], correctIndex: 1 },
  { id: "a4", prompt: "Flood return period meaning:", options: ["Happens every N years exactly", "Probability in any given year", "No meaning", "Schedule"], correctIndex: 1 },
  { id: "a5", prompt: "Fire classes: electrical fires are:", options: ["Class A", "Class B", "Class C", "Class D"], correctIndex: 2 },
  { id: "a6", prompt: "Extinguisher PASS stands for:", options: ["Push Aim Spray Stop", "Pull Aim Squeeze Sweep", "Push Aim Squeeze Spray", "Pull Aim Spray Sweep"], correctIndex: 1 },
  { id: "a7", prompt: "Heat index combines:", options: ["Temp & humidity", "Temp & wind", "Wind & rain", "UV & temp"], correctIndex: 0 },
  { id: "a8", prompt: "Earthquake magnitude vs intensity:", options: ["Same", "Magnitude = energy; intensity = effects", "Both effects", "Both energy"], correctIndex: 1 },
  { id: "a9", prompt: "Triage colors: red means:", options: ["Minor", "Delayed", "Immediate", "Deceased"], correctIndex: 2 },
  { id: "a10", prompt: "Shelter-in-place ventilation:", options: ["Seal room and turn off HVAC", "Open windows", "Turn fans on", "Move outside"], correctIndex: 0 },
  { id: "a11", prompt: "Cyclone categories are based on:", options: ["Humidity", "Wind speed", "Rainfall", "Cloud type"], correctIndex: 1 },
  { id: "a12", prompt: "Seiche refers to:", options: ["Standing wave in enclosed water body", "Sea recession", "Mudflow", "Wind shear"], correctIndex: 0 },
  { id: "a13", prompt: "Groundwater contamination post-flood mitigated by:", options: ["Random wells", "Boil/chemical treatment & testing", "Ignore", "Paint"], correctIndex: 1 },
  { id: "a14", prompt: "Lifeline infrastructure includes:", options: ["Cafes", "Power, water, transport, comms", "Gardens", "Stadiums"], correctIndex: 1 },
  { id: "a15", prompt: "Building egress width is important for:", options: ["Aesthetics", "Safe evacuation flow", "Decoration", "HVAC"], correctIndex: 1 },
  { id: "a16", prompt: "Early warning systems rely on:", options: ["Rumors", "Sensors, models, comms", "Luck", "Sirens only"], correctIndex: 1 },
  { id: "a17", prompt: "NFPA signage helps with:", options: ["Confusion", "Hazard communication", "Only hospitals", "Only labs"], correctIndex: 1 },
  { id: "a18", prompt: "Non-ductile RC frames are vulnerable because:", options: ["Strong confinement", "Poor detailing & brittle behavior", "Expensive", "Light"], correctIndex: 1 },
  { id: "a19", prompt: "School emergency plan should include:", options: ["Only map", "Roles, routes, drills, contacts", "Just posters", "None"], correctIndex: 1 },
  { id: "a20", prompt: "Community resilience improves with:", options: ["No practice", "Preparedness education & drills", "Rumors", "Isolation"], correctIndex: 1 },
]

export const QUIZ_MODULES: Record<string, Module> = {
  beginner: makeModule("quiz-beginner", "Beginner Quiz", "Basics of disaster safety.", B),
  intermediate: makeModule("quiz-intermediate", "Intermediate Quiz", "Apply practical safety steps.", I),
  advanced: makeModule("quiz-advanced", "Advanced Quiz", "Deeper concepts & systems.", A),
}
