export type KnowledgeCheck = {
  question: string;
  choices: string[];
  answer: string;
  explanation: string;
};

export type Lesson = {
  id: string;
  title: string;
  summary: string;
  body: string[];
  takeaways: string[];
  quiz: KnowledgeCheck;
};

export type LessonModule = {
  id: string;
  title: string;
  subtitle: string;
  lessons: Lesson[];
};

export type HydroponicSystem = {
  id: string;
  name: string;
  difficulty: string;
  description: string;
  howItWorks: string;
  equipment: string[];
  advantages: string[];
  disadvantages: string[];
  plants: string[];
};

export type PlantGuide = {
  id: string;
  name: string;
  category: string;
  days: number;
  pH: string;
  ec: string;
  spacingCm: number;
  temperature: string;
  systems: string[];
  overview: string;
  germination: string;
  care: string;
  harvest: string;
  problems: string;
};

export type DiyProject = {
  id: string;
  title: string;
  difficulty: string;
  duration: string;
  costIdr: number;
  description: string;
  materials: string[];
  tools: string[];
  steps: string[];
  safety: string[];
  troubleshooting: string[];
};

export const systems: HydroponicSystem[] = [
  {
    id: "kratky",
    name: "Kratky method",
    difficulty: "Beginner",
    description: "A passive, non-circulating method that lets roots reach a reservoir as the water level falls.",
    howItWorks: "A net pot sits above a covered nutrient reservoir. The plant uses the solution and the air gap grows, giving lower roots oxygen without a pump.",
    equipment: ["Opaque lidded container", "Net pot", "Growing medium", "Hydroponic nutrients"],
    advantages: ["No electricity or pump", "Very quiet and inexpensive", "Simple to build"],
    disadvantages: ["Reservoir cannot be topped up carelessly", "Best for one harvest cycle", "Warm water can stress roots"],
    plants: ["Lettuce", "Basil", "Pak Choi", "Kangkung"],
  },
  {
    id: "dwc",
    name: "Deep Water Culture (DWC)",
    difficulty: "Beginner",
    description: "Roots hang into an aerated nutrient reservoir while an air pump keeps oxygen moving.",
    howItWorks: "An air stone bubbles continuously below the net pot. Keep the solution below the basket so the upper roots stay in moist air.",
    equipment: ["Opaque bucket or tote", "Net pot", "Air pump and stone", "Airline tubing", "pH and EC meter"],
    advantages: ["Fast leafy growth", "Easy to inspect", "Small systems are affordable"],
    disadvantages: ["Needs reliable aeration", "Heat can reduce dissolved oxygen", "Pump failure needs quick attention"],
    plants: ["Lettuce", "Basil", "Kale", "Pak Choi"],
  },
  {
    id: "nft",
    name: "Nutrient Film Technique (NFT)",
    difficulty: "Intermediate",
    description: "A shallow, moving film of nutrient solution passes through channels beneath the roots.",
    howItWorks: "A pump sends solution from a reservoir through slightly sloped channels, then gravity returns it to the reservoir.",
    equipment: ["Food-safe channels", "Reservoir", "Submersible pump", "Return pipe", "Timer or continuous flow"],
    advantages: ["Efficient water use", "Good for compact leafy crops", "Easy to expand in rows"],
    disadvantages: ["Roots can block channels", "Pump interruption dries roots quickly", "Flow and slope need checking"],
    plants: ["Lettuce", "Spinach", "Basil", "Pak Choi"],
  },
  {
    id: "drip",
    name: "Drip hydroponics",
    difficulty: "Intermediate",
    description: "A pump or gravity-fed manifold delivers small, controlled amounts of solution to each plant.",
    howItWorks: "Emitters wet the root zone in an inert medium such as coco coir. Excess solution drains away or returns to a reservoir.",
    equipment: ["Reservoir", "Pump", "Tubing and emitters", "Growing medium", "Drain tray"],
    advantages: ["Precise watering", "Works well for fruiting crops", "Plants can be spaced independently"],
    disadvantages: ["Emitters may clog", "Needs more fittings", "Drainage and timing take tuning"],
    plants: ["Tomatoes", "Strawberries", "Kale", "Basil"],
  },
  {
    id: "ebb-flow",
    name: "Ebb and flow",
    difficulty: "Intermediate",
    description: "A tray of plants is periodically flooded with nutrient solution and then drained.",
    howItWorks: "A timer runs a pump to fill the tray. A standpipe limits the flood height, then gravity drains solution back to the reservoir.",
    equipment: ["Flood tray", "Reservoir", "Pump and timer", "Standpipe", "Clay pebbles or similar medium"],
    advantages: ["Roots get both nutrients and air", "Flexible plant spacing", "Easy to flush the tray"],
    disadvantages: ["Timer and drain need maintenance", "Flooding can leak if assembled poorly", "Medium adds weight"],
    plants: ["Kale", "Basil", "Tomatoes", "Strawberries"],
  },
  {
    id: "vertical",
    name: "Vertical hydroponics",
    difficulty: "Advanced",
    description: "Stacked planting sites use height to grow more crops in a small footprint.",
    howItWorks: "A pump lifts solution to the top of a tower or stacked channels, where it trickles past roots and returns below.",
    equipment: ["Stable tower or frame", "Food-safe planting columns", "Reservoir and pump", "Distribution manifold", "Light for shaded sites"],
    advantages: ["High plant count per floor area", "Easy to reach at different heights", "Attractive for small balconies"],
    disadvantages: ["Uneven light and flow are common", "Top-heavy towers need anchoring", "Harder to clean than a simple bucket"],
    plants: ["Lettuce", "Spinach", "Strawberries", "Pak Choi"],
  },
];

