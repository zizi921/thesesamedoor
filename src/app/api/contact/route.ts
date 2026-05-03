import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Send the email to yourself with the user's details
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', // Resend's default onboarding email for testing
      to: ['wuzhiyi921@gmail.com'], // Deliver to your email
      subject: `New Cake Order Inquiry from ${name}`,
      html: `
        <h2>New Contact Form Submission!</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message/Order Details:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json({ success: false, error }, { status: 400 });
    }

    console.log('Resend Success:', data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
