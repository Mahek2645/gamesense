// GameSense In-Memory Database Engine
// Supports full full-stack data flow: Users, Games, TestRuns, Telemetry, Balance Issues, Recommendations, Retests, Reports, and Notifications.

import crypto from 'crypto'

export interface User {
  id: string
  email: string
  password: string // hashed password
  name: string
  role: 'user' | 'admin'
  workspaceName?: string
  createdAt: string
}

export interface Game {
  id: string
  userId: string
  name: string
  version: string
  genre: string
  engine: string
  description: string
  status: 'development' | 'testing' | 'released'
  activePlaytests: number
  balanceScore: number
  lastTested: string
  createdAt: string
  updatedAt: string
}

export interface TestRun {
  id: string
  gameId: string
  userId: string
  type: 'human' | 'ai' | 'hybrid'
  name: string
  status: 'pending' | 'running' | 'paused' | 'completed' | 'failed'
  progress?: number
  activeAgents?: number
  activeTesters?: number
  totalScenarios: number
  passedScenarios: number
  failedScenarios: number
  bugsFound: number
  criticalBugs: number
  testingTime: string
  coverage: number
  uxIssues: number
  performanceIssues: number
  createdAt: string
  completedAt?: string
}

export interface Bug {
  id: string
  gameId: string
  testRunId: string
  type: 'human' | 'ai' | 'both'
  severity: 'low' | 'medium' | 'high' | 'critical'
  title: string
  description: string
  status: 'open' | 'in_progress' | 'resolved'
  createdAt: string
}

export interface TelemetryEvent {
  id: string
  gameId: string
  testRunId: string
  eventType: 'player_death' | 'level_completed' | 'damage_dealt' | 'item_collected' | 'checkpoint_reached' | 'combat_ended' | 'physics_anomaly'
  actorType: 'ai' | 'human'
  actorId: string
  timestamp: string
  levelId: string
  data: Record<string, any>
}

export interface BalanceIssue {
  id: string
  gameId: string
  title: string
  category: 'combat' | 'economy' | 'progression' | 'physics' | 'ai_behavior'
  severity: 'critical' | 'high' | 'medium' | 'low'
  status: 'detected' | 'investigating' | 'resolved' | 'dismissed'
  confidence: number // 0 - 100
  detectedBy: 'ai' | 'human' | 'hybrid'
  metricTrigger: string
  description: string
  impactAnalysis: string
  affectedSegment: string
  createdAt: string
}

export interface Recommendation {
  id: string
  issueId: string
  gameId: string
  title: string
  parameter: string
  currentValue: string | number
  suggestedValue: string | number
  projectedDelta: string
  rationale: string
  status: 'pending' | 'accepted' | 'rejected' | 'applied'
  createdAt: string
  updatedAt: string
}

export interface RetestRun {
  id: string
  gameId: string
  recommendationId?: string
  name: string
  baseVersion: string
  testVersion: string
  status: 'scheduled' | 'running' | 'completed' | 'failed'
  improvementScore: number
  scenariosRerun: number
  resolvedIssuesCount: number
  createdAt: string
}

export interface Report {
  id: string
  gameId: string
  title: string
  type: 'executive_summary' | 'balance_audit' | 'ai_vs_human' | 'telemetry_deep_dive'
  format: 'pdf' | 'json' | 'markdown'
  generatedAt: string
  status: 'ready' | 'generating'
  metricsSummary: {
    scenariosTested: number
    balanceScore: number
    humanSatisfaction: number
    criticalAnomalies: number
    completionRate: string
  }
}

export interface NotificationItem {
  id: string
  userId: string
  title: string
  message: string
  type: 'alert' | 'success' | 'info' | 'warning'
  read: boolean
  createdAt: string
  link?: string
}

export interface Inquiry {
  id: string
  name: string
  email: string
  studio?: string
  engine?: string
  projectStage?: string
  message: string
  status: 'new' | 'read' | 'replied' | 'archived'
  createdAt: string
  notes?: string
}

// Global in-memory storage (persists across module reloads in development)
// @ts-ignore
if (!global._gamesenseUsers) {
  // @ts-ignore
  global._gamesenseUsers = []
  // @ts-ignore
  global._gamesenseGames = []
  // @ts-ignore
  global._gamesenseTestRuns = []
  // @ts-ignore
  global._gamesenseBugs = []
  // @ts-ignore
  global._gamesenseTelemetry = []
  // @ts-ignore
  global._gamesenseBalanceIssues = []
  // @ts-ignore
  global._gamesenseRecommendations = []
  // @ts-ignore
  global._gamesenseRetests = []
  // @ts-ignore
  global._gamesenseReports = []
  // @ts-ignore
  global._gamesenseNotifications = []
  // @ts-ignore
  global._gamesenseInquiries = []
}

