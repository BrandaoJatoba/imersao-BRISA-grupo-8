// selo-fiea-frontend/src/pages/DigitalBadgesPage.tsx

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Award, Building, Calendar, ShieldCheck, Download, QrCode, Copy } from 'lucide-react';
import type { Badge } from "./BadgesPage";
import type { Company } from "../components/CompanyModal";
import badgeIcon from '/badge.jpg';

// --- Tipos de Dados ---

interface DigitalBadge {
  id: string;
  badge: Badge;
  company: Company;
  issueDate: Date;
  imageUrl: string;
  verificationUrl: string;
}

// --- Dados Mocados (Simulando API) ---

// Reutilizando um selo de BadgesPage
const MOCKED_BADGE: Badge = {
  id: 1,
  name: 'Selo FIEA de Excelência',
  description: 'Concedido a empresas com excelência em gestão, sustentabilidade ambiental e inovação tecnológica.',
  validadeMeses: 12,
  dataInicioEmissao: new Date(2025, 0, 1),
  dataFimEmissao: new Date(2025, 11, 31),
  icon: badgeIcon,
  criteria: ['Qualidade de Gestão', 'Sustentabilidade Ambiental', 'Inovação Tecnológica']
};

// Reutilizando empresas de MyCompaniesPage
export const MOCKED_COMPANIES: Company[] = [
  { id: 1, razao_social: 'Indústria Alfa Ltda.', nome_fantasia: 'Alfa Metais', cnpj: '00.000.000/0001-00', setor: 'Metalurgia', porte: 'Médio', status: 'Ativa', endereco: 'Rua das Industias, Maceió - AL', email: 'contato@alfametais.com.br', telefone: '(11) 11111-1111' },
  { id: 2, razao_social: 'Indústria Beta Ltda.', nome_fantasia: 'Beta Alimentos', cnpj: '11.111.111/0001-11', setor: 'Alimentício', porte: 'Grande', status: 'Ativa', endereco: 'Rua das Industias, Maceió - AL', email: 'contato@betaalimentos.com.br', telefone: '(22) 22222-2222' },
];

// Selos emitidos para as empresas
export const MOCKED_ISSUED_BADGES: DigitalBadge[] = [
  { id: 'issued-001', badge: MOCKED_BADGE, company: MOCKED_COMPANIES[0], issueDate: new Date(2025, 0, 15), imageUrl: '/badge.jpg', verificationUrl: `/verificacao/issued-001` },
  { id: 'issued-002', badge: MOCKED_BADGE, company: MOCKED_COMPANIES[1], issueDate: new Date(2024, 0, 15), imageUrl: '/badge.jpg', verificationUrl: `/verificacao/issued-002` },
];


export function DigitalBadgesPage() {
  const [issuedBadges, setIssuedBadges] = useState<DigitalBadge[]>([]);

  useEffect(() => {
    // ! Substituir com chamada real à API (Ex: fetch('/api/digital-badges'))
    setIssuedBadges(MOCKED_ISSUED_BADGES);
  }, []);

  const calculateExpiryDate = (issueDate: Date, validityMonths: number) => {
    const expiry = new Date(issueDate);
    expiry.setMonth(expiry.getMonth() + validityMonths);
    return expiry;
  };

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Link copiado para a área de transferência!');
    } catch (err) {
      console.error('Falha ao copiar o link: ', err);
      alert('Falha ao copiar o link.');
    }
  };

  const handleDownloadQr = (issued: DigitalBadge) => {
    // Lógica para gerar e baixar o QR Code.
    // Por enquanto, apenas um alerta para simular a ação.
    alert(`Simulando download do QR Code para o selo da empresa ${issued.company.nome_fantasia}.
URL: ${window.location.origin}${issued.verificationUrl}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-6 py-4">
            <Link to="/industry/dashboard/" className="text-sm font-semibold text-blue-600 hover:underline">← Voltar para o Portal</Link>
            <h1 className="text-3xl font-bold text-gray-800 mt-2">Meus Selos</h1>
            <p className="text-gray-600 mt-1">Visualize os selos de reconhecimento FIEA conquistados.</p>
          </div>
        </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {issuedBadges.map(issued => {
            const expiryDate = calculateExpiryDate(issued.issueDate, issued.badge.validadeMeses);
            const now = new Date();
            const isValid = now >= issued.issueDate && now <= expiryDate;
            const fullVerificationUrl = `${window.location.origin}${issued.verificationUrl}`;
            return (
              <div key={issued.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
                <img src={issued.badge.icon} alt={issued.badge.name} className="h-24 w-24 rounded-full mb-4 border-4 border-gray-200" />
                
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Award size={20} className="text-blue-600" />
                  {issued.badge.name}
                </h2>
                <p className="text-lg font-semibold text-gray-700 mt-2 mb-4 flex items-center gap-2">
                  <Building size={18} className="text-gray-500" />
                  {issued.company.nome_fantasia}
                </p>

                <div className="text-sm text-gray-600 space-y-2 w-full border-t pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold flex items-center gap-1.5"><Calendar size={14} /> Data de Emissão:</span>
                    <span>{issued.issueDate.toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold flex items-center gap-1.5"><ShieldCheck size={14} /> Data de Validade:</span>
                    <span>{expiryDate.toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold flex items-center gap-1.5">Status:</span>
                    <span
                      className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                        isValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                      {isValid ? 'Ativo' : 'Expirado'}
                    </span>
                  </div>
                </div>

                {isValid ? (
                  <div className="mt-5 w-full space-y-4">
                    <div className="bg-gray-50 rounded-lg p-3 border">
                      <h4 className="text-sm font-semibold mb-2">Divulgação</h4>

                      <div className="flex flex-wrap justify-center gap-2 mb-2">
                        <a
                          className="text-xs rounded border px-3 py-1 hover:bg-gray-100 flex items-center gap-1"
                          href={issued.imageUrl}
                          download
                        >
                          <Download size={12} /> Baixar Selo
                        </a>
                        <button
                          className="text-xs rounded border px-3 py-1 hover:bg-gray-100 flex items-center gap-1"
                          onClick={() => handleDownloadQr(issued)}
                          title="QR mock apontando para o link de verificação"
                        >
                          <QrCode size={12} /> Baixar QR Code
                        </button>
                      </div>

                      <h4 className="text-sm font-semibold mb-2">Verificação</h4>
                      <div className="flex items-center gap-2">
                        <input
                          className="flex-1 text-xs px-2 py-1 rounded border bg-white truncate"
                          value={fullVerificationUrl}
                          readOnly
                        />
                        <button
                          className="text-xs rounded border px-2 py-1 hover:bg-gray-100 flex items-center gap-1"
                          onClick={() => copy(fullVerificationUrl)}
                        >
                          <Copy size={12} /> Copiar
                        </button>
                      </div>
                      <p className="mt-2 text-xs text-gray-500">
                        Este é o link oficial de verificação do seu selo.
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}