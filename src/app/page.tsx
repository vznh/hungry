'use client';

import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [recipe, setRecipe] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRecipe(null);

    try {
      const response = await fetch('/api/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || 'Failed to process video');
      }

      setRecipe(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      console.error('Error details:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">TikTok Recipe Extractor</h1>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter TikTok URL"
          className="border p-2 w-full max-w-md"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? 'Processing...' : 'Extract Recipe'}
        </button>
      </form>

      {error && (
        <div className="text-red-500 mb-4 p-4 bg-red-50 rounded">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
        </div>
      )}

      {recipe && (
        <div className="border p-4 rounded">
          <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
          
          <h3 className="font-bold mt-4">Ingredients:</h3>
          <ul className="list-disc pl-5">
            {recipe.ingredients.map((ing: any, index: number) => (
              <li key={index}>
                {ing.amount} {ing.unit || ''} {ing.name}
              </li>
            ))}
          </ul>

          <h3 className="font-bold mt-4">Instructions:</h3>
          <ol className="list-decimal pl-5">
            {recipe.instructions.map((step: string, index: number) => (
              <li key={index}>{step}</li>
            ))}
          </ol>

          {recipe.prepTime && (
            <p className="mt-4">Prep Time: {recipe.prepTime}</p>
          )}
          {recipe.cookTime && (
            <p>Cook Time: {recipe.cookTime}</p>
          )}
          {recipe.servings && (
            <p>Servings: {recipe.servings}</p>
          )}
        </div>
      )}
    </main>
  );
}
