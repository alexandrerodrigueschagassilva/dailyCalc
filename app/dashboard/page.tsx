'use client';

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';
import { useRouter } from 'next/navigation';
// Registrar componentes necessários para o Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export default function DashboardPage() {
  const router = useRouter();
  const userName = 'João';
  const dailyData = {
    calories: 1800, // kcal
    protein: 120, // g
    carbs: 200, // g
    fat: 50, // g
  };

  const mealsMock = [
    {
      id: 1,
      name: 'Café da manhã',
      description: 'Ovos mexidos, pão integral, café sem açúcar',
      calories: 400,
    },
    {
      id: 2,
      name: 'Almoço',
      description: 'Arroz, feijão, frango grelhado, salada',
      calories: 600,
    },
    {
      id: 3,
      name: 'Jantar',
      description: 'Sopa de legumes, torrada integral',
      calories: 300,
    },
  ];

  const barData = {
    labels: ['Proteínas (g)', 'Carboidratos (g)', 'Gorduras (g)'],
    datasets: [
      {
        label: 'Macronutrientes Consumidos',
        data: [dailyData.protein, dailyData.carbs, dailyData.fat],
        backgroundColor: ['#4CAF50', '#FFC107', '#FF5722'],
        borderRadius: 8, // Arredonda as barras
        barThickness: 50, // Ajusta a largura das barras
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: false, // Desativa tooltip para manter o layout limpo
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Remove grades verticais
        },
        ticks: {
          display: false, // Remove labels do eixo X
        },
      },
      y: {
        grid: {
          display: false, // Remove grades horizontais
        },
        ticks: {
          display: false, // Remove labels do eixo Y
        },
      },
    },
  };

  return (
    
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Boas-vindas */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Olá, {userName}!</h1>
        <p className="text-gray-600">Aqui está o resumo do seu dia:</p>
        <div className="mt-4">
        <button
        className="w-full md:w-auto flex flex-col items-center justify-center px-6 py-4 bg-gray-200 text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-300 focus:ring-2 focus:ring-gray-400"
        onClick={() => router.push('/add-meal')}
        >
        {/* Ícone de "+" */}
        <span className="text-4xl font-bold mb-2">+</span>
        {/* Texto abaixo do ícone */}
        <span className="text-sm">Adicionar Refeição</span>
        </button>
        </div>

      </div>


      {/* Resumo de Consumo Diário */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white shadow-lg rounded-lg flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-800">Calorias</h2>
          <p className="text-3xl font-bold text-blue-600">{dailyData.calories}</p>
          <p className="text-sm text-gray-600">kcal consumidas</p>
        </div>
        <div className="p-4 bg-white shadow-lg rounded-lg flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-800">Proteínas</h2>
          <p className="text-3xl font-bold text-green-600">{dailyData.protein}g</p>
          <p className="text-sm text-gray-600">consumidas hoje</p>
        </div>
        <div className="p-4 bg-white shadow-lg rounded-lg flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-800">Carboidratos</h2>
          <p className="text-3xl font-bold text-yellow-600">{dailyData.carbs}g</p>
          <p className="text-sm text-gray-600">consumidos hoje</p>
        </div>
        <div className="p-4 bg-white shadow-lg rounded-lg flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-800">Gorduras</h2>
          <p className="text-3xl font-bold text-red-600">{dailyData.fat}g</p>
          <p className="text-sm text-gray-600">consumidas hoje</p>
        </div>
      </div>

      {/* Gráfico de Macronutrientes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gráfico de Macronutrientes */}
        <div className="bg-white rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Distribuição de Macronutrientes
            </h2>
            <div className="w-full mx-auto relative">
            <div className="absolute w-full flex justify-around top-0 -mt-6">
                <div className="text-center">
                <p className="text-lg font-bold text-green-600">{dailyData.protein}g</p>
                </div>
                <div className="text-center">
                <p className="text-lg font-bold text-yellow-600">{dailyData.carbs}g</p>
                </div>
                <div className="text-center">
                <p className="text-lg font-bold text-red-600">{dailyData.fat}g</p>
                </div>
            </div>
            <Bar data={barData} options={barOptions} />
            </div>

            {/* Legenda */}
            <div className="flex justify-center items-center space-x-6 mt-8">
            <div className="flex items-center space-x-2">
                <span className="inline-block w-4 h-4 rounded-full bg-green-600"></span>
                <span className="text-sm text-gray-600">Proteínas</span>
            </div>
            <div className="flex items-center space-x-2">
                <span className="inline-block w-4 h-4 rounded-full bg-yellow-600"></span>
                <span className="text-sm text-gray-600">Carboidratos</span>
            </div>
            <div className="flex items-center space-x-2">
                <span className="inline-block w-4 h-4 rounded-full bg-red-600"></span>
                <span className="text-sm text-gray-600">Gorduras</span>
            </div>
            </div>
        </div>

        {/* Lista de Refeições */}
        <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Refeições de Hoje</h2>
        <ul className="space-y-4">
            {mealsMock.map((meal) => (
            <li key={meal.id} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                {meal.name.charAt(0)}
                </div>
                <div>
                <h3 className="text-lg font-semibold text-gray-800">{meal.name}</h3>
                <p className="text-gray-600">{meal.description}</p>
                <p className="text-sm text-gray-500">{meal.calories} calorias</p>
                </div>
            </li>
            ))}
        </ul>
        </div>

        </div>

    </div>
  );
}
