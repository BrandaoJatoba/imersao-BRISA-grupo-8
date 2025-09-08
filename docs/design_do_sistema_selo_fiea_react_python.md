# Design do Sistema — Certificação de Indústrias com Selo FIEA de Excelência e Inovação

> **Stack alvo**: Front-end em **React** (TypeScript) e back-end em **Python** (FastAPI ou Django REST Framework), banco **PostgreSQL** e implantação em contêineres (**Docker** + **Kubernetes** ou Docker Compose para MVP).

---

## 1) Visão Geral
Um sistema web para gerenciar o ciclo completo do **Selo FIEA**: cadastro de indústrias, autoavaliações, auditorias externas, emissão/renovação do selo, trilhas de capacitação, relatórios e dashboards para FIEA e empresas.

### Objetivos
- Facilitar e padronizar o **processo de certificação** (autoavaliação → auditoria → emissão → renovação).
- Promover **boas práticas** em sustentabilidade, qualidade, eficiência e inovação.
- Oferecer **transparência** para empresas e para a FIEA via relatórios e dashboards.

### Escopo (MVP → Evoluções)
- **MVP**: gestão de empresas e usuários; questionários de autoavaliação; fluxo de auditoria externa; emissão do selo (digital); dashboard básico; relatórios essenciais; notificações por e-mail; área de capacitação com upload de materiais.
- **V1.1**: portal público de consulta de empresas certificadas; integração com assinatura digital; trilhas de capacitação estruturadas; exportações (CSV/PDF) e relatórios customizáveis.
- **V1.2**: analytics avançados, benchmarking setorial, API pública de verificação do selo, webhooks para integrações.

---

## 2) Usuários, Perfis e Permissões (RBAC)
- **Administrador FIEA**: gerencia regras de certificação, critérios, pesos, usuários/auditores, homologação de resultados, emite/renova/cancela selos; acessa todos os relatórios.
- **Auditor Externo**: executa auditorias, valida evidências/documentos, registra pareceres e pontuações.
- **Gestor da Indústria**: gerencia o perfil da empresa, convida outros colaboradores, executa autoavaliações, envia evidências, acompanha auditoria e status do selo.
- **Responsável por Sustentabilidade/Inovação (Indústria)**: responde seções específicas dos questionários, anexa evidências, acompanha indicadores.
- **Consultor/Instrutor** (opcional): cria/gerencia materiais e turmas de capacitação.
- **Usuário Público** (fase V1.1): consulta catálogo de empresas certificadas e validade do selo.

### Tabela de permissões (exemplos)
- Empresas: Criar/Editar (Indústria, Gestor), Aprovar (FIEA).
- Autoavaliações: Criar/Responder (Indústria), Ler (Auditor/FIEA), Editar durante janela.
- Auditorias: Atribuir (FIEA), Executar (Auditor), Ler (Indústria/FIEA).
- Selo: Emitir/Renovar/Revogar (FIEA), Baixar (Indústria), Verificar (Público API).
- Capacitação: Criar cursos (FIEA/Consultor), Matricular (Indústria), Concluir (Participantes).

---

## 3) Fluxos Principais (UX/Processo)

### 3.1 Cadastro da Indústria
1. Empresa solicita cadastro → validação de CNPJ e dados básicos.
2. Gestor recebe convite, completa perfil e define equipe.

### 3.2 Autoavaliação
1. Gestor inicia ciclo → sistema gera **questionário** baseado no segmento setorial.
2. Responsáveis respondem seções (Qualidade, Sustentabilidade, Inovação, Eficiência) e anexam evidências.
3. O sistema calcula **pontuação preliminar** e destaca **gaps** e **recomendações**.

### 3.3 Auditoria Externa
1. FIEA designa **auditor** (ou equipe) e agenda visita/entrevista.
2. Auditor revisa respostas/evidências, solicita complementos e atribui **notas finais** por critério.
3. Parecer consolidado → submissão à FIEA para homologação.

### 3.4 Emissão/Renovação do Selo
1. Se aprovado, sistema emite **selo digital** com **QR Code** e metadados (empresa, validade de 12 meses, critérios atendidos).
2. Portal de verificação pública (V1.1) confirma autenticidade via QR Code/API.
3. **Renovação**: notificação automática a partir de D-90; reaplicação de questionários e auditoria simplificada ou completa.

### 3.5 Capacitação/Consultoria
- Trilha recomendada com base nos **gaps** identificados.
- Materiais (vídeo, PDF) e **turmas síncronas** (webinar) + registro de presença/conclusão.

