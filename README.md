# Lista de endpoints e rotas implementadas 

# Lista de Endpoints - Selo FIEA Backend

## Autenticação
- `POST /auth/register` - Registrar usuário ✅ (AdminRegistrationPage.tsx, ManagerRegistrationPage.tsx)
- `POST /auth/login` - Login ✅ (AuthForm.tsx)
- `POST /auth/forgot-password` - Solicitar recuperação de senha ✅ (ForgotPasswordPage.tsx)
- `POST /auth/reset-password` - Redefinir senha ✅ (ResetPasswordPage.tsx)

## Usuários
- `GET /users` - Listar usuários ✅ (AuditsPage.tsx)
- `GET /users/:id` - Buscar por ID
- `PATCH /users/:id` - Atualizar
- `DELETE /users/:id` - Deletar

## Empresas
- `POST /empresas` - Criar ✅ (MyCompaniesPage.tsx)
- `GET /empresas` - Listar ✅ (MyCompaniesPage.tsx)
- `GET /empresas/:id` - Buscar por ID ✅ (MyCompaniesPage.tsx)
- `GET /empresas/cnpj/:cnpj` - Buscar por CNPJ ✅ (MyCompaniesPage.tsx)
- `PATCH /empresas/:id` - Atualizar ✅ (MyCompaniesPage.tsx)
- `PATCH /empresas/:id/toggle-active` - Ativar/Desativar ✅ (MyCompaniesPage.tsx)
- `DELETE /empresas/:id` - Deletar ✅ (MyCompaniesPage.tsx)

## Selos (Tipos)
- `POST /selos` - Criar tipo de selo ✅ (BadgesPage.tsx)
- `GET /selos` - Listar 🚧 (BadgesPage.tsx)
- `GET /selos/:id` - Buscar por ID 
- `PATCH /selos/:id` - Atualizar ✅ (BadgesPage.tsx)
- `DELETE /selos/:id` - Deletar ✅ (BadgesPage.tsx)

## Critérios
- `POST /criteria` - Criar ✅ (CriteriaPage.tsx)
- `GET /criteria` - Listar (query: ?seloId=X) 🚧 (BadgesPage.tsx, CriteriaPage.tsx)
- `GET /criteria/:id` - Buscar por ID
- `PATCH /criteria/:id` - Atualizar ✅ (CriteriaPage.tsx)
- `DELETE /criteria/:id` - Deletar ✅ (CriteriaPage.tsx)

## Perguntas
- `POST /questions` - Criar 🚧 Não utilizado no código atualmente
- `GET /questions` - Listar (query: ?criterionId=X) 🚧 Não utilizado no código atualmente
- `GET /questions/:id` - Buscar por ID 🚧 Não utilizado no código atualmente
- `PATCH /questions/:id` - Atualizar 🚧 Não utilizado no código atualmente
- `DELETE /questions/:id` - Deletar 🚧 Não utilizado no código atualmente

## Ciclos de Certificação
- `POST /certification-cycles` - Criar
- `GET /certification-cycles` - Listar (query: ?seloId=X)
- `GET /certification-cycles/:id` - Buscar por ID
- `PATCH /certification-cycles/:id` - Atualizar
- `DELETE /certification-cycles/:id` - Deletar

## Autoavaliações
- `POST /self-assessments` - Criar
- `GET /self-assessments` - Listar (query: ?cycleId=X ou ?userId=X)
- `GET /self-assessments/:id` - Buscar por ID
- `PATCH /self-assessments/:id` - Atualizar
- `POST /self-assessments/:id/submit` - Submeter (envia email)
- `DELETE /self-assessments/:id` - Deletar

## Evidências
- `POST /evidences/upload` - Upload (query: ?questionId=X ou ?selfAssessmentId=X)
- `GET /evidences` - Listar (query: ?questionId=X ou ?selfAssessmentId=X)
- `GET /evidences/:id` - Buscar por ID
- `GET /evidences/:id/download` - Download
- `DELETE /evidences/:id` - Deletar

## Auditorias (Sistema de Pontuação)
- `POST /auditorias` - Criar ✅ (AuditsPage.tsx)
- `POST /auditorias/topicos-pontuacao` - Criar tópico ✅ (AuditsPage.tsx) 
- `GET /auditorias/topicos-pontuacao` - Listar tópicos ✅ (AuditsPage.tsx)
- `POST /auditorias/:id/avaliar-topico` - Avaliar tópico ✅ (AuditsPage.tsx)
- `POST /auditorias/:id/parecer` - Submeter parecer final ✅ (AuditsPage.tsx)
- `GET /auditorias` - Listar ✅ (AuditsPage.tsx e DashboardPage.tsx)
- `GET /auditorias/:id` - Buscar por ID ✅ (AuditsPage.tsx)
- `PATCH /auditorias/:id` - Atualizar ✅ (AuditsPage.tsx)
- `DELETE /auditorias/:id` - Deletar ✅ (AuditsPage.tsx)

## Audit Findings (Achados/Pareceres)
- `POST /audit-findings` - Criar
- `GET /audit-findings` - Listar todos
- `GET /audit-findings?auditId=:id` - Listar por auditoria
- `GET /audit-findings/:id` - Buscar por ID
- `PATCH /audit-findings/:id` - Atualizar
- `DELETE /audit-findings/:id` - Deletar
> O frontend foi projetado com uma filosofia de "formulário único" para as operações de criação e avaliação, onde o usuário espera que uma única ação (que nesse caso é a de salvar) resolva tudo. No entanto, a API subjacente é "granular", exigindo múltiplas chamadas sequenciais para concluir o processo de criação de uma auditoria com seus tópicos e a avaliação de todos os tópicos com o parecer geral. Isso forçou o código do frontend a ser refatorado para executar essas chamadas encadeadas, o que aumentou drasticamente sua complexidade. Adicionalmente, a ausência de um endpoint específico na API para upload de evidências diretamente para a entidade principal auditId impossibilitou a funcionalidade de upload de documentos de apoio no formulário de criação. Por fim, a existência de endpoints redundantes (a seção `/audit-findings` completa não foi utilizada, pois as operações de avaliação foram realizadas através de endpoints aninhados em `/auditorias`) complicou a escolha da implementação, embora o frontend tenha optado por uma seção, tornando a outra redundante.

## Selos Emitidos
- `POST /selos-emitidos/emitir` - Emitir (via Auditoria) ✅ (AuditsPage.tsx)
- `GET /selos-emitidos/validar/:id` - **PÚBLICO** - Validar selo ✅ (BadgeVerificationPage.tsx)
- `GET /selos-emitidos` - Listar 🚧 Não utilizado no código
- `GET /selos-emitidos/empresa/:empresaId` - Listar por empresa ✅ (DigitalBadgesPage.tsx)
- `GET /selos-emitidos/:id` - Buscar por ID 🚧 Não utilizado no código
- `PATCH /selos-emitidos/:id/revogar` - Revogar 🚧 Não utilizado no código
- `POST /selos-emitidos/verificar-expirados` - Verificar expirados 🚧 Não utilizado no código
- `GET /selos-emitidos/:id/certificado` - Visualizar certificado ✅ (DigitalBadgesPage.tsx)

---

**Base URL (Dev):** `http://localhost:3000/api/v1`

**Autenticação:** Bearer Token (exceto `/selos-emitidos/validar/:id`)
