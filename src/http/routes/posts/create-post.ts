import { z } from "zod"
import { FastifyInstance } from "fastify"
import { prisma } from "../../../lib/prisma"

export async function createPost(app: FastifyInstance) {
  app.post("/post", async (request, reply) => {
    // Definir o objeto de validação com o Zod
    const createPostBody = z.object({
      content: z.string(),
      coverUrl: z.string(),
      published: z.boolean(),
      authorId: z.number(),
    })

    try {
      const data = createPostBody.parse(request.body)

      const post = await prisma.post.create({
        data,
      })
  
      reply.send(post)
    } catch (error) {
      reply.code(400).send({message: "algo deu errado ao fazer o post"})
    }
  })
}
