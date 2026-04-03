import { NextRequest, NextResponse } from 'next/server';
import { sanitizeInput } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = sanitizeInput(body.name || '', 100);
    const company = sanitizeInput(body.company || '', 100);
    const email = sanitizeInput(body.email || '', 200);
    const userType = sanitizeInput(body.user_type || '', 50);
    const message = sanitizeInput(body.message || '', 1000);

    if (!name || !company || !email || !userType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Send email via Resend if configured
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
          from: 'EuroArt4.me <noreply@euroart4.me>',
          to: 'admin@euroart4.me',
          subject: `Trade Account Application: ${name} — ${company}`,
          html: `
            <h2>New Trade Account Application</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Type:</strong> ${userType}</p>
            ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
            <hr />
            <p>Approve this application in the <a href="https://euroart4.me/admin">admin panel</a>.</p>
          `,
        });
      } catch (emailErr) {
        console.error('Resend email error:', emailErr);
        // Don't fail the request — email is best-effort
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
