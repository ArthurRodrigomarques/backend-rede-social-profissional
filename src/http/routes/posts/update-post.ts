import z from "zod"
import { prisma } from "../../../lib/prisma"
import { FastifyInstance, RouteGenericInterface } from "fastify"

interface UpdatePostParams extends RouteGenericInterface {
    Params: {
      id: string
    }
  }
  
  export async function updatePost(app: FastifyInstance) {
    app.put<UpdatePostParams>("/post/:id", async (request, reply) => {
      const postId = Number(request.params.id)
  
      if (!postId) {
        reply.code(400).send({message: "ID do post não fornecido"})
        return
      }
  
      const updatePostBody = z.object({
        content: z.string().optional(),
        coverUrl: z.string().optional(),
        published: z.boolean().optional(),
        authorId: z.number().optional(),
      })
  
      try {
        const data = updatePostBody.parse(request.body)
  
        const post = await prisma.post.update({
          where: { id: postId },
          data,
        })
  
        reply.send(post)
      } catch (error) {
        reply.code(400).send({message: "Algo deu errado ao atualizar o post"})
      }
    })
  }
  