# Vercel Deployment Setup Guide

## 🚀 Quick Setup for Booking Form

The booking form requires SMTP configuration to send emails. Follow these steps to configure it on Vercel.

## 📋 Required Environment Variables

You need to add the following environment variables in your Vercel project settings:

### SMTP Configuration (Brevo/Sendinblue)

1. **BREVO_SMTP_HOST**
   - Value: `smtp-relay.brevo.com`
   - Description: Brevo SMTP server hostname

2. **BREVO_SMTP_PORT**
   - Value: `587`
   - Description: SMTP port (587 for TLS)

3. **BREVO_SMTP_USER**
   - Value: Your Brevo SMTP username (usually your Brevo account email)
   - Description: SMTP authentication username

4. **BREVO_SMTP_PASSWORD**
   - Value: Your Brevo SMTP password (generate from Brevo dashboard)
   - Description: SMTP authentication password

5. **BARBERSHOP_OWNER_EMAIL**
   - Value: The email address where booking requests should be sent
   - Example: `owner@brotherhood-barbershop.com`
   - Description: Email address to receive booking notifications

### Optional Environment Variables

6. **NEXT_PUBLIC_BASE_URL**
   - Value: Your Vercel deployment URL (e.g., `https://your-app.vercel.app`)
   - Description: Base URL for the website

7. **VISUAL_EDITOR_ACTIVE**
   - Value: `false` (or `true` to enable)
   - Description: Enable/disable visual editor

## 🔧 How to Set Up Environment Variables in Vercel

### Step 1: Access Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and log in
2. Select your project (barbershp-brothrhood)

### Step 2: Navigate to Settings

1. Click on your project
2. Go to **Settings** tab
3. Click on **Environment Variables** in the left sidebar

### Step 3: Add Environment Variables

For each variable, click **Add New** and enter:

1. **Name**: The variable name (e.g., `BREVO_SMTP_HOST`)
2. **Value**: The variable value
3. **Environment**: Select which environments to apply to:
   - ✅ Production
   - ✅ Preview
   - ✅ Development (optional)

**Important**: Make sure to add all 5 required SMTP variables!

### Step 4: Redeploy

After adding all environment variables:

1. Go to the **Deployments** tab
2. Click the **⋯** (three dots) on the latest deployment
3. Click **Redeploy**
4. Or push a new commit to trigger automatic redeployment

## 📧 Setting Up Brevo (Sendinblue) SMTP

If you don't have a Brevo account yet:

### Step 1: Create Brevo Account

1. Go to [brevo.com](https://www.brevo.com)
2. Sign up for a free account (300 emails/day free tier)

### Step 2: Get SMTP Credentials

1. Log in to your Brevo dashboard
2. Go to **Settings** → **SMTP & API**
3. Click on **SMTP** tab
4. You'll see:
   - **Server**: `smtp-relay.brevo.com`
   - **Port**: `587`
   - **Login**: Your Brevo account email
   - **Password**: Generate a new SMTP key (click "Generate a new key")

### Step 3: Copy Credentials

Copy the following values:
- **SMTP Server**: `smtp-relay.brevo.com`
- **Port**: `587`
- **Login**: Your Brevo email
- **SMTP Key**: The generated password

## ✅ Verification Checklist

After setting up, verify:

- [ ] All 5 SMTP environment variables are added in Vercel
- [ ] Variables are set for **Production** environment
- [ ] `BARBERSHOP_OWNER_EMAIL` is set to your business email
- [ ] Project has been redeployed after adding variables
- [ ] Test the booking form on your live site

## 🧪 Testing the Booking Form

1. Go to your deployed Vercel site
2. Navigate to the booking section
3. Fill out the form with test data:
   - Name: Test User
   - Phone: +1 (555) 123-4567
   - Email: test@example.com
   - Date: Select a future date (not Sunday)
   - Time: Select a time slot
   - Service: Select any service
4. Click **BOOK NOW**
5. You should see a success message
6. Check the email address set in `BARBERSHOP_OWNER_EMAIL` for the booking notification

## 🔍 Troubleshooting

### Error: "Server configuration error. Please contact support."

**Cause**: Missing or incorrect SMTP environment variables

**Solution**:
1. Check Vercel dashboard → Settings → Environment Variables
2. Verify all 5 SMTP variables are present
3. Check for typos in variable names
4. Ensure variables are set for Production environment
5. Redeploy the project

### Error: "Failed to send booking request"

**Cause**: Incorrect SMTP credentials or network issue

**Solution**:
1. Verify SMTP credentials in Brevo dashboard
2. Check that SMTP key is correct (regenerate if needed)
3. Ensure Brevo account is active
4. Check Vercel function logs for detailed error messages

### Booking form works but no email received

**Possible causes**:
1. Check spam/junk folder
2. Verify `BARBERSHOP_OWNER_EMAIL` is correct
3. Check Brevo dashboard for email delivery status
4. Verify Brevo account hasn't exceeded daily limit

## 📝 Alternative SMTP Providers

If you prefer to use a different SMTP provider, update the environment variables:

### Gmail SMTP
- `BREVO_SMTP_HOST`: `smtp.gmail.com`
- `BREVO_SMTP_PORT`: `587`
- `BREVO_SMTP_USER`: Your Gmail address
- `BREVO_SMTP_PASSWORD`: Gmail app password (not regular password)

### SendGrid
- `BREVO_SMTP_HOST`: `smtp.sendgrid.net`
- `BREVO_SMTP_PORT`: `587`
- `BREVO_SMTP_USER`: `apikey`
- `BREVO_SMTP_PASSWORD`: Your SendGrid API key

### Mailgun
- `BREVO_SMTP_HOST`: `smtp.mailgun.org`
- `BREVO_SMTP_PORT`: `587`
- `BREVO_SMTP_USER`: Your Mailgun SMTP username
- `BREVO_SMTP_PASSWORD`: Your Mailgun SMTP password

**Note**: You may need to update the code in `app/api/booking/route.ts` if using a different provider that requires different configuration.

## 🔒 Security Best Practices

1. **Never commit** `.env.local` or `.env` files to Git
2. **Use Vercel's environment variables** for production secrets
3. **Rotate SMTP passwords** regularly
4. **Use different credentials** for development and production
5. **Monitor** email sending limits and usage

## 📞 Support

If you continue to experience issues:

1. Check Vercel function logs: Vercel Dashboard → Your Project → Functions → View Logs
2. Check Brevo dashboard for email delivery status
3. Verify all environment variables are correctly set
4. Ensure the project has been redeployed after adding variables

---

**Last Updated**: January 2025

