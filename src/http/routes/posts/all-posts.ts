import { FastifyInstance } from "fastify";
import { prisma } from "../../../lib/prisma";

export async function getAllPosts(app: FastifyInstance) {
    app.get("/posts", async (request, reply) => {

        try {
            const posts = await prisma.post.findMany()
            reply.send(posts)
        } catch (error) {
          reply.code(400).send({message: "Algo deu errado ao buscar os posts"})
        }
        
    })
}