import z from "zod"
import { prisma } from "../../../lib/prisma"
import { FastifyInstance, RouteGenericInterface } from "fastify"

interface UpdateProfileParams extends RouteGenericInterface {
    Params: {
      id: string
    }
  }
  
  export async function updateProfile(app: FastifyInstance) {
    app.put<UpdateProfileParams>("/profile/:id", async (request, reply) => {
      const profileId = Number(request.params.id)
  
      if (!profileId) {
        reply.code(400).send({message: "ID do profile não fornecido"})
        return
      }
  
      const updateProfileBody = z.object({
        bio: z.string(),
        avatarUrl: z.string(),
        userId: z.number(),
      })
  
      try {
        const data = updateProfileBody.parse(request.body)
  
        const profile = await prisma.profile.update({
          where: { id: profileId },
          data,
        })
  
        reply.send(profile)
      } catch (error) {
        reply.code(400).send({message: "Algo deu errado ao atualizar o Profile"})
      }
    })
  }
  