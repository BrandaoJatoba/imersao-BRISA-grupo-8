# Design do Sistema — Certificação de Indústrias com Selo FIEA de Excelência e Inovação

> **Stack alvo**: Front-end em **React** (TypeScript) e back-end em **Python** (FastAPI ou Django REST Framework), banco **PostgreSQL** e implantação em contêineres (**Docker** + **Kubernetes** ou Docker Compose para MVP).

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
 
 # Documentação Front-end

 O front-end está sendo desenvolvido utilizando React, TypeScript e Vite. O projeto consiste em uma Single Page Application (SPA) com rotas para a página de apresentação e para a área de autenticação.

## 1) Tecnologias
Atualmente nós estamos usando:
- Vite
- React 19
- TypeScript
- Tailwind CSS v4
- React Router DOM
- Lucide React

 ## 2) Estrutura do projeto 
```
 /selo-fiea-frontend
├── src/
│   ├── components/      # Componentes reutilizáveis (Header, Footer, AuthForm...)
│   ├── pages/           # Componentes de página (LandingPage, LoginPage)
│   ├── App.tsx          # Configuração principal das rotas da aplicação
│   ├── main.tsx         # Ponto de entrada da aplicação (renderiza o App)
│   └── index.css        # Estilos globais e configuração do Tailwind
├── package.json         # Dependências e scripts do projeto
└── vite.config.ts       # Configuração do Vite e do plugin do Tailwind
```

## 3) Execução

### Pré-requisitos 
- Node.js
- npm

### Instalação

```cd selo-fiea-frontend```

```npm install```

```npm run dev```

O "login" só pode ser feito usando as credenciais:

```gestor@selofiea.com.br```

 ```Password@123```

## 4) Rotas
Atualmente temos as seguintes rotas configuradas em ```src/App.tsx```:
- ```/```: Renderiza o componente ```LandingPage.tsx```
- ```/login```: Renderiza o componente ```LoginPage.tsx```
    - Essa cujo tambem aceita um parâmetro de busca ```?tab=register``` (por exemplo: ```/login?tab=register```) para abrir diretamente na aba de cadastro