### 3.6 Dashboards e Relatórios
- Para empresa: status do ciclo, pontuações por pilar, trilha de melhoria, histórico.
- Para FIEA: pipeline de certificações, SLAs de auditoria, mapa setorial, comparativos e alertas.

---

## 4) Informação & Navegação (IA/UX)

### Mapa de Navegação (app privado)
- **Home / Painel** (cards de status, próximos passos, notificações)
- **Minha Indústria** (perfil, unidades, documentos, equipe)
- **Certificação**
  - Ciclos (histórico e atual)
  - Autoavaliação (seções/critérios)
  - Auditoria (agenda, tarefas, parecer)
  - Selo (status, emissão, download)
- **Capacitação** (catálogo, minhas trilhas, turmas)
- **Relatórios** (exportações, filtros)
- **Admin (FIEA)** (configuração de critérios/pesos, usuários, auditores, SLAs, catálogos)

### Páginas Públicas (V1.1)
- Landing do Selo FIEA (benefícios, como obter)
- Consulta de Empresas Certificadas (filtros por setor/município, validade)
- Verificação de Selo (QR Code → página de verificação)

---

## 5) Modelo de Domínio & Esquema de Dados (rascunho)

### Entidades principais
- **Company** (id, cnpj, razão_social, nome_fantasia, setor, porte, endereço, contatos, status)
- **Site/Plant** (id, company_id, endereço, escopo_certificação)
- **User** (id, nome, email, telefone, cargo, último_login, ativo)
- **Role** (id, nome) e **UserRole** (user_id, role_id, company_id?)
- **CertificationCycle** (id, company_id, versão_regra, status: draft|self_assessment|audit|approved|rejected|expired, dt_inicio, dt_fim_prevista)
- **Criterion** (id, pilar: qualidade|sustentabilidade|inovação|eficiência, descrição, peso, setorial)
- **Question** (id, criterion_id, enunciado, tipo: escala|texto|upload|multi, obrigatória)
- **SelfAssessment** (id, cycle_id, created_by, dt_submissão)
- **SelfAnswer** (id, self_assessment_id, question_id, valor, comentário)
- **Evidence** (id, owner_type: self|audit, owner_id, arquivo_path, hash, tipo, dt_upload)
- **Audit** (id, cycle_id, auditor_id, dt_agendada, dt_execução, status, parecer)
- **AuditFinding** (id, audit_id, criterion_id, nota, comentário, recomendação)
- **Certification** (id, cycle_id, código_selo, validade_inicio, validade_fim, status, qr_hash)
- **Renewal** (id, certification_id, dt_solicitação, status)
- **TrainingCourse** (id, título, descrição, carga_h, tipo: assíncrono|síncrono)
- **Enrollment** (id, course_id, user_id, progresso, concluído_em)
- **Notification** (id, recipient_id, tipo, payload, lido_em)
- **ReportTemplate** / **ExportJob** (opcional para relatórios customizados)

### Regras & Estados (exemplos)
- **CertificationCycle.status**: `draft → self_assessment → audit → (approved | rejected) → expired` (timer de validade após emissão).
- **Renovation windows**: alertas em D-90/D-60/D-30; expiração pausa download público do selo.

---

## 6) API (REST) — Contratos (exemplos)
> Base URL: `/api/v1`

### Autenticação & Segurança
- **Auth**: OAuth2/OIDC (Keycloak/Okta) ou JWT emitido pelo back-end; MFA opcional.
- **Scopes**: `company:read` `company:write` `audit:write` `admin:*` etc.

### Endpoints principais
- `POST /auth/login` — autentica e retorna token.
- `GET /me` — dados do usuário logado e permissões.
- **Companies**: `POST /companies` `GET /companies/{id}` `PATCH /companies/{id}` `GET /companies?filters`
- **Users**: `POST /companies/{id}/users` `PATCH /users/{id}` `GET /users/{id}`
- **Cycles**: `POST /companies/{id}/cycles` `GET /cycles/{id}` `PATCH /cycles/{id}`
- **Self-Assessment**: `POST /cycles/{id}/self-assessment` `POST /self-assessments/{id}/answers` `GET /self-assessments/{id}`
- **Audits**: `POST /cycles/{id}/audits` `PATCH /audits/{id}` `POST /audits/{id}/findings` `GET /audits/{id}`
- **Evidence**: `POST /{owner}/evidences` (S3 presigned URL) `GET /evidences/{id}`
- **Certification**: `POST /cycles/{id}/certification` `GET /certifications/{id}` `GET /verify/{qr}` (público V1.1)
- **Renewals**: `POST /certifications/{id}/renewals` `PATCH /renewals/{id}`
- **Training**: `GET /courses` `POST /courses` `POST /courses/{id}/enroll` `PATCH /enrollments/{id}`
- **Reports/Dashboards**: `GET /reports` `POST /exports`
- **Notifications**: `GET /notifications` `PATCH /notifications/{id}`

