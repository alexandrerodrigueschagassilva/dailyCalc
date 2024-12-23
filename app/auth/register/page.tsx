'use client';

import React, { useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Criar usuário no Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    // Atualizar o nome do perfil (opcional)
    if (data.user) {
      const { error: updateError } = await supabase.from('profiles').upsert({
        id: data.user.id,
        name,
      });

      if (updateError) {
        setError(updateError.message);
        return;
      }
    }

    setSuccess(true);
  };

  const handleAcknowledge = () => {
    setAcknowledged(true);
    // Limpa o formulário
    setName('');
    setEmail('');
    setPassword('');
    // Redireciona para a página de login
    router.push('/auth/login');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Cadastro</h1>
          <p className="text-gray-500">Crie sua conta para começar</p>
        </div>

        {!success && (
          <form className="space-y-4" onSubmit={handleRegister}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nome
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-4 py-2 mt-1 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Digite seu nome"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                E-mail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-2 mt-1 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Digite seu e-mail"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-2 mt-1 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Digite sua senha"
                required
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cadastrar
            </button>
          </form>
        )}

        {success && (
          <div className="space-y-4">
            <p className="text-sm text-green-600">
              Cadastro realizado com sucesso! Por favor, verifique seu e-mail para confirmar sua conta.
            </p>
            <button
              onClick={handleAcknowledge}
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Entendido, ir para login
            </button>
          </div>
        )}

        {!success && (
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Já tem uma conta?{' '}
              <a href="/auth/login" className="text-blue-600 hover:underline">
                Faça login
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
