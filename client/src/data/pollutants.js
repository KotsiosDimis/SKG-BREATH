const pollutants = [
  {
    id: 'co',
    title: '🔹 CO (Μονοξείδιο του Άνθρακα)',
    unit: 'μg/m³ ή ppm',
    source: 'Μηχανές εσωτερικής καύσης (π.χ. αυτοκίνητα), καύση ξύλου',
    safeLevel: '< 4 mg/m³ (ή 4000 μg/m³) → Καλή ποιότητα',
    qualityLevels: [
      { label: 'Καλή ποιότητα', range: '0 – 4000 μg/m³' },
      { label: 'Μέτρια ποιότητα', range: '4001 – 7000 μg/m³' },
      { label: 'Κακή ποιότητα', range: '> 7000 μg/m³' },
    ],
    sourceLink: {
      url: 'https://www.who.int/publications/i/item/9789240034228',
      text: 'WHO Air Quality Guidelines (2021), Table 0.1, σελ. 19',
    },
  },
  {
    id: 'no',
    title: '🔹 NO (Μονοξείδιο του Αζώτου)',
    unit: 'μg/m³',
    source: 'Καύση καυσίμων (οχήματα, σταθμοί ενέργειας), βιομηχανία',
    safeLevel: 'Δεν υπάρχει επίσημο όριο από τον WHO — χρησιμοποιούνται ενδεικτικές τιμές.',
    qualityLevels: [
      { label: 'Καλή ποιότητα', range: '0 – 50 μg/m³' },
      { label: 'Μέτρια ποιότητα', range: '51 – 100 μg/m³' },
      { label: 'Κακή ποιότητα', range: '> 100 μg/m³' },
    ],
    sourceLink: {
      url: 'https://www.eea.europa.eu/data-and-maps/indicators/air-quality-overview/assessment',
      text: 'EEA Air Quality Guidelines (based on monitoring practices)',
    },
  },
  {
    id: 'no2',
    title: '🔹 NO₂ (Διοξείδιο του Αζώτου)',
    unit: 'μg/m³',
    source: 'Αυτοκίνητα, σταθμοί ενέργειας',
    safeLevel: '< 200 μg/m³ → Καλή ποιότητα (μέση τιμή 1 ώρας)',
    qualityLevels: [
      { label: 'Καλή ποιότητα', range: '0 – 200 μg/m³' },
      { label: 'Μέτρια ποιότητα', range: '201 – 400 μg/m³' },
      { label: 'Κακή ποιότητα', range: '> 400 μg/m³' },
    ],
    sourceLink: {
      url: 'https://www.who.int/publications/i/item/9789240034228',
      text: 'WHO AQ Guidelines 2021, Table 0.1, σελ. 19',
    },
  },
  {
    id: 'o3',
    title: '🔹 O₃ (Όζον)',
    unit: 'μg/m³',
    source: 'Δευτερογενής ρύπος (από NOx, VOCs και ηλιακή ακτινοβολία)',
    safeLevel: '< 100 μg/m³ → Καλή ποιότητα (8ωρη μέση τιμή)',
    qualityLevels: [
      { label: 'Καλή ποιότητα', range: '0 – 100 μg/m³' },
      { label: 'Μέτρια ποιότητα', range: '101 – 180 μg/m³' },
      { label: 'Κακή ποιότητα', range: '> 180 μg/m³' },
    ],
    sourceLink: {
      url: 'https://www.who.int/publications/i/item/9789240034228',
      text: 'WHO AQ Guidelines 2021, Table 0.1, σελ. 19',
    },
  },
  {
    id: 'so2',
    title: '🔹 SO₂ (Διοξείδιο του Θείου)',
    unit: 'μg/m³',
    source: 'Καύση άνθρακα και πετρελαίου',
    safeLevel: '< 350 μg/m³ → Καλή ποιότητα (μέση τιμή 1 ώρας)',
    qualityLevels: [
      { label: 'Καλή ποιότητα', range: '0 – 350 μg/m³' },
      { label: 'Μέτρια ποιότητα', range: '351 – 500 μg/m³' },
      { label: 'Κακή ποιότητα', range: '> 500 μg/m³' },
    ],
    sourceLink: {
      url: 'https://www.who.int/publications/i/item/9789240034228',
      text: 'WHO AQ Guidelines 2021, Table 0.1, σελ. 19',
    },
  },
  {
    id: 'pm10',
    title: '🔹 PM10 (Αιωρούμενα σωματίδια <10μm)',
    unit: 'μg/m³',
    source: 'Σκόνη, καύση, δρόμοι',
    safeLevel: '< 20 μg/m³ → Καλή ποιότητα (24ωρη μέση τιμή)',
    qualityLevels: [
      { label: 'Καλή ποιότητα', range: '0 – 20 μg/m³' },
      { label: 'Μέτρια ποιότητα', range: '21 – 50 μg/m³' },
      { label: 'Κακή ποιότητα', range: '> 50 μg/m³' },
    ],
    sourceLink: {
      url: 'https://www.who.int/publications/i/item/9789240034228',
      text: 'WHO AQ Guidelines 2021, Table 0.1, σελ. 19',
    },
  },
  {
    id: 'pm25',
    title: '🔹 PM2.5 (Αιωρούμενα σωματίδια <2.5μm)',
    unit: 'μg/m³',
    source: 'Καύση, σκόνη, βιομηχανία',
    safeLevel: '< 15 μg/m³ → Καλή ποιότητα (24ωρη μέση τιμή)',
    qualityLevels: [
      { label: 'Καλή ποιότητα', range: '0 – 15 μg/m³' },
      { label: 'Μέτρια ποιότητα', range: '16 – 25 μg/m³' },
      { label: 'Κακή ποιότητα', range: '> 25 μg/m³' },
    ],
    sourceLink: {
      url: 'https://www.who.int/publications/i/item/9789240034228',
      text: 'WHO AQ Guidelines 2021, Table 0.1, σελ. 19',
    },
  },
  {
    id: 'pm1',
    title: '🔹 PM1 (Αιωρούμενα σωματίδια <1μm)',
    unit: 'μg/m³',
    source: 'Καύση, αιθάλη, βιομηχανικές εκπομπές',
    safeLevel: 'Δεν υπάρχουν επίσημα όρια από WHO — ενδεικτική κατηγοριοποίηση.',
    qualityLevels: [
      { label: 'Καλή ποιότητα', range: '0 – 10 μg/m³' },
      { label: 'Μέτρια ποιότητα', range: '11 – 20 μg/m³' },
      { label: 'Κακή ποιότητα', range: '> 20 μg/m³' },
    ],
    sourceLink: {
      url: 'https://www.sciencedirect.com/science/article/abs/pii/S0048969720374701',
      text: 'Scientific estimate for PM1 exposure levels',
    },
  },
  {
    id: 'um003',
    title: '🔹 PM0.3 (Αριθμός σωματιδίων <0.3μm)',
    unit: 'particles/cm³',
    source: 'Καπνός, εσωτερική ρύπανση, λέιζερ/αισθητήρες',
    safeLevel: 'Δεν υπάρχουν όρια ΠΟΥ — μετράται σε πλήθος σωματιδίων ανά cm³.',
    qualityLevels: [
      { label: 'Καλή ποιότητα', range: '0 – 10000 particles/cm³' },
      { label: 'Μέτρια ποιότητα', range: '10001 – 30000 particles/cm³' },
      { label: 'Κακή ποιότητα', range: '> 30000 particles/cm³' },
    ],
    sourceLink: {
      url: 'https://www.sciencedirect.com/science/article/abs/pii/S0048969720360442',
      text: 'Scientific estimation for PM0.3 particle count',
    },
  },

  // {
  //   id: 'nh3',
  //   title: '🔹 NH₃ (Αμμωνία)',
  //   unit: 'μg/m³',
  //   source: 'Γεωργία, λύματα, βιομηχανία',
  //   safeLevel: 'Δεν υπάρχει αυστηρό όριο από ΠΟΥ για την αμμωνία στην ατμόσφαιρα.',
  //   qualityLevels: [
  //     { label: 'Καλή ποιότητα', range: '0 μg/m³' },
  //     { label: 'Μέτρια ποιότητα', range: '—' },
  //     { label: 'Κακή ποιότητα', range: '—' },
  //   ],
  //   sourceLink: {
  //     url: 'https://www.who.int/publications/i/item/9789240034228',
  //     text: 'WHO AQ Guidelines 2021',
  //   },
  // },
];

export default pollutants;
