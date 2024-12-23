import { supabase } from './services/supabaseClient';

export default async function Home() {
  const { data, error } = await supabase.from('test_table').select('*');
  if (error) console.error(error);

  return (
    <div>
      <h1>Bem-vindo ao My Nutrition SaaS!</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
