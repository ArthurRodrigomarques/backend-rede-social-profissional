import { z } from "zod"
import { FastifyInstance } from "fastify";
import { prisma } from "../../../lib/prisma"
import bcrypt from "bcrypt"

export async function loginUser(app: FastifyInstance) {
    app.post("/auth/login", async (request, reply) => {
        const loginUserBody = z.object({
           email: z.string().email(),
           password: z.string(),
        })

        const body = loginUserBody.parse(request.body);

        //check User exist
        const user = await prisma.user.findUnique({
            where: {
                email: body.email
            },
            include: {
                profile: true
            }
        })
        if(!user) {
            reply.status(404).send({ error: 'Usuário não encontrado' });
            return
        }

       // verificar se a senha está correta
       const isPasswordCorrect = await bcrypt.compare(body.password, user.password)

       if(!isPasswordCorrect) {
        reply.status(400).send({error: "Senha incorreta"})
        return;
       }

       reply.send({ message: "Login bem-sucedido", user: user})
    })
}

// validações 
// se o email já existe
// hash para a senha para dificultar a codificação