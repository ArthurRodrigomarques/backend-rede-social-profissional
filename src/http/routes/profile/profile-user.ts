import { z } from "zod"
import { FastifyInstance } from "fastify";
import { prisma } from "../../../lib/prisma"

export async function profileUser(app: FastifyInstance) {
    app.post("/profile", async (request, reply) => {
        const profileUserBody = z.object({
           bio: z.string(),
           avatarUrl: z.string(),
           userId: z.number(),
        }) 

    const body = profileUserBody.parse(request.body);

    const user = await prisma.user.findUnique({
        where: {
            id: body.userId
        }
    })

    if (!user) {
        reply.status(404).send({ error: 'Usuário não encontrado' });
        return;
    }

    const profile = await prisma.profile.create({
        data: {
            bio: body.bio,
            avatarUrl: body.avatarUrl,
            userId: body.userId
        }
    })

    reply.send(profile)
    
    })
}
