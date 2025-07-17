
# 🧠 Backend - Sistema de Assinaturas

Este backend simula um sistema de planos de assinatura com funcionalidades de upgrade, downgrade, histórico de compras e integração simulada com pagamento via cartão de crédito.

## 🖥️ Deploy

O backend também está disponível em produção.

🔗 Acesse diretamente o front-end sem precisar rodar localmente:

[➡️ Link para o deploy do Frontend](https://empy-frontend.vercel.app/)

> 💡 Se preferir realizar testes locais, continue com os passos de instalação e execução abaixo.

---

## 🚀 Tecnologias utilizadas

- Node.js + TypeScript
- Express.js
- Prisma ORM com PostgreSQL
- Axios para requisições internas
- Zod para validação de dados
- UUID para geração de IDs únicos

---

## ⚙️ Instalação

1. Instale as dependências:
```bash
npm install
```

2. Crie um arquivo `.env` na raiz do projeto com as variáveis:
```
DATABASE_URL=postgresql://seu_usuario:senha@localhost:5432/nome_banco
FRONTEND_BASE_URL=http://localhost:5173
```

3. Rode as migrations:
```bash
npx prisma migrate dev --name init
```

---

## 🌱 Populando o banco com dados iniciais (seeds)

Após configurar seu banco de dados e rodar as migrations, você pode popular a base com planos padrões — como **Standard**, **Pro** e **Light** — utilizando o comando:

```bash
npx prisma db seed
```

> 💡 Essa seed cria planos ativos que podem ser utilizados como base para:
> - criação de planos customizados,
> - simulações de upgrade e downgrade de plano,
> - e testes com diferentes status de pagamento.

---

## 📮 Endpoints principais

- `POST /plans/custom`: Cria um plano customizado com base em outro
- `GET /plans`: Retorna todos os planos ativos
- `POST /purchase`: Simula tentativa de compra
- `GET /my-plan`: Retorna o plano atual do usuário
- `GET /purchases`: Retorna histórico de compras

---

## 🔒 Regras de negócio

### 🆕 1. Escolha de plano inicial

- ✅ O usuário escolhe o plano **Standard**.
- 💳 O pagamento simulado retorna `status: pago`.
- 🧾 A assinatura é registrada e marcada como ativa.
- 🗂️ A tentativa é registrada na tabela `History`.
- 🧠 O backend valida o status e retorna a resposta para o front.

---

### 📈 2. Upgrade de plano

- 🔁 Usuário já possui um plano ativo e escolhe um plano superior.
- 🖱️ O botão "Alterar Plano" redireciona para `/plans`, onde pode escolher outro.

#### Possíveis status:

- ❌ **Recusado - Sem limite**:
  - Retorna `status: recusado`.
  - Front exibe mensagem.
  - Plano não é alterado.

- ✅ **Pago**:
  - Novo plano é ativado.
  - Antigo é substituído.
  - Histórico é atualizado.

---

### 📉 3. Downgrade de plano

- 🔁 Mesmo botão "Alterar Plano", com seleção de plano inferior.

#### Possíveis status:

- ❌ **Não autorizado**:
  - Backend retorna `status: não autorizado`.
  - Front exibe erro e permite nova tentativa.

- ✅ **Pago**:
  - Plano inferior é ativado com sucesso.
  - Registro salvo no histórico.

---

## ✅ Fluxos implementados

### ✅ Escolha inicial
- Usuário escolhe o plano "Standard"
- Simula pagamento bem-sucedido
- Redireciona para `/receipt`

### ⬆️ Upgrade de plano
- Acesso pelo botão "Alterar Plano" em `/my-plan`
- Pode haver:
  - ❌ Recusa: Mensagem visível, sem alteração do plano
  - ✅ Sucesso: Redireciona para sucesso e atualiza plano

### ⬇️ Downgrade de plano
- Mesmo acesso via "Alterar Plano"
- Pode haver:
  - ❌ Não autorizado: Mensagem exibida ao usuário
  - ✅ Sucesso: Plano inferior ativado
