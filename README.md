
# 📦 API - Sistema de Gerenciamento de Estoque | Ferragens Negrão

API RESTful desenvolvida com **Node.js** e **Express** para o controle de entrada e saída de peças no estoque. Utiliza **MySQL** como banco de dados e permite a **geração de relatórios em PDF, Excel e CSV**.

---

## 🚀 Tecnologias Utilizadas

### Dependências principais

- **express** – Framework principal do backend  
- **mysql2** – Driver para conexão com o banco MySQL  
- **dotenv** – Gerenciamento de variáveis de ambiente  
- **bcrypt** – Criptografia de senhas  
- **cors** – Permite requisições entre diferentes domínios  
- **body-parser** – Parsing do corpo das requisições  
- **xlsx**, **exceljs** – Exportação de dados em Excel  
- **jspdf**, **jspdf-autotable**, **pdfkit** – Geração de relatórios PDF  
- **json2csv** – Conversão de dados para CSV  

### Dependências de desenvolvimento

- **concurrently** – Execução simultânea de scripts (útil no desenvolvimento)

---

## 📌 Funcionalidades

- Cadastro, edição, listagem e remoção de peças
- Registro de **entradas e saídas** de estoque
- Histórico de movimentações com filtros (nome, código, data)
- Geração de relatórios em **PDF**, **Excel** e **CSV**
- Criptografia de senhas com `bcrypt`
- Controle de acesso com **níveis de usuário** (implementado via lógica no backend)

---

## 🔐 Autenticação

> **Nota:** Ainda não utiliza JWT.  
A autenticação é feita com **validações internas no backend** e **criptografia de senhas** utilizando `bcrypt`.

---

## 📂 Estrutura do Projeto

```

backend/
├── config/         # Configuração do banco e variáveis de ambiente
├── controllers/    # Lógica de negócio
├── middlewares/    # Validações e autenticação
├── repositories/   # Operações com o banco de dados
├── routes/         # Definição das rotas
├── services/       # Lógica adicional de apoio
├── app.js          # Configuração geral do app
├── server.js       # Inicialização do servidor

````

---

## 📚 Principais Endpoints

### 🔧 Peças
- `GET /pecas` – Lista todas as peças  
- `POST /pecas` – Cadastra uma nova peça  
- `PUT /pecas/:id` – Atualiza os dados de uma peça  
- `DELETE /pecas/:id` – Remove uma peça  

### 📦 Movimentações
- `POST /entrada` – Registra entrada de peça no estoque  
- `POST /saida` – Registra saída de peça do estoque  
- `GET /historico` – Lista o histórico de movimentações  

### 📄 Relatórios
- `GET /relatorios/pdf` – Geração de relatório em PDF  
- `GET /relatorios/xlsx` – Geração de relatório em Excel  
- `GET /relatorios/csv` – Geração de relatório em CSV  

---

## ⚙️ Configuração de Ambiente

Crie um arquivo `.env` na raiz do diretório `backend/` com o seguinte conteúdo:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco

````

---

## ▶️ Como Rodar o Projeto

```bash
# Clone o repositório
https://github.com/Kauapietro031nl/API_TCC.git

# Acesse o backend
cd TCC-senai/backend

# Instale as dependências
npm install

# Inicie o servidor
npm start
```