// @ts-ignore
if (!global._gamesenseInquiries) {
  // @ts-ignore
  global._gamesenseInquiries = []
}

// @ts-ignore
const users: User[] = (global._gamesenseUsers = global._gamesenseUsers || [])
// @ts-ignore
const games: Game[] = (global._gamesenseGames = global._gamesenseGames || [])
// @ts-ignore
const testRuns: TestRun[] = (global._gamesenseTestRuns = global._gamesenseTestRuns || [])
// @ts-ignore
const bugs: Bug[] = (global._gamesenseBugs = global._gamesenseBugs || [])
// @ts-ignore
const telemetry: TelemetryEvent[] = (global._gamesenseTelemetry = global._gamesenseTelemetry || [])
// @ts-ignore
const balanceIssues: BalanceIssue[] = (global._gamesenseBalanceIssues = global._gamesenseBalanceIssues || [])
// @ts-ignore
const recommendations: Recommendation[] = (global._gamesenseRecommendations = global._gamesenseRecommendations || [])
// @ts-ignore
const retests: RetestRun[] = (global._gamesenseRetests = global._gamesenseRetests || [])
// @ts-ignore
const reports: Report[] = (global._gamesenseReports = global._gamesenseReports || [])
// @ts-ignore
const notifications: NotificationItem[] = (global._gamesenseNotifications = global._gamesenseNotifications || [])
// @ts-ignore
const inquiries: Inquiry[] = (global._gamesenseInquiries = global._gamesenseInquiries || [])

// Simple password hashing using crypto
export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password + 'gamesense-salt').digest('hex')
}

export function verifyPassword(password: string, hashedPassword: string): boolean {
  return hashPassword(password) === hashedPassword
}

