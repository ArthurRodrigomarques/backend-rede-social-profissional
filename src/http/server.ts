import fastify from "fastify";

import { createUser } from "./routes/user/create-user";
import { loginUser } from "./routes/user/login-user";
import { deleteUser } from "./routes/user/delete-user";
import { createPost } from "./routes/posts/create-post";
import { deletePost } from "./routes/posts/delete-post";
import { getAllPosts } from "./routes/posts/all-posts";
import { updatePost } from "./routes/posts/update-post";
import { getUniquePost } from "./routes/posts/unique-post";
import { profileUser } from "./routes/profile/profile-user";
import { updateProfile } from "./routes/profile/profile-update";

import WebSocketChat from "./routes/ws/chat";
import websocketPlugin from '@fastify/websocket';

const app = fastify()

// User
app.register(createUser)
app.register(loginUser)
app.register(deleteUser)
// profile
app.register(profileUser)
app.register(updateProfile)
//Post
app.register(createPost)
app.register(deletePost)
app.register(getAllPosts)
app.register(getUniquePost)
app.register(updatePost)
//chat
app.register(websocketPlugin)
app.register(WebSocketChat)

app.listen({ port: 3333}).then(() => {
    console.log('Server started on http://localhost:3333')
})