### Padrões
- **Idempotência** em POST críticos via `Idempotency-Key`.
- **Versionamento** por prefixo (`/v1`) e contratos OpenAPI.

---

## 7) Front-end (React + TypeScript)

### Tech & libs
- React 18 + TypeScript; router (React Router ou Next.js App Router se optar por Next);
- State: React Query (server state) + Zustand/Redux (client state quando necessário);
- UI: shadcn/ui + Tailwind CSS; formulários com React Hook Form + Zod;
- i18n: i18next; acessibilidade com Radix/ARIA;
- Observabilidade: Sentry para front; analytics (Plausible/GA4) para uso.

### Componentes e Páginas (exemplos)
- **Layout**: Header (switch de empresa), Sidebar (navegação por módulos), Área de conteúdo.
- **Dashboard**: cards de status, timeline de tarefas, gráfico por pilar (radar), progresso do ciclo.
- **Formulários de Questionário**: wizard por seções, autosave, upload de evidências com pré-visualização, validação por regra.
- **Agenda de Auditoria**: calendário, tarefas do auditor, checklist e parecer.
- **Emissão do Selo**: tela de revisão final → botão “Emitir Selo” → modal de confirmação → download (PNG/SVG) e link de verificação.
- **Capacitação**: catálogo, curso (vídeo, materiais), progresso, avaliação.
- **Relatórios**: filtros (período, setor, porte), exportar CSV/PDF.
- **Admin**: gerenciador de critérios/pesos, questionário por segmento, gestão de auditores e SLAs.

### Acessibilidade & UX
- Teclado-First, ARIA labels, contraste AA/AAA.
- Feedback claro de estado: loading, empty state, errors.
- Salvamento otimista e reenvio automático (retry) em conexões instáveis.

---

## 8) Back-end (Python)

### Opção A — **FastAPI**
- Vantagens: leve, rápido, ótimo suporte a OpenAPI/Swagger, fácil com Pydantic/SQLAlchemy.
- Indicada quando há microsserviços ou necessidade de latência baixa.

### Opção B — **Django + DRF**
- Vantagens: Admin nativo (útil p/ FIEA), ORM robusto, eco-sistema amplo.
- Indicada quando se deseja **painel administrativo** out-of-the-box.

### Serviços & Módulos
- **Auth** (JWT/OIDC, RBAC), **Companies**, **Cycles**, **Assessments**, **Audits**, **Certifications**, **Training**, **Reports**, **Notifications**.
- **Storage** de evidências: S3 compatível (MinIO em dev); antivírus (ClamAV) e verificação de mimetype.
- **Jobs**/fila: Celery/RQ + Redis para tarefas assíncronas (cálculos, e-mails, exportações, geração de selo/QR).
- **Template do selo digital**: Jinja2 + lib de geração de SVG/PNG + QRCode (qrcode/pillow).

---

## 9) Regras de Avaliação & Cálculo de Pontuação (exemplo)
- Cada **Criterion** possui um **peso**; cada **Question** contribui para a nota do critério.
- Notas normalizadas por pilar e somadas via ponderação → **score final** do ciclo.
- **Cutoff** mínimo por pilar (ex.: ≥ 60/100) e geral (ex.: ≥ 75/100) para aprovação.
- Penalizações automáticas para ausência de evidências obrigatórias.

---

## 10) Relatórios & Dashboards (KPIs)
- **Empresa**: evolução por ciclo, distribuição de notas por pilar, heatmap de critérios, pendências, trilhas sugeridas.
- **FIEA**: quantidade de empresas por estágio, tempo médio de auditoria, taxa de aprovação, mapa por município/setor, ranking de gaps comuns, consumo de materiais de capacitação.
- Exportações: CSV (dados brutos), PDF (sumários executivos).

---

## 11) Segurança, LGPD & Compliance
- Criptografia em trânsito (TLS) e **em repouso** (KMS para storage de evidências sensíveis).
- **Controle de acesso** por escopo e empresa (row-level security lógico).
- **Trilhas de auditoria** (audit log) de ações críticas.
- **Retenção**: política por tipo de documento (p. ex., evidências expiram após N anos).
- **Privacidade**: consentimento, base legal, termo de uso e política de privacidade; DPO/encarregado; atendimentos a requisições do titular.

