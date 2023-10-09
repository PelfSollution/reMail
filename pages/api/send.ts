import type { NextApiRequest, NextApiResponse } from 'next';
//import { EmailTemplate } from '@/components/email-template';
//import { WaitlistEmail } from '@/components/waitlist';
//import { CodepenChallengersEmail } from '@/components/codepen';
//import { NikeReceiptEmail } from '@/components/nike';
import { MixedLayoutTemplate } from '@/components/mixed-layout';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { subject, recipients } = req.body;

  if (!subject || !recipients || !Array.isArray(recipients)) {
    return res.status(400).json({ error: 'Invalid parameters' });
  }

  try {
    const data = await resend.emails.send({
      from: 'La Regadora SCCL <butlleti@laregadora.cat>',
      to: recipients,
      subject: subject,
      react: MixedLayoutTemplate(),
      text: 'Hi! This is a test email'
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

