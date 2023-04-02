import { NextApiRequest, NextApiResponse } from "next";
import { signIn, signOut, useSession, getSession } from "next-auth/react";


async function authMiddleware(req: NextApiRequest, res: NextApiResponse, callback: () => void) {
  const session = await getSession({ req })

  if (!session) {
    res.writeHead(302, { Location: '/login' })
    res.end()
    return
  }

//   callback()
}

export default authMiddleware