---

## 12) Requisitos Não Funcionais & SLAs
- **Desempenho**: <2s para ações principais; endpoints críticos com cache/batching.
- **Escalabilidade**: horizontal via contêineres; DB com índices, partições por ciclo/ano.
- **Disponibilidade**: objetivo 99,5% (MVP) → 99,9% (V1.2); backups automáticos e testes de restauração.
- **Observabilidade**: logs estruturados, métricas (Prometheus) e traces (OpenTelemetry).

---

## 13) Testes & Critérios de Aceitação
- **Unitários** (domínio e validações), **integração** (API, DB, storage), **E2E** (Playwright/Cypress), **segurança** (SAST/DAST), **acessibilidade** (axe-core), **carga** (k6/Locust).
- Critérios por fluxo:
  - Autoavaliação salva rascunhos; impedimento de submissão com pendências obrigatórias.
  - Auditor valida notas e gera parecer; trilha de evidências imutável.
  - Emissão de selo gera QR verificável; download disponível à empresa; registro público (V1.1).
  - Renovação respeita janelas e reaproveita dados quando aplicável.

---

## 14) Implantação & DevOps
- **Ambientes**: Dev, Staging, Produção.
- **CI/CD**: GitHub Actions/GitLab CI; testes + lint + build + scan + deploy.
- **Infra**:
  - MVP: Docker Compose (API, DB, Redis, MinIO, Nginx).
  - Prod: Kubernetes (Ingress, HPA, Secrets, Persistent Volumes), Postgres gerenciado.
- **Config**: 12-Factor; variáveis de ambiente; migrações (Alembic/Django Migrations).

---

## 15) Roadmap Resumido
- **S0 (Semanas 1–2)**: modelagem de domínio, autenticação, CRUD de empresas/usuários.
- **S1 (Semanas 3–6)**: questionários e autoavaliação; upload de evidências; dashboard básico.
- **S2 (Semanas 7–9)**: módulo de auditoria; cálculo de pontuações; emissão do selo + QR.
- **S3 (Semanas 10–12)**: relatórios essenciais, trilhas de capacitação; notificações.
- **V1.1**: portal público, assinaturas digitais, exportações avançadas.

---

## 16) Artefatos Complementares
- **OpenAPI/Swagger** gerado automaticamente.
- **Design System** (tokens, componentes, guidelines de acessibilidade).
- **Templates**: relatório de auditoria, selo digital (SVG), ebook de boas práticas.

---

## 17) Riscos & Mitigações
- **Sobrecarga do auditor** → filas, SLA por etapa, dashboards de capacidade.
- **Qualidade de evidências** → validações de formato/tamanho, checklist por critério, amostras obrigatórias.
- **Escopo variável por setor** → catálogo de critérios versionado por segmento.
- **Segurança** → pentest antes de V1.0; política de senhas/MFA; revisão de permissões.

---

## 18) Anexos (Esboços de Modelos)

### 18.1 Exemplo de JSON de Emissão de Selo
```json
{
  "certificationId": "c_123",
  "company": {"id": "comp_456", "name": "Indústria XYZ"},
  "issuedAt": "2025-08-20T12:34:56Z",
  "validUntil": "2026-08-20T23:59:59Z",
  "score": 82.5,
  "pillars": {"qualidade": 80, "sustentabilidade": 85, "inovacao": 78, "eficiencia": 87},
  "qr": "https://selo.fiea.org/verify/abc123"
}
```

### 18.2 Exemplo de Webhook (V1.2)
```json
{
  "event": "certification.issued",
  "data": {
    "certificationId": "c_123",
    "companyId": "comp_456",
    "validUntil": "2026-08-20"
  },
  "sentAt": "2025-08-20T12:35:00Z"
}
```

---

## 19) Critérios para Go-Live
- Testes E2E passando (>95% cenários críticos), SLO de latência cumprido, monitoração ativa, plano de rollback testado, treinamento de auditores concluído, base legal/LGPD revisada.

---

### Conclusão
O desenho acima prioriza **clareza de fluxo**, **segurança** e **escalabilidade**, alinhado ao objetivo de reconhecer indústrias que cumpram altos padrões de **qualidade**, **sustentabilidade** e **inovação**. O MVP foca no essencial para rodar um ciclo completo com governança da FIEA e visibilidade para as empresas, permitindo evoluções graduais com baixo risco.

