import { FastifyInstance } from "fastify";
import { prisma } from "../../../lib/prisma";
import z from "zod";

export async function deleteUser(app: FastifyInstance) {
    app.delete("/auth/delete", async (request, reply) => {
        const deleteUserBody = z.object({
           id: z.number(),
        })

        const body = deleteUserBody.parse(request.body);

        const existingUser = await prisma.user.findUnique({
            where: {
                id: body.id
            }
        })

        if (!existingUser) {
            reply.status(400).send({ error: 'Este usuário não existe' });
            return;
        }


        const deleteUser = await prisma.user.delete({
            where: {
                id: body.id
            }
        })

        reply.send(deleteUser)
    })
}
