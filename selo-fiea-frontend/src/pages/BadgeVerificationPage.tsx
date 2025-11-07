import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShieldCheck, ShieldAlert, Award, Building } from 'lucide-react';
import { LoginHeader } from "../components/LoginHeader";
import { MOCKED_ISSUED_BADGES as allIssuedBadges, MOCKED_COMPANIES } from "./DigitalBadgesPage";

interface DigitalBadge {
  id: string;
  badge: { name: string; validadeMeses: number };
  company: { nome_fantasia: string; cnpj: string };
  issueDate: Date;
}

// Adicionando um selo expirado para teste, usando os dados centralizados
const MOCKED_ISSUED_BADGES = [
    ...allIssuedBadges,
    { id: 'issued-expired', badge: allIssuedBadges[0].badge, company: MOCKED_COMPANIES[1], issueDate: new Date('2022-01-20') },
]

export function BadgeVerificationPage() {
  const { verificationId } = useParams<{ verificationId: string }>();
  const [issuedBadge, setIssuedBadge] = useState<DigitalBadge | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // ! Simula a busca na API pelo ID do selo emitido
    const found = MOCKED_ISSUED_BADGES.find(b => b.id === verificationId);

    if (found) {
      const expiryDate = new Date(found.issueDate);
      expiryDate.setMonth(expiryDate.getMonth() + found.badge.validadeMeses);
      
      setIssuedBadge(found);
      setIsValid(new Date() < expiryDate); // Verifica se a data atual é menor que a de expiração
    } else {
      setIssuedBadge(null);
      setIsValid(false);
    }

    setIsLoading(false);
  }, [verificationId]);

  const expiryDate = issuedBadge ? new Date(issuedBadge.issueDate) : null;
  if (expiryDate && issuedBadge) {
    expiryDate.setMonth(expiryDate.getMonth() + issuedBadge.badge.validadeMeses);
  }

  const renderContent = () => {
    if (isLoading) {
      return <p className="text-center text-gray-600">Verificando...</p>;
    }

    if (isValid && issuedBadge) {
      return (
        <div className="text-center">
          <ShieldCheck className="mx-auto h-16 w-16 text-green-600" />
          <h2 className="mt-4 text-2xl font-bold text-gray-800">Selo Verificado!</h2>
          
          <div className="mt-8 text-left bg-gray-50 p-6 rounded-lg border">
            <h3 className="font-bold text-lg flex items-center gap-2"><Award size={20} /> {issuedBadge.badge.name}</h3>
            <p className="mt-2 flex items-center gap-2 text-gray-700"><Building size={18} /> Concedido a: <span className="font-semibold">{issuedBadge.company.nome_fantasia}</span></p>
            <p className="mt-1 text-sm text-gray-500">CNPJ: {issuedBadge.company.cnpj}</p>
            <div className="mt-4 border-t pt-4 space-y-2 text-sm">
              <p className="flex justify-between"><span>Data de Emissão:</span> <strong>{issuedBadge.issueDate.toLocaleDateString('pt-BR')}</strong></p>
              <p className="flex justify-between"><span>Data de Validade:</span> <strong>{expiryDate?.toLocaleDateString('pt-BR')}</strong></p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="text-center">
        <ShieldAlert className="mx-auto h-16 w-16 text-red-500" />
        <h2 className="mt-4 text-2xl font-bold text-gray-800">Selo Inválido ou Expirado</h2>
        <p className="mt-2 text-gray-600">Não foi possível verificar a autenticidade deste selo. Ele pode não existir ou sua validade pode ter expirado.</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <LoginHeader />
      <main className="hero-bg flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-md border border-gray-100">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}