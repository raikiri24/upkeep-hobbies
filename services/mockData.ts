import { User, Product, Tournament, MatchLog, SalesData } from '../types';

export const MOCK_USERS: User[] = 
  [
  {
    "id": "692a062ccd45f83fab8055a5",
    "name": "Ninong",
    "email": "ninong@upkeep.com",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Ninong",
    "beybladeStats": {
      "spinFinishes": 7,
      "overFinishes": 4,
      "burstFinishes": 0,
      "extremeFinishes": 1
    }
  },
  {
    "id": "692a062ccd45f83fab8055a6",
    "name": "ATX",
    "email": "atx@upkeep.com",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=ATX",
    "beybladeStats": {
      "spinFinishes": 3,
      "overFinishes": 1,
      "burstFinishes": 0,
      "extremeFinishes": 4
    }
  },
  {
    "id": "692a062ccd45f83fab8055a7",
    "name": "Badmeeko",
    "email": "badmeeko@upkeep.com",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Badmeeko",
    "beybladeStats": {
      "spinFinishes": 4,
      "overFinishes": 3,
      "burstFinishes": 1,
      "extremeFinishes": 2
    }
  },
  {
    "id": "692a062ccd45f83fab8055a8",
    "name": "Jacob P",
    "email": "jacobp@upkeep.com",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=JacobP",
    "beybladeStats": {
      "spinFinishes": 3,
      "overFinishes": 3,
      "burstFinishes": 0,
      "extremeFinishes": 0
    }
  },
  {
    "id": "692a062ccd45f83fab8055a9",
    "name": "GG Liam",
    "email": "ggliam@upkeep.com",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=GGLiam",
    "beybladeStats": {
      "spinFinishes": 9,
      "overFinishes": 3,
      "burstFinishes": 1,
      "extremeFinishes": 0
    }
  },
  {
    "id": "692a062ccd45f83fab8055aa",
    "name": "Mgod",
    "email": "mgod@upkeep.com",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Mgod",
    "beybladeStats": {
      "spinFinishes": 3,
      "overFinishes": 3,
      "burstFinishes": 1,
      "extremeFinishes": 1
    }
  },
  {
    "id": "692a062ccd45f83fab8055ab",
    "name": "Bruno",
    "email": "bruno@upkeep.com",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Bruno",
    "beybladeStats": {
      "spinFinishes": 3,
      "overFinishes": 4,
      "burstFinishes": 1,
      "extremeFinishes": 0
    }
  },
  {
    "id": "692a062ccd45f83fab8055ac",
    "name": "RRBX.Rayfox",
    "email": "rayfox@upkeep.com",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Rayfox",
    "beybladeStats": {
      "spinFinishes": 2,
      "overFinishes": 2,
      "burstFinishes": 0,
      "extremeFinishes": 2
    }
  },
  {
    "id": "692a062ccd45f83fab8055ad",
    "name": "Nutellakopi",
    "email": "nutellakopi@upkeep.com",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Nutellakopi",
    "beybladeStats": {
      "spinFinishes": 2,
      "overFinishes": 1,
      "burstFinishes": 0,
      "extremeFinishes": 3
    }
  },
  {
    "id": "692a062ccd45f83fab8055ae",
    "name": "Sleeves",
    "email": "sleeves@upkeep.com",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Sleeves",
    "beybladeStats": {
      "spinFinishes": 4,
      "overFinishes": 1,
      "burstFinishes": 2,
      "extremeFinishes": 1
    }
  },
  {
    "id": "692a062ccd45f83fab8055af",
    "name": "GG Kurenai",
    "email": "ggkurenai@upkeep.com",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=GGKurenai",
    "beybladeStats": {
      "spinFinishes": 3,
      "overFinishes": 0,
      "burstFinishes": 2,
      "extremeFinishes": 2
    }
  },
  {
    "id": "692a062ccd45f83fab8055b0",
    "name": "Cy",
    "email": "cy@upkeep.com",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Cy",
    "beybladeStats": {
      "spinFinishes": 2,
      "overFinishes": 2,
      "burstFinishes": 1,
      "extremeFinishes": 1
    }
  },
  {
    "id": "692a062ccd45f83fab8055b1",
    "name": "Hotplate",
    "email": "hotplate@upkeep.com",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Hotplate",
    "beybladeStats": {
      "spinFinishes": 2,
      "overFinishes": 2,
      "burstFinishes": 0,
      "extremeFinishes": 2
    }
  },
  {
    "id": "692a062ccd45f83fab8055b2",
    "name": "Judge Santino",
    "email": "judgesantino@upkeep.com",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=JudgeSantino",
    "beybladeStats": {
      "spinFinishes": 5,
      "overFinishes": 1,
      "burstFinishes": 0,
      "extremeFinishes": 1
    }
  },
  {
    "id": "692a062ccd45f83fab8055b3",
    "name": "Rae",
    "email": "rae@upkeep.com",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Rae",
    "beybladeStats": {
      "spinFinishes": 9,
      "overFinishes": 1,
      "burstFinishes": 1,
      "extremeFinishes": 0
    }
  },
  {
    "id": "692a062ccd45f83fab8055b4",
    "name": "Egan",
    "email": "egan@upkeep.com",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Egan",
    "beybladeStats": {
      "spinFinishes": 2,
      "overFinishes": 2,
      "burstFinishes": 0,
      "extremeFinishes": 1
    }
  },
  {
    "id": "692a062ccd45f83fab8055b5",
    "name": "HJ",
    "email": "hj@upkeep.com",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=HJ",
    "beybladeStats": {
      "spinFinishes": 2,
      "overFinishes": 2,
      "burstFinishes": 0,
      "extremeFinishes": 0
    }
  },
  {
    "id": "692a062ccd45f83fab8055b6",
    "name": "Enzo",
    "email": "enzo@upkeep.com",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Enzo",
    "beybladeStats": {
      "spinFinishes": 4,
      "overFinishes": 1,
      "burstFinishes": 0,
      "extremeFinishes": 0
    }
  },
  {
    "id": "692a062ccd45f83fab8055b7",
    "name": "Leandro",
    "email": "leandro@upkeep.com",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Leandro",
    "beybladeStats": {
      "spinFinishes": 2,
      "overFinishes": 0,
      "burstFinishes": 1,
      "extremeFinishes": 0
    }
  },
  {
    "id": "692a062ccd45f83fab8055b8",
    "name": "GG.Verilux",
    "email": "gg.verilux@upkeep.com",
    "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=GGVerilux",
    "beybladeStats": {
      "spinFinishes": 1,
      "overFinishes": 0,
      "burstFinishes": 0,
      "extremeFinishes": 0
    }
  }
]




