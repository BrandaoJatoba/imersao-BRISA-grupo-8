// src/pages/LoginPage.tsx

import { useSearchParams } from "react-router-dom"; // 1. Importe o hook
import { AuthForm } from "../components/AuthForm";
import { Footer } from "../components/Footer";
import { LoginHeader } from "../components/LoginHeader";

export function LoginPage() {
    const [searchParams] = useSearchParams(); // 2. Use o hook para ler os parâmetros da URL
    const initialTab = searchParams.get('tab'); // 3. Pegue o valor do parâmetro 'tab'

    return (
        <>
            <LoginHeader />
            <main className="hero-bg flex items-center justify-center min-h-screen py-12 px-4">
                {/* 4. Passe o valor como uma 'prop' para o AuthForm */}
                <AuthForm initialTab={initialTab} />
            </main>
            <Footer />
        </>
    )
}