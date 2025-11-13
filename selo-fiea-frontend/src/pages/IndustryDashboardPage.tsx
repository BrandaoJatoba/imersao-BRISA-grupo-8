// selo-fiea-frontend/src/pages/IndustryDashboardPage.tsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, CheckCircle, Edit, Building, Award, BadgeCheck } from 'lucide-react';

// --- Tipos de Dados (Simplificado para este fluxo) ---
interface SelfAssessment {
  id: string;
  badgeId: number;
  badgeName: string;
  status: 'draft' | 'submitted';
  progress: number; // Percentual de conclusão (ex: 3 de 5 critérios = 60)
}

// Simulando autoavaliações salvas ou submetidas
// (Em um app real, isso viria do localStorage ou API)
const MOCKED_ASSESSMENTS: SelfAssessment[] = [
  { id: 'draft_1', badgeId: 1, badgeName: 'Selo FIEA de Excelência', status: 'draft', progress: 50 },
];

export function IndustryDashboardPage() {
  const [myAssessments, setMyAssessments] = useState<SelfAssessment[]>([]);

  useEffect(() => {
    // ! Substituir com chamadas reais à API

    // 2. Buscar minhas autoavaliações (em rascunho ou submetidas)
    // Aqui, estamos apenas carregando o mock.
    // Em uma implementação real, verificaríamos o localStorage
    // ou faríamos um fetch para /api/my-assessments
    setMyAssessments(MOCKED_ASSESSMENTS);
  }, []);

  const drafts = myAssessments.filter(a => a.status === 'draft');
  const submitted = myAssessments.filter(a => a.status === 'submitted');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Simples da Indústria */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Portal da Indústria</h1>
          <Link to="/login" className="text-sm font-semibold text-blue-600 hover:underline">Sair</Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-gray-700 mb-6">Bem-vindo, Gestor da Indústria!</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">

          {/* 1. Card de Minhas Empresas */}
          <Link to="/industry/dashboard/empresas" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-100 flex flex-col items-start h-full">
            <div className="flex items-center mb-6">
              <div className="bg-indigo-100 text-indigo-700 p-2 rounded-full mr-4">
                <Building size={38} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Minhas Empresas</h3>
            </div>
            <p className="text-gray-600 mb-6">Visualize e gerencie as informações das empresas cadastradas.</p>
            <span className="font-semibold text-blue-600 mt-auto">Acessar →</span>
          </Link>

          {/* 2. Card de Selos Conquistados */}
          <Link to="/industry/dashboard/selos" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-100 flex flex-col items-start h-full">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 text-green-500 p-2 rounded-full mr-4">
                <BadgeCheck size={38} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Selos Conquistados</h3>
            </div>
            <p className="text-gray-600 mb-6">Visualize os selos de reconhecimento FIEA conquistados.</p>
            <span className="font-semibold text-blue-600 mt-auto">Acessar →</span>
          </Link>

          {/* 3. Card de Selos Concedidos */}
          <Link to="/industry/dashboard/selos-disponiveis" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-100 flex flex-col items-start h-full">
            <div className="flex items-center mb-6">
              <div className="bg-yellow-100 text-yellow-500 p-2 rounded-full mr-4">
                <Award size={38} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Selos Disponíveis</h3>
            </div>
            <p className="text-gray-600 mb-6">Veja os selos disponíveis para inscrição e inicie um novo processo de certificação.</p>
            <span className="font-semibold text-blue-600 mt-auto">Acessar →</span>
          </Link>

          {/* 4. Card de Minhas Autoavaliações */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-100 flex flex-col h-full">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Minhas Autoavaliações</h3>
            {/* Rascunhos */}
            {drafts.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold text-lg mb-2 text-yellow-700">Em Andamento (Rascunhos)</h4>
                {drafts.map(draft => (
                  <Link
                    key={draft.id}
                    to={`/industry/assessment/${draft.badgeId}`}
                    className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 mb-2"
                  >
                    <div>
                      <p className="font-bold">{draft.badgeName}</p>
                      <p className="text-sm text-gray-600">Progresso: {draft.progress}%</p>
                    </div>
                    <span className="flex items-center text-blue-600 font-semibold">
                      <Edit size={16} className="mr-2" />
                      Continuar
                    </span>
                  </Link>
                ))}
              </div>
            )}
            
            {/* Submetidas */}
            {submitted.length > 0 && (
              <div>
                <h4 className="font-semibold text-lg mb-2 text-green-700">Submetidas (Em Análise)</h4>
                {submitted.map(sub => (
                  <div key={sub.id} className="flex justify-between items-center p-4 border rounded-lg bg-gray-50 mb-2">
                    <p className="font-bold">{sub.badgeName}</p>
                    <span className="flex items-center text-green-600 font-semibold">
                      <CheckCircle size={16} className="mr-2" />
                      Enviado
                    </span>
                  </div>
                ))}
              </div>
            )}

            {drafts.length === 0 && submitted.length === 0 && (
              <div className="text-center py-8 text-gray-500 flex-grow flex flex-col justify-center items-center">
                <FileText size={40} className="mx-auto mb-2" />
                <p>Nenhuma autoavaliação iniciada.</p>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