export const plants: PlantGuide[] = [
  { id: "lettuce", name: "Lettuce", category: "Leafy green", days: 35, pH: "5.5–6.5", ec: "0.8–1.8 mS/cm", spacingCm: 20, temperature: "18–24°C; shade during hot afternoons", systems: ["Kratky", "DWC", "NFT", "Vertical"], overview: "A forgiving first crop with compact roots and a quick baby-leaf harvest. In tropical heat, choose heat-tolerant loose-leaf varieties.", germination: "Sow one or two seeds in a damp cube. Keep it moist, bright, and cool; thin to one seedling after true leaves appear.", care: "Aim for gentle airflow and a solution below 24°C when possible. Keep the crown dry and check the reservoir every day in warm weather.", harvest: "Pick outer leaves from about week 4, or harvest the whole head when firm. Stagger sowing every 1–2 weeks for a steady supply.", problems: "Warm roots can cause bitterness or tip burn. Improve shade and airflow, and avoid letting EC rise as water evaporates." },
  { id: "spinach", name: "Spinach", category: "Leafy green", days: 40, pH: "5.8–6.5", ec: "1.8–2.3 mS/cm", spacingCm: 18, temperature: "15–22°C; use shade in tropical sites", systems: ["DWC", "NFT", "Vertical"], overview: "A nutrient-rich leafy crop that prefers cooler conditions and steady moisture. Heat-tolerant tropical varieties perform best in partial shade.", germination: "Soak seeds for several hours, then sow into a moist starter cube. Keep the medium cool and moist until seedlings establish.", care: "Maintain a stable, aerated root zone and provide morning light. In hot climates, use shade cloth and keep water moving.", harvest: "Take outer leaves once plants are established, usually around 5–6 weeks. Leave the crown intact for regrowth.", problems: "Bolting and bitter leaves usually signal heat stress. Crowding and stagnant air can encourage leaf disease." },
  { id: "pak-choi", name: "Pak Choi", category: "Leafy green", days: 35, pH: "5.8–6.5", ec: "1.5–2.0 mS/cm", spacingCm: 22, temperature: "18–26°C; protect from harsh midday sun", systems: ["Kratky", "DWC", "NFT"], overview: "A fast-growing brassica with crisp stems and tender leaves; baby pak choi suits compact systems.", germination: "Sow into a moist cube and transplant after roots show through the base and two or three true leaves form.", care: "Give bright indirect light or morning sun, even moisture, and space for airflow. Inspect leaf undersides for caterpillars.", harvest: "Harvest baby plants in about 4–5 weeks, or cut mature heads near the base while leaving the crown for a possible second flush.", problems: "Heat and dry swings encourage bolting or bitter stems. Flea beetles and caterpillars can damage leaves." },
  { id: "kale", name: "Kale", category: "Leafy green", days: 55, pH: "5.5–6.5", ec: "1.5–2.5 mS/cm", spacingCm: 30, temperature: "16–24°C; light shade in the tropics", systems: ["DWC", "Drip", "Ebb and flow"], overview: "A sturdy leafy crop with a longer harvest window. Compact varieties are easier to support in small systems.", germination: "Start seeds in a moist cube. Transplant when the seedling has several true leaves and visible healthy roots.", care: "Keep the stem supported as it grows and remove damaged lower leaves. Provide airflow and watch for brassica pests.", harvest: "Pick the lowest mature leaves first after roughly 7–9 weeks, keeping the central growing point intact.", problems: "Yellowing lower leaves may be normal aging; widespread yellowing can indicate pH, root, or nutrient trouble. Watch for aphids and caterpillars." },
  { id: "basil", name: "Basil", category: "Herb", days: 30, pH: "5.5–6.5", ec: "1.0–1.6 mS/cm", spacingCm: 20, temperature: "20–30°C; protect from heavy rain", systems: ["Kratky", "DWC", "Drip", "NFT"], overview: "A warm-loving herb that grows quickly in bright conditions and responds well to frequent tip pruning.", germination: "Sow shallowly in a moist starter cube. Keep warm and bright; transplant once roots and true leaves are established.", care: "Pinch the growing tip above a pair of leaves to encourage branching. Keep foliage dry overnight and avoid chilling the roots.", harvest: "Begin light picking after 4–5 weeks. Cut stems just above a leaf pair and remove flower spikes to prolong leafy growth.", problems: "Cold or waterlogged roots slow growth. Dense humid foliage can develop fungal spots; improve spacing and airflow." },
  { id: "mint", name: "Mint", category: "Herb", days: 35, pH: "5.5–6.5", ec: "1.2–2.0 mS/cm", spacingCm: 25, temperature: "18–28°C; partial shade is welcome", systems: ["Kratky", "DWC", "Drip"], overview: "A vigorous herb that roots readily from cuttings. Keep it in its own container because its roots and stems spread aggressively.", germination: "For a reliable start, place a healthy stem cutting in clean water until roots form, then move it into a net pot.", care: "Trim tips often and remove flower stems. Give morning light and keep the root zone moist but well oxygenated.", harvest: "Snip the top few leaves or stems once the plant is bushy, leaving several leaf pairs to regrow.", problems: "Leggy stems need more light. Rust-colored spots or mildew call for better spacing, airflow, and removal of affected leaves." },
  { id: "kangkung", name: "Water spinach (Kangkung)", category: "Tropical leafy green", days: 28, pH: "5.5–6.5", ec: "1.0–1.8 mS/cm", spacingCm: 18, temperature: "24–32°C; suited to tropical warmth", systems: ["Kratky", "DWC", "NFT"], overview: "A heat-loving tropical green with hollow stems and fast regrowth. Use clean water and a contained system rather than uncontrolled waterways.", germination: "Soak seeds overnight and sow into a moist cube or starter medium. Transplant after roots emerge and the seedling is sturdy.", care: "Provide bright light, steady water, and enough room for vigorous stems. In warm weather, check oxygen and water level frequently.", harvest: "Cut tender shoots after about 4 weeks, leaving lower nodes to produce new growth. Harvest before stems become woody.", problems: "Long, weak stems suggest insufficient light. Keep the reservoir clean and inspect for leaf-feeding insects." },
  { id: "tomatoes", name: "Tomatoes", category: "Fruiting crop", days: 90, pH: "5.5–6.5", ec: "2.0–5.0 mS/cm", spacingCm: 45, temperature: "21–27°C; ventilate well in humid tropics", systems: ["Drip", "Ebb and flow"], overview: "A productive but demanding crop that needs strong light, a large root zone, support, and pollination help indoors.", germination: "Start seeds in a moist cube. Transplant after several true leaves appear and roots fill the starter, then add a sturdy support.", care: "Use a fruiting nutrient plan, consistent irrigation, and regular pruning. Shake flower clusters gently or brush them to aid pollination.", harvest: "Harvest fully colored fruit with a slight give. Depending on variety and conditions, allow roughly 10–14 weeks from sowing.", problems: "Blossom-end rot is often linked to irregular water supply and calcium movement. High humidity can reduce pollination and raise disease risk." },
  { id: "strawberries", name: "Strawberries", category: "Fruiting crop", days: 100, pH: "5.5–6.2", ec: "1.2–1.8 mS/cm", spacingCm: 25, temperature: "18–24°C; shade and airflow in hot weather", systems: ["Drip", "NFT", "Vertical"], overview: "Compact ever-bearing varieties can fruit in hydroponics, though tropical heat may reduce flowering and fruit quality.", germination: "Use healthy crowns or rooted runners for a faster start. Set the crown above the medium and keep roots moist, not the crown itself.", care: "Give bright light, gentle airflow, and clean pollination conditions. Remove runners if fruit production is the goal.", harvest: "Pick berries when fully red and fragrant, commonly 12–16 weeks after establishment. Chill only after harvesting.", problems: "Crown rot follows a buried or constantly wet crown. Heat, poor pollination, and mites can lead to small or misshapen fruit." },
];

