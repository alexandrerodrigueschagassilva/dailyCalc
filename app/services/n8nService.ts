const API_URL = process.env.NEXT_PUBLIC_ANALYSE_API_URL || '';

export async function analyzeWithN8N(imageUrl: string, text: string) {
  if (!API_URL) {
    throw new Error('A URL da API não está configurada. Verifique as variáveis de ambiente.');
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl, text }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro ao se comunicar com a API N8N:', errorText);
      throw new Error('Erro ao se comunicar com a API N8N.');
    }

    const data = await response.json();

    if (!data || !data.macronutrientes || !data.ingredientes) {
      throw new Error('Resposta inválida da API N8N. Verifique o formato retornado.');
    }

    return {
      calorias: data.calorias || 0,
      macronutrientes: data.macronutrientes,
      ingredientes: data.ingredientes,
    };
  } catch (error) {
    console.error('Erro no serviço N8N:', error);
    throw new Error('Erro ao processar a requisição com a API externa.');
  }
}
