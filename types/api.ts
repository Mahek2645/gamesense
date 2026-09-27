/**
 * GameSense FastAPI Backend Contract TypeScript Definitions
 */

export interface AnalyticsOverview {
  totalSessions: number
  completedSessions: number
  failedSessions: number
  winRate: number
  averageDurationSeconds: number
  totalDeaths: number
  itemsCollected: number
  enemiesDefeated: number
  activePersonas: number
  humanSessions: number
  aiSessions: number
  averageCoverage: number
  totalBugs: number
}

export interface HeatmapPoint {
  x: number
  y: number
  intensity: number
  weight: number
  levelId: string
  timestamp?: string
}

export interface HeatmapResponse {
  type: 'DEATH' | 'MOVEMENT'
  points: HeatmapPoint[]
}

export interface PersonaMetrics {
  totalScenarios: number
  passed: number
  failed: number
  bugsFound: number
  criticalBugs: number
  durationSeconds: number
  coverage: number
  uxIssues: number
  performanceIssues: number
}

export interface PersonaComparison {
  human: PersonaMetrics
  ai: PersonaMetrics
}

export type SessionStatus = 'pending' | 'running' | 'paused' | 'completed' | 'failed'
export type SessionType = 'human' | 'ai' | 'hybrid'

export interface Session {
  id: string
  gameId: string
  type: SessionType
  name: string
  status: SessionStatus
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

export interface SessionListResponse {
  sessions: Session[]
}

export interface SessionDetail extends Session {
  description?: string
  scenarioDetails?: Array<{
    id: string
    title: string
    status: 'pass' | 'fail' | 'pending'
    executionTimeMs?: number
    notes?: string
  }>
}

export type RecommendationStatus = 'pending' | 'accepted' | 'rejected' | 'applied'

export interface Recommendation {
  id: string
  issueId: string
  gameId: string
  title: string
  parameter: string
  currentValue: string | number
  suggestedValue: string | number
  projectedDelta: number | string
  rationale: string
  status: RecommendationStatus
  createdAt: string
  updatedAt: string
}

export interface RecommendationResponse {
  success: boolean
  recommendations: Recommendation[]
  count: number
}

export interface RecommendationAnalysisResponse {
  success: boolean
  recommendations: Recommendation[]
  analyzedSessions: number
  generatedCount: number
}

export interface TelemetryEvent {
  id: string
  gameId: string
  testRunId: string
  eventType: string
  actorType: 'ai' | 'human'
  actorId: string
  timestamp: string
  levelId: string
  data: Record<string, unknown>
}

export interface TelemetryEventsResponse {
  success: boolean
  events: TelemetryEvent[]
  count: number
}
