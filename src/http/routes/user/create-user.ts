import { z } from "zod"
import { FastifyInstance } from "fastify";
import { prisma } from "../../../lib/prisma"
import bcrypt from "bcrypt"

export async function createUser(app: FastifyInstance) {
    app.post("/auth/register", async (request, reply) => {
        const createUserBody = z.object({
           email: z.string().email(),
           name:  z.string().min(3, "Nome n pode ser vazio"),
           password: z.string().min(4, "Senha obrigatoria"),
        })

        const body = createUserBody.parse(request.body);
 
        const existingUser = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        })
        if (existingUser) {
            reply.status(400).send({ error: 'Este E-mail já existe' });
            return;
        }

        const mandatoryUser = await prisma.user.findMany({
            where: {
                email: body.email,
                name: body.name,
                password: body.password
            }
        })
        if(!mandatoryUser) {
            reply.status(400).send({error:"Dados obrigatórios ausentes ou invalidos."})
            return;
        }


        const hashedPassword = await bcrypt.hash(body.password, 10);

        const user = await prisma.user.create({
            data: {
                ...body,
                password: hashedPassword
            }
        })
        reply.send(user)
    })
}
