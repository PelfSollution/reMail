// "use client"

import { useState } from 'react';

function HomePage() {
  const [subject, setSubject] = useState<string>('');
  const [recipients, setRecipients] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const handleSubmit = async () => {
    if (!subject || !recipients) {
      // Mostrar algún mensaje de error al usuario
      return;
    }
    
    setIsLoading(true);
    
    const recipientArray = recipients.split(',').map(email => email.trim());
    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subject, recipients: recipientArray }),
      });
  
      const data = await res.json();
      console.log(data);
      // Mostrar algún mensaje de éxito al usuario
    } catch (error) {
      console.error('Failed to send email', error);
      // Mostrar algún mensaje de error al usuario
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <h1 className="text-2xl mb-6 text-center font-semibold">Enviar Email</h1>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600">Asunto</label>
        <input
          className="mt-1 p-2 w-full border rounded-md"
          type="text"
          placeholder="Asunto"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600">Destinatarios</label>
        <input
          className="mt-1 p-2 w-full border rounded-md"
          type="text"
          placeholder="Destinatarios (separados por coma)"
          value={recipients}
          onChange={(e) => setRecipients(e.target.value)}
        />
      </div>
      <button
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? 'Enviando...' : 'Enviar Mail'}
      </button>
    </div>
  </div>
  );
}

export default HomePage;