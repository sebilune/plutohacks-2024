// export async function callOpenAI(prompt) {
//   try {
//     const response = await fetch('https://api.openai.com/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`, // Ensure VITE_ prefix is used
//       },
//       body: JSON.stringify({
//         model: 'gpt-3.5-turbo',
//         messages: [
//           { role: 'system', content: 'You are a helpful assistant.' },
//           { role: 'user', content: prompt },
//         ],
//         max_tokens: 100,
//       }),
//     });

//     if (!response.ok) {
//       console.error('Error en la solicitud:', response.status, response.statusText);
//       const errorText = await response.text();
//       throw new Error(`Error: ${errorText}`);
//     }

//     const data = await response.json();
//     return data.choices[0].message.content.trim();
//   } catch (error) {
//     console.error('Error en la API:', error);
//     return 'Error: No se pudo procesar la solicitud';
//   }
// }