const lesson = (id: string, title: string, summary: string, body: string[], takeaways: string[], quiz: KnowledgeCheck): Lesson => ({
  id,
  title,
  summary,
  body,
  takeaways,
  quiz,
});

const systemLessons = systems.map((system) => lesson(
  `system-${system.id}`,
  system.name,
  system.description,
  [system.howItWorks, `Start with: ${system.equipment.join(", ")}.`, `Best matches: ${system.plants.join(", ")}.`, `Advantages: ${system.advantages.join("; ")}.`, `Plan for: ${system.disadvantages.join("; ")}.`],
  [`Difficulty: ${system.difficulty}.`, `A good first crop is ${system.plants[0] ?? "a leafy green"}.`],
  { question: `Which crop suits ${system.name}?`, choices: [...system.plants.slice(0, 2), "A mature fruit tree"], answer: system.plants[0] ?? "Lettuce", explanation: `${system.name} is commonly used for ${system.plants.join(", ")}.` },
));

const plantLessons = plants.map((plant) => lesson(
  `plant-${plant.id}`,
  `${plant.name} growing guide`,
  plant.overview,
  [plant.overview, `Start: ${plant.germination}`, `Growing conditions: ${plant.temperature}. Aim for pH ${plant.pH} and EC ${plant.ec}.`, `Suitable systems: ${plant.systems.join(", ")}. Plant about ${plant.spacingCm} cm apart.`, `Care: ${plant.care}`, `Harvest: ${plant.harvest}`, `Common problems: ${plant.problems}`],
  [`Estimated crop time: about ${plant.days} days.`, `Reference pH ${plant.pH}; EC ${plant.ec}. These are starting ranges, not fertilizer instructions.`],
  { question: `What pH range is a useful starting reference for ${plant.name}?`, choices: [plant.pH, "7.5–8.5", "3.0–4.0"], answer: plant.pH, explanation: `${plant.name} generally grows well near pH ${plant.pH}; adjust gradually and recheck.` },
));

