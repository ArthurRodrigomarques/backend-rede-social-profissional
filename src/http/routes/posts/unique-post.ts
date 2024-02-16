import { FastifyInstance, RouteGenericInterface } from "fastify"
import { prisma } from "../../../lib/prisma"

interface RouteParams extends RouteGenericInterface {
  Params: {
    id: string
  }
}

export async function getUniquePost(app: FastifyInstance) {
  app.get<RouteParams>("/post/:id", async (request, reply) => {

    const postId = Number(request.params.id)

    if (!postId) {
      reply.code(400).send({message: "ID do post não fornecido"})
      return
    }

    try {
      const post = await prisma.post.findUnique({
        where: { id: postId },
      })

      reply.send({message: "Post encontrado" ,post: post})
    } catch (error) {
      reply.code(400).send({message: "Algo deu errado achar o post"})
    }
  })
}
