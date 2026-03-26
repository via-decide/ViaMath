// ---------------------------------------------------------------
// ViaMath Mathematician Database
// To add a new character:
//   1. Add a new object to MATHEMATICIANS array
//   2. Fill in id, name, fullName, period, title, tagline, accent, description
//   3. Add acts[] array — each act needs: title, sub, desc, insight
//   4. Optionally add simulatorId: 'shadow-sim' | 'hypotenuse-sim' | 'lever-sim'
// That's it. No other code changes needed.
// ---------------------------------------------------------------

export const MATHEMATICIANS = [
  {
    id: "thales",
    name: "Thales",
    fullName: "Thales of Miletus",
    period: "c. 624 – c. 546 BC",
    title: "The OG Sage",
    tagline: "Breaking the myth of magic with logic.",
    accent: "#00E5FF",
    simulatorId: "shadow-sim",
    description: "The first man to predict an eclipse and measure pyramids using shadows. He proved that the universe follows laws.",
    acts: [
      {
        title: "Before the Age of Reason",
        sub: "The World Without Why",
        desc: "In 600 BC, every thunderclap was a god's anger, every eclipse a divine punishment. Then one man dared to ask: what if there's a natural explanation?",
        insight: "The most revolutionary act in history was asking 'Why?' instead of praying."
      },
      {
        title: "The Eclipse Prophecy",
        sub: "585 BC — Halys River",
        desc: "Thales predicted a solar eclipse to the exact year. Two armies stopped a battle, convinced it was a sign from the gods. Only Thales knew it was geometry.",
        insight: "Math allowed one man to see the future while armies trembled in fear."
      },
      {
        title: "The Shadow Method",
        sub: "Measuring the Unmeasurable",
        desc: "Egyptian priests guarded the height of the pyramids as a divine secret. Thales measured them using shadows and simple ratios — in minutes, with a stick.",
        insight: "Similar triangles: the first powerful idea that math can measure anything."
      },
      {
        title: "The First Theorem",
        sub: "Thales' Theorem",
        desc: "Any angle inscribed in a semicircle is always 90°. This was the first mathematical fact proven by pure logic, not experience. Geometry was born.",
        insight: "Proof means something is true forever — the most powerful concept in human history."
      }
    ]
  },
  {
    id: "pythagoras",
    name: "Pythagoras",
    fullName: "Pythagoras of Samos",
    period: "c. 570 – c. 495 BC",
    title: "The Mystic",
    tagline: "All is Number. The universe is a harmony.",
    accent: "#E100FF",
    simulatorId: "hypotenuse-sim",
    description: "Founder of a secret math cult. He discovered the link between music and numbers and the ultimate triangle theorem.",
    acts: [
      {
        title: "The Wanderer of Samos",
        sub: "Stolen Knowledge",
        desc: "Pythagoras traveled to Egypt for 22 years, then Babylon for 12 more. He didn't invent his math — he gathered the greatest secrets of the ancient world.",
        insight: "The most dangerous man is one who combines the knowledge of multiple civilizations."
      },
      {
        title: "The Brotherhood",
        sub: "Math as Religion",
        desc: "He founded a secret society in Croton. Members were banned from eating beans, had to enter rooms right-foot first, and believed math was the path to God.",
        insight: "The first math community was also the first cult. Numbers were sacred."
      },
      {
        title: "The Music of the Spheres",
        sub: "When Math Sounds Beautiful",
        desc: "By measuring string lengths, Pythagoras discovered that musical harmony is pure mathematical ratios — 2:1 for an octave, 3:2 for a fifth. The cosmos has rhythm.",
        insight: "Beauty in music is just math your ears are too slow to calculate consciously."
      },
      {
        title: "a² + b² = c²",
        sub: "The Eternal Triangle",
        desc: "In any right triangle, the sum of the squares of the two shorter sides equals the square of the longest side. Simple to state. True everywhere in the universe. Forever.",
        insight: "This one equation is the foundation of all architecture, navigation, and physics."
      }
    ]
  },
  {
    id: "archimedes",
    name: "Archimedes",
    fullName: "Archimedes of Syracuse",
    period: "c. 287 – 212 BC",
    title: "The Engineer",
    tagline: "Give me a place to stand, and I'll move the Earth.",
    accent: "#FF7F50",
    simulatorId: "lever-sim",
    description: "The mad genius who calculated Pi, invented levers and war machines, and shouted 'Eureka!' from a bathtub.",
    acts: [
      {
        title: "The War Machine",
        sub: "Math as a Weapon",
        desc: "When Rome besieged Syracuse, Archimedes designed massive claws that grabbed Roman ships and flipped them. Giant mirrors that focused sunlight to burn sails. Rome was terrified.",
        insight: "He was the first to weaponize mathematical physics. A genius who made armies fear one man."
      },
      {
        title: "Eureka!",
        sub: "The Golden Crown",
        desc: "King Hiero suspected his crown was fake gold. Archimedes, in a bath, realized displaced water = exact volume. He ran through the streets naked shouting 'I found it!'",
        insight: "The greatest discoveries hit you not when you're thinking hardest, but when you relax."
      },
      {
        title: "The Lever Principle",
        sub: "Multiply Your Force",
        desc: "Archimedes demonstrated by moving a fully loaded ship alone, using a lever system. He told the king: give me a place to stand and a long enough lever — I'll move the Earth.",
        insight: "Force × distance = constant. The universe lets you cheat physics with the right tool."
      },
      {
        title: "Death in the Sand",
        sub: "Do Not Disturb My Circles",
        desc: "When Rome finally conquered Syracuse in 212 BC, a Roman soldier found an old man drawing geometric diagrams in the sand. He told the soldier: don't disturb my circles. He was killed.",
        insight: "He was more concerned with his math than his own life. That's what obsession looks like."
      }
    ]
  },
  {
    id: "hypatia",
    name: "Hypatia",
    fullName: "Hypatia of Alexandria",
    period: "c. 350 – 415 AD",
    title: "The Last Light",
    tagline: "Reserve your right to think — even to think wrongly is better than not to think at all.",
    accent: "#FF007A",
    description: "The last guardian of the Library of Alexandria. A philosopher, astronomer, and mathematician who refused to be silenced.",
    acts: [
      {
        title: "The Library",
        sub: "The World's Brain",
        desc: "The Library of Alexandria contained 500,000 scrolls — centuries of human knowledge. Hypatia was its last great teacher, training philosophers, governors, and astronomers.",
        insight: "One building contained more ideas than most civilizations would produce in a millennium."
      },
      {
        title: "Woman in a Man's World",
        sub: "Teaching Power",
        desc: "In 400 AD, she publicly taught mathematics, astronomy, and philosophy to crowds that included Roman governors. No woman had ever held this kind of intellectual authority.",
        insight: "Authority comes from knowledge, not permission."
      },
      {
        title: "The Astrolabe",
        sub: "Reading the Sky",
        desc: "Hypatia perfected the astrolabe — an instrument to measure star positions and tell time. She wrote detailed instructions making it accessible to navigators and scientists.",
        insight: "Making knowledge usable is as important as discovering it."
      },
      {
        title: "Silenced",
        sub: "415 AD",
        desc: "A Christian mob, incited by the Bishop Cyril, dragged her from her chariot, killed her, and burned her books. The Dark Ages had begun. It would be 1000 years before Europe recovered.",
        insight: "The greatest enemy of progress is not ignorance — it is organized fear of knowledge."
      }
    ]
  },
  {
    id: "gauss",
    name: "Gauss",
    fullName: "Carl Friedrich Gauss",
    period: "1777 – 1855",
    title: "The Prince",
    tagline: "Mathematics is the queen of sciences, and arithmetic is the queen of mathematics.",
    accent: "#7000FF",
    description: "The child prodigy who summed 1 to 100 in seconds. He mastered number theory, electromagnetism, and statistics.",
    acts: [
      {
        title: "The Trick at Age 9",
        sub: "Outsmarting the Teacher",
        desc: "His teacher assigned the class to add numbers 1 through 100. Gauss answered in seconds: 5050. He'd seen that 1+100=101, 2+99=101... there are 50 such pairs. Genius.",
        insight: "Brute force is what you do when you can't see the pattern. Elegance is finding the pattern."
      },
      {
        title: "The Bell Curve",
        sub: "The Shape of Everything",
        desc: "Gauss discovered that random errors in measurement form a perfect bell curve. Heights of people, IQ scores, light from stars — the universe defaults to the normal distribution.",
        insight: "Chaos, when measured over enough samples, always finds its own order."
      },
      {
        title: "Mapping the Earth",
        sub: "The Curvature Problem",
        desc: "Hired to survey the German landscape, Gauss invented differential geometry — the math that describes curved surfaces. A century later, Einstein used it to describe spacetime.",
        insight: "Practical problems often force the creation of the most abstract and powerful ideas."
      },
      {
        title: "The Fundamental Theorem",
        sub: "Every Number Has a Home",
        desc: "Gauss proved that every integer greater than 1 can be broken into prime numbers in exactly one unique way. This theorem underlies all of modern cryptography and internet security.",
        insight: "Your bank passwords are secure today because a 19-year-old proved this in 1796."
      }
    ]
  },
  {
    id: "ramanujan",
    name: "Ramanujan",
    fullName: "Srinivasa Ramanujan",
    period: "1887 – 1920",
    title: "The Intuitive",
    tagline: "An equation has no meaning unless it expresses a thought of God.",
    accent: "#FFD700",
    description: "The self-taught clerk from Madras who wrote theorems in dreams and sent them to Cambridge, stunning the world's greatest mathematicians.",
    acts: [
      {
        title: "The Clerk from Madras",
        sub: "No Degree. No Teacher.",
        desc: "Ramanujan had no formal math education beyond high school. Working as a clerk for £5 a month, he filled notebooks with formulas that professional mathematicians had never seen.",
        insight: "The greatest mathematical mind of the 20th century was self-taught in a colonial clerical job."
      },
      {
        title: "The Letter to Hardy",
        sub: "January 16, 1913",
        desc: "He wrote a letter to G.H. Hardy at Cambridge with 120 theorems. Hardy initially thought it was a fraud. After a day of study, he wrote back: 'You must come to England immediately.'",
        insight: "True genius is recognizable even across cultural and institutional barriers."
      },
      {
        title: "The Taxi Cab Number",
        sub: "1729",
        desc: "Hardy visited sick Ramanujan in hospital and said his taxi number, 1729, seemed dull. Ramanujan immediately replied: No, it's the smallest number expressible as the sum of two cubes in two different ways.",
        insight: "Every number was a personal friend of Ramanujan. He saw relationships invisible to everyone else."
      },
      {
        title: "The Final Notebooks",
        sub: "Theorems from Dreams",
        desc: "Ramanujan said his theorems came from dreams — the goddess Namakkal wrote them on his tongue. He died at 32. Mathematicians are still proving his notebook claims a century later.",
        insight: "He left more unsolved mysteries than most mathematicians create proven theorems."
      }
    ]
  }
];

export const SPECIAL_MISSIONS = [
  {
    id: "golden-ratio",
    name: "The Golden Ratio",
    title: "The Divine Proportion",
    description: "The secret algorithm nature uses to grow everything from sunflowers to galaxies.",
    accent: "#FFD700",
    acts: [
      {
        title: "The Pattern in Everything",
        sub: "φ = 1.618...",
        desc: "Sunflower seeds, nautilus shells, hurricane spirals, galaxy arms — all follow the exact same ratio. φ (phi) = 1.618. Nature didn't choose it randomly.",
        insight: "The universe optimized for space efficiency and landed on the same number every time."
      },
      {
        title: "Beauty is Mathematics",
        sub: "The Art Connection",
        desc: "Da Vinci, Michelangelo, and the architects of the Parthenon all used φ to proportion their works. Faces rated most beautiful? Their features follow the golden ratio.",
        insight: "What we call 'beautiful' is our brain recognizing mathematical efficiency."
      }
    ]
  }
];
