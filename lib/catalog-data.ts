export interface CatalogItem {
  id: string
  name: string
  description?: string
  category: string
  price: number
  unit: string
  minQty?: number
}

export const CATALOG_CATEGORIES = [
  { id: 'tentes', label: 'Tentes & Structures' },
  { id: 'chaises', label: 'Chaises' },
  { id: 'tables', label: 'Tables' },
  { id: 'verres', label: 'Verres & Vaisselle' },
  { id: 'couverts', label: 'Couverts' },
  { id: 'decorations', label: 'Décorations' },
  { id: 'multimedia', label: 'Multimédia' },
]

export const CATALOG_ITEMS: CatalogItem[] = [
  // TENTES
  { id: 'tente-12x7', name: 'Tente 12×7m', description: '150 places sans tables / 100 avec tables', category: 'tentes', price: 50000, unit: 'unité' },
  { id: 'tente-9x7', name: 'Tente 9×7m', description: '100 places sans tables / 70 avec tables', category: 'tentes', price: 45000, unit: 'unité' },
  { id: 'tente-8x5', name: 'Tente 8×5m', description: '70 places sans tables / 50 avec tables', category: 'tentes', price: 35000, unit: 'unité' },
  { id: 'tente-6x5', name: 'Tente 6×5m', description: '50 places sans tables / 35 avec tables', category: 'tentes', price: 30000, unit: 'unité' },
  { id: 'tente-6x4', name: 'Tente 6×4m', description: '40 places sans tables / 30 avec tables', category: 'tentes', price: 25000, unit: 'unité' },
  { id: 'tente-3x4', name: 'Tente 3×4m', description: '20 places sans tables / 12 avec tables', category: 'tentes', price: 20000, unit: 'unité' },
  { id: 'tente-sur-mesure', name: 'Tente sur mesure', description: 'Fabrication sur mesure', category: 'tentes', price: 22500, unit: 'm²' },
  { id: 'tente-pagode', name: 'Tente Pagode', description: 'Tente pagode premium', category: 'tentes', price: 100000, unit: 'unité' },
  { id: 'pagode-plancher', name: 'Pagode Plancher+Moquette', description: 'Tente pagode avec plancher et moquette', category: 'tentes', price: 250000, unit: 'unité' },
  { id: 'tente-vip-simple', name: 'Tente VIP simple', category: 'tentes', price: 2500, unit: 'm²', minQty: 10 },
  { id: 'tente-vip-plancher', name: 'Tente VIP Plancher+Moquette', category: 'tentes', price: 6000, unit: 'm²', minQty: 10 },
  { id: 'tente-vip-clim', name: 'Tente VIP Plancher+Moquette+Clim', category: 'tentes', price: 12000, unit: 'm²', minQty: 10 },
  { id: 'reglette', name: 'Réglette', category: 'tentes', price: 5000, unit: 'unité' },
  // CHAISES
  { id: 'chaise-plastique', name: 'Chaise plastique', category: 'chaises', price: 250, unit: 'unité', minQty: 10 },
  { id: 'chaise-inox', name: 'Chaise plastique pied inox', category: 'chaises', price: 700, unit: 'unité', minQty: 10 },
  { id: 'steel-chaise', name: 'Steel chaise', category: 'chaises', price: 400, unit: 'unité', minQty: 10 },
  { id: 'chaise-vip', name: 'Chaise VIP', category: 'chaises', price: 2000, unit: 'unité', minQty: 10 },
  { id: 'chaise-vip-accoudoir', name: 'Chaise VIP accoudoir', category: 'chaises', price: 10000, unit: 'unité', minQty: 5 },
  { id: 'chaise-vip-bois', name: 'Chaise VIP classique bois', category: 'chaises', price: 10000, unit: 'unité', minQty: 5 },
  { id: 'fauteuil', name: 'Fauteuil', category: 'chaises', price: 50000, unit: 'unité', minQty: 1 },
  { id: 'housse-vip', name: 'Housse chaise VIP', category: 'chaises', price: 2000, unit: 'unité', minQty: 10 },
  // TABLES
  { id: 'table-vip-ronde', name: 'Table VIP ronde 10-14 places', category: 'tables', price: 6000, unit: 'unité' },
  { id: 'table-vip-ovale', name: 'Table VIP ovale', category: 'tables', price: 6000, unit: 'unité' },
  { id: 'table-vip-rect', name: 'Table VIP rectangulaire', category: 'tables', price: 6000, unit: 'unité' },
  { id: 'treteaux-12', name: 'Tréteaux 12 places', category: 'tables', price: 4000, unit: 'unité' },
  { id: 'treteaux-10', name: 'Tréteaux 10 places', category: 'tables', price: 2500, unit: 'unité' },
  { id: 'treteaux-8', name: 'Tréteaux 8 places', category: 'tables', price: 2000, unit: 'unité' },
  { id: 'table-plastique-8', name: 'Table plastique 8 places', category: 'tables', price: 2500, unit: 'unité' },
  { id: 'table-plastique-6', name: 'Table plastique 6 places', category: 'tables', price: 2000, unit: 'unité' },
  { id: 'table-ronde-10', name: 'Table ronde 10 places (1.5m)', category: 'tables', price: 3500, unit: 'unité' },
  { id: 'pupitre', name: 'Pupitre conférencier', category: 'tables', price: 50000, unit: 'unité' },
  // VERRES
  { id: 'flute', name: 'Flûte à champagne', category: 'verres', price: 400, unit: 'unité', minQty: 10 },
  { id: 'verre-eau', name: 'Verre à eau', category: 'verres', price: 400, unit: 'unité', minQty: 10 },
  { id: 'verre-vin', name: 'Verre à vin', category: 'verres', price: 400, unit: 'unité', minQty: 10 },
  { id: 'verre-simple', name: 'Verre simple', category: 'verres', price: 250, unit: 'unité', minQty: 10 },
  { id: 'touque', name: 'Touque', category: 'verres', price: 4500, unit: 'unité' },
  { id: 'seau-champagne', name: 'Seau à champagne', category: 'verres', price: 3000, unit: 'unité' },
  { id: 'seau-glace', name: 'Seau à glace', category: 'verres', price: 1500, unit: 'unité' },
  { id: 'plateau', name: 'Plateau de service', category: 'verres', price: 2500, unit: 'unité' },
  { id: 'marmite', name: 'Marmite chauffante', category: 'verres', price: 10000, unit: 'unité' },
  { id: 'plonge', name: 'Plonge 100 couverts', category: 'verres', price: 10000, unit: 'service' },
  // COUVERTS
  { id: 'couvert-simple', name: 'Couvert simple', category: 'couverts', price: 700, unit: 'unité', minQty: 10 },
  { id: 'couvert-assiette', name: 'Couvert + assiette dessert', category: 'couverts', price: 950, unit: 'unité', minQty: 10 },
  { id: 'couvert-vip', name: 'Couvert VIP', category: 'couverts', price: 2500, unit: 'unité', minQty: 10 },
  { id: 'assiette-dessert', name: 'Assiette dessert', category: 'couverts', price: 250, unit: 'unité', minQty: 10 },
  // DECORATIONS
  { id: 'nappe', name: 'Nappe de table', category: 'decorations', price: 3500, unit: 'unité', minQty: 5 },
  { id: 'surnappe', name: 'Surnappe', category: 'decorations', price: 2000, unit: 'unité', minQty: 5 },
  { id: 'juponnage', name: 'Juponnage', category: 'decorations', price: 10000, unit: 'unité' },
  { id: 'serviette', name: 'Serviette de table', category: 'decorations', price: 250, unit: 'unité', minQty: 20 },
  { id: 'habillage-honneur', name: "Habillage table d'honneur", category: 'decorations', price: 70000, unit: 'forfait' },
  { id: 'habillage-buffet', name: 'Habillage buffet', category: 'decorations', price: 20000, unit: 'forfait' },
  { id: 'habillage-bar', name: 'Habillage bar', category: 'decorations', price: 15000, unit: 'forfait' },
  // MULTIMEDIA
  { id: 'sono', name: 'Sonorisation complète (24h)', category: 'multimedia', price: 150000, unit: 'jour' },
  { id: 'camera', name: 'Caméra reportage (90 min)', category: 'multimedia', price: 80000, unit: 'service' },
  { id: 'groupe-elec', name: 'Groupe électrogène', category: 'multimedia', price: 200000, unit: 'jour' },
]

export function getCatalogByCategory(category: string): CatalogItem[] {
  return CATALOG_ITEMS.filter(i => i.category === category)
}
