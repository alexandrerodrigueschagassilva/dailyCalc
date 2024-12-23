'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';
import { analyzeWithN8N } from '../services/n8nService';
import { supabase } from '../services/supabaseClient';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export default function AddMealPage() {
  const router = useRouter();

  const currentDateTime = new Date().toISOString().slice(0, 16);
  const [mealTime, setMealTime] = useState(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 10) return 'Café da manhã';
    if (currentHour < 14) return 'Almoço';
    if (currentHour < 17) return 'Café da tarde';
    if (currentHour < 20) return 'Lanche';
    if (currentHour < 23) return 'Janta';
    return 'Beliscada';
  });

  const [dateTime, setDateTime] = useState(currentDateTime);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState('');
  const [calories, setCalories] = useState(0);
  const [macronutrients, setMacronutrients] = useState({
    proteinas: 0,
    carboidratos: 0,
    gorduras: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Limpar preview da imagem se o arquivo for removido
    if (!image) setPreview(null);
  }, [image]);

  const resizeImage = async (file: File, maxWidth: number): Promise<File> => {
    const img = document.createElement('img');
    const canvas = document.createElement('canvas');
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = (e) => {
        img.src = e.target?.result as string;
        img.onload = () => {
          const scaleFactor = maxWidth / img.width;
          canvas.width = maxWidth;
          canvas.height = img.height * scaleFactor;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

          canvas.toBlob(
            (blob) => {
              if (!blob) return reject(new Error('Erro ao redimensionar imagem.'));
              const resizedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
              resolve(resizedFile);
            },
            file.type,
            0.8
          );
        };
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const resizedFile = await resizeImage(file, 640);
      setImage(resizedFile);
      setPreview(URL.createObjectURL(resizedFile));

      const imageUrl = await uploadImageToSupabase(resizedFile);
      const response = await analyzeWithN8N(imageUrl, '');

      setCalories(response.calorias || 0);
      setMacronutrients(response.macronutrientes || { proteinas: 0, carboidratos: 0, gorduras: 0 });
      setIngredients(response.ingredientes?.join(', ') || '');
    } catch (error) {
      console.error('Erro ao processar imagem:', error);
      alert('Erro ao processar a imagem.');
    } finally {
      setLoading(false);
    }
  };

  const uploadImageToSupabase = async (file: File): Promise<string> => {
    try {
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage.from('imagens_refeicoes').upload(fileName, file);

      if (error) throw new Error(error.message);

      const { data: publicData } = supabase.storage.from('imagens_refeicoes').getPublicUrl(fileName);

      if (!publicData || !publicData.publicUrl) {
        throw new Error('Erro ao obter a URL pública da imagem.');
      }

      return publicData.publicUrl;
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      throw error;
    }
  };

  const handleAnalyzeIngredients = async () => {
    if (!ingredients.trim()) return;

    setLoading(true);
    try {
      const response = await analyzeWithN8N('', ingredients);

      setCalories(response.calorias || 0);
      setMacronutrients(response.macronutrientes || { proteinas: 0, carboidratos: 0, gorduras: 0 });
    } catch (error) {
      console.error('Erro ao analisar os ingredientes:', error);
      alert('Erro ao analisar os ingredientes.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveMeal = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();

      const { error } = await supabase.from('refeicoes').insert({
        usuario_id: user?.id || 'user-id-desconhecido',
        tipo_refeicao: mealTime,
        data_hora: dateTime,
        ingredientes: ingredients,
        calorias: calories,
        proteinas: macronutrients.proteinas,
        carboidratos: macronutrients.carboidratos,
        gorduras: macronutrients.gorduras,
        url_imagem: preview,
      });

      if (error) throw new Error(error.message);

      alert('Refeição salva com sucesso!');
      router.push('/dashboard');
    } catch (error) {
      console.error('Erro ao salvar refeição:', error);
      alert('Erro ao salvar a refeição.');
    }
  };

  const barData = {
    labels: ['Proteínas (g)', 'Carboidratos (g)', 'Gorduras (g)'],
    datasets: [
      {
        label: 'Macronutrientes',
        data: [macronutrients.proteinas, macronutrients.carboidratos, macronutrients.gorduras],
        backgroundColor: ['#4CAF50', '#FFC107', '#FF5722'],
        borderRadius: 8,
        barThickness: 30,
      },
    ],
  };

  const barOptions = {
    indexAxis: 'y',
    responsive: true,
    scales: {
      x: { display: false },
      y: {
        ticks: { font: { size: 14 } },
        grid: { display: false },
      },
    },
    plugins: { legend: { display: false } },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-lg border border-gray-300 hover:bg-gray-200 mb-4"
          onClick={() => router.push('/dashboard')}
        >
          Voltar ao Dashboard
        </button>

        <h1 className="text-2xl font-bold text-gray-800 mb-6">Adicionar Nova Refeição</h1>

        <div className="mb-4">
          <label htmlFor="mealTime" className="block text-sm font-medium text-gray-700">
            Refeição
          </label>
          <select
            id="mealTime"
            value={mealTime}
            onChange={(e) => setMealTime(e.target.value)}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-lg"
          >
            <option value="Café da manhã">Café da manhã</option>
            <option value="Almoço">Almoço</option>
            <option value="Café da tarde">Café da tarde</option>
            <option value="Lanche">Lanche</option>
            <option value="Janta">Janta</option>
            <option value="Beliscada">Beliscada</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="dateTime" className="block text-sm font-medium text-gray-700">
            Data e Hora
          </label>
          <input
            type="datetime-local"
            id="dateTime"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Imagem da Refeição</label>
          <label className="block cursor-pointer w-full border border-gray-400 rounded-lg bg-gray-200 text-center p-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <span className="text-sm text-gray-600">Clique aqui para adicionar uma imagem</span>
          </label>
          {preview && <img src={preview} alt="Preview" className="mt-4 w-full rounded-lg" />}
        </div>

        <div className="mb-4">
          <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">
            Ingredientes
          </label>
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-lg"
            rows={4}
          />
          <button
            onClick={handleAnalyzeIngredients}
            className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Recalcular com IA
          </button>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800">Editar Macronutrientes</h2>
          {Object.entries(macronutrients).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {key}
              </label>
              <input
                type="number"
                value={value}
                onChange={(e) =>
                  setMacronutrients((prev) => ({
                    ...prev,
                    [key]: Number(e.target.value),
                  }))
                }
                className="block w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
          ))}
        </div>

        <div className="my-6">
          <h2 className="text-lg font-bold text-gray-800">Resumo Nutricional</h2>
          <Bar data={barData} options={barOptions} />
        </div>

        <button
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          onClick={handleSaveMeal}
        >
          Salvar Refeição
        </button>
      </div>
    </div>
  );
}