export const modules: LessonModule[] = [
  {
    id: "fundamentals",
    title: "Hydroponics fundamentals",
    subtitle: "Start with the essentials of growing without soil.",
    lessons: [
      lesson("what-is-hydroponics", "What is hydroponics?", "Plants grow with water, nutrients, and support instead of soil.", ["Hydroponics supplies roots with water and dissolved mineral nutrients while a separate medium or basket holds the plant upright.", "Roots still need oxygen. Some systems expose roots to air; others circulate or aerate the solution.", "The grower controls key inputs, but light, temperature, hygiene, and observation still matter."], ["Hydroponics replaces soil, not plant needs.", "Start with one small system and a leafy crop."], { question: "What replaces soil as the main nutrient source?", choices: ["A balanced nutrient solution", "Plain water forever", "Extra shade"], answer: "A balanced nutrient solution", explanation: "Plants need mineral nutrients dissolved in water, along with oxygen, light, and support." }),
      lesson("root-zone", "How a soil-free root zone works", "Roots need a dependable balance of moisture and oxygen.", ["A net pot, inert medium, or channel supports the plant while roots explore the moist root zone.", "Too much stagnant water can starve roots of oxygen. Too little moisture can dry fine roots quickly.", "Keep reservoirs opaque, clean, and sized for the crop; larger fruiting plants need more root space than baby greens."], ["Healthy roots are firm and pale, not slimy or foul-smelling.", "Keep light out of nutrient reservoirs to limit algae."], { question: "Why do hydroponic roots need oxygen?", choices: ["To support root respiration", "To turn water into soil", "To replace all nutrients"], answer: "To support root respiration", explanation: "Roots respire too; dissolved oxygen and air gaps help them function." }),
      lesson("benefits-limits", "Benefits and limitations", "Control and efficient water use come with daily checks.", ["Hydroponics can use water efficiently, fit small spaces, and make root-zone conditions visible.", "It does not remove the need for light, climate control, sanitation, or crop-specific nutrient management.", "Pumps and power-dependent systems need a plan for interruptions. Passive systems trade convenience for fewer controls."], ["Choose a system that fits your time, space, and local climate.", "Reliability matters more than complexity for a first build."], { question: "What should a beginner prioritize?", choices: ["A dependable system they can maintain", "The largest possible pump", "Changing nutrients every hour"], answer: "A dependable system they can maintain", explanation: "A simple system that is observed regularly is easier to learn from." }),
      lesson("plant-needs", "Water, air, nutrients, and light", "A balanced growing environment matters more than a single perfect number.", ["Use clean water, a complete hydroponic nutrient, and suitable light for the crop.", "Keep the root zone oxygenated and the solution temperature in a crop-appropriate range.", "Observe new growth, roots, water use, and weather together before changing several conditions at once."], ["Change one variable at a time.", "Record readings so you can spot patterns."], { question: "When troubleshooting, what is the best first habit?", choices: ["Observe and change one factor at a time", "Double every nutrient dose", "Ignore root health"], answer: "Observe and change one factor at a time", explanation: "A measured change makes it easier to identify the cause." }),
    ],
  },
  { id: "systems", title: "Hydroponic system types", subtitle: "Compare six practical approaches before you build.", lessons: systemLessons },
  {
    id: "nutrients",
    title: "Nutrients and pH",
    subtitle: "Read the solution and make small, informed adjustments.",
    lessons: [
      lesson("plant-nutrients", "Essential plant nutrients", "Plants need both major elements and trace minerals.", ["Nitrogen supports leafy growth; phosphorus supports energy transfer and root development; potassium helps water regulation and fruit quality.", "Calcium, magnesium, and sulfur are secondary nutrients. Iron, manganese, boron, zinc, copper, molybdenum, and chlorine are needed in smaller amounts.", "Use a complete hydroponic fertilizer. Do not infer a deficiency from one leaf alone; check pH, roots, temperature, and new growth."], ["A complete formula includes macro- and micronutrients.", "Follow the product label and crop stage."], { question: "Which elements are primary macronutrients?", choices: ["Nitrogen, phosphorus, potassium", "Iron, boron, copper", "Oxygen, carbon, hydrogen only"], answer: "Nitrogen, phosphorus, potassium", explanation: "N, P, and K are the primary macronutrients, but plants need more than those three." }),
      lesson("ph-basics", "Understanding pH", "pH affects how available nutrients are to roots.", ["Most hydroponic vegetables perform in mildly acidic solution, commonly around pH 5.5–6.5, with crop-specific differences.", "Calibrate a pH meter with fresh buffer solutions or use suitable test drops. Measure after mixing nutrients and let the reading settle.", "Adjust in small increments with a product designed for hydroponics. Add acid or base carefully, mix, wait, and measure again."], ["Use the crop guide as a starting range.", "Never mix concentrated pH adjusters directly with concentrated nutrients."], { question: "Why monitor pH?", choices: ["It influences nutrient availability", "It measures the water volume", "It replaces EC"], answer: "It influences nutrient availability", explanation: "A suitable pH helps roots access dissolved nutrients." }),
      lesson("ec-ppm", "EC and PPM", "EC estimates dissolved ionic strength; PPM is a conversion based on a chosen scale.", ["Electrical conductivity (EC) is commonly read in mS/cm and is a practical estimate of total dissolved ions, not a nutrient-by-nutrient analysis.", "A meter may display PPM using a 500 scale (EC × 500) or a 700 scale (EC × 700). The same solution therefore shows different PPM values.", "Record the meter scale and compare like with like. Temperature compensation and clean probes improve consistency."], ["EC 1.0 mS/cm is about 500 PPM on the 500 scale or 700 PPM on the 700 scale.", "Crop, growth stage, and water source all matter."], { question: "What does an EC meter primarily indicate?", choices: ["Dissolved ionic strength", "Exact nitrogen concentration", "Water temperature only"], answer: "Dissolved ionic strength", explanation: "EC is a total conductivity reading, not a detailed nutrient analysis." }),
      lesson("two-part-nutrients", "Mixing two-part nutrients", "Keep concentrated Part A and Part B separate until each is diluted.", ["Many two-part formulas separate minerals that could react when concentrated. Add Part A to the reservoir, mix thoroughly, then add Part B and mix again.", "Measure the dose per liter from the manufacturer's instructions for your crop, stage, and water source.", "Do not treat a calculator as a recipe. Start conservatively when the label recommends it and monitor plant response and EC."], ["Never combine concentrated A and B directly.", "The fertilizer maker's label overrides general reference numbers."], { question: "How should two-part nutrients be added?", choices: ["Dilute each part into the water separately", "Mix the concentrates together first", "Pour both into a dry pot"], answer: "Dilute each part into the water separately", explanation: "Dilution between additions helps prevent unwanted precipitation." }),
    ],
  },
  { id: "plants", title: "Plant selection and grow guides", subtitle: "Nine crop guides with tropical growing notes and reference ranges.", lessons: plantLessons },
  {
    id: "maintenance",
    title: "Maintenance and troubleshooting",
    subtitle: "Build a steady routine and respond to symptoms methodically.",
    lessons: [
      lesson("daily-checks", "A five-minute daily check", "Notice changes early, especially in warm weather.", ["Look at leaves and roots, confirm the pump or airflow is running, and check the reservoir level.", "In tropical heat, warm water can lose oxygen faster. Shade the reservoir and monitor solution temperature where practical.", "Record pH and EC on a regular schedule rather than making unneeded adjustments several times a day."], ["Check water level, flow, roots, and plant posture.", "A short log makes trends easier to spot."], { question: "Which check is useful every day?", choices: ["Confirm flow or aeration is working", "Replace all nutrients automatically", "Wash roots with soap"], answer: "Confirm flow or aeration is working", explanation: "A quick system check can catch a pump or airflow issue early." }),
      lesson("weekly-cleaning", "Weekly care and cleaning", "Remove dead leaves and keep light away from solution.", ["Top up with clean water when needed and recheck EC; topping up with concentrated fertilizer can raise strength too quickly.", "Clean spills, clear blocked emitters, and remove decaying leaves. Keep lids and channels opaque to discourage algae.", "Between crops, empty and clean equipment with a food-safe method, rinse thoroughly, and inspect tubing and seals."], ["Keep the reservoir covered and tools clean.", "Do not mix bleach or cleaners with nutrients."], { question: "What helps prevent algae in the reservoir?", choices: ["An opaque, covered reservoir", "More direct sunlight", "A loose lid with light leaks"], answer: "An opaque, covered reservoir", explanation: "Algae need light; blocking light helps prevent growth." }),
      lesson("root-and-water", "Root health and warm water", "Warm, low-oxygen water can stress roots.", ["Healthy roots are generally firm and pale. Brown, slimy roots or a sour smell deserve attention, but staining from nutrients alone is not always disease.", "Improve oxygenation, clean affected surfaces, remove dead root material gently, and review water temperature and sanitation.", "Avoid abrupt temperature or nutrient changes. In hot climates, shade reservoirs, insulate exposed containers, and keep pumps maintained."], ["Investigate root conditions before increasing fertilizer.", "Keep solution cool and aerated when possible."], { question: "What is a sensible first response to stressed roots?", choices: ["Check oxygen, temperature, and cleanliness", "Add a large nutrient dose immediately", "Cover roots in direct sun"], answer: "Check oxygen, temperature, and cleanliness", explanation: "Root-zone conditions often explain stress better than a larger nutrient dose." }),
      lesson("troubleshooting", "Common problems and pests", "Use a repeatable check before treating plants.", ["Yellowing can follow normal aging, pH imbalance, root stress, or nutrient issues. Look at which leaves are affected and whether new growth is healthy.", "Inspect leaf undersides for aphids, mites, and caterpillars. Remove heavily affected leaves and use locally approved, crop-safe controls as directed.", "For tip burn, bitterness, or poor flowering, consider heat, humidity, water consistency, airflow, and crop variety before changing the recipe."], ["Symptoms are clues, not a diagnosis.", "Correct the cause and avoid unapproved chemical use on edible crops."], { question: "What should you do before treating a suspected deficiency?", choices: ["Check roots, pH, water, and growth pattern", "Use every pesticide available", "Ignore the plant for a week"], answer: "Check roots, pH, water, and growth pattern", explanation: "Several conditions can look alike; verify the growing environment first." }),
    ],
  },
];

