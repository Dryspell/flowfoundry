import { NextRequest, NextResponse } from 'next/server'

// Webhook handler for third-party integrations
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // TODO: Add webhook verification
    // TODO: Handle different webhook types (Sanity, HubSpot, etc.)

    console.warn('Webhook received:', body)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

// Handle webhook verification challenges
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const challenge = searchParams.get('challenge')

  if (challenge) {
    return NextResponse.json({ challenge })
  }

  return NextResponse.json({ message: 'Webhook endpoint active' })
}
