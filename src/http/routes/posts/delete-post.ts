import { FastifyInstance, RouteGenericInterface } from "fastify"
import { prisma } from "../../../lib/prisma"

interface RouteParams extends RouteGenericInterface {
  Params: {
    id: string
  }
}

export async function deletePost(app: FastifyInstance) {
  app.delete<RouteParams>("/post/:id", async (request, reply) => {

    const postId = Number(request.params.id)

    if (!postId) {
      reply.code(400).send({message: "ID do post não fornecido"})
      return
    }

    try {
      const post = await prisma.post.delete({
        where: { id: postId },
      })

      reply.send({message: "Post excluído com sucesso", post: post})
    } catch (error) {
      reply.code(400).send({message: "Algo deu errado ao excluir o post"})
    }
  })
}
