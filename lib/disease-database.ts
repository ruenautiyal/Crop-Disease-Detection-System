// New Plant Diseases Dataset - Complete Disease Database
// Dataset: https://www.kaggle.com/datasets/vipoooool/new-plant-diseases-dataset
// 14 Crops, 38 Classes (26 diseases + 12 healthy)
// CNN Model: 5 Conv Blocks, Input 128x128 RGB, trained with Adam optimizer (lr=0.0001)

export interface DiseaseInfo {
  id: string
  className: string
  crop: string
  disease: string
  isHealthy: boolean
  description: string
  symptoms: string[]
  causes: string[]
  treatments: string[]
  preventionTips: string[]
  severity: "low" | "medium" | "high" | "critical"
  spreadRate: "slow" | "moderate" | "fast"
}

export interface CropInfo {
  name: string
  scientificName: string
  diseases: string[]
  icon: string
  description: string
  totalClasses: number
}

export const crops: CropInfo[] = [
  {
    name: "Apple",
    scientificName: "Malus domestica",
    diseases: ["Apple Scab", "Black Rot", "Cedar Apple Rust"],
    icon: "apple",
    description:
      "Apple trees are susceptible to several fungal diseases that affect leaves and fruit quality.",
    totalClasses: 4,
  },
  {
    name: "Blueberry",
    scientificName: "Vaccinium corymbosum",
    diseases: [],
    icon: "circle",
    description:
      "Blueberry plants in the dataset are represented only by healthy samples.",
    totalClasses: 1,
  },
  {
    name: "Cherry",
    scientificName: "Prunus avium",
    diseases: ["Powdery Mildew"],
    icon: "cherry",
    description:
      "Cherry trees including sour varieties can be affected by powdery mildew.",
    totalClasses: 2,
  },
  {
    name: "Corn (Maize)",
    scientificName: "Zea mays",
    diseases: ["Cercospora Leaf Spot (Gray Leaf Spot)", "Common Rust", "Northern Leaf Blight"],
    icon: "wheat",
    description:
      "Corn is affected by multiple leaf diseases that can significantly reduce yield.",
    totalClasses: 4,
  },
  {
    name: "Grape",
    scientificName: "Vitis vinifera",
    diseases: ["Black Rot", "Esca (Black Measles)", "Leaf Blight (Isariopsis Leaf Spot)"],
    icon: "grape",
    description:
      "Grapevines face several fungal threats that affect both leaves and fruit.",
    totalClasses: 4,
  },
  {
    name: "Orange",
    scientificName: "Citrus sinensis",
    diseases: ["Huanglongbing (Citrus Greening)"],
    icon: "citrus",
    description:
      "Citrus greening is one of the most devastating diseases affecting orange trees worldwide.",
    totalClasses: 1,
  },
  {
    name: "Peach",
    scientificName: "Prunus persica",
    diseases: ["Bacterial Spot"],
    icon: "apple",
    description: "Peach trees are commonly affected by bacterial spot disease.",
    totalClasses: 2,
  },
  {
    name: "Bell Pepper",
    scientificName: "Capsicum annuum",
    diseases: ["Bacterial Spot"],
    icon: "leaf",
    description:
      "Bell peppers are susceptible to bacterial spot which causes leaf and fruit lesions.",
    totalClasses: 2,
  },
  {
    name: "Potato",
    scientificName: "Solanum tuberosum",
    diseases: ["Early Blight", "Late Blight"],
    icon: "potato",
    description:
      "Potato crops face early and late blight, both significant threats to production.",
    totalClasses: 3,
  },
  {
    name: "Raspberry",
    scientificName: "Rubus idaeus",
    diseases: [],
    icon: "circle",
    description:
      "Raspberry plants in the dataset are represented only by healthy samples.",
    totalClasses: 1,
  },
  {
    name: "Soybean",
    scientificName: "Glycine max",
    diseases: [],
    icon: "leaf",
    description:
      "Soybean plants in the dataset are represented only by healthy samples.",
    totalClasses: 1,
  },
  {
    name: "Squash",
    scientificName: "Cucurbita",
    diseases: ["Powdery Mildew"],
    icon: "leaf",
    description: "Squash plants are commonly affected by powdery mildew.",
    totalClasses: 1,
  },
  {
    name: "Strawberry",
    scientificName: "Fragaria ananassa",
    diseases: ["Leaf Scorch"],
    icon: "cherry",
    description:
      "Strawberry plants can suffer from leaf scorch which affects foliage health.",
    totalClasses: 2,
  },
  {
    name: "Tomato",
    scientificName: "Solanum lycopersicum",
    diseases: [
      "Bacterial Spot",
      "Early Blight",
      "Late Blight",
      "Leaf Mold",
      "Septoria Leaf Spot",
      "Spider Mites (Two-spotted)",
      "Target Spot",
      "Yellow Leaf Curl Virus",
      "Mosaic Virus",
    ],
    icon: "tomato",
    description:
      "Tomato is the most disease-prone crop in the dataset with 9 distinct disease classes.",
    totalClasses: 10,
  },
]

