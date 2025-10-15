import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

interface AuthFormProps {
  initialTab?: string | null;
}

export function AuthForm({ initialTab }: AuthFormProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(
    initialTab === 'register' ? 'register' : 'login'
  );
  
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialTab === 'register') {
      setActiveTab('register');
    } else {
      setActiveTab('login');
    }
  }, [initialTab]);

  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    console.log("Tentativa de login com:", { email: loginEmail, password: loginPassword });

    await new Promise(resolve => setTimeout(resolve, 1000));
    
    navigate('/dashboard');

    setIsLoading(false);
  };

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

        {activeTab === 'login' && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Acessar Portal</h2>
              <p className="text-gray-500 mt-1">Bem-vindo de volta!</p>
            </div>
            <form onSubmit={handleLoginSubmit}>
              {errorMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
                  <span className="block sm:inline">{errorMessage}</span>
                </div>
              )}
              <div className="mb-4">
                <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                <input 
                  type="email" 
                  id="login-email" 
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="email@empresa.com.br" 
                  required 
                  disabled={isLoading}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                <input 
                  type="password" 
                  id="login-password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="••••••••" 
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="flex items-center justify-end mb-6">
                <Link to="/forgot-password" className="text-sm font-medium text-blue-600 hover:underline">
                  Esqueceu sua senha?
                </Link>
              </div>
              <div>
                <button type="submit" className="w-full bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-800 transition-all shadow-sm disabled:bg-blue-400" disabled={isLoading}>
                  {isLoading ? 'Entrando...' : 'Entrar'}
                </button>
              </div>
            </form>
          </div>
        )}

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