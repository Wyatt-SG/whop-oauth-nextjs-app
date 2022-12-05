import type { NextApiRequest, NextApiResponse } from 'next'

const postWhopOAuthCode = async (code: string) => {
  const response = await fetch("https://data.whop.com/oauth/token", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      code: code, 
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
      grant_type: "authorization_code"
    })
  })

  return response.json()
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(404).json({ message: 'Not Found' })

  const { code } = req.query;

  if (!code || typeof code !== 'string') return res.status(400).json({ message: 'Code is required' });

  postWhopOAuthCode(code).then((data) => {
    res.status(200).json(data);
  })
}
