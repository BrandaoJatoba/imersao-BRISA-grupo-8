// src/components/AuthForm.tsx
import { useState, useEffect } from "react";

// Define os tipos das props que o componente vai receber
interface AuthFormProps {
  initialTab?: string | null;
}

export function AuthForm({ initialTab }: AuthFormProps) {
  
  // Define o estado inicial com base na prop recebida
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(
    initialTab === 'register' ? 'register' : 'login'
  );

  // Garante que a aba mude se a URL for alterada enquanto o componente já está na tela
  useEffect(() => {
    if (initialTab === 'register') {
      setActiveTab('register');
    } else {
      setActiveTab('login');
    }
  }, [initialTab]);

  const getTabClassName = (tabName: 'login' | 'register') => {
    const baseClasses = "flex-1 py-3 font-semibold text-center rounded-t-lg focus:outline-none transition-colors";
    if (activeTab === tabName) {
      return `${baseClasses} text-white bg-blue-700`;
    }
    return `${baseClasses} text-gray-500 bg-gray-100 hover:bg-gray-200`;
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <div className="flex border-b border-gray-200 mb-6">
          <button onClick={() => setActiveTab('login')} className={getTabClassName('login')}>
            Entrar
          </button>
          <button onClick={() => setActiveTab('register')} className={getTabClassName('register')}>
            Cadastrar-se
          </button>
        </div>

        {/* Formulário de Login */}
        {activeTab === 'login' && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Acessar Portal</h2>
              <p className="text-gray-500 mt-1">Bem-vindo de volta!</p>
            </div>
            <form>
              <div className="mb-4">
                <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                <input type="email" id="login-email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="email@empresa.com.br" required />
              </div>
              <div className="mb-6">
                <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                <input type="password" id="login-password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="••••••••" required />
              </div>
              <div className="flex items-center justify-end mb-6">
                <a href="#" className="text-sm font-medium text-blue-600 hover:underline">Esqueceu sua senha?</a>
              </div>
              <div>
                <button type="submit" className="w-full bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-800 transition-all shadow-sm">Entrar</button>
              </div>
            </form>
          </div>
        )}

        {/* Formulário de Cadastro */}
        {activeTab === 'register' && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Criar Nova Conta</h2>
              <p className="text-gray-500 mt-1">Preencha os dados para se inscrever.</p>
            </div>
            <form>
              <div className="mb-4">
                <label htmlFor="register-company" className="block text-sm font-medium text-gray-700 mb-1">Nome da Indústria</label>
                <input type="text" id="register-company" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Nome da sua empresa" required />
              </div>
              <div className="mb-4">
                <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-1">E-mail de Acesso</label>
                <input type="email" id="register-email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="email@empresa.com.br" required />
              </div>
              <div className="mb-6">
                <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-1">Crie uma Senha</label>
                <input type="password" id="register-password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="••••••••" required />
              </div>
              <div>
                <button type="submit" className="w-full bg-green-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-green-700 transition-all shadow-sm">Criar Conta</button>
              </div>
            </form>
          </div>
        )}
      </div>
      <p className="text-center text-gray-500 text-sm mt-6">
        Ao acessar o portal você concorda com nossos <a href="#" className="text-blue-600 hover:underline">Termos de Serviço</a>.
      </p>
    </div>
  );
}