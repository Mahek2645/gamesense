/**
 * GameSense Centralized API Client
 * Interfaces directly with the FastAPI backend (or local proxy fallback)
 * Configured via NEXT_PUBLIC_API_URL
 */

import {
  AnalyticsOverview,
  HeatmapResponse,
  PersonaComparison,
  Session,
  SessionListResponse,
  SessionDetail,
  Recommendation,
  RecommendationResponse,
  RecommendationAnalysisResponse,
  RecommendationStatus,
  TelemetryEvent,
  TelemetryEventsResponse,
} from '@/types/api'

// Base URL: falls back to relative '/api' if NEXT_PUBLIC_API_URL is unset
const getBaseUrl = (): string => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL
  if (envUrl && envUrl.trim() !== '') {
    return envUrl.replace(/\/$/, '')
  }
  return ''
}

export class ApiError extends Error {
  status: number
  data?: unknown

  constructor(message: string, status: number, data?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const baseUrl = getBaseUrl()
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  const url = `${baseUrl}${cleanEndpoint}`

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
    })

    if (!res.ok) {
      let errorData: unknown
      try {
        errorData = await res.json()
      } catch {
        errorData = await res.text()
      }
      throw new ApiError(
        `API request failed with status ${res.status}: ${res.statusText}`,
        res.status,
        errorData
      )
    }

    return (await res.json()) as T
  } catch (err) {
    if (err instanceof ApiError) {
      throw err
    }
    const message = err instanceof Error ? err.message : 'Network error occurred'
    throw new ApiError(message, 0)
  }
}

/**
 * Format raw duration seconds into clean UI strings ("18m 42s", "2h 34m", "45s")
 */
export function formatDuration(seconds: number): string {
  if (typeof seconds !== 'number' || isNaN(seconds) || seconds <= 0) {
    return '0s'
  }
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  if (hours > 0) {
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`
  }
  if (minutes > 0) {
    return secs > 0 ? `${minutes}m ${secs}s` : `${minutes}m`
  }
  return `${secs}s`
}

/**
 * Format numeric projected delta into signed percentage strings ("-20%", "+15%")
 */
export function formatDelta(delta: number | string): string {
  if (typeof delta === 'number') {
    const sign = delta > 0 ? '+' : ''
    return `${sign}${delta}%`
  }
  return String(delta)
}

/**
 * Adapter mapping a backend Session into the legacy TestRun interface
 * for seamless backward compatibility across existing views.
 */
export function sessionToTestRun(session: Session) {
  return {
    ...session,
    bugsFound: session.bugsFound ?? 0,
    criticalBugs: session.criticalBugs ?? 0,
    totalScenarios: session.totalScenarios ?? 0,
    passedScenarios: session.passedScenarios ?? 0,
    failedScenarios: session.failedScenarios ?? 0,
    coverage: session.coverage ?? 0,
    testingTime: session.testingTime || '18m 42s',
    progress: session.progress ?? (session.status === 'completed' ? 100 : 68),
  }
}

export const apiClient = {
  /**
   * 1. GET /api/analytics/overview
   */
  async getAnalyticsOverview(): Promise<AnalyticsOverview> {
    return request<AnalyticsOverview>('/api/analytics/overview')
  },

  /**
   * 2 & 3. GET /api/analytics/heatmaps?type=DEATH | MOVEMENT
   */
  async getHeatmap(
    type: 'DEATH' | 'MOVEMENT',
    levelId?: string
  ): Promise<HeatmapResponse> {
    const params = new URLSearchParams({ type })
    if (levelId) params.append('levelId', levelId)
    return request<HeatmapResponse>(`/api/analytics/heatmaps?${params.toString()}`)
  },

  /**
   * 4. GET /api/analytics/personas/comparison
   */
  async getPersonaComparison(): Promise<PersonaComparison> {
    return request<PersonaComparison>('/api/analytics/personas/comparison')
  },

  /**
   * 5. GET /api/sessions
   */
  async getSessions(params?: {
    gameId?: string
    type?: string
    status?: string
  }): Promise<SessionListResponse> {
    const searchParams = new URLSearchParams()
    if (params?.gameId) searchParams.append('gameId', params.gameId)
    if (params?.type) searchParams.append('type', params.type)
    if (params?.status) searchParams.append('status', params.status)

    const query = searchParams.toString()
    const endpoint = query ? `/api/sessions?${query}` : '/api/sessions'
    return request<SessionListResponse>(endpoint)
  },

  /**
   * 6. GET /api/sessions/{session_id}
   */
  async getSessionDetail(sessionId: string): Promise<SessionDetail> {
    return request<SessionDetail>(`/api/sessions/${encodeURIComponent(sessionId)}`)
  },

  /**
   * 7. GET /api/recommendations
   */
  async getRecommendations(gameId?: string): Promise<RecommendationResponse> {
    const params = new URLSearchParams()
    if (gameId) params.append('gameId', gameId)
    const query = params.toString()
    const endpoint = query ? `/api/recommendations?${query}` : '/api/recommendations'
    return request<RecommendationResponse>(endpoint)
  },

  /**
   * 8. POST /api/recommendations/analyze
   */
  async analyzeRecommendations(gameId?: string): Promise<RecommendationAnalysisResponse> {
    return request<RecommendationAnalysisResponse>('/api/recommendations/analyze', {
      method: 'POST',
      body: JSON.stringify(gameId ? { gameId } : {}),
    })
  },

  /**
   * 9. PATCH /api/recommendations/{id}
   */
  async updateRecommendationStatus(
    id: string,
    status: RecommendationStatus
  ): Promise<{ success: boolean; recommendation: Recommendation }> {
    return request<{ success: boolean; recommendation: Recommendation }>(
      `/api/recommendations/${encodeURIComponent(id)}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ id, status }),
      }
    )
  },

  /**
   * 10. GET /api/telemetry/events
   */
  async getTelemetryEvents(params?: {
    gameId?: string
    limit?: number
  }): Promise<TelemetryEventsResponse> {
    const searchParams = new URLSearchParams()
    if (params?.gameId) searchParams.append('gameId', params.gameId)
    if (params?.limit) searchParams.append('limit', params.limit.toString())
    const query = searchParams.toString()
    const endpoint = query ? `/api/telemetry/events?${query}` : '/api/telemetry/events'
    return request<TelemetryEventsResponse>(endpoint)
  },

  /**
   * 10. POST /api/telemetry/events
   */
  async createTelemetryEvent(
    event: Omit<TelemetryEvent, 'id' | 'timestamp'>
  ): Promise<{ success: boolean; event: TelemetryEvent }> {
    return request<{ success: boolean; event: TelemetryEvent }>(
      '/api/telemetry/events',
      {
        method: 'POST',
        body: JSON.stringify(event),
      }
    )
  },
}
