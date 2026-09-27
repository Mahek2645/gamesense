import { NextRequest, NextResponse } from 'next/server'
import { getNotifications, markNotificationAsRead } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId') || undefined
    const notifications = await getNotifications(userId)

    return NextResponse.json({
      success: true,
      notifications,
      unreadCount: notifications.filter(n => !n.read).length
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve notifications' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id } = await request.json()
    if (!id) {
      return NextResponse.json({ error: 'Notification ID is required' }, { status: 400 })
    }

    const success = await markNotificationAsRead(id)
    return NextResponse.json({ success, message: 'Notification marked as read' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update notification' }, { status: 500 })
  }
}
