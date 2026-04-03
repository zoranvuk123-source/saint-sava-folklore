import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
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

    // Basic email format validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Persist application to database
    const supabase = createServerClient();
    const { error: dbError } = await supabase
      .from('trade_applications')
      .insert({ name, company, email, user_type: userType, message: message || null });

    if (dbError) {
      console.error('Trade application DB error:', dbError);
      // Don't fail the request — still try to send email
    }

    // Send notification email via Resend if configured
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);

        // Escape HTML entities in user input for email body
        const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

        await resend.emails.send({
          from: 'EuroArt4.me <noreply@euroart4.me>',
          to: 'admin@euroart4.me',
          subject: `Trade Account Application: ${esc(name)} — ${esc(company)}`,
          html: `
            <h2>New Trade Account Application</h2>
            <p><strong>Name:</strong> ${esc(name)}</p>
            <p><strong>Company:</strong> ${esc(company)}</p>
            <p><strong>Email:</strong> ${esc(email)}</p>
            <p><strong>Type:</strong> ${esc(userType)}</p>
            ${message ? `<p><strong>Message:</strong> ${esc(message)}</p>` : ''}
            <hr />
            <p>Approve this application in the <a href="https://euroart4.me/admin">admin panel</a>.</p>
          `,
        });
      } catch (emailErr) {
        console.error('Resend email error:', emailErr);
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
