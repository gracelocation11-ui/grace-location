export interface VehicleData {
  id: string
  slug: string
  brand: string
  model: string
  year: number
  category: 'luxury' | 'pickup' | 'suv' | 'berline' | 'economique' | 'groupe'
  categoryLabel: string
  seats: number
  pricePerDay: number
  currency: 'FCFA'
  features: string[]
  available: boolean
  recommended?: boolean
  gradient: string
}

export const VEHICLE_CATEGORIES = [
  { id: 'all', label: 'Tous' },
  { id: 'luxury', label: 'Luxe' },
  { id: 'suv', label: 'SUV' },
  { id: 'berline', label: 'Berlines' },
  { id: 'groupe', label: 'Groupe' },
  { id: 'economique', label: 'Économique' },
  { id: 'pickup', label: 'Pickup' },
]

export const VEHICLES_DATA: VehicleData[] = [
  { id: 'lc300', slug: 'toyota-lc300-2023', brand: 'Toyota', model: 'Land Cruiser 300', year: 2023, category: 'luxury', categoryLabel: 'Luxe Prestige', seats: 7, pricePerDay: 350000, currency: 'FCFA', features: ['Chauffeur inclus', 'Climatisation', 'Wi-Fi', 'Cuir premium', 'GPS'], available: true, recommended: true, gradient: 'linear-gradient(135deg,#1a1a08 0%,#2a2a10 100%)' },
  { id: 'lc200', slug: 'toyota-lc200-2018', brand: 'Toyota', model: 'Land Cruiser 200', year: 2018, category: 'luxury', categoryLabel: 'Luxe SUV', seats: 7, pricePerDay: 250000, currency: 'FCFA', features: ['Chauffeur inclus', '4×4', 'Climatisation', 'Wi-Fi'], available: true, gradient: 'linear-gradient(135deg,#0f0f1a 0%,#1a1a2a 100%)' },
  { id: 'prado', slug: 'toyota-prado-2022', brand: 'Toyota', model: 'Prado VX', year: 2022, category: 'luxury', categoryLabel: 'Luxe 4×4', seats: 7, pricePerDay: 150000, currency: 'FCFA', features: ['Chauffeur', '4×4', 'Climatisation', 'Cuir'], available: true, gradient: 'linear-gradient(135deg,#1a0808 0%,#2a1010 100%)' },
  { id: 'hilux', slug: 'toyota-hilux-2022', brand: 'Toyota', model: 'Hilux', year: 2022, category: 'pickup', categoryLabel: 'Pickup', seats: 5, pricePerDay: 100000, currency: 'FCFA', features: ['4×4', 'Benne', 'Robuste', 'Terrain difficile'], available: true, gradient: 'linear-gradient(135deg,#0a1018 0%,#121820 100%)' },
  { id: 'tucson', slug: 'hyundai-tucson-2023', brand: 'Hyundai', model: 'Tucson', year: 2023, category: 'suv', categoryLabel: 'SUV', seats: 5, pricePerDay: 120000, currency: 'FCFA', features: ['Climatisation', 'Bluetooth', 'Caméra recul'], available: true, gradient: 'linear-gradient(135deg,#0f1a0f 0%,#182818 100%)' },
  { id: 'sorento', slug: 'kia-sorento-2017', brand: 'Kia', model: 'Sorento', year: 2017, category: 'suv', categoryLabel: 'SUV 7 places', seats: 7, pricePerDay: 75000, currency: 'FCFA', features: ['7 places', 'Climatisation', 'Espace bagages'], available: true, gradient: 'linear-gradient(135deg,#1a0f1a 0%,#281828 100%)' },
  { id: 'sportage', slug: 'kia-sportage-2018', brand: 'Kia', model: 'Sportage', year: 2018, category: 'suv', categoryLabel: 'SUV Compact', seats: 5, pricePerDay: 75000, currency: 'FCFA', features: ['Climatisation', 'Confort', 'Économique'], available: true, gradient: 'linear-gradient(135deg,#0a1818 0%,#102020 100%)' },
  { id: 'pajero', slug: 'mitsubishi-pajero-2018', brand: 'Mitsubishi', model: 'Pajero GLS', year: 2018, category: 'suv', categoryLabel: 'SUV 4×4', seats: 7, pricePerDay: 85000, currency: 'FCFA', features: ['4×4', '7 places', 'Robuste'], available: true, gradient: 'linear-gradient(135deg,#181008 0%,#281808 100%)' },
  { id: 'sonata22', slug: 'hyundai-sonata-2022', brand: 'Hyundai', model: 'Sonata', year: 2022, category: 'berline', categoryLabel: 'Berline', seats: 5, pricePerDay: 90000, currency: 'FCFA', features: ['Climatisation', 'Confort', 'Bluetooth', 'Récent'], available: true, gradient: 'linear-gradient(135deg,#0f0f1a 0%,#181828 100%)' },
  { id: 'sonata17', slug: 'hyundai-sonata-2017', brand: 'Hyundai', model: 'Sonata', year: 2017, category: 'berline', categoryLabel: 'Berline', seats: 5, pricePerDay: 65000, currency: 'FCFA', features: ['Climatisation', 'Confort'], available: true, gradient: 'linear-gradient(135deg,#0a0a18 0%,#101020 100%)' },
  { id: 'grandeur', slug: 'hyundai-grandeur-2014', brand: 'Hyundai', model: 'Grandeur', year: 2014, category: 'berline', categoryLabel: 'Berline Executive', seats: 5, pricePerDay: 55000, currency: 'FCFA', features: ['Climatisation', 'Confort VIP'], available: true, gradient: 'linear-gradient(135deg,#18100a 0%,#281808 100%)' },
  { id: 'ciaz', slug: 'suzuki-ciaz-2022', brand: 'Suzuki', model: 'Ciaz', year: 2022, category: 'berline', categoryLabel: 'Berline', seats: 5, pricePerDay: 55000, currency: 'FCFA', features: ['Récent', 'Climatisation', 'Économique'], available: true, gradient: 'linear-gradient(135deg,#0a180a 0%,#102010 100%)' },
  { id: 'yaris', slug: 'toyota-yaris-2016', brand: 'Toyota', model: 'Yaris', year: 2016, category: 'economique', categoryLabel: 'Économique', seats: 5, pricePerDay: 45000, currency: 'FCFA', features: ['Économique', 'Climatisation'], available: true, gradient: 'linear-gradient(135deg,#181818 0%,#222222 100%)' },
  { id: 'baleno', slug: 'suzuki-baleno-2023', brand: 'Suzuki', model: 'Baleno GLX', year: 2023, category: 'economique', categoryLabel: 'Économique Récent', seats: 5, pricePerDay: 70000, currency: 'FCFA', features: ['Récent 2023', 'Climatisation', 'Confort'], available: true, gradient: 'linear-gradient(135deg,#0f1808 0%,#182010 100%)' },
  { id: 'picanto', slug: 'kia-picanto-2014', brand: 'Kia', model: 'Morning/Picanto', year: 2014, category: 'economique', categoryLabel: 'Économique', seats: 5, pricePerDay: 35000, currency: 'FCFA', features: ['Économique', 'Compact', 'Facile à garer'], available: true, gradient: 'linear-gradient(135deg,#181818 0%,#242424 100%)' },
  { id: 'hiace', slug: 'toyota-hiace', brand: 'Toyota', model: 'HiAce', year: 2020, category: 'groupe', categoryLabel: 'Minibus', seats: 15, pricePerDay: 165000, currency: 'FCFA', features: ['15 places', 'Climatisation', 'Transferts groupe', 'Événements'], available: true, gradient: 'linear-gradient(135deg,#0a1018 0%,#141c24 100%)' },
  { id: 'coaster', slug: 'toyota-coaster', brand: 'Toyota', model: 'Coaster', year: 2019, category: 'groupe', categoryLabel: 'Bus', seats: 30, pricePerDay: 275000, currency: 'FCFA', features: ['30 places', 'Climatisation', 'Grands groupes', 'CAN 2012'], available: true, gradient: 'linear-gradient(135deg,#08100a 0%,#101810 100%)' },
]

export function getVehicleBySlug(slug: string): VehicleData | undefined {
  return VEHICLES_DATA.find(v => v.slug === slug)
}

export function getVehiclesByCategory(cat: string): VehicleData[] {
  if (cat === 'all') return VEHICLES_DATA
  return VEHICLES_DATA.filter(v => v.category === cat)
}