export const diyProjects: DiyProject[] = [
  { id: "bottle", title: "Bottle hydroponics", difficulty: "Beginner", duration: "45–60 min", costIdr: 35000, description: "Turn a clean food-safe bottle into a passive starter for one leafy plant or herb.", materials: ["Opaque 1–2 L food-safe bottle", "Net cup or fitted bottle neck", "Starter cube or coco plug", "Hydroponic nutrients", "Water"], tools: ["Scissors or craft knife", "Marker", "Gloves"], steps: ["Wash the bottle and remove any label or residue.", "Mark and carefully cut an opening for a snug net cup; smooth sharp edges.", "Make the reservoir opaque with a sleeve or opaque container.", "Fill with diluted nutrient solution according to its label and set the starter above it.", "Place in bright indirect light and check the water level and roots daily."], safety: ["An adult should handle sharp cutting tools.", "Do not use containers that held chemicals or non-food liquids."], troubleshooting: ["Green water: block light from the reservoir.", "Drooping plant: check water contact, heat, and root oxygen.", "Weak stems: add suitable light and airflow."] },
  { id: "kratky-container", title: "Kratky container garden", difficulty: "Beginner", duration: "1–2 hr", costIdr: 95000, description: "Build a small passive tote garden for lettuce, basil, or kangkung without electricity.", materials: ["Opaque lidded food-safe tote", "Net pots", "Starter cubes", "Hydroponic nutrients", "Seeds"], tools: ["Drill with hole saw", "Marker", "Safety glasses"], steps: ["Choose a stable opaque tote and mark net-pot holes with enough room between plants.", "Drill holes in the lid while it is safely supported; smooth rough edges.", "Start seeds in moist cubes and wait until seedlings have roots and true leaves.", "Fill the tote with mixed nutrient solution so the bottom of each cube can reach it initially.", "Set the lid in place and allow an air gap to form as plants use the solution; monitor without topping up above the original level."], safety: ["Wear eye protection while drilling and secure the lid.", "Use food-safe containers and keep electrical tools away from water."], troubleshooting: ["If roots smell sour, improve cleanliness and reduce solution heat.", "Keep lid holes shaded to reduce algae.", "Avoid refilling above the original level once a large air gap has formed."] },
  { id: "dwc-bucket", title: "Deep Water Culture bucket", difficulty: "Intermediate", duration: "2–3 hr", costIdr: 260000, description: "A compact aerated bucket system for leafy greens and herbs.", materials: ["Opaque food-safe bucket with lid", "Net pot", "Air pump and air stone", "Airline tubing", "Starter medium", "Hydroponic nutrients"], tools: ["Drill with hole saw", "Marker", "Safety glasses"], steps: ["Drill a net-pot opening in the lid and a small airline entry in the bucket wall.", "Rinse the bucket and place the air stone at the bottom.", "Mix nutrient solution following the fertilizer label and fill below the net pot.", "Place a rooted seedling in the net pot, leaving the crown above the solution.", "Run the air pump continuously and check the bubbles, water level, and roots each day."], safety: ["Use a low-voltage pump designed for the location and keep plugs dry.", "Do not lift a full bucket by its lid."], troubleshooting: ["No bubbles: inspect the airline and pump before roots dry.", "Warm water: shade and insulate the reservoir.", "Algae: block light from the bucket and lid openings."] },
  { id: "vertical-pvc", title: "Vertical PVC hydroponics", difficulty: "Advanced", duration: "1–2 days", costIdr: 1250000, description: "A recirculating tower for a balcony or sheltered growing area; design for stable support and easy cleaning.", materials: ["Food-safe growing channels or tower", "Reservoir with lid", "Pump and tubing", "Net cups", "Anchored frame", "Suitable nutrients"], tools: ["Drill and hole saw", "Level", "Measuring tape", "Safety glasses", "Pipe cutter"], steps: ["Measure the site, sunlight, access to power, and safe drain path before cutting.", "Build and anchor a stable frame that supports the filled tower and wind load.", "Cut evenly spaced planting openings and remove sharp edges.", "Fit the reservoir and pump so solution reaches the top and returns freely without leaks.", "Test with clean water for several hours, check every joint, then add plants and monitor flow at each level."], safety: ["Anchor the structure and keep it away from walkways and children.", "Use outdoor-rated electrical protection near water and follow local rules.", "Do not use non-food-safe or chemically treated pipe for edible crops."], troubleshooting: ["Uneven growth: check light and flow at every height.", "Dry top sites: inspect pump head and distribution holes.", "Leaks: stop the pump, drain safely, and repair before adding plants."] },
];

export const growthStages = ["Germination", "Seedling", "Vegetative growth", "Maturation", "Harvest"] as const;