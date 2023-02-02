import Fastify from "fastify"
import cors from "@fastify/cors"
import { appRoutes } from "./routes"


const app = Fastify()


// habilita o cors e faz com que o front possa acessar a aplicacao back-end e o banco
// E sem passar parametro, qualquer link pode acessar nossa aplicacao, aqui funciona mas em um trabalho tem que ter mais atencao
app.register(cors)
app.register(appRoutes)

app.listen({
    port: 3333,
    host: '0.0.0.0'
}).then((url) => {
    console.log(`Server Running! on ${url}`)
})