export const diseases: DiseaseInfo[] = [
  // ===== APPLE =====
  {
    id: "apple_scab",
    className: "Apple___Apple_scab",
    crop: "Apple",
    disease: "Apple Scab",
    isHealthy: false,
    description:
      "Apple scab is caused by the fungus Venturia inaequalis. It leads to dark, scabby lesions on leaves and fruit, significantly reducing marketability.",
    symptoms: [
      "Olive-green to dark brown velvety spots on leaves",
      "Scabby, cracked lesions on fruit surface",
      "Premature leaf drop",
      "Distorted or stunted fruit growth",
    ],
    causes: [
      "Fungus Venturia inaequalis",
      "Wet spring weather",
      "Overwintering in fallen leaves",
    ],
    treatments: [
      "Apply fungicides (captan, myclobutanil) during spring",
      "Remove and destroy fallen infected leaves",
      "Prune trees to improve air circulation",
      "Apply lime sulfur during dormant season",
    ],
    preventionTips: [
      "Plant scab-resistant apple varieties",
      "Maintain proper tree spacing for airflow",
      "Remove leaf litter in autumn",
      "Apply preventive fungicide sprays in early spring",
    ],
    severity: "medium",
    spreadRate: "moderate",
  },
  {
    id: "apple_black_rot",
    className: "Apple___Black_rot",
    crop: "Apple",
    disease: "Black Rot",
    isHealthy: false,
    description:
      "Black rot is caused by the fungus Botryosphaeria obtusa. It causes fruit rot, leaf spots, and cankers on branches.",
    symptoms: [
      "Brown, expanding lesions on fruit with concentric rings",
      "Purple-bordered leaf spots (frogeye leaf spot)",
      "Cankers on branches and trunk",
      "Mummified fruit remaining on the tree",
    ],
    causes: [
      "Fungus Botryosphaeria obtusa",
      "Warm and humid conditions",
      "Infected pruning wounds",
    ],
    treatments: [
      "Remove mummified fruits and cankered branches",
      "Apply copper-based fungicides",
      "Prune infected wood at least 15cm below visible canker",
      "Apply captan or thiophanate-methyl sprays",
    ],
    preventionTips: [
      "Remove all dead wood from the orchard",
      "Maintain good sanitation practices",
      "Avoid wounding the tree bark",
      "Apply dormant sprays in late winter",
    ],
    severity: "high",
    spreadRate: "moderate",
  },
  {
    id: "apple_cedar_rust",
    className: "Apple___Cedar_apple_rust",
    crop: "Apple",
    disease: "Cedar Apple Rust",
    isHealthy: false,
    description:
      "Cedar apple rust requires both apple and cedar/juniper hosts to complete its lifecycle. The fungus Gymnosporangium juniperi-virginianae causes bright orange spots on apple leaves.",
    symptoms: [
      "Bright orange-yellow spots on upper leaf surface",
      "Cup-shaped structures on lower leaf surface",
      "Deformed or spotted fruit",
      "Premature leaf drop in severe cases",
    ],
    causes: [
      "Fungus Gymnosporangium juniperi-virginianae",
      "Proximity to cedar/juniper trees",
      "Spring rainfall and warmth",
    ],
    treatments: [
      "Apply fungicides (myclobutanil) at pink bud stage",
      "Continue sprays through petal fall",
      "Remove nearby cedar/juniper galls in winter",
      "Apply protective sprays during spring rain events",
    ],
    preventionTips: [
      "Plant rust-resistant apple varieties",
      "Remove cedar/juniper trees within 2 miles if possible",
      "Monitor and remove galls from junipers in March",
      "Apply preventive fungicide program",
    ],
    severity: "medium",
    spreadRate: "slow",
  },
  {
    id: "apple_healthy",
    className: "Apple___healthy",
    crop: "Apple",
    disease: "Healthy",
    isHealthy: true,
    description: "Healthy apple leaf showing no signs of disease. Uniform green color with no spots or lesions.",
    symptoms: [],
    causes: [],
    treatments: [],
    preventionTips: ["Continue regular monitoring", "Maintain proper nutrition", "Practice good sanitation"],
    severity: "low",
    spreadRate: "slow",
  },
  // ===== BLUEBERRY =====
  {
    id: "blueberry_healthy",
    className: "Blueberry___healthy",
    crop: "Blueberry",
    disease: "Healthy",
    isHealthy: true,
    description: "Healthy blueberry leaf with no visible disease symptoms.",
    symptoms: [],
    causes: [],
    treatments: [],
    preventionTips: ["Maintain acidic soil pH", "Provide adequate mulching", "Regular pruning"],
    severity: "low",
    spreadRate: "slow",
  },
  // ===== CHERRY =====
  {
    id: "cherry_powdery_mildew",
    className: "Cherry_(including_sour)___Powdery_mildew",
    crop: "Cherry",
    disease: "Powdery Mildew",
    isHealthy: false,
    description:
      "Cherry powdery mildew is caused by Podosphaera clandestina. It creates a white powdery coating on leaves and can affect fruit quality.",
    symptoms: [
      "White powdery coating on leaf surfaces",
      "Leaf curling and distortion",
      "Stunted new growth",
      "Reduced fruit quality and size",
    ],
    causes: [
      "Fungus Podosphaera clandestina",
      "High humidity with warm days and cool nights",
      "Overcrowded plantings",
    ],
    treatments: [
      "Apply sulfur-based fungicides",
      "Use potassium bicarbonate sprays",
      "Apply neem oil treatments",
      "Remove severely infected shoots",
    ],
    preventionTips: [
      "Improve air circulation through pruning",
      "Avoid overhead irrigation",
      "Plant resistant varieties when possible",
      "Apply preventive fungicides in early season",
    ],
    severity: "medium",
    spreadRate: "moderate",
  },
  {
    id: "cherry_healthy",
    className: "Cherry_(including_sour)___healthy",
    crop: "Cherry",
    disease: "Healthy",
    isHealthy: true,
    description: "Healthy cherry leaf with no disease symptoms present.",
    symptoms: [],
    causes: [],
    treatments: [],
    preventionTips: ["Regular pruning", "Good air circulation", "Monitor for early symptoms"],
    severity: "low",
    spreadRate: "slow",
  },
  // ===== CORN =====
  {
    id: "corn_cercospora",
    className: "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot",
    crop: "Corn (Maize)",
    disease: "Cercospora Leaf Spot (Gray Leaf Spot)",
    isHealthy: false,
    description:
      "Gray leaf spot caused by Cercospora zeae-maydis is one of the most significant foliar diseases of corn, causing rectangular gray lesions.",
    symptoms: [
      "Rectangular gray to tan lesions between leaf veins",
      "Lesions may coalesce causing large areas of dead tissue",
      "Lower leaves affected first",
      "Premature leaf death reducing grain fill",
    ],
    causes: [
      "Fungus Cercospora zeae-maydis",
      "Continuous corn cropping",
      "Warm humid conditions",
      "Minimum tillage (residue on surface)",
    ],
    treatments: [
      "Apply foliar fungicides (strobilurins, triazoles)",
      "Time applications at VT/R1 growth stage",
      "Remove infected crop residue",
      "Rotate to non-host crops",
    ],
    preventionTips: [
      "Use resistant corn hybrids",
      "Practice crop rotation (2+ year)",
      "Manage crop residue through tillage",
      "Scout fields regularly starting at V8",
    ],
    severity: "high",
    spreadRate: "fast",
  },
  {
    id: "corn_common_rust",
    className: "Corn_(maize)___Common_rust_",
    crop: "Corn (Maize)",
    disease: "Common Rust",
    isHealthy: false,
    description:
      "Common rust of corn caused by Puccinia sorghi produces circular to elongate cinnamon-brown pustules on leaf surfaces.",
    symptoms: [
      "Circular to elongate cinnamon-brown pustules on both leaf surfaces",
      "Pustules may rupture releasing powdery spores",
      "Chlorotic halos around pustules",
      "Severe infections cause premature leaf senescence",
    ],
    causes: [
      "Fungus Puccinia sorghi",
      "Cool to moderate temperatures (60-77F)",
      "High humidity and dew",
      "Spores carried by wind from southern regions",
    ],
    treatments: [
      "Apply fungicides if infection is early and severe",
      "Use triazole or strobilurin fungicides",
      "Remove volunteer corn plants",
      "Foliar applications at early infection stages",
    ],
    preventionTips: [
      "Plant rust-resistant hybrids",
      "Monitor fields regularly for early detection",
      "Plant at recommended dates",
      "Maintain balanced fertility",
    ],
    severity: "medium",
    spreadRate: "fast",
  },
  {
    id: "corn_northern_blight",
    className: "Corn_(maize)___Northern_Leaf_Blight",
    crop: "Corn (Maize)",
    disease: "Northern Leaf Blight",
    isHealthy: false,
    description:
      "Northern corn leaf blight caused by Exserohilum turcicum creates large cigar-shaped gray-green lesions on corn leaves.",
    symptoms: [
      "Large cigar-shaped gray-green to tan lesions (1-6 inches)",
      "Lesions start on lower leaves and move upward",
      "Heavy spore production gives lesions a dusty gray appearance",
      "Severe cases lead to whole-plant die-back",
    ],
    causes: [
      "Fungus Exserohilum turcicum",
      "Moderate temperatures and heavy dew",
      "Infected corn residue from previous season",
      "Continuous corn cropping",
    ],
    treatments: [
      "Apply foliar fungicides at first sign of disease",
      "Use strobilurin or triazole fungicides",
      "Time applications before tasseling for best results",
      "Bury crop residue through tillage",
    ],
    preventionTips: [
      "Plant resistant hybrids with Ht genes",
      "Rotate crops to reduce inoculum",
      "Manage residue to reduce overwintering fungus",
      "Scout beginning at V8 growth stage",
    ],
    severity: "high",
    spreadRate: "moderate",
  },
  {
    id: "corn_healthy",
    className: "Corn_(maize)___healthy",
    crop: "Corn (Maize)",
    disease: "Healthy",
    isHealthy: true,
    description: "Healthy corn leaf with no disease symptoms.",
    symptoms: [],
    causes: [],
    treatments: [],
    preventionTips: ["Regular scouting", "Balanced nutrition", "Crop rotation"],
    severity: "low",
    spreadRate: "slow",
  },
  // ===== GRAPE =====
  {
    id: "grape_black_rot",
    className: "Grape___Black_rot",
    crop: "Grape",
    disease: "Black Rot",
    isHealthy: false,
    description:
      "Grape black rot caused by Guignardia bidwellii is one of the most common diseases of grapes east of the Rocky Mountains.",
    symptoms: [
      "Small brown circular spots on leaves with dark borders",
      "Black pycnidia (fruiting bodies) in lesions",
      "Fruit turns brown then black and shrivels (mummies)",
      "Lesions on shoots and tendrils",
    ],
    causes: [
      "Fungus Guignardia bidwellii",
      "Warm rainy weather during spring",
      "Mummified berries from previous season",
    ],
    treatments: [
      "Apply mancozeb or myclobutanil early in season",
      "Continue spray program through veraison",
      "Remove and destroy mummified fruit",
      "Prune out infected canes",
    ],
    preventionTips: [
      "Remove all mummies during dormant pruning",
      "Maintain open canopy for air circulation",
      "Apply preventive fungicide program",
      "Use disease-free planting stock",
    ],
    severity: "high",
    spreadRate: "moderate",
  },
  {
    id: "grape_esca",
    className: "Grape___Esca_(Black_Measles)",
    crop: "Grape",
    disease: "Esca (Black Measles)",
    isHealthy: false,
    description:
      "Esca (Black Measles) is a complex disease involving multiple fungal pathogens that attack grapevine wood.",
    symptoms: [
      "Tiger stripe pattern on leaves (interveinal chlorosis and necrosis)",
      "Dark spots on berries resembling measles",
      "Sudden vine collapse (apoplexy) in hot weather",
      "Internal wood staining and decay",
    ],
    causes: [
      "Complex of fungi (Phaeomoniella, Phaeoacremonium, Fomitiporia)",
      "Infection through pruning wounds",
      "Stress from drought or heat",
    ],
    treatments: [
      "No fully effective chemical treatment exists",
      "Trunk renewal by training a new shoot",
      "Application of Trichoderma biological agents to pruning wounds",
      "Remedial surgery to remove infected wood",
    ],
    preventionTips: [
      "Protect pruning wounds with sealants",
      "Prune during dry weather",
      "Avoid large pruning wounds when possible",
      "Use Trichoderma-based biocontrol agents preventively",
    ],
    severity: "critical",
    spreadRate: "slow",
  },
  {
    id: "grape_leaf_blight",
    className: "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",
    crop: "Grape",
    disease: "Leaf Blight (Isariopsis Leaf Spot)",
    isHealthy: false,
    description:
      "Isariopsis leaf spot is caused by Pseudocercospora vitis and creates angular brown spots on grape leaves.",
    symptoms: [
      "Small dark brown angular spots on leaves",
      "Spots may coalesce into larger necrotic areas",
      "Premature defoliation",
      "Reduced vine vigor",
    ],
    causes: [
      "Fungus Pseudocercospora vitis",
      "Warm humid conditions",
      "Poor air circulation in canopy",
    ],
    treatments: [
      "Apply copper-based fungicides",
      "Use mancozeb preventive sprays",
      "Remove severely infected leaves",
      "Improve canopy management",
    ],
    preventionTips: [
      "Maintain open canopy structure",
      "Remove leaf litter from vineyard floor",
      "Apply preventive fungicide sprays",
      "Ensure proper vine spacing",
    ],
    severity: "medium",
    spreadRate: "moderate",
  },
  {
    id: "grape_healthy",
    className: "Grape___healthy",
    crop: "Grape",
    disease: "Healthy",
    isHealthy: true,
    description: "Healthy grape leaf with no disease symptoms.",
    symptoms: [],
    causes: [],
    treatments: [],
    preventionTips: ["Canopy management", "Balanced nutrition", "Regular monitoring"],
    severity: "low",
    spreadRate: "slow",
  },
  // ===== ORANGE =====
  {
    id: "orange_huanglongbing",
    className: "Orange___Haunglongbing_(Citrus_greening)",
    crop: "Orange",
    disease: "Huanglongbing (Citrus Greening)",
    isHealthy: false,
    description:
      "Citrus greening (HLB) is the most devastating disease of citrus worldwide, caused by the bacterium Candidatus Liberibacter and spread by the Asian citrus psyllid.",
    symptoms: [
      "Asymmetric blotchy mottling of leaves (yellow and green patches)",
      "Small, lopsided, green fruit that fails to ripen properly",
      "Bitter and sour tasting fruit juice",
      "Twig dieback and overall tree decline",
      "Yellow shoots (yellow dragon symptom)",
    ],
    causes: [
      "Bacterium Candidatus Liberibacter asiaticus",
      "Spread by Asian citrus psyllid (Diaphorina citri)",
      "Grafting with infected budwood",
    ],
    treatments: [
      "No cure exists - focus on management",
      "Control psyllid vectors with systemic insecticides",
      "Enhanced nutritional programs to prolong tree productivity",
      "Remove severely infected trees to reduce inoculum",
      "Thermotherapy (heat treatment) research ongoing",
    ],
    preventionTips: [
      "Use certified disease-free nursery stock",
      "Control psyllid populations aggressively",
      "Scout regularly for psyllids and HLB symptoms",
      "Coordinate area-wide psyllid management",
    ],
    severity: "critical",
    spreadRate: "moderate",
  },
  // ===== PEACH =====
  {
    id: "peach_bacterial_spot",
    className: "Peach___Bacterial_spot",
    crop: "Peach",
    disease: "Bacterial Spot",
    isHealthy: false,
    description:
      "Bacterial spot of peach caused by Xanthomonas arboricola pv. pruni causes leaf spots, defoliation, and fruit blemishes.",
    symptoms: [
      "Angular water-soaked leaf spots that turn purple-brown",
      "Shot-hole appearance as spots fall out",
      "Fruit lesions: small dark spots that crack",
      "Twig cankers causing dieback",
    ],
    causes: [
      "Bacterium Xanthomonas arboricola pv. pruni",
      "Warm wet weather during spring",
      "Splash dispersal during rain",
    ],
    treatments: [
      "Apply copper sprays during dormant season",
      "Use oxytetracycline during bloom if severe",
      "Remove severely infected branches",
      "Apply bactericides during favorable disease conditions",
    ],
    preventionTips: [
      "Plant resistant peach varieties",
      "Avoid overhead irrigation",
      "Select well-drained planting sites with good air flow",
      "Apply dormant copper sprays preventively",
    ],
    severity: "medium",
    spreadRate: "moderate",
  },
  {
    id: "peach_healthy",
    className: "Peach___healthy",
    crop: "Peach",
    disease: "Healthy",
    isHealthy: true,
    description: "Healthy peach leaf with no disease symptoms.",
    symptoms: [],
    causes: [],
    treatments: [],
    preventionTips: ["Regular monitoring", "Proper pruning", "Balanced nutrition"],
    severity: "low",
    spreadRate: "slow",
  },
  // ===== BELL PEPPER =====
  {
    id: "pepper_bacterial_spot",
    className: "Pepper,_bell___Bacterial_spot",
    crop: "Bell Pepper",
    disease: "Bacterial Spot",
    isHealthy: false,
    description:
      "Bacterial spot of pepper caused by Xanthomonas species creates water-soaked spots on leaves and fruit, reducing quality and yield.",
    symptoms: [
      "Small water-soaked spots on leaves",
      "Spots enlarge and turn brown with yellow halo",
      "Raised scab-like lesions on fruit",
      "Defoliation in severe cases",
    ],
    causes: [
      "Xanthomonas euvesicatoria and related species",
      "Contaminated seed or transplants",
      "Warm wet weather and splashing rain",
    ],
    treatments: [
      "Apply copper-based bactericides",
      "Use streptomycin sprays where legally permitted",
      "Remove infected plants promptly",
      "Avoid working in wet fields",
    ],
    preventionTips: [
      "Use certified disease-free seed and transplants",
      "Plant resistant varieties",
      "Practice crop rotation (2-3 years)",
      "Avoid overhead irrigation",
    ],
    severity: "medium",
    spreadRate: "fast",
  },
  {
    id: "pepper_healthy",
    className: "Pepper,_bell___healthy",
    crop: "Bell Pepper",
    disease: "Healthy",
    isHealthy: true,
    description: "Healthy bell pepper leaf with no disease symptoms.",
    symptoms: [],
    causes: [],
    treatments: [],
    preventionTips: ["Balanced nutrition", "Proper spacing", "Monitor regularly"],
    severity: "low",
    spreadRate: "slow",
  },
  // ===== POTATO =====
  {
    id: "potato_early_blight",
    className: "Potato___Early_blight",
    crop: "Potato",
    disease: "Early Blight",
    isHealthy: false,
    description:
      "Potato early blight caused by Alternaria solani creates concentric ringed target-like spots on older leaves first.",
    symptoms: [
      "Dark brown spots with concentric rings (target-like pattern)",
      "Starts on older lower leaves",
      "Yellowing around lesions",
      "Premature defoliation reducing tuber size",
    ],
    causes: [
      "Fungus Alternaria solani",
      "Warm temperatures (75-85F) with wet conditions",
      "Overwintering in plant debris and soil",
    ],
    treatments: [
      "Apply chlorothalonil or mancozeb fungicides",
      "Rotate fungicide classes to prevent resistance",
      "Remove infected plant material",
      "Apply at first symptom and continue on 7-10 day schedule",
    ],
    preventionTips: [
      "Use resistant potato varieties",
      "Rotate crops (3+ year rotation)",
      "Maintain adequate plant nutrition (especially nitrogen)",
      "Avoid overhead irrigation",
    ],
    severity: "high",
    spreadRate: "moderate",
  },
  {
    id: "potato_late_blight",
    className: "Potato___Late_blight",
    crop: "Potato",
    disease: "Late Blight",
    isHealthy: false,
    description:
      "Late blight, caused by Phytophthora infestans, is historically the most devastating potato disease (caused the Irish Potato Famine).",
    symptoms: [
      "Water-soaked dark green to brown lesions on leaves",
      "White fuzzy mold on leaf undersides in humid conditions",
      "Rapid browning and collapse of foliage",
      "Firm reddish-brown tuber rot",
    ],
    causes: [
      "Oomycete Phytophthora infestans",
      "Cool wet conditions (60-70F with high humidity)",
      "Spores travel long distances by wind",
    ],
    treatments: [
      "Apply metalaxyl or mancozeb fungicides immediately",
      "Destroy infected plants to reduce spread",
      "Harvest tubers in dry conditions to avoid contamination",
      "Apply fungicides preventively on 5-7 day schedule during risk periods",
    ],
    preventionTips: [
      "Plant certified disease-free seed potatoes",
      "Destroy volunteer potatoes and cull piles",
      "Use resistant varieties",
      "Monitor forecasts and apply fungicides preventively",
    ],
    severity: "critical",
    spreadRate: "fast",
  },
  {
    id: "potato_healthy",
    className: "Potato___healthy",
    crop: "Potato",
    disease: "Healthy",
    isHealthy: true,
    description: "Healthy potato leaf with no disease symptoms.",
    symptoms: [],
    causes: [],
    treatments: [],
    preventionTips: ["Proper hilling", "Balanced nutrition", "Regular scouting"],
    severity: "low",
    spreadRate: "slow",
  },
  // ===== RASPBERRY =====
  {
    id: "raspberry_healthy",
    className: "Raspberry___healthy",
    crop: "Raspberry",
    disease: "Healthy",
    isHealthy: true,
    description: "Healthy raspberry leaf with no disease symptoms.",
    symptoms: [],
    causes: [],
    treatments: [],
    preventionTips: ["Good drainage", "Proper pruning", "Remove old canes annually"],
    severity: "low",
    spreadRate: "slow",
  },
  // ===== SOYBEAN =====
  {
    id: "soybean_healthy",
    className: "Soybean___healthy",
    crop: "Soybean",
    disease: "Healthy",
    isHealthy: true,
    description: "Healthy soybean leaf with no disease symptoms.",
    symptoms: [],
    causes: [],
    treatments: [],
    preventionTips: ["Crop rotation", "Proper spacing", "Monitor for pests"],
    severity: "low",
    spreadRate: "slow",
  },
  // ===== SQUASH =====
  {
    id: "squash_powdery_mildew",
    className: "Squash___Powdery_mildew",
    crop: "Squash",
    disease: "Powdery Mildew",
    isHealthy: false,
    description:
      "Squash powdery mildew caused by Podosphaera xanthii and Erysiphe cichoracearum creates white powdery growth on leaf surfaces.",
    symptoms: [
      "White powdery patches on upper and lower leaf surfaces",
      "Yellowing and browning of affected leaves",
      "Reduced fruit size and quality",
      "Premature plant senescence",
    ],
    causes: [
      "Fungi Podosphaera xanthii or Erysiphe cichoracearum",
      "Warm dry days with cool nights",
      "Crowded plantings with poor airflow",
    ],
    treatments: [
      "Apply potassium bicarbonate or sulfur sprays",
      "Use neem oil as organic option",
      "Apply trifloxystrobin or myclobutanil",
      "Remove severely infected leaves",
    ],
    preventionTips: [
      "Plant resistant varieties",
      "Maintain proper plant spacing",
      "Apply preventive sprays starting at first sign",
      "Avoid excess nitrogen fertilization",
    ],
    severity: "medium",
    spreadRate: "fast",
  },
  // ===== STRAWBERRY =====
  {
    id: "strawberry_leaf_scorch",
    className: "Strawberry___Leaf_scorch",
    crop: "Strawberry",
    disease: "Leaf Scorch",
    isHealthy: false,
    description:
      "Strawberry leaf scorch caused by Diplocarpon earlianum creates purple spots that coalesce and give a scorched appearance to leaves.",
    symptoms: [
      "Small irregular dark purple spots on upper leaf surface",
      "Spots coalesce giving leaves a scorched/burned appearance",
      "Leaf margins curl upward",
      "Reduced runner and fruit production",
    ],
    causes: [
      "Fungus Diplocarpon earlianum",
      "Warm wet conditions",
      "Overhead irrigation",
    ],
    treatments: [
      "Apply captan or thiram fungicides",
      "Mow and remove old foliage after harvest",
      "Renovate strawberry beds annually",
      "Apply copper-based sprays in fall",
    ],
    preventionTips: [
      "Plant resistant strawberry cultivars",
      "Use drip irrigation instead of overhead",
      "Maintain proper plant spacing",
      "Remove infected leaf debris promptly",
    ],
    severity: "medium",
    spreadRate: "moderate",
  },
  {
    id: "strawberry_healthy",
    className: "Strawberry___healthy",
    crop: "Strawberry",
    disease: "Healthy",
    isHealthy: true,
    description: "Healthy strawberry leaf with no disease symptoms.",
    symptoms: [],
    causes: [],
    treatments: [],
    preventionTips: ["Drip irrigation", "Proper spacing", "Annual renovation"],
    severity: "low",
    spreadRate: "slow",
  },
  // ===== TOMATO =====
  {
    id: "tomato_bacterial_spot",
    className: "Tomato___Bacterial_spot",
    crop: "Tomato",
    disease: "Bacterial Spot",
    isHealthy: false,
    description:
      "Bacterial spot of tomato caused by Xanthomonas species creates water-soaked spots on leaves, stems, and fruit.",
    symptoms: [
      "Small water-soaked circular spots on leaves",
      "Spots turn dark brown with yellow halos",
      "Raised rough spots on fruit",
      "Leaf drop leading to sunscalded fruit",
    ],
    causes: [
      "Xanthomonas vesicatoria and related species",
      "Contaminated seed",
      "Warm rainy weather",
    ],
    treatments: [
      "Apply copper-based bactericides plus mancozeb",
      "Remove and destroy infected plant debris",
      "Avoid working in fields when plants are wet",
      "Hot water seed treatment (125F for 25 min)",
    ],
    preventionTips: [
      "Use pathogen-free seed and transplants",
      "Practice 2-3 year crop rotation",
      "Avoid overhead irrigation",
      "Plant resistant varieties when available",
    ],
    severity: "medium",
    spreadRate: "fast",
  },
  {
    id: "tomato_early_blight",
    className: "Tomato___Early_blight",
    crop: "Tomato",
    disease: "Early Blight",
    isHealthy: false,
    description:
      "Early blight caused by Alternaria solani is one of the most common tomato diseases, creating target-like concentric ring patterns on leaves.",
    symptoms: [
      "Dark brown spots with concentric rings (target pattern)",
      "Lower older leaves affected first",
      "Yellow tissue around lesions",
      "Dark sunken lesions on stems near soil line",
    ],
    causes: [
      "Fungus Alternaria solani",
      "Warm humid weather",
      "Overwintering in crop debris",
    ],
    treatments: [
      "Apply chlorothalonil or copper fungicides",
      "Remove infected lower leaves",
      "Mulch to reduce soil splash",
      "Apply fungicides on 7-day schedule during wet weather",
    ],
    preventionTips: [
      "Rotate crops 2-3 years",
      "Use resistant varieties",
      "Stake or cage plants to improve air flow",
      "Mulch to prevent soil splash onto leaves",
    ],
    severity: "high",
    spreadRate: "moderate",
  },
  {
    id: "tomato_late_blight",
    className: "Tomato___Late_blight",
    crop: "Tomato",
    disease: "Late Blight",
    isHealthy: false,
    description:
      "Late blight of tomato caused by Phytophthora infestans can destroy entire fields rapidly under cool wet conditions.",
    symptoms: [
      "Large irregular water-soaked grayish-green spots on leaves",
      "White fuzzy mold on undersides of leaves in humid conditions",
      "Rapid browning and death of leaves and stems",
      "Brown firm rot on green fruit",
    ],
    causes: [
      "Oomycete Phytophthora infestans",
      "Cool temperatures (60-70F) and wet conditions",
      "Wind-dispersed spores",
    ],
    treatments: [
      "Apply chlorothalonil or mancozeb fungicides",
      "Remove and destroy all infected plant material",
      "Apply fungicides preventively in cool wet weather",
      "Use metalaxyl for resistant strains",
    ],
    preventionTips: [
      "Use certified transplants",
      "Avoid planting near potatoes",
      "Improve air circulation",
      "Monitor weather forecasts and spray preventively",
    ],
    severity: "critical",
    spreadRate: "fast",
  },
  {
    id: "tomato_leaf_mold",
    className: "Tomato___Leaf_Mold",
    crop: "Tomato",
    disease: "Leaf Mold",
    isHealthy: false,
    description:
      "Tomato leaf mold caused by Passalora fulva (syn. Cladosporium fulvum) primarily affects greenhouse tomatoes.",
    symptoms: [
      "Pale green to yellow spots on upper leaf surface",
      "Olive-green to grayish-brown velvety mold on leaf undersides",
      "Infected leaves curl and wither",
      "In severe cases, blossoms and fruit may be infected",
    ],
    causes: [
      "Fungus Passalora fulva",
      "High humidity (>85%) in enclosed structures",
      "Poor ventilation in greenhouses",
    ],
    treatments: [
      "Improve greenhouse ventilation",
      "Apply chlorothalonil or mancozeb",
      "Reduce humidity below 85%",
      "Remove and destroy infected leaves",
    ],
    preventionTips: [
      "Use resistant tomato varieties (carrying Cf genes)",
      "Improve greenhouse ventilation and heating",
      "Avoid leaf wetness and overhead watering",
      "Space plants adequately for airflow",
    ],
    severity: "medium",
    spreadRate: "moderate",
  },
  {
    id: "tomato_septoria",
    className: "Tomato___Septoria_leaf_spot",
    crop: "Tomato",
    disease: "Septoria Leaf Spot",
    isHealthy: false,
    description:
      "Septoria leaf spot caused by Septoria lycopersici creates numerous small spots on lower leaves, progressing upward.",
    symptoms: [
      "Numerous small circular spots (1-2mm) with dark borders",
      "Gray or tan center with dark pycnidia (tiny black dots)",
      "Lower leaves affected first progressing upward",
      "Severe defoliation exposes fruit to sunscald",
    ],
    causes: [
      "Fungus Septoria lycopersici",
      "Wet weather and splash dispersal",
      "Overwintering in crop debris and weeds",
    ],
    treatments: [
      "Apply chlorothalonil or copper sprays at first symptoms",
      "Continue sprays on 7-10 day schedule",
      "Remove infected lower leaves",
      "Remove weeds that may harbor the fungus",
    ],
    preventionTips: [
      "Rotate crops 2-3 years away from tomatoes",
      "Use drip irrigation to avoid leaf wetness",
      "Mulch around plants to reduce splash",
      "Stake plants to improve air circulation",
    ],
    severity: "high",
    spreadRate: "fast",
  },
  {
    id: "tomato_spider_mites",
    className: "Tomato___Spider_mites Two-spotted_spider_mite",
    crop: "Tomato",
    disease: "Spider Mites (Two-spotted)",
    isHealthy: false,
    description:
      "Two-spotted spider mites (Tetranychus urticae) are tiny arachnids that cause stippling damage on tomato leaves.",
    symptoms: [
      "Fine stippling (tiny yellow dots) on upper leaf surfaces",
      "Fine webbing on leaf undersides",
      "Leaves turn bronze/brown and dry out",
      "Reduced fruit quality and yield",
    ],
    causes: [
      "Mite Tetranychus urticae",
      "Hot dry weather conditions",
      "Overuse of broad-spectrum insecticides killing natural predators",
    ],
    treatments: [
      "Apply miticides (abamectin, bifenazate)",
      "Release predatory mites (Phytoseiulus persimilis)",
      "Apply insecticidal soap or horticultural oil sprays",
      "Strong water sprays to dislodge mites",
    ],
    preventionTips: [
      "Conserve natural predatory mite populations",
      "Avoid broad-spectrum insecticides",
      "Monitor undersides of leaves with a hand lens",
      "Maintain adequate plant moisture to reduce mite pressure",
    ],
    severity: "medium",
    spreadRate: "fast",
  },
  {
    id: "tomato_target_spot",
    className: "Tomato___Target_Spot",
    crop: "Tomato",
    disease: "Target Spot",
    isHealthy: false,
    description:
      "Target spot of tomato caused by Corynespora cassiicola creates concentric ring patterns on leaves, stems, and fruit.",
    symptoms: [
      "Brown spots with concentric rings on leaves",
      "Spots may have yellow halo",
      "Large lesions on stems and petioles",
      "Sunken dark spots on fruit",
    ],
    causes: [
      "Fungus Corynespora cassiicola",
      "Warm humid conditions",
      "Dense canopy with poor airflow",
    ],
    treatments: [
      "Apply chlorothalonil or azoxystrobin fungicides",
      "Remove infected leaves and improve air circulation",
      "Prune lower leaves to reduce humidity in canopy",
      "Apply fungicides preventively in warm wet weather",
    ],
    preventionTips: [
      "Maintain proper plant spacing",
      "Prune to improve air circulation",
      "Use drip irrigation",
      "Remove and destroy crop debris after harvest",
    ],
    severity: "medium",
    spreadRate: "moderate",
  },
  {
    id: "tomato_yellow_curl",
    className: "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
    crop: "Tomato",
    disease: "Yellow Leaf Curl Virus",
    isHealthy: false,
    description:
      "Tomato Yellow Leaf Curl Virus (TYLCV) is a devastating viral disease transmitted by whiteflies.",
    symptoms: [
      "Upward curling and cupping of leaves",
      "Yellowing of leaf margins and interveinal areas",
      "Stunted plant growth",
      "Dramatically reduced fruit production",
      "Flower drop",
    ],
    causes: [
      "Tomato Yellow Leaf Curl Virus (TYLCV)",
      "Transmitted by sweetpotato whitefly (Bemisia tabaci)",
      "Acquisition and transmission within minutes of feeding",
    ],
    treatments: [
      "No cure - remove infected plants immediately",
      "Control whitefly populations with systemic insecticides",
      "Use reflective mulches to repel whiteflies",
      "Apply imidacloprid or cyantraniliprole for whitefly control",
    ],
    preventionTips: [
      "Plant TYLCV-resistant varieties",
      "Use fine mesh (50-mesh) screens in greenhouses",
      "Control whiteflies before and during transplanting",
      "Remove and destroy infected plants promptly",
    ],
    severity: "critical",
    spreadRate: "fast",
  },
  {
    id: "tomato_mosaic",
    className: "Tomato___Tomato_mosaic_virus",
    crop: "Tomato",
    disease: "Mosaic Virus",
    isHealthy: false,
    description:
      "Tomato mosaic virus (ToMV) is highly contagious and can survive on surfaces and in soil for extended periods.",
    symptoms: [
      "Light and dark green mottled pattern on leaves",
      "Leaf curling and distortion",
      "Stunted plant growth",
      "Uneven fruit ripening with brown streaks internally",
    ],
    causes: [
      "Tomato mosaic virus (ToMV)",
      "Mechanical transmission through handling",
      "Contaminated seeds, tools, and soil",
    ],
    treatments: [
      "No cure available - remove infected plants",
      "Disinfect tools with 10% bleach or TSP solution",
      "Wash hands thoroughly after handling infected plants",
      "Do not compost infected plant material",
    ],
    preventionTips: [
      "Use ToMV-resistant varieties (Tm-2 gene)",
      "Treat seed with TSP or 10% bleach before planting",
      "Disinfect tools between plants",
      "Avoid tobacco use near tomato plants",
    ],
    severity: "high",
    spreadRate: "fast",
  },
  {
    id: "tomato_healthy",
    className: "Tomato___healthy",
    crop: "Tomato",
    disease: "Healthy",
    isHealthy: true,
    description: "Healthy tomato leaf with no disease symptoms.",
    symptoms: [],
    causes: [],
    treatments: [],
    preventionTips: ["Regular monitoring", "Balanced nutrition", "Crop rotation"],
    severity: "low",
    spreadRate: "slow",
  },
]

export function getDiseaseById(id: string): DiseaseInfo | undefined {
  return diseases.find((d) => d.id === id)
}

export function getDiseasesByClass(className: string): DiseaseInfo | undefined {
  return diseases.find((d) => d.className === className)
}

export function getDiseasesByCrop(cropName: string): DiseaseInfo[] {
  return diseases.filter((d) => d.crop === cropName)
}

export function getCropByName(name: string): CropInfo | undefined {
  return crops.find((c) => c.name === name)
}

export function getDatasetStats() {
  return {
    totalCrops: crops.length,
    totalClasses: diseases.length,
    totalDiseases: diseases.filter((d) => !d.isHealthy).length,
    totalHealthy: diseases.filter((d) => d.isHealthy).length,
    cropBreakdown: crops.map((c) => ({
      name: c.name,
      diseases: c.diseases.length,
      totalClasses: c.totalClasses,
    })),
  }
}
