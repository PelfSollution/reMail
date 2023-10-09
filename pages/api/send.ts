import type { NextApiRequest, NextApiResponse } from 'next';
import { EmailTemplate } from '../../components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await resend.emails.send({
      from: 'La Regadora SCCL <butlleti@laregadora.cat>',
      to: ['daayros@protonmail.com'],
      subject: 'Hello world',
      react: EmailTemplate({ firstName: 'John' }),
      text: 'Texto alternativo'
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
}
