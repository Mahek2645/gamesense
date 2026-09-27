import { NextRequest, NextResponse } from 'next/server'
import { getAllInquiries, updateInquiryStatus, deleteInquiry } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const inquiries = await getAllInquiries()
    const unreadCount = inquiries.filter(i => i.status === 'new').length

    return NextResponse.json({
      success: true,
      inquiries,
      unreadCount,
      totalCount: inquiries.length,
    })
  } catch (error) {
    console.error('Failed to fetch inquiries:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve inquiries' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status, notes } = body

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Inquiry ID and new status are required' },
        { status: 400 }
      )
    }

    const updated = await updateInquiryStatus(id, status, notes)
    if (!updated) {
      return NextResponse.json(
        { error: 'Inquiry not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      inquiry: updated,
    })
  } catch (error) {
    console.error('Failed to update inquiry status:', error)
    return NextResponse.json(
      { error: 'Failed to update inquiry' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Inquiry ID is required' },
        { status: 400 }
      )
    }

    const success = await deleteInquiry(id)
    if (!success) {
      return NextResponse.json(
        { error: 'Inquiry not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry removed successfully',
    })
  } catch (error) {
    console.error('Failed to delete inquiry:', error)
    return NextResponse.json(
      { error: 'Failed to delete inquiry' },
      { status: 500 }
    )
  }
}
