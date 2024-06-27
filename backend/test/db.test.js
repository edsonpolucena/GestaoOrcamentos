// db.test.js
const mongoose = require('mongoose');
const db = require('../db/db.js'); // Adicione a extensão .js

describe('Database Connection', () => {
    beforeAll(async () => {
        // Configurar o ambiente de teste para usar um banco de dados em memória ou real
        // Por exemplo, você pode usar o pacote `mongodb-memory-server` para criar um banco de dados em memória
        // Ou você pode definir process.env.MONGO_URL para um banco de dados real de teste
        // Aqui estamos usando o MongoDB em memória para demonstração

        // Configurar o Mongoose
        mongoose.set('strictQuery', false);

        // Conectar ao banco de dados
        await db();
    });

    afterAll(async () => {
        // Desconectar do banco de dados após todos os testes
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    it('should connect to the database successfully', async () => {
        // Verificar se a conexão com o banco de dados foi bem-sucedida
        expect(mongoose.connection.readyState).toBe(1); // 1 significa conectado
    });

    it('should handle database connection errors', async () => {
        // Forçar uma falha de conexão
        const originalEnv = process.env.MONGO_URL;
        process.env.MONGO_URL = 'invalid_connection_string';
        
        // Executar a função de conexão e capturar o erro
        let error;
        try {
            await db();
        } catch (err) {
            error = err;
        }

        // Verificar se o erro foi tratado corretamente
        expect(error).toBeDefined();
        expect(error instanceof mongoose.Error).toBe(true); // Verificar se o erro é uma instância de erro do Mongoose

        process.env.MONGO_URL = originalEnv; // Restaurar a variável de ambiente
    });
});
