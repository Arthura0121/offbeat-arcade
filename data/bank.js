// Original starter bank. Immutable releases preserve daily puzzles and saved games.
// Rarity is an editorial familiarity rating, NOT observed player frequency.
const a = (name, tier, aliases = []) => ({ name, tier, aliases });
export const bank = {
  version: 'launch-1',
  rare: [
    { id: 'greek', title: 'Go Greek', prompt: 'Name a letter of the Greek alphabet.', scope: 'The 24 standard modern Greek letters; English names.', source: 'https://www.britannica.com/topic/Greek-alphabet', answers: [a('Alpha',1),a('Beta',1),a('Gamma',1),a('Delta',1),a('Epsilon',2),a('Zeta',2),a('Eta',3),a('Theta',2),a('Iota',2),a('Kappa',2),a('Lambda',2),a('Mu',3),a('Nu',4),a('Xi',4),a('Omicron',2),a('Pi',1),a('Rho',3),a('Sigma',1),a('Tau',3),a('Upsilon',4),a('Phi',2),a('Chi',3),a('Psi',3),a('Omega',1)] },
    { id: 'south-america', title: 'South of the equator (mostly)', prompt: 'Name a sovereign country in South America.', scope: 'The 12 sovereign countries. Territories are excluded.', source: 'https://www.britannica.com/place/South-America', answers: [a('Brazil',1,['Brasil']),a('Argentina',1),a('Chile',1),a('Peru',1),a('Colombia',2),a('Venezuela',2),a('Ecuador',2),a('Uruguay',3),a('Paraguay',3),a('Bolivia',2),a('Guyana',4),a('Suriname',4,['Surinam'])] },
    { id: 'one-letter', title: 'Short symbols, big science', prompt: 'Name a chemical element with a one-letter symbol.', scope: 'Give the element name or its one-letter symbol.', source: 'https://iupac.org/what-we-do/periodic-table-of-elements/', answers: [a('Hydrogen',1,['H']),a('Boron',3,['B']),a('Carbon',1,['C']),a('Nitrogen',1,['N']),a('Oxygen',1,['O']),a('Fluorine',3,['F']),a('Phosphorus',3,['P']),a('Sulfur',2,['S','Sulphur']),a('Potassium',2,['K']),a('Vanadium',4,['V']),a('Yttrium',4,['Y']),a('Iodine',2,['I']),a('Tungsten',3,['W','Wolfram']),a('Uranium',2,['U'])] },
    { id: 'zodiac', title: 'Written in the stars', prompt: 'Name a sign of the Western zodiac.', scope: 'The 12 traditional astrological signs; English or Latin names.', source: 'https://www.britannica.com/topic/zodiac', answers: [a('Aries',1,['Ram']),a('Taurus',1,['Bull']),a('Gemini',1,['Twins']),a('Cancer',2,['Crab']),a('Leo',1,['Lion']),a('Virgo',2,['Virgin','Maiden']),a('Libra',2,['Scales']),a('Scorpio',1,['Scorpius','Scorpion']),a('Sagittarius',3,['Archer']),a('Capricorn',3,['Sea goat','Goat']),a('Aquarius',2,['Water bearer']),a('Pisces',2,['Fishes','Fish'])] },
    { id: 'chess', title: 'Your move', prompt: 'Name a type of piece in standard chess.', scope: 'The six piece types, including the pawn. No fairy chess pieces.', source: 'https://handbook.fide.com/chapter/E012023', answers: [a('King',1),a('Queen',1),a('Pawn',1),a('Knight',2),a('Bishop',2),a('Rook',3,['Castle'])] },
    { id: 'planets', title: 'Around our star', prompt: 'Name one of the eight planets in our Solar System.', scope: 'The eight IAU-recognized planets. Dwarf planets are excluded.', source: 'https://science.nasa.gov/solar-system/planets/', answers: [a('Earth',1),a('Mars',1),a('Jupiter',1),a('Saturn',1),a('Venus',2),a('Mercury',2),a('Neptune',3),a('Uranus',3)] },
    { id: 'si-base', title: 'Measure up', prompt: 'Name an SI base unit.', scope: 'The seven base units of the International System of Units; names or symbols.', source: 'https://www.bipm.org/en/measurement-units/si-base-units', answers: [a('Second',1,['s']),a('Metre',1,['Meter','m']),a('Kilogram',1,['kg']),a('Ampere',2,['Amp','A']),a('Kelvin',2,['K']),a('Mole',3,['mol']),a('Candela',4,['cd'])] },
    { id: 'noble', title: 'An exclusive group', prompt: 'Name a group 18 chemical element (a noble gas).', scope: 'The seven elements in group 18, including synthetic oganesson.', source: 'https://iupac.org/what-we-do/periodic-table-of-elements/', answers: [a('Helium',1,['He']),a('Neon',1,['Ne']),a('Argon',2,['Ar']),a('Krypton',3,['Kr']),a('Xenon',3,['Xe']),a('Radon',3,['Rn']),a('Oganesson',4,['Og'])] },
    { id: 'polygons', title: 'Pick a side', prompt: 'Name a polygon with 3 to 12 sides.', scope: 'Standard English names for polygons with 3 through 12 sides.', source: 'https://mathworld.wolfram.com/Polygon.html', answers: [a('Triangle',1,['Trigon']),a('Quadrilateral',1,['Tetragon','Quadrangle']),a('Pentagon',1),a('Hexagon',1),a('Heptagon',3,['Septagon']),a('Octagon',2),a('Nonagon',3,['Enneagon']),a('Decagon',2),a('Hendecagon',4,['Undecagon','Endecagon']),a('Dodecagon',3)] },
    { id: 'dwarfs', title: 'Small worlds', prompt: 'Name one of the five IAU-recognized dwarf planets.', scope: 'The five named dwarf planets recognized by the IAU; candidate objects excluded.', source: 'https://science.nasa.gov/dwarf-planets/', answers: [a('Pluto',1),a('Ceres',2),a('Eris',3),a('Haumea',4),a('Makemake',4)] },
    { id: 'great-lakes', title: 'Fresh perspective', prompt: 'Name one of the five North American Great Lakes.', scope: 'The five named lakes; not their tributaries or bays.', source: 'https://www.epa.gov/greatlakes/great-lakes-facts-and-figures', answers: [a('Superior',1,['Lake Superior']),a('Michigan',1,['Lake Michigan']),a('Huron',3,['Lake Huron']),a('Erie',2,['Lake Erie']),a('Ontario',2,['Lake Ontario'])] },
    { id: 'rainbow', title: 'A little color theory', prompt: 'Name one of the seven traditional rainbow colors.', scope: 'The conventional seven-color ROYGBIV list; not every spectral color.', source: 'https://www.britannica.com/science/rainbow-atmospheric-phenomenon', answers: [a('Red',1),a('Orange',1),a('Yellow',1),a('Green',1),a('Blue',1),a('Indigo',4),a('Violet',2)] }
  ],
  // Independently selected common English words. A compact starter dictionary, not a copied puzzle list.
  words: `ABBEY ABIDE ABOUT ABOVE ABUSE ACORN ACTOR ACUTE ADAPT ADMIT ADOPT ADULT AFTER AGAIN AGENT AGILE AGREE AHEAD AISLE ALARM ALBUM ALERT ALIEN ALIGN ALIVE ALLEY ALLOW ALONE ALONG ALOUD ALTER AMBER AMEND AMONG AMPLE AMUSE ANGEL ANGER ANGLE ANKLE ANNEX ANNOY ANVIL APART APPLE APPLY APRON ARENA ARGUE ARISE ARMOR AROMA ARRAY ARROW ASHEN ASIDE ASSET ATLAS ATTIC AUDIO AVOID AWAIT AWAKE AWARD AWARE AWFUL BADGE BAGEL BAKER BALMY BANJO BASIC BASIL BATCH BATHE BEACH BEADY BEARD BEAST BEGIN BEING BELLY BELOW BENCH BERRY BIRTH BLACK BLADE BLAME BLAND BLANK BLAST BLAZE BLEAK BLEND BLESS BLIMP BLIND BLINK BLISS BLOCK BLOOM BLOWN BLUFF BLUNT BLUSH BOARD BOAST BONUS BOOST BOOTH BOUND BOWEL BOXER BRACE BRAID BRAIN BRAKE BRAND BRASS BRAVE BREAD BREAK BREED BRICK BRIDE BRIEF BRING BRISK BROAD BROKE BROOK BROOM BROWN BRUSH BUDDY BUDGE BUILD BUILT BUNCH BUNNY BURNT BURST CABIN CABLE CACAO CACHE CACTI CAMEL CANDY CANOE CAPER CARGO CAROL CARRY CARVE CATCH CAUSE CEDAR CHAIN CHAIR CHALK CHAMP CHANT CHAOS CHARM CHART CHASE CHEAP CHEAT CHECK CHEEK CHESS CHEST CHICK CHIEF CHILD CHILI CHILL CHIME CHIRP CHOIR CHORD CHORE CHOSE CHUNK CIDER CIGAR CINCH CIVIC CLAIM CLAMP CLANG CLASH CLASP CLASS CLEAN CLEAR CLERK CLICK CLIFF CLIMB CLING CLOAK CLOCK CLONE CLOSE CLOTH CLOUD CLOUT CLOVE CLOWN COACH COAST COCOA COMET COMIC CORAL COUCH COULD COUNT COURT COVER COVET CRACK CRAFT CRAMP CRANE CRANK CRASH CRATE CRAWL CRAZE CREAM CREEK CREEP CREST CRIME CRISP CROAK CROSS CROWD CROWN CRUDE CRUEL CRUMB CRUSH CRUST CURLY CURVE CYCLE DAILY DAIRY DAISY DANCE DANDY DEALT DEATH DEBUG DECAY DECOR DECOY DELAY DELTA DENIM DENSE DEPOT DEPTH DERBY DIARY DIGIT DINER DIRTY DISCO DITCH DIVER DIZZY DODGE DONOR DOUBT DOUGH DOWEL DRAFT DRAIN DRAKE DRAMA DRANK DRAWN DREAM DRESS DRIED DRIFT DRILL DRINK DRIVE DROOP DROVE DRYER DUSKY DUSTY DWARF DWELL EAGER EAGLE EARLY EARTH EASEL EATEN EATER EBONY EIGHT ELBOW ELDER ELECT ELITE ELOPE ELUDE EMAIL EMBER EMPTY ENACT ENJOY ENTER ENTRY EQUAL EQUIP ERASE ERROR ERUPT ESSAY EVENT EVERY EXACT EXALT EXCEL EXERT EXILE EXIST EXTRA FABLE FACET FAINT FAIRY FAITH FALSE FANCY FATAL FAULT FAVOR FEAST FENCE FERRY FETCH FEVER FIBER FIELD FIERY FIFTH FIFTY FIGHT FINAL FINCH FIRST FIXED FJORD FLAME FLANK FLARE FLASH FLASK FLEET FLESH FLICK FLING FLINT FLOAT FLOCK FLOOD FLOOR FLOUR FLUTE FOAMY FOCAL FOCUS FOGGY FORCE FORGE FORTH FORTY FORUM FOUND FRAME FRANK FRESH FRIAR FRIED FRONT FROST FRUIT FULLY FUNGI FUNNY GAUGE GAZER GENRE GHOST GIANT GIDDY GIVEN GLAND GLARE GLASS GLEAM GLIDE GLOBE GLOOM GLORY GLOSS GLOVE GNOME GOING GOOSE GORGE GOUGE GRACE GRADE GRAIN GRAND GRANT GRAPE GRAPH GRASP GRASS GRATE GRAVE GRAZE GREAT GREED GREEN GREET GRIEF GRILL GRIND GRIPE GROAN GROOM GROVE GROWL GROWN GUARD GUAVA GUESS GUEST GUIDE GUILD GUILT HABIT HAPPY HARDY HASTE HATCH HAUNT HAVEN HAZEL HEARD HEART HEATH HEAVY HEDGE HEIST HELIX HELLO HENCE HERON HIKER HINGE HIPPO HOBBY HONEY HONOR HORSE HOTEL HOUND HOUSE HOVER HUMAN HUMID HUMOR HURRY HYENA ICING IDEAL IDIOM IGLOO IMAGE IMPLY INDEX INERT INNER INPUT INTER IRONY IVORY JAUNT JAZZY JELLY JEWEL JOINT JOKER JOLLY JOUST JUDGE JUICE JUMBO JUMPY KAYAK KEBAB KHAKI KIOSK KNEAD KNEEL KNIFE KNOCK KNOLL KNOWN KOALA LABEL LABOR LADEN LADLE LAGER LANCE LAPEL LAPSE LARGE LASER LATCH LATER LATHE LATTE LAUGH LAYER LEACH LEAFY LEARN LEASE LEAST LEAVE LEDGE LEMON LEVEL LEVER LIGHT LILAC LIMBO LIMIT LINEN LINER LIVER LLAMA LOBBY LOCAL LODGE LOFTY LOGIC LOOSE LORRY LOSER LOTUS LOVER LOWER LOYAL LUCKY LUMEN LUNAR LUNCH LUNGE LYRIC MACAW MAGIC MAJOR MAKER MANGO MANOR MAPLE MARCH MARSH MATCH MAYOR MEANT MEDAL MEDIA MELON MERCY MERGE MERIT MERRY METAL METER MICRO MIGHT MINER MINOR MINTY MIRTH MODEL MOIST MONEY MONTH MOOSE MORAL MOTEL MOUND MOUNT MOURN MOUSE MOUTH MOVIE MOWER MUDDY MURAL MUSIC NAIVE NANNY NASTY NAVAL NAVEL NEEDS NERVE NEVER NEWER NEWLY NICHE NIECE NIGHT NINJA NOBLE NOISE NORTH NOTCH NOVEL NUDGE NURSE NYLON OASIS OCEAN ODDLY OFFER OFTEN OLIVE ONION ONSET OPERA OPTIC ORBIT ORDER ORGAN OTHER OTTER OUGHT OUNCE OUTER OVALS OVERT OWNER OXIDE OZONE PAINT PANEL PANIC PAPER PARKA PARTY PASTA PASTE PATCH PATIO PAUSE PEACE PEACH PEARL PEDAL PENNY PERCH PERIL PETAL PHASE PHONE PHOTO PIANO PIECE PILOT PINCH PINEY PITCH PIXEL PIZZA PLACE PLAID PLAIN PLAIT PLANE PLANK PLANT PLATE PLAZA PLEAD PLEAT PLIER PLUCK PLUMB PLUME PLUMP PLUSH POACH POINT POKER POLAR POLKA POOCH POPPY PORCH POSED POUCH POUND POWER PRANK PRAWN PRESS PRICE PRICK PRIDE PRIME PRINT PRIOR PRISM PRIZE PROBE PRONE PROOF PROSE PROUD PROVE PROWL PROXY PRUNE PULSE PUNCH PUPIL PUPPY PURSE QUACK QUAIL QUART QUEEN QUERY QUEST QUEUE QUICK QUIET QUILT QUITE QUOTA QUOTE RADAR RADIO RAISE RALLY RANCH RANGE RAPID RATIO REACH REACT READY REALM REBEL RECAP REEDY REIGN RELAX RELAY REMIT RENEW REPAY REPLY RESET RESIN RETRO RHINO RHYME RIDGE RIGHT RIGID RIPEN RISKY RIVAL RIVER ROAST ROBIN ROBOT ROCKY RODEO ROGUE ROOMY ROOST ROUGH ROUND ROUTE ROVER ROYAL RUGBY RULER RUMOR RUSTY SADLY SAFER SAINT SALAD SALSA SALTY SATIN SAUCE SAUNA SAVVY SCALE SCALP SCAMP SCARE SCARF SCENT SCOOP SCOPE SCORE SCOUT SCRAP SCREW SCRUB SEIZE SENSE SERVE SETUP SEVEN SHADE SHAFT SHAKE SHALL SHAME SHAPE SHARD SHARE SHARK SHARP SHAVE SHEAR SHEEN SHEEP SHEER SHEET SHELF SHELL SHIFT SHINE SHINY SHIRT SHOCK SHONE SHOOK SHOOT SHORE SHORT SHOUT SHOVE SHOWN SHRUB SHRUG SHYLY SIGHT SILKY SILLY SINCE SIREN SIXTH SIXTY SKATE SKILL SKIRT SKULL SLACK SLAIN SLANG SLANT SLATE SLAVE SLEEK SLEEP SLICE SLIDE SLIME SLING SLOPE SLOTH SMALL SMART SMASH SMEAR SMELL SMILE SMIRK SMOKE SNACK SNAIL SNAKE SNARE SNEAK SNIFF SNORE SNOUT SNOWY SOLAR SOLID SOLVE SONAR SONIC SORRY SOUND SOUTH SPACE SPADE SPARE SPARK SPAWN SPEAK SPEAR SPECK SPEED SPELL SPEND SPENT SPICE SPICY SPIKE SPILL SPINE SPITE SPLIT SPOKE SPOON SPORT SPOUT SPRAY SPREE SPRIG SQUAD SQUAT STACK STAFF STAGE STAIN STAIR STAKE STALE STALK STALL STAMP STAND STARE STARK START STATE STEAK STEAL STEAM STEEL STEEP STEER STERN STICK STIFF STILL STING STINK STOCK STOLE STOMP STONE STOOD STOOL STOOP STORE STORK STORM STORY STOUT STOVE STRAP STRAW STRAY STRIP STRUT STUCK STUDY STUFF STUMP STUNG STUNT STYLE SUGAR SUITE SUNNY SUPER SURGE SWAMP SWARM SWEAR SWEAT SWEEP SWEET SWELL SWIFT SWING SWIRL SWORD SYRUP TABLE TABOO TACIT TACKY TALON TANGO TANGY TAPER TARDY TASTE TASTY TEACH TEARY TEASE TEETH TEMPO TENSE TENTH THANK THEFT THEIR THEME THERE THESE THICK THIEF THIGH THING THINK THIRD THORN THOSE THREE THREW THROW THUMB TIGER TIGHT TIMER TIMID TIPSY TIRED TITLE TOAST TODAY TOKEN TONAL TONIC TOOTH TOPIC TORCH TOTAL TOUCH TOUGH TOWEL TOWER TOXIC TRACE TRACK TRACT TRADE TRAIL TRAIN TRAIT TRAMP TRASH TRAWL TREAD TREAT TREND TRIAL TRIBE TRICK TRIED TRIPE TROOP TROUT TRUCK TRULY TRUMP TRUNK TRUST TRUTH TULIP TUMOR TUNER TUNIC TURBO TUTOR TWANG TWEAK TWEED TWICE TWINE TWIRL TWIST UDDER ULTRA UNCLE UNDER UNDUE UNFIT UNIFY UNION UNITE UNITY UNTIE UNTIL UPPER UPSET URBAN USAGE USHER USUAL UTTER VAGUE VALID VALOR VALUE VALVE VAPOR VAULT VEGAN VENOM VENUE VERGE VERSE VIDEO VIGOR VILLA VINYL VIOLA VIPER VIRAL VISIT VISOR VISTA VITAL VIVID VOCAL VODKA VOGUE VOICE VOTER VOUCH VOWEL WAFER WAGER WAGON WAIST WALTZ WASTE WATCH WATER WAVER WEARY WEAVE WEDGE WEIGH WEIRD WHALE WHARF WHEAT WHEEL WHERE WHICH WHILE WHINE WHIRL WHISK WHITE WHOLE WHOSE WIDEN WIDOW WIDTH WIELD WINDY WINCE WITCH WITTY WOKEN WOMAN WOMEN WOODY WORLD WORRY WORSE WORST WORTH WOULD WOUND WOVEN WRACK WRATH WREAK WRECK WREST WRING WRIST WRITE WRONG WROTE YACHT YEARN YEAST YIELD YOUNG YOUTH ZEBRA ZESTY`.split(/\s+/),
  groups: [
    { id: 'workshop', groups: [
      {label:'In a sewing kit', words:['THIMBLE','NEEDLE','BOBBIN','THREAD']},
      {label:'Things with a crust', words:['PIE','PIZZA','EARTH','BREAD']},
      {label:'At a train station', words:['PLATFORM','TIMETABLE','TRACK','TURNSTILE']},
      {label:'___ light', words:['LIME','SPOT','FLASH','DAY']}
    ]},
    { id: 'weekend', groups: [
      {label:'Things you can fold',words:['NAPKIN','MAP','LAUNDRY','ORIGAMI']},
      {label:'Orchestra strings',words:['VIOLIN','VIOLA','CELLO','BASS']},
      {label:'A serving of something',words:['SLICE','DOLLOP','SCOOP','HELPING']},
      {label:'___ house',words:['TREE','GREEN','LIGHT','CLUB']}
    ]},
    { id: 'garden', groups: [
      {label:'Parts of a flower',words:['PETAL','STAMEN','SEPAL','PISTIL']},
      {label:'Ways to cook an egg',words:['POACH','SCRAMBLE','FRY','BOIL']},
      {label:'Types of hat',words:['BERET','FEDORA','BEANIE','BOWLER']},
      {label:'Silent first letters',words:['GNOME','KNIFE','WRIST','PSALM']}
    ]},
    { id: 'evening', groups: [
      {label:'Card suits',words:['CLUBS','DIAMONDS','HEARTS','SPADES']},
      {label:'Pizza herbs',words:['BASIL','OREGANO','THYME','ROSEMARY']},
      {label:'Things that orbit',words:['MOON','PLANET','SATELLITE','SPACE STATION']},
      {label:'___ board',words:['SKATE','KEY','DASH','CUP']}
    ]},
    { id: 'studio', groups: [
      {label:'Pottery essentials',words:['CLAY','KILN','GLAZE','WHEEL']},
      {label:'Words for a small amount',words:['DASH','PINCH','SMIDGEN','TRACE']},
      {label:'Computer actions',words:['SAVE','PASTE','UNDO','PRINT']},
      {label:'___ fish',words:['SWORD','JELLY','GOLD','STAR']}
    ]},
    { id: 'picnic', groups: [
      {label:'Shapes of pasta',words:['PENNE','FUSILLI','RIGATONI','FARFALLE']},
      {label:'Places to keep money',words:['WALLET','SAFE','VAULT','PIGGY BANK']},
      {label:'Found on a bird',words:['BEAK','TALON','FEATHER','WING']},
      {label:'___ berry',words:['STRAW','BLUE','BLACK','GOOSE']}
    ]},
    { id: 'journey', groups: [
      {label:'Types of bridge',words:['SUSPENSION','ARCH','BEAM','CANTILEVER']},
      {label:'Tools for an artist',words:['PALETTE','EASEL','BRUSH','CHARCOAL']},
      {label:'Forms of precipitation',words:['RAIN','SNOW','SLEET','HAIL']},
      {label:'___ cake',words:['PAN','CUP','CHEESE','SHORT']}
    ]},
    { id: 'library', groups: [
      {label:'Parts of a book',words:['SPINE','PREFACE','INDEX','CHAPTER']},
      {label:'Swimming strokes',words:['CRAWL','BACKSTROKE','BREASTSTROKE','BUTTERFLY']},
      {label:'Green gemstones',words:['EMERALD','JADE','PERIDOT','MALACHITE']},
      {label:'___ room',words:['BATH','BED','CLASS','MUSH']}
    ]},
    { id: 'midnight', groups: [
      {label:'On a keyboard',words:['ESCAPE','SHIFT','TAB','ENTER']},
      {label:'Hot drinks',words:['COCOA','CHAI','ESPRESSO','TODDY']},
      {label:'Types of cloud',words:['CIRRUS','CUMULUS','STRATUS','NIMBUS']},
      {label:'___ drop',words:['TEAR','GUM','EAVES','BACK']}
    ]},
    { id: 'outdoors', groups: [
      {label:'Camping gear',words:['TENT','SLEEPING BAG','CANTEEN','LANTERN']},
      {label:'Metamorphic rocks',words:['MARBLE','SLATE','GNEISS','QUARTZITE']},
      {label:'Knitting basics',words:['YARN','PURL','CAST ON','STITCH']},
      {label:'___ bell',words:['DOOR','COW','DUMB','BLUE']}
    ]},
    { id: 'kitchen', groups: [
      {label:'Baking ingredients',words:['FLOUR','YEAST','BUTTER','SUGAR']},
      {label:'Parts of a bicycle',words:['PEDAL','SADDLE','SPOKE','HANDLEBAR']},
      {label:'Words for a clever person',words:['WHIZ','GENIUS','BRAIN','ACE']},
      {label:'___ line',words:['PUNCH','COAST','DEAD','ZIP']}
    ]},
    { id: 'daydream', groups: [
      {label:'Dances',words:['WALTZ','TANGO','SALSA','FOXTROT']},
      {label:'Optical instruments',words:['TELESCOPE','MICROSCOPE','PERISCOPE','BINOCULARS']},
      {label:'Things with teeth',words:['COMB','SAW','ZIPPER','GEAR']},
      {label:'___ stone',words:['MILE','GEM','LIME','KEY']}
    ]}
  ]
};
