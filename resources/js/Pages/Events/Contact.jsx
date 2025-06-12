import React, { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import Layout from '@/Layouts/Layout'; 

export default function Contact() {
  const { errors } = usePage().props;
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    console.log('function triggered');
    e.preventDefault();
    router.post(route('contact.send'), form, {
      preserveScroll: true,
    });
  };

  return (
    <Layout >
   <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 rounded shadow">

      <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>

      <div className="mb-4">
      <label htmlFor="name" className="block mb-1 font-medium text-gray-700 dark:text-gray-200">

          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 ${
            errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
        />

        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div className="mb-4">
      <label htmlFor="email" className="block mb-1 font-medium text-gray-700 dark:text-gray-200">

          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 ${
            errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
          
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div className="mb-4">
      <label htmlFor="message" className="block mb-1 font-medium text-gray-700 dark:text-gray-200">

          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          rows="5"
          className={`w-full px-3 py-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 ${
            errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
          
        ></textarea>
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Send
      </button>
    </form>
    </Layout>
  );
}
