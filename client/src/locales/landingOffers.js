export const OFFERS = [
  // =========================
  // INDIVIDUAL COACHING - ONLINE
  // =========================

  {
    code: "O_COACHING_SINGLE",
    reference: "OC-SINGLE",
    category: "individual",
    delivery: "online",
    type: "single",
    price: 45,
    stripePriceId: "price_1TeWJ6KDbU4dI5jkZebfopME",
    paymentLinkTest: "https://buy.stripe.com/test_dRm28sehN9nvaTeaC63ks03",
    paymentLink: "https://buy.stripe.com/3cI14oddJbvD3qMaC63ks00",
    titleEn: "Single Online Coaching Session",
    titleFr: "Séance unique de coaching en ligne",
    description: "1:1 60-minute online coaching session",
  },

  {
    code: "O_COACHING_PILOT",
    reference: "OC-PILOT",
    category: "individual",
    delivery: "online",
    type: "pilot",
    price: 260,
    stripePriceId: "price_1TeYlNKDbU4dI5jkfs9SqzN5",
    paymentLinkTest: "https://buy.stripe.com/test_28E6oI2z57fnf9u4dI3ks04",
    paymentLink: "https://buy.stripe.com/fZu5kEehN9nvgdyfWq3ks01",
    titleEn: "6-sessions Online Coaching Pilot Program",
    titleFr: "Programme pilote de coaching en ligne (6 séances)",
    description: "6 x 60-minute 1:1 online coaching sessions",
  },

  {
    code: "O_COACHING_MONTHLY",
    reference: "OC-MONTH",
    category: "individual",
    delivery: "online",
    type: "monthly",
    price: 160,
    paymentLink:"https://buy.stripe.com/aFacN6ehN2Z7aTe5hM3ks02",
    stripePriceId: "price_1TeZzbKDbU4dI5jkU0sXm0ex",
    titleEn: "Monthly Online Coaching Program",
    titleFr: "Programme mensuel de coaching en ligne",
    description: "4 x 60-minute sessions per month",
  },

  // =========================
  // INDIVIDUAL COACHING - ONSITE
  // =========================

  {
    code: "I_P_COACHING_SINGLE",
    reference: "IP-SINGLE",
    category: "individual",
    delivery: "onsite",
    type: "single",
    price: 75,
    stripePriceId: "price_1Tea0tKDbU4dI5jkJRbGptzl",
    paymentLinkTest: "https://buy.stripe.com/test_4gM00kehNczH5yUfWq3ks05",
    paymentLink: "https://buy.stripe.com/dRm28sehN9nvaTeaC63ks03",
    titleEn: "Single In-Person Coaching Session",
    titleFr: "Séance unique de coaching en présentiel",
    description: "1:1 90-minute in-person coaching session",
  },

  {
    code: "I_P_COACHING_PILOT",
    reference: "IP-PILOT",
    category: "individual",
    delivery: "onsite",
    type: "pilot",
    price: 405,
    stripePriceId: "price_1Tea1hKDbU4dI5jkTg96d48c",
    paymentLink: "https://buy.stripe.com/test_9B68wQ7Tp2Z78L6h0u3ks06",
    titleEn: "6-sessions In-Person Coaching Pilot Program",
    titleFr: "Programme pilote de coaching en présentiel (6 séances)",
    description: "6 x 90-minute in-person coaching sessions",
  },

  {
    code: "I_P_COACHING_MONTHLY",
    reference: "IP-MONTH",
    category: "individual",
    delivery: "onsite",
    type: "monthly",
    price: 260,
    stripePriceId: "price_1Tea2gKDbU4dI5jk6SYk6Xk9",
    paymentLink: "https://buy.stripe.com/28E6oI2z57fnf9u4dI3ks04",
    titleEn: "Monthly In-Person Coaching Program",
    titleFr: "Programme mensuel de coaching en présentiel",
    description: "4 x 90-minute sessions per month",
  },

  // =========================
  // CORPORATE - ONLINE
  // =========================

  {
    code: "O_WORKSHOP_SINGLE",
    reference: "OW-SINGLE",
    category: "corporate",
    delivery: "online",
    type: "single",
    price: 100,
    paymentLink: "https://buy.stripe.com/4gM00kehNczH5yUfWq3ks05",
    stripePriceId: "price_1Tea52KDbU4dI5jkCMcxCD9p",
    titleEn: "Single Online Group Workshop",
    titleFr: "Atelier de groupe en ligne – séance unique",
    description: "60-minute online group workshop",
  },

  {
    code: "O_WORKSHOP_PILOT",
    reference: "OW-PILOT",
    category: "corporate",
    delivery: "online",
    type: "pilot",
    price: 570,
    paymentLink: "https://buy.stripe.com/9B68wQ7Tp2Z78L6h0u3ks06",
    stripePriceId: "price_1Tea6CKDbU4dI5jk5puBssVC",
    titleEn: "6-sessions Online Group Workshop Pilot Program",
    titleFr: "Programme pilote d’ateliers de groupe en ligne (6 séances)",
    description: "6 online group workshops (60 min each)",
  },

  {
    code: "O_WORKSHOP_MONTHLY",
    reference: "OW-MONTH",
    category: "corporate",
    delivery: "online",
    type: "monthly",
    price: 360,
    paymentLink: "https://buy.stripe.com/cNibJ23D9arzd1m7pU3ks07",
    stripePriceId: "price_1Tea6yKDbU4dI5jk69TDvh3J",
    titleEn: "Monthly Online Group Workshop Program",
    titleFr: "Programme mensuel d’ateliers de groupe en ligne",
    description: "4 workshops per month",
  },

  // =========================
  // CORPORATE - ONSITE
  // =========================

  {
    code: "O_S_WORKSHOP_SINGLE",
    reference: "OSW-SINGLE",
    category: "corporate",
    delivery: "onsite",
    type: "single",
    price: 220,
    paymentLink: "https://buy.stripe.com/fZueVe4Hd57fbXi11w3ks08",
    stripePriceId: "price_1TeaUhKDbU4dI5jkABJVO3kv",
    titleEn: "Single On-Site Group Workshop",
    titleFr: "Atelier de groupe sur site – séance unique",
    description: "90-minute on-site group workshop",
  },

  {
    code: "O_S_WORKSHOP_PILOT",
    reference: "OSW-PILOT",
    category: "corporate",
    delivery: "onsite",
    type: "pilot",
    price: 1200,
    paymentLink: "https://buy.stripe.com/00wdRaa1x6bjaTe8tY3ks09",
    stripePriceId: "price_1TeaVJKDbU4dI5jkMWIpaQN5",
    titleEn: "6-sessions On-Site Group Workshop Pilot Program",
    titleFr: "Programme pilote d’ateliers sur site (6 séances)",
    description: "6 on-site workshops",
  },

  {
    code: "O_S_WORKSHOP_MONTHLY",
    reference: "OSW-MONTH",
    category: "corporate",
    delivery: "onsite",
    type: "monthly",
    price: 700,
    paymentLink: "https://buy.stripe.com/bJe4gAc9FbvDgdy39E3ks0a",
    stripePriceId: "price_1TeaYaKDbU4dI5jkUTbb5BOx",
    titleEn: "Monthly On-Site Corporate Workshop Program",
    titleFr: "Programme mensuel d’ateliers sur site",
    description: "4 on-site workshops per month",
  },

  // =========================
  // prepa Khôlles = Online
  // =========================



  {
    code: "O_KHOLLES_SINGLE",
    reference: "OK-SINGLE",
    category: "prepa",
    delivery: "online",
    type: "single",
    price: 26,
    paymentLink: "https://buy.stripe.com/4gM8wQb5BgPX3qM5hM3ks0b",
    stripePriceId: "",
    titleEn: "Mock Khôlle Session",
    titleFr: "Séance de Khôlle simulée",
    description: "30-minute online Khôlle training session",
  },

  {
    code: "O_KHOLLES_PILOT",
    reference: "OK-PILOT",
    category: "prepa",
    delivery: "online",
    type: "pilot",
    price: 148,
    paymentLink: "https://buy.stripe.com/bJe28sb5Barze5q7pU3ks0c",
    stripePriceId: "",
    titleEn: "Khôlle Success Program",
    titleFr: "Programme de réussite de Khôlle",
    description: "6 online Khôlle training sessions (30 min each)",
  },

  {
    code: "O_KHOLLES_MONTHLY",
    reference: "OK-MONTH",
    category: "prepa",
    delivery: "online",
    type: "monthly",
    price: 94,
    paymentLink: "https://buy.stripe.com/3cI28s6PlbvD9PabGa3ks0d",
    stripePriceId: "",
    titleEn: "Khôlle Coaching",
    titleFr: "Coaching de Khôlle",
    description: "4 training sessions per month (30 min each)",
  },

 
];