import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { name, phone, email, preferredDate, preferredTime, service, notes } = body;

    // Validate required fields
    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: name, phone, and email are required' },
        { status: 400 }
      );
    }

    // Get SMTP configuration from environment variables
    const smtpHost = process.env.BREVO_SMTP_HOST;
    const smtpPort = process.env.BREVO_SMTP_PORT;
    const smtpUser = process.env.BREVO_SMTP_USER;
    const smtpPassword = process.env.BREVO_SMTP_PASSWORD;
    const ownerEmail = process.env.BARBERSHOP_OWNER_EMAIL;

    // Validate SMTP configuration
    if (!smtpHost || !smtpPort || !smtpUser || !smtpPassword || !ownerEmail) {
      const missingVars = [];
      if (!smtpHost) missingVars.push('BREVO_SMTP_HOST');
      if (!smtpPort) missingVars.push('BREVO_SMTP_PORT');
      if (!smtpUser) missingVars.push('BREVO_SMTP_USER');
      if (!smtpPassword) missingVars.push('BREVO_SMTP_PASSWORD');
      if (!ownerEmail) missingVars.push('BARBERSHOP_OWNER_EMAIL');
      
      console.error('Missing SMTP configuration in environment variables:', missingVars.join(', '));
      return NextResponse.json(
        { 
          error: 'Booking service is temporarily unavailable. Please contact us directly via phone or email.',
          details: 'SMTP configuration missing'
        },
        { status: 500 }
      );
    }

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort),
      secure: false, // Use TLS
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    // Format the date
    const formattedDate = preferredDate
      ? new Date(preferredDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
      : 'Not specified';

    // Format the time slot
    const formatHourForMessage = (hourStr: string): string => {
      const [hours, minutes] = hourStr.split(':');
      const hour = parseInt(hours);
      if (hour === 0) return '12:00 AM';
      if (hour === 12) return '12:00 PM';
      if (hour < 12) return `${hour}:${minutes} AM`;
      return `${hour - 12}:${minutes} PM`;
    };

    const formattedTime = preferredTime
      ? preferredTime.split('-').map(formatHourForMessage).join(' - ')
      : 'Not specified';

    // Create HTML email content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Booking Request</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  <!-- Header -->
                  <tr>
                    <td style="padding: 40px 30px; background-color: #000000; text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">New Booking Request</h1>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.5;">
                        You have received a new booking request from your website:
                      </p>
                      
                      <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                        <tr>
                          <td style="padding: 12px; background-color: #f8f8f8; border-bottom: 1px solid #e0e0e0;">
                            <strong style="color: #000000;">Name:</strong>
                          </td>
                          <td style="padding: 12px; background-color: #ffffff; border-bottom: 1px solid #e0e0e0; color: #333333;">
                            ${name}
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px; background-color: #f8f8f8; border-bottom: 1px solid #e0e0e0;">
                            <strong style="color: #000000;">Phone:</strong>
                          </td>
                          <td style="padding: 12px; background-color: #ffffff; border-bottom: 1px solid #e0e0e0; color: #333333;">
                            <a href="tel:${phone}" style="color: #0066cc; text-decoration: none;">${phone}</a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px; background-color: #f8f8f8; border-bottom: 1px solid #e0e0e0;">
                            <strong style="color: #000000;">Email:</strong>
                          </td>
                          <td style="padding: 12px; background-color: #ffffff; border-bottom: 1px solid #e0e0e0; color: #333333;">
                            <a href="mailto:${email}" style="color: #0066cc; text-decoration: none;">${email}</a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px; background-color: #f8f8f8; border-bottom: 1px solid #e0e0e0;">
                            <strong style="color: #000000;">Preferred Date:</strong>
                          </td>
                          <td style="padding: 12px; background-color: #ffffff; border-bottom: 1px solid #e0e0e0; color: #333333;">
                            ${formattedDate}
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px; background-color: #f8f8f8; border-bottom: 1px solid #e0e0e0;">
                            <strong style="color: #000000;">Preferred Time:</strong>
                          </td>
                          <td style="padding: 12px; background-color: #ffffff; border-bottom: 1px solid #e0e0e0; color: #333333;">
                            ${formattedTime}
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px; background-color: #f8f8f8; border-bottom: 1px solid #e0e0e0;">
                            <strong style="color: #000000;">Service:</strong>
                          </td>
                          <td style="padding: 12px; background-color: #ffffff; border-bottom: 1px solid #e0e0e0; color: #333333;">
                            ${service || 'Not specified'}
                          </td>
                        </tr>
                        ${notes ? `
                        <tr>
                          <td style="padding: 12px; background-color: #f8f8f8;">
                            <strong style="color: #000000;">Additional Notes:</strong>
                          </td>
                          <td style="padding: 12px; background-color: #ffffff; color: #333333;">
                            ${notes}
                          </td>
                        </tr>
                        ` : ''}
                      </table>
                      
                      <p style="margin: 30px 0 0; color: #666666; font-size: 14px; line-height: 1.5;">
                        Please contact the customer to confirm their appointment.
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 30px; background-color: #f8f8f8; text-align: center; border-top: 1px solid #e0e0e0;">
                      <p style="margin: 0; color: #999999; font-size: 12px;">
                        This email was sent from your Brotherhood Barbershop website booking form.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    // Create plain text version
    const textContent = `
New Booking Request

You have received a new booking request from your website:

Name: ${name}
Phone: ${phone}
Email: ${email}
Preferred Date: ${formattedDate}
Preferred Time: ${formattedTime}
Service: ${service || 'Not specified'}
${notes ? `Additional Notes: ${notes}` : ''}

Please contact the customer to confirm their appointment.

---
This email was sent from your Brotherhood Barbershop website booking form.
    `.trim();

    // Send email
    console.log('Attempting to send email with config:', {
      host: smtpHost,
      port: smtpPort,
      from: 'kamalrajawi38@gmail.com',
      to: ownerEmail,
      subject: `New Booking Request from ${name}`
    });

    const info = await transporter.sendMail({
      from: `"Brotherhood Barbershop" <kamalrajawi38@gmail.com>`,
      to: ownerEmail,
      replyTo: email,
      subject: `New Booking Request from ${name}`,
      text: textContent,
      html: htmlContent,
    });

    console.log('Booking email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);
    console.log('Accepted:', info.accepted);
    console.log('Rejected:', info.rejected);

    return NextResponse.json(
      {
        success: true,
        message: 'Booking request sent successfully',
        messageId: info.messageId
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending booking email:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined
    });

    return NextResponse.json(
      {
        error: 'Failed to send booking request. Please try again or contact us directly.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