export const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Beyblade X Starter Pack', category: 'Beyblade', price: 19.99, stock: 50, image: 'https://picsum.photos/seed/bey1/300/200' },
  { id: 'p2', name: 'Premium Launcher Grip', category: 'Accessories', price: 12.99, stock: 30, image: 'https://picsum.photos/seed/bey2/300/200' },
  { id: 'p3', name: 'Stadium Arena Pro', category: 'Arenas', price: 45.00, stock: 15, image: 'https://picsum.photos/seed/bey3/300/200' },
  { id: 'p4', name: 'Maintenance Kit', category: 'Supplies', price: 9.50, stock: 85, image: 'https://picsum.photos/seed/bey4/300/200' },
];

export const MOCK_TOURNAMENTS: Tournament[] = [
  {
  id: "692a0693cd45f83fab8055ba",
  name: "Ranked Game November 29, 2025",
  date: "2025-11-29",
  game: "Beyblade X",
  season: 1,
  status: "COMPLETED",
  participants: [
    "692a062ccd45f83fab8055af",
    "692a062ccd45f83fab8055b0",
    "692a062ccd45f83fab8055b1",
    "692a062ccd45f83fab8055b2",
    "692a062ccd45f83fab8055b3",
    "692a062ccd45f83fab8055b4",
    "692a062ccd45f83fab8055b5",
    "692a062ccd45f83fab8055b6",
    "692a062ccd45f83fab8055b7",
    "692a062ccd45f83fab8055b8",
    "692a062ccd45f83fab8055a5",
    "692a062ccd45f83fab8055a6",
    "692a062ccd45f83fab8055a7",
    "692a062ccd45f83fab8055a8",
    "692a062ccd45f83fab8055a9",
    "692a062ccd45f83fab8055aa",
    "692a062ccd45f83fab8055ab",
    "692a062ccd45f83fab8055ac",
    "692a062ccd45f83fab8055ad",
    "692a062ccd45f83fab8055ae"
  ],
  maxPlayers: 20,
  standings: [
    { userId: "692a062ccd45f83fab8055a5", rank: 1, score: "4-0-0", notes: "Undefeated" },
    { userId: "692a062ccd45f83fab8055a6", rank: 2, score: "3-1-0", notes: "" },
    { userId: "692a062ccd45f83fab8055a7", rank: 3, score: "3-1-0", notes: "" },
    { userId: "692a062ccd45f83fab8055a8", rank: 4, score: "3-1-0", notes: "" },
    { userId: "692a062ccd45f83fab8055a9", rank: 5, score: "3-1-0", notes: "" },
    { userId: "692a062ccd45f83fab8055aa", rank: 6, score: "3-1-0", notes: "" },
    { userId: "692a062ccd45f83fab8055ab", rank: 7, score: "2-2-0", notes: "" },
    { userId: "692a062ccd45f83fab8055ac", rank: 8, score: "2-2-0", notes: "" },
    { userId: "692a062ccd45f83fab8055ad", rank: 9, score: "2-2-0", notes: "" },
    { userId: "692a062ccd45f83fab8055ae", rank: 10, score: "2-2-0", notes: "" },
    { userId: "692a062ccd45f83fab8055af", rank: 11, score: "2-2-0", notes: "" },
    { userId: "692a062ccd45f83fab8055b0", rank: 12, score: "2-2-0", notes: "" },
    { userId: "692a062ccd45f83fab8055b1", rank: 13, score: "2-2-0", notes: "" },
    { userId: "692a062ccd45f83fab8055b2", rank: 14, score: "2-2-0", notes: "" },
    { userId: "692a062ccd45f83fab8055b3", rank: 15, score: "1-3-0", notes: "" },
    { userId: "692a062ccd45f83fab8055b4", rank: 16, score: "1-3-0", notes: "" },
    { userId: "692a062ccd45f83fab8055b5", rank: 17, score: "1-3-0", notes: "" },
    { userId: "692a062ccd45f83fab8055b6", rank: 18, score: "1-3-0", notes: "" },
    { userId: "692a062ccd45f83fab8055b7", rank: 19, score: "1-3-0", notes: "" },
    { userId: "692a062ccd45f83fab8055b8", rank: 20, score: "0-4-0", notes: "" }
  ]
}
];

export const MOCK_MATCHES: MatchLog[] = [
  { id: 'm1', tournamentId: 't1', player1Id: 'u3', player2Id: 'u4', player1Score: 3, player2Score: 1, winnerId: 'u3' },
  { id: 'm2', tournamentId: 't1', player1Id: 'u5', player2Id: 'u6', player1Score: 2, player2Score: 3, winnerId: 'u6' }
];

export const MOCK_SALES: SalesData[] = [
  { date: 'Mon', amount: 450 },
  { date: 'Tue', amount: 320 },
  { date: 'Wed', amount: 550 },
  { date: 'Thu', amount: 480 },
  { date: 'Fri', amount: 1200 },
  { date: 'Sat', amount: 1500 },
  { date: 'Sun', amount: 900 },
];