const { Configuration, OpenAIApi } = require("openai"); // Importa a API da OpenAI
const express = require('express') // Importa o express
const bodyParser = require('body-parser') // Importa o body-parser
const cors = require('cors') // Importa o cors
const antiCrash = require('./anticrash') // Importa o antiCrash

antiCrash() // Inicia o antiCrash

const configuration = new Configuration({ // Cria a configuração da API
    organization: "org-AwcNm7fQdsjklnYNk4FcQQT1", // Organização
    apiKey: "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", // API Key
});
const openai = new OpenAIApi(configuration); // Cria a API


    const app = express() // Inicia o express
    app.use(bodyParser.json()) // Usa o body-parser
    app.use(cors()) // Usa o cors
    const port = 3080  // Porta do servidor

    app.post('/', async (req, res) => { //  Rota para enviar a menssagem
        const { menssagem } = req.body; // Pega a menssagem do body
        console.log(menssagem, "menssagem") // Mostra a menssagem no console
        const response = await openai.createCompletion({ // Faz a requisição para a API
            model: "text-davinci-003", // Modelo
            prompt: `${menssagem}`, // Prompt
            max_tokens: 1000, // Quantidade de tokens
            temperature: 0, // Temperatura
          });
          console.log() // Mostra a resposta no console
          res.json({ // Retorna a resposta
            menssagem: response.data.choices[0].text, // Menssagem
          })
    });
    

    app.listen(port, () => { // Inicia o servidor
        console.log(`O servidor está a correr neste endereço http://localhost:${port}`) // Mostra a mensagem no console
    });