'use client';

import { useState, useRef, FormEvent } from 'react';

export default function LeadCaptureForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const formRef = useRef(null);

  const handleForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target as HTMLFormElement);

    const dataObject = Object.fromEntries(formData.entries());

    const jsonData = JSON.stringify(dataObject);

    const options = {
      method: 'POST', // HTTP POST
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    };

    // fetch
    const response = await fetch('/api/leads/', options);
    if (response.ok) {
      setMessage('Thank you for joining');
      if (formRef.current) {
        (formRef.current as HTMLFormElement).reset();
      }
    } else {
      setMessage('Error with your request');
    }
    setLoading(false);
  };
  const btnLabel = loading ? 'Loading' : 'Join List';
  return (
    <>
      {message && <div>{message}</div>}
      <form
        ref={formRef}
        className="space-y-3"
        onSubmit={(event: FormEvent<HTMLFormElement>) => handleForm(event)}
      >
        <input type="email" required name="email" placeholder="Your Email" />
        <button disabled={loading} className="btn-join" type="submit">
          {btnLabel}
        </button>
      </form>
    </>
  );
}