// Initialize database with production-grade seed fixtures
export function initializeDatabase() {
  if (users.length === 0) {
    users.push(
      {
        id: 'admin-001',
        email: 'admin@gamesense.io',
        password: hashPassword('admin123'),
        name: 'System Administrator',
        role: 'admin',
        workspaceName: 'GameSense Global Ops',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'user-001',
        email: 'user@gamesense.io',
        password: hashPassword('user123'),
        name: 'Alex Rivera',
        role: 'user',
        workspaceName: 'Velocity Game Studios',
        createdAt: new Date().toISOString(),
      }
    )
  }

  if (games.length === 0) {
    games.push(
      {
        id: 'game-01',
        userId: 'user-001',
        name: 'Neon Drift',
        version: 'v1.4.2',
        genre: 'Cyberpunk Racing',
        engine: 'Unreal Engine 5.3',
        description: 'High-speed cyberpunk arcade drift sim with kinetic boost mechanics and dynamic neon tracks.',
        status: 'testing',
        activePlaytests: 2,
        balanceScore: 84,
        lastTested: '12 minutes ago',
        createdAt: new Date(Date.now() - 14 * 86400000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'game-02',
        userId: 'user-001',
        name: 'Starfall Tactics',
        version: 'v2.1.0',
        genre: 'Turn-based Strategy 4X',
        engine: 'Unity 2023.2 LTS',
        description: 'Tactical deep-space fleet battle simulator with modular ship customization and intricate tech web.',
        status: 'testing',
        activePlaytests: 1,
        balanceScore: 78,
        lastTested: '2 hours ago',
        createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'game-03',
        userId: 'user-001',
        name: 'Pocket Worlds',
        version: 'v0.9.8',
        genre: 'Cozy Multiplayer Sandbox',
        engine: 'Godot 4.2',
        description: 'Procedural voxel building and social life simulation with crafting and physics puzzles.',
        status: 'development',
        activePlaytests: 0,
        balanceScore: 91,
        lastTested: '3 days ago',
        createdAt: new Date(Date.now() - 45 * 86400000).toISOString(),
        updatedAt: new Date().toISOString(),
      }
    )
  }

  if (testRuns.length === 0) {
    testRuns.push(
      {
        id: 'test-01',
        gameId: 'game-01',
        userId: 'user-001',
        type: 'ai',
        name: 'AI Autonomous Regression Sweep 04',
        status: 'running',
        progress: 72,
        activeAgents: 8,
        activeTesters: 0,
        totalScenarios: 48,
        passedScenarios: 36,
        failedScenarios: 3,
        bugsFound: 4,
        criticalBugs: 1,
        testingTime: '18m 42s',
        coverage: 94,
        uxIssues: 2,
        performanceIssues: 4,
        createdAt: new Date(Date.now() - 18 * 60000).toISOString(),
      },
      {
        id: 'test-02',
        gameId: 'game-01',
        userId: 'user-001',
        type: 'human',
        name: 'Human Alpha Cohort Playtest 02',
        status: 'completed',
        progress: 100,
        activeAgents: 0,
        activeTesters: 24,
        totalScenarios: 50,
        passedScenarios: 42,
        failedScenarios: 6,
        bugsFound: 7,
        criticalBugs: 2,
        testingTime: '2h 34m',
        coverage: 78,
        uxIssues: 5,
        performanceIssues: 2,
        createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        completedAt: new Date(Date.now() - 2 * 86400000 + 7200000).toISOString(),
      },
      {
        id: 'test-03',
        gameId: 'game-01',
        userId: 'user-001',
        type: 'ai',
        name: 'AI Combat & Nitro Exploit Sweep',
        status: 'completed',
        progress: 100,
        activeAgents: 12,
        activeTesters: 0,
        totalScenarios: 50,
        passedScenarios: 45,
        failedScenarios: 5,
        bugsFound: 9,
        criticalBugs: 3,
        testingTime: '14m 10s',
        coverage: 96,
        uxIssues: 2,
        performanceIssues: 4,
        createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
        completedAt: new Date(Date.now() - 1 * 86400000 + 1120000).toISOString(),
      },
      {
        id: 'test-04',
        gameId: 'game-02',
        userId: 'user-001',
        type: 'human',
        name: 'Human Level 3 Sector Usability',
        status: 'paused',
        progress: 42,
        activeAgents: 0,
        activeTesters: 12,
        totalScenarios: 30,
        passedScenarios: 12,
        failedScenarios: 2,
        bugsFound: 2,
        criticalBugs: 0,
        testingTime: '45m 10s',
        coverage: 56,
        uxIssues: 3,
        performanceIssues: 1,
        createdAt: new Date(Date.now() - 4 * 3600000).toISOString(),
      },
      {
        id: 'test-05',
        gameId: 'game-02',
        userId: 'user-001',
        type: 'ai',
        name: 'AI Fleet Pathfinding Stress Test',
        status: 'failed',
        progress: 82,
        activeAgents: 6,
        activeTesters: 0,
        totalScenarios: 40,
        passedScenarios: 26,
        failedScenarios: 8,
        bugsFound: 5,
        criticalBugs: 4,
        testingTime: '14m 12s',
        coverage: 65,
        uxIssues: 0,
        performanceIssues: 6,
        createdAt: new Date(Date.now() - 6 * 3600000).toISOString(),
      }
    )
  }

  if (bugs.length === 0) {
    bugs.push(
      {
        id: 'bug-01',
        gameId: 'game-01',
        testRunId: 'test-01',
        type: 'ai',
        severity: 'critical',
        title: 'Infinite nitro exploit during drift chain recovery',
        description: 'AI agent detected physics glitch when rapidly chaining counter-steer inputs during apex exit, multiplying boost velocity by 3.4x.',
        status: 'open',
        createdAt: new Date(Date.now() - 12 * 60000).toISOString(),
      },
      {
        id: 'bug-02',
        gameId: 'game-01',
        testRunId: 'test-02',
        type: 'human',
        severity: 'medium',
        title: 'UI text overlapping on ultrawide HUD 32:9',
        description: 'Human testers reported speed indicator clipping into mini-map border on 3440x1440 resolution.',
        status: 'in_progress',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: 'bug-03',
        gameId: 'game-01',
        testRunId: 'test-03',
        type: 'both',
        severity: 'high',
        title: 'Collision mesh missing near Sector 7 ramp apex',
        description: 'Vehicle falls through road geometry when launched at angles exceeding 42 degrees with speed > 220 km/h.',
        status: 'open',
        createdAt: new Date(Date.now() - 43200000).toISOString(),
      }
    )
  }

  if (telemetry.length === 0) {
    const eventTypes: TelemetryEvent['eventType'][] = [
      'combat_ended', 'checkpoint_reached', 'damage_dealt', 'player_death', 'level_completed'
    ]
    const baseTime = Date.now()
    for (let i = 0; i < 20; i++) {
      telemetry.push({
        id: `tel-${1000 + i}`,
        gameId: 'game-01',
        testRunId: i % 2 === 0 ? 'test-01' : 'test-02',
        eventType: eventTypes[i % eventTypes.length],
        actorType: i % 2 === 0 ? 'ai' : 'human',
        actorId: i % 2 === 0 ? `agent-neon-${(i % 4) + 1}` : `tester-p-${(i % 12) + 1}`,
        timestamp: new Date(baseTime - (20 - i) * 24000).toISOString(),
        levelId: `sector-0${(i % 4) + 1}`,
        data: {
          speedKmh: Math.round(180 + Math.random() * 80),
          driftAngle: Math.round(15 + Math.random() * 50),
          boostGauge: Math.round(20 + Math.random() * 80),
          damage: Math.round(Math.random() * 35),
          completionMs: Math.round(45000 + Math.random() * 15000)
        }
      })
    }
  }

  if (balanceIssues.length === 0) {
    balanceIssues.push(
      {
        id: 'issue-01',
        gameId: 'game-01',
        title: 'Apex Booster Tier 3 Overpowered in Sector 4',
        category: 'combat',
        severity: 'critical',
        status: 'detected',
        confidence: 96,
        detectedBy: 'hybrid',
        metricTrigger: 'Win Rate 82.4% (> 55% target threshold)',
        description: 'Vehicles equipped with Apex Booster Tier 3 dominate lap times by a 14.2s margin, rendering alternative engine mods non-viable.',
        impactAnalysis: 'Severe churn risk in competitive multiplayer ladder; matches decided in first 20 seconds.',
        affectedSegment: 'Tier 3 competitive ladder & Sector 4 sprints',
        createdAt: new Date(Date.now() - 4 * 3600000).toISOString()
      },
      {
        id: 'issue-02',
        gameId: 'game-01',
        title: 'Sector 6 Hairpin Difficulty Spike for Human Testers',
        category: 'progression',
        severity: 'high',
        status: 'investigating',
        confidence: 91,
        detectedBy: 'human',
        metricTrigger: 'Failure Rate 64.8% vs AI 18.2%',
        description: 'Human testers hit barrier walls repeatedly due to abrupt camera pivot lag and insufficient visual cueing on entry.',
        impactAnalysis: 'High frustration index; 38% of playtesters abandoned trial after 3 consecutive failures.',
        affectedSegment: 'Mid-game campaign checkpoint 6-B',
        createdAt: new Date(Date.now() - 8 * 3600000).toISOString()
      },
      {
        id: 'issue-03',
        gameId: 'game-01',
        title: 'Scrap Currency Accumulation Deflation',
        category: 'economy',
        severity: 'medium',
        status: 'detected',
        confidence: 85,
        detectedBy: 'ai',
        metricTrigger: 'Scrap Surplus +340% by Level 10',
        description: 'Simulated AI economic runs show players hoard scrap with zero sink after upgrading tier 2 chassis.',
        impactAnalysis: 'Late-game store cosmetic transactions drop to 0; upgrade pacing broken.',
        affectedSegment: 'Endgame economy loop',
        createdAt: new Date(Date.now() - 24 * 3600000).toISOString()
      }
    )
  }

  if (recommendations.length === 0) {
    recommendations.push(
      {
        id: 'rec-01',
        issueId: 'issue-01',
        gameId: 'game-01',
        title: 'Normalize Apex Booster Multiplier & Heat Accumulation',
        parameter: 'booster_tier3_thrust_multiplier',
        currentValue: 2.35,
        suggestedValue: 1.85,
        projectedDelta: '+21% Competitive Parity, Win Rate 52.8%',
        rationale: 'Scaling thrust down by 21% while increasing cooldown duration by 1.2s brings win probability into balanced 50% target band without dampening player speed thrill.',
        status: 'pending',
        createdAt: new Date(Date.now() - 3 * 3600000).toISOString(),
        updatedAt: new Date(Date.now() - 3 * 3600000).toISOString()
      },
      {
        id: 'rec-02',
        issueId: 'issue-02',
        gameId: 'game-01',
        title: 'Widen Sector 6 Hairpin Apex Margin & Increase Braking Assist',
        parameter: 'sector6_apex_track_width_meters',
        currentValue: 14.0,
        suggestedValue: 16.5,
        projectedDelta: '-42% Wall Collisions, Failure Rate 22%',
        rationale: 'Widening track radius by 2.5m and adding subtle rumble audio cues reduces human failure rate from 64.8% down to predicted 22%.',
        status: 'accepted',
        createdAt: new Date(Date.now() - 6 * 3600000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 3600000).toISOString()
      },
      {
        id: 'rec-03',
        issueId: 'issue-03',
        gameId: 'game-01',
        title: 'Introduce Scrap-to-Decal Tuning Sink Loop',
        parameter: 'scrap_sink_rate_coefficient',
        currentValue: 0.15,
        suggestedValue: 0.45,
        projectedDelta: '-62% Excess Currency Inflation',
        rationale: 'Adding cosmetic decal tiers consumable via scrap balances the late-game surplus curve according to Monte Carlo AI tests.',
        status: 'applied',
        createdAt: new Date(Date.now() - 20 * 3600000).toISOString(),
        updatedAt: new Date(Date.now() - 5 * 3600000).toISOString()
      }
    )
  }

  if (retests.length === 0) {
    retests.push(
      {
        id: 'retest-01',
        gameId: 'game-01',
        recommendationId: 'rec-03',
        name: 'Economy Sink Validation Run v1.4.2 -> v1.4.3',
        baseVersion: 'v1.4.2',
        testVersion: 'v1.4.3-hotfix',
        status: 'completed',
        improvementScore: 88,
        scenariosRerun: 45,
        resolvedIssuesCount: 1,
        createdAt: new Date(Date.now() - 5 * 3600000).toISOString()
      },
      {
        id: 'retest-02',
        gameId: 'game-01',
        recommendationId: 'rec-02',
        name: 'Sector 6 Geometry & Cam Adjustment Verification',
        baseVersion: 'v1.4.2',
        testVersion: 'v1.4.3-candidate',
        status: 'running',
        improvementScore: 79,
        scenariosRerun: 24,
        resolvedIssuesCount: 1,
        createdAt: new Date(Date.now() - 30 * 60000).toISOString()
      }
    )
  }

  if (reports.length === 0) {
    reports.push(
      {
        id: 'rep-01',
        gameId: 'game-01',
        title: 'Neon Drift v1.4.2 Comprehensive Playtest Audit',
        type: 'executive_summary',
        format: 'pdf',
        generatedAt: new Date(Date.now() - 2 * 3600000).toISOString(),
        status: 'ready',
        metricsSummary: {
          scenariosTested: 148,
          balanceScore: 84,
          humanSatisfaction: 91,
          criticalAnomalies: 1,
          completionRate: '94.6%'
        }
      },
      {
        id: 'rep-02',
        gameId: 'game-01',
        title: 'AI vs Human Telemetry Discrepancy & Exploit Analysis',
        type: 'ai_vs_human',
        format: 'json',
        generatedAt: new Date(Date.now() - 12 * 3600000).toISOString(),
        status: 'ready',
        metricsSummary: {
          scenariosTested: 98,
          balanceScore: 78,
          humanSatisfaction: 86,
          criticalAnomalies: 3,
          completionRate: '88.2%'
        }
      }
    )
  }

  if (notifications.length === 0) {
    notifications.push(
      {
        id: 'notif-01',
        userId: 'user-001',
        title: 'Critical Exploit Detected',
        message: 'AI agent swarm detected infinite nitro exploit on Neon Drift apex drift recovery.',
        type: 'alert',
        read: false,
        createdAt: new Date(Date.now() - 10 * 60000).toISOString(),
        link: '/dashboard/issues'
      },
      {
        id: 'notif-02',
        userId: 'user-001',
        title: 'Recommendation Ready for Review',
        message: 'AI Balance Kernel prepared 3 parameter tuning options for Apex Booster Tier 3.',
        type: 'info',
        read: false,
        createdAt: new Date(Date.now() - 25 * 60000).toISOString(),
        link: '/dashboard/recommendations'
      },
      {
        id: 'notif-03',
        userId: 'user-001',
        title: 'Retest Run Completed',
        message: 'Retest v1.4.3 achieved an 88/100 Balance Improvement Score.',
        type: 'success',
        read: true,
        createdAt: new Date(Date.now() - 4 * 3600000).toISOString(),
        link: '/dashboard/comparison'
      }
    )
  }

  if (inquiries.length === 0) {
    inquiries.push(
      {
        id: 'inq-01',
        name: 'Elena Rostova',
        email: 'elena@valkyrieworks.com',
        studio: 'Valkyrie Works',
        engine: 'Unreal Engine 5.4',
        projectStage: 'In Active Alpha / Beta',
        message: 'We are developing an asymmetrical 4v1 dark fantasy melee game. We urgently need autonomous AI swarms to stress-test stamina consumption curves and hitbox frame data across 200 ping scenarios.',
        status: 'new',
        createdAt: new Date(Date.now() - 45 * 60000).toISOString(),
        notes: 'Priority high - looking for enterprise tier deployment.'
      },
      {
        id: 'inq-02',
        name: 'Marcus Chen',
        email: 'm.chen@polarisinteractive.gg',
        studio: 'Polaris Interactive',
        engine: 'Unity 2023.3',
        projectStage: 'Pre-Production / Prototype',
        message: 'Looking to integrate GameSense telemetry SDK to measure player emotional friction and disorientation during VR spaceship dogfights. Can we arrange an architect demo this Thursday?',
        status: 'read',
        createdAt: new Date(Date.now() - 3 * 3600000).toISOString(),
        notes: 'Requested Thursday demo. Scheduled call invite.'
      },
      {
        id: 'inq-03',
        name: 'Sara Lindqvist',
        email: 'sara@northwindstudios.se',
        studio: 'Northwind Studios',
        engine: 'Godot 4.3',
        projectStage: 'Post-Launch Live Ops',
        message: 'Our roguelike deckbuilder just launched in Early Access. Players complain boss relic drops feel unfair. We want to test automated mathematical balance sweeps across 10,000 simulated runs.',
        status: 'replied',
        createdAt: new Date(Date.now() - 26 * 3600000).toISOString(),
        notes: 'Replied with Godot SDK documentation & sample repo.'
      }
    )
  }
}

// User operations
export async function createUser(
  email: string,
  password: string,
  name: string,
  role: 'user' | 'admin' = 'user',
  workspaceName?: string
): Promise<User> {
  initializeDatabase()
  
  const hashedPassword = hashPassword(password)
  const user: User = {
    id: `user-${Date.now()}`,
    email: email.toLowerCase().trim(),
    password: hashedPassword,
    name: name || 'GameSense Explorer',
    role,
    workspaceName: workspaceName || `${name || 'GameSense'} Studio`,
    createdAt: new Date().toISOString()
  }
  
  users.push(user)
  return user
}

export async function getUserByEmail(email: string): Promise<User | null> {
  initializeDatabase()
  const cleanEmail = email.toLowerCase().trim()
  return users.find(u => u.email.toLowerCase().trim() === cleanEmail) || null
}

export async function getUserById(id: string): Promise<User | null> {
  initializeDatabase()
  return users.find(u => u.id === id) || null
}

export async function verifyUserPassword(user: User, password: string): Promise<boolean> {
  return verifyPassword(password, user.password)
}

export async function getAllUsers(): Promise<User[]> {
  initializeDatabase()
  return users
}

// Game operations
export async function createGame(
  userId: string,
  name: string,
  version: string,
  description: string,
  genre: string = 'Action / Adventure',
  engine: string = 'Unreal Engine 5'
): Promise<Game> {
  initializeDatabase()
  
  const game: Game = {
    id: `game-${Date.now()}`,
    userId,
    name,
    version,
    genre,
    engine,
    description,
    status: 'development',
    activePlaytests: 0,
    balanceScore: 82,
    lastTested: 'Just created',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  games.push(game)
  return game
}

export async function getGamesByUserId(userId: string): Promise<Game[]> {
  initializeDatabase()
  const userGames = games.filter(g => g.userId === userId)
  if (userGames.length === 0) {
    return games
  }
  return userGames
}

export async function getGameById(id: string): Promise<Game | null> {
  initializeDatabase()
  return games.find(g => g.id === id) || null
}

export async function getAllGames(): Promise<Game[]> {
  initializeDatabase()
  return games
}

// Test run operations
export async function createTestRun(
  gameId: string,
  userId: string,
  type: 'human' | 'ai' | 'hybrid',
  name: string
): Promise<TestRun> {
  initializeDatabase()
  
  const testRun: TestRun = {
    id: `test-${Date.now()}`,
    gameId,
    userId,
    type,
    name,
    status: 'running',
    progress: 10,
    activeAgents: type === 'human' ? 0 : 6,
    activeTesters: type === 'ai' ? 0 : 15,
    totalScenarios: 36,
    passedScenarios: 4,
    failedScenarios: 0,
    bugsFound: 1,
    criticalBugs: 0,
    testingTime: '1m 20s',
    coverage: 42,
    uxIssues: 1,
    performanceIssues: 0,
    createdAt: new Date().toISOString()
  }
  
  testRuns.unshift(testRun)
  return testRun
}

export async function getTestRunsByGameId(gameId: string): Promise<TestRun[]> {
  initializeDatabase()
  return testRuns.filter(t => t.gameId === gameId)
}

export async function getTestRunsByUserId(userId: string): Promise<TestRun[]> {
  initializeDatabase()
  const userRuns = testRuns.filter(t => t.userId === userId)
  if (userRuns.length === 0) {
    return testRuns
  }
  return userRuns
}

export async function getAllTestRuns(): Promise<TestRun[]> {
  initializeDatabase()
  return testRuns
}

export async function getTestRunById(id: string): Promise<TestRun | null> {
  initializeDatabase()
  return testRuns.find(t => t.id === id) || null
}

export async function updateTestRun(
  id: string,
  updates: Partial<TestRun>
): Promise<TestRun | null> {
  initializeDatabase()
  
  const index = testRuns.findIndex(t => t.id === id)
  if (index === -1) return null
  
  testRuns[index] = { ...testRuns[index], ...updates }
  return testRuns[index]
}

// Bug operations
export async function createBug(
  gameId: string,
  testRunId: string,
  type: 'human' | 'ai' | 'both',
  severity: 'low' | 'medium' | 'high' | 'critical',
  title: string,
  description: string
): Promise<Bug> {
  initializeDatabase()
  
  const bug: Bug = {
    id: `bug-${Date.now()}`,
    gameId,
    testRunId,
    type,
    severity,
    title,
    description,
    status: 'open',
    createdAt: new Date().toISOString()
  }
  
  bugs.unshift(bug)
  return bug
}

export async function getBugsByGameId(gameId: string): Promise<Bug[]> {
  initializeDatabase()
  return bugs.filter(b => b.gameId === gameId)
}

export async function getAllBugs(): Promise<Bug[]> {
  initializeDatabase()
  return bugs
}

// Telemetry operations
export async function ingestTelemetryEvent(
  gameId: string,
  testRunId: string,
  eventType: TelemetryEvent['eventType'],
  actorType: 'ai' | 'human',
  actorId: string,
  levelId: string,
  data: Record<string, any>
): Promise<TelemetryEvent> {
  initializeDatabase()
  const event: TelemetryEvent = {
    id: `tel-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    gameId,
    testRunId,
    eventType,
    actorType,
    actorId,
    levelId,
    timestamp: new Date().toISOString(),
    data
  }
  telemetry.unshift(event)
  if (telemetry.length > 500) {
    telemetry.pop()
  }
  return event
}

export async function getTelemetryEvents(gameId?: string, limit: number = 50): Promise<TelemetryEvent[]> {
  initializeDatabase()
  if (gameId) {
    return telemetry.filter(t => t.gameId === gameId).slice(0, limit)
  }
  return telemetry.slice(0, limit)
}

// Balance Issue operations
export async function getBalanceIssues(gameId?: string): Promise<BalanceIssue[]> {
  initializeDatabase()
  if (gameId) {
    return balanceIssues.filter(b => b.gameId === gameId)
  }
  return balanceIssues
}

export async function createBalanceIssue(issue: Omit<BalanceIssue, 'id' | 'createdAt'>): Promise<BalanceIssue> {
  initializeDatabase()
  const newIssue: BalanceIssue = {
    ...issue,
    id: `issue-${Date.now()}`,
    createdAt: new Date().toISOString()
  }
  balanceIssues.unshift(newIssue)
  return newIssue
}

export async function updateBalanceIssue(id: string, updates: Partial<BalanceIssue>): Promise<BalanceIssue | null> {
  initializeDatabase()
  const index = balanceIssues.findIndex(b => b.id === id)
  if (index === -1) return null
  balanceIssues[index] = { ...balanceIssues[index], ...updates }
  return balanceIssues[index]
}

// Recommendation operations
export async function getRecommendations(gameId?: string): Promise<Recommendation[]> {
  initializeDatabase()
  if (gameId) {
    return recommendations.filter(r => r.gameId === gameId)
  }
  return recommendations
}

export async function updateRecommendationStatus(
  id: string,
  status: 'pending' | 'accepted' | 'rejected' | 'applied'
): Promise<Recommendation | null> {
  initializeDatabase()
  const index = recommendations.findIndex(r => r.id === id)
  if (index === -1) return null
  recommendations[index] = {
    ...recommendations[index],
    status,
    updatedAt: new Date().toISOString()
  }
  return recommendations[index]
}

// Retest operations
export async function getRetests(gameId?: string): Promise<RetestRun[]> {
  initializeDatabase()
  if (gameId) {
    return retests.filter(r => r.gameId === gameId)
  }
  return retests
}

export async function createRetest(data: Omit<RetestRun, 'id' | 'createdAt'>): Promise<RetestRun> {
  initializeDatabase()
  const newRetest: RetestRun = {
    ...data,
    id: `retest-${Date.now()}`,
    createdAt: new Date().toISOString()
  }
  retests.unshift(newRetest)
  return newRetest
}

// Reports operations
export async function getReports(gameId?: string): Promise<Report[]> {
  initializeDatabase()
  if (gameId) {
    return reports.filter(r => r.gameId === gameId)
  }
  return reports
}

export async function generateReport(gameId: string, title: string, type: Report['type']): Promise<Report> {
  initializeDatabase()
  const newReport: Report = {
    id: `rep-${Date.now()}`,
    gameId,
    title,
    type,
    format: 'pdf',
    generatedAt: new Date().toISOString(),
    status: 'ready',
    metricsSummary: {
      scenariosTested: 164,
      balanceScore: 86,
      humanSatisfaction: 92,
      criticalAnomalies: 0,
      completionRate: '96.2%'
    }
  }
  reports.unshift(newReport)
  return newReport
}

// Notification operations
export async function getNotifications(userId?: string): Promise<NotificationItem[]> {
  initializeDatabase()
  if (userId) {
    return notifications.filter(n => n.userId === userId)
  }
  return notifications
}

export async function markNotificationAsRead(id: string): Promise<boolean> {
  initializeDatabase()
  const notif = notifications.find(n => n.id === id)
  if (notif) {
    notif.read = true
    return true
  }
  return false
}

// Inquiry operations
export async function getAllInquiries(): Promise<Inquiry[]> {
  initializeDatabase()
  return [...inquiries].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function createInquiry(data: {
  name: string
  email: string
  studio?: string
  engine?: string
  projectStage?: string
  message: string
}): Promise<Inquiry> {
  initializeDatabase()
  const inquiry: Inquiry = {
    id: `inq-${Date.now()}`,
    name: data.name,
    email: data.email.toLowerCase().trim(),
    studio: data.studio || 'Independent Developer',
    engine: data.engine || 'Unreal Engine 5',
    projectStage: data.projectStage || 'In Active Alpha / Beta',
    message: data.message,
    status: 'new',
    createdAt: new Date().toISOString()
  }
  inquiries.unshift(inquiry)
  return inquiry
}

export async function updateInquiryStatus(id: string, status: Inquiry['status'], notes?: string): Promise<Inquiry | null> {
  initializeDatabase()
  const inquiry = inquiries.find(i => i.id === id)
  if (inquiry) {
    inquiry.status = status
    if (notes !== undefined) inquiry.notes = notes
    return inquiry
  }
  return null
}

export async function deleteInquiry(id: string): Promise<boolean> {
  initializeDatabase()
  const index = inquiries.findIndex(i => i.id === id)
  if (index !== -1) {
    inquiries.splice(index, 1)
    return true
  }
  return false
}

// Analytics and comparison data
export async function getAnalyticsData() {
  initializeDatabase()
  
  const totalUsers = users.length
  const totalGames = games.length
  const humanTests = testRuns.filter(t => t.type === 'human').length
  const aiTests = testRuns.filter(t => t.type === 'ai').length
  const totalBugs = bugs.length
  const openBalanceIssues = balanceIssues.filter(b => b.status === 'detected' || b.status === 'investigating').length
  const activeRecommendations = recommendations.filter(r => r.status === 'pending' || r.status === 'accepted').length
  const telemetryEventCount = telemetry.length
  const totalInquiries = inquiries.length
  const newInquiries = inquiries.filter(i => i.status === 'new').length
  
  return {
    totalUsers,
    totalGames,
    humanTests,
    aiTests,
    totalBugs,
    openBalanceIssues,
    activeRecommendations,
    telemetryEventCount,
    totalInquiries,
    newInquiries
  }
}

export async function getComparisonData(gameId: string) {
  initializeDatabase()
  
  const gameTestRuns = await getTestRunsByGameId(gameId)
  const humanRuns = gameTestRuns.filter(t => t.type === 'human' && t.status === 'completed')
  const aiRuns = gameTestRuns.filter(t => t.type === 'ai' && t.status === 'completed')
  
  const fallbackHuman = {
    totalScenarios: 50,
    passed: 42,
    failed: 6,
    bugsFound: 7,
    criticalBugs: 2,
    testingTime: '2h 34m',
    coverage: 78,
    uxIssues: 5,
    performanceIssues: 2
  }

  const fallbackAI = {
    totalScenarios: 50,
    passed: 45,
    failed: 5,
    bugsFound: 9,
    criticalBugs: 3,
    testingTime: '18m 42s',
    coverage: 94,
    uxIssues: 2,
    performanceIssues: 4
  }

  const latestHuman = humanRuns.length > 0 ? humanRuns[humanRuns.length - 1] : null
  const latestAI = aiRuns.length > 0 ? aiRuns[aiRuns.length - 1] : null
  
  return {
    human: latestHuman ? {
      totalScenarios: latestHuman.totalScenarios,
      passed: latestHuman.passedScenarios,
      failed: latestHuman.failedScenarios,
      bugsFound: latestHuman.bugsFound,
      criticalBugs: latestHuman.criticalBugs,
      testingTime: latestHuman.testingTime,
      coverage: latestHuman.coverage,
      uxIssues: latestHuman.uxIssues,
      performanceIssues: latestHuman.performanceIssues
    } : fallbackHuman,
    ai: latestAI ? {
      totalScenarios: latestAI.totalScenarios,
      passed: latestAI.passedScenarios,
      failed: latestAI.failedScenarios,
      bugsFound: latestAI.bugsFound,
      criticalBugs: latestAI.criticalBugs,
      testingTime: latestAI.testingTime,
      coverage: latestAI.coverage,
      uxIssues: latestAI.uxIssues,
      performanceIssues: latestAI.performanceIssues
    } : fallbackAI
  }
}

export function debugDatabase() {
  console.log('=== GameSense In-Memory DB Info ===')
  console.log('Users:', users.map(u => ({ email: u.email, role: u.role, id: u.id })))
  console.log('Games:', games.length)
  console.log('Test Runs:', testRuns.length)
  console.log('Telemetry Events:', telemetry.length)
  console.log('Balance Issues:', balanceIssues.length)
  console.log('Recommendations:', recommendations.length)
  console.log('===================================')
}