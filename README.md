# Lista de endpoints e rotas implementadas 

# Lista de Endpoints - Selo FIEA Backend

## Autenticação
- `POST /auth/register` - Registrar usuário ✅ (AdminRegistrationPage.tsx, ManagerRegistrationPage.tsx)
- `POST /auth/login` - Login ✅ (AuthForm.tsx)
- `POST /auth/forgot-password` - Solicitar recuperação de senha ✅ (ForgotPasswordPage.tsx)
- `POST /auth/reset-password` - Redefinir senha ✅ (ResetPasswordPage.tsx)

## Usuários
- `GET /users` - Listar usuários
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
- `POST /questions` - Criar
- `GET /questions` - Listar (query: ?criterionId=X)
- `GET /questions/:id` - Buscar por ID
- `PATCH /questions/:id` - Atualizar
- `DELETE /questions/:id` - Deletar

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
- `POST /auditorias` - Criar
- `POST /auditorias/topicos-pontuacao` - Criar tópico 
- `GET /auditorias/topicos-pontuacao` - Listar tópicos
- `POST /auditorias/:id/avaliar-topico` - Avaliar tópico
- `POST /auditorias/:id/parecer` - Submeter parecer final
- `GET /auditorias` - Listar 🚧 (DashboardPage.tsx)
- `GET /auditorias/:id` - Buscar por ID
- `PATCH /auditorias/:id` - Atualizar
- `DELETE /auditorias/:id` - Deletar

## Audit Findings (Achados/Pareceres)
- `POST /audit-findings` - Criar
- `GET /audit-findings` - Listar todos
- `GET /audit-findings?auditId=:id` - Listar por auditoria
- `GET /audit-findings/:id` - Buscar por ID
- `PATCH /audit-findings/:id` - Atualizar
- `DELETE /audit-findings/:id` - Deletar

## Selos Emitidos
- `POST /selos-emitidos/emitir` - Emitir (via Auditoria)
- `GET /selos-emitidos/validar/:id` - **PÚBLICO** - Validar selo ✅ (BadgeVerificationPage.tsx)
- `GET /selos-emitidos` - Listar
- `GET /selos-emitidos/empresa/:empresaId` - Listar por empresa ✅ (DigitalBadgesPage.tsx)
- `GET /selos-emitidos/:id` - Buscar por ID
- `PATCH /selos-emitidos/:id/revogar` - Revogar
- `POST /selos-emitidos/verificar-expirados` - Verificar expirados
- `GET /selos-emitidos/:id/certificado` - Visualizar certificado

---

**Base URL (Dev):** `http://localhost:3000/api/v1`

**Autenticação:** Bearer Token (exceto `/selos-emitidos/validar/:id`)
