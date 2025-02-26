# Task Board

Task Board é uma aplicação para gerenciamento de tarefas que permite a criação de tarefas públicas e privadas. As tarefas públicas podem ser visualizadas por outras pessoas, que também podem adicionar comentários para colaborar. Os usuários podem excluir suas próprias tarefas e comentários.

O login na aplicação é feito via Google Gmail, utilizando autenticação OAuth do Google.

https://github.com/user-attachments/assets/8eefdc8f-2b51-4e39-b2ea-9fc8c76f41e3

## Tecnologias Utilizadas

- React
- Next.js
- TypeScript
- Firebase (como base de dados)

## Configuração do Projeto

1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/task-board.git
   ```

2. Instale as dependências:
   ```sh
   cd task-board
   npm install
   ```

3. Configure o Firebase:
   - Substitua as configurações legadas do Firebase no arquivo `firebaseConnection.ts` com suas próprias credenciais.

4. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes configurações para a autenticação do Google:
   ```env
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   
   NEXTAUTH_URL=
   
   JWT_SECRET=
   
   NEXT_PUBLIC_URL=
   ```

5. Inicie o projeto em modo de desenvolvimento:
   ```sh
   npm run dev
   ```

## Funcionalidades
- Login via Google Gmail.
- Criar tarefas públicas e privadas.
- Visualizar tarefas públicas.
- Comentar em tarefas públicas.
- Excluir suas próprias tarefas e comentários.

## Contribuição

1. Fork o repositório.
2. Crie um branch para sua funcionalidade:
   ```sh
   git checkout -b minha-funcionalidade
   ```
3. Faça suas alterações e commit:
   ```sh
   git commit -m "Adicionando nova funcionalidade"
   ```
4. Envie para o repositório remoto:
   ```sh
   git push origin minha-funcionalidade
   ```
5. Abra um Pull Request.

