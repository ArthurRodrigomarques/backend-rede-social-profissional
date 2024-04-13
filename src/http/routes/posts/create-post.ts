import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import { prisma } from "../../../lib/prisma";
import uploadImage from "../../../lib/firebase";
import { z } from "zod";

interface RequestFile {
  originalname: string;
  mimetype: string;
  buffer: Buffer;
  firebaseUrl?: string;
}

interface MyFastifyRequest extends FastifyRequest<Server, IncomingMessage, ServerResponse> {
  file?: RequestFile;
}

export async function createPost(app: FastifyInstance) {
  app.post("/post", async (request: MyFastifyRequest, reply: FastifyReply<ServerResponse>) => {
    const createPostBody = z.object({
      content: z.string(),
      coverUrl: z.string().optional(),
      published: z.boolean(),
      authorId: z.number(),
    });

    try {
      const data = createPostBody.parse(request.body);

      await uploadImage(request, reply, async () => {
        if (request.file && request.file.firebaseUrl) {
          data.coverUrl = request.file.firebaseUrl;
        }

        const post = await prisma.post.create({
          data,
        });

        reply.send(post);
      });
    } catch (error) {
      reply.code(400).send({ message: "algo deu errado ao fazer o post" });
    }
  });
}