const express = require("express"); //Framework da aplicação
const cors = require("cors"); // Biblioteca utilizada para inserir headers http
const { connection } = require("./database/connection"); // Configuração de acesso ao banco de dados
const routes = require("./routes");

class Server {
  constructor(server = express()) {
    this.middlewares(server);
    this.database();
    this.routes(server); // Rotas da aplicação
    this.initializeServer(server);
  }

  async middlewares(app) {
    app.use(cors());
    app.use(express.json());
  }

  async database() {
    try {
      await connection.authenticate();
      console.log("Conexão autenticada com sucesso.");
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async routes(app) {
    app.use(routes);
  }

  async initializeServer(app) {
    const PORT = 3333;
    app.listen(PORT, () => console.log(`Servidor executando na porta ${PORT}`));
  }
}
module.exports = { Server };
