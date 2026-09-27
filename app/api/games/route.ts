import { NextRequest, NextResponse } from 'next/server'
import { requireAuth, getAuthUser } from '@/lib/auth'
import { createGame, getGamesByUserId, getAllGames } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    if (user.role === 'admin') {
      const games = await getAllGames()
      return NextResponse.json({ games })
    } else {
      const games = await getGamesByUserId(user.userId)
      return NextResponse.json({ games })
    }
  } catch (error) {
    console.error('Get games error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth()
    const { name, version, description } = await request.json()

    if (!name || !version) {
      return NextResponse.json(
        { error: 'Name and version are required' },
        { status: 400 }
      )
    }

    const game = await createGame(user.userId, name, version, description || '')

    return NextResponse.json({ game }, { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    console.error('Create game error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}