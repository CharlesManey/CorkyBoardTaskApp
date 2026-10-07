import React, { useState } from 'react';
import { login, signUp } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function AuthForm() {
  const navigate = useNavigate();
  const { setSession } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isSignUp) {
        const result = await signUp(formData);
        if (result.token) {
          setSession(result.token);
          navigate('/projects');
        }
        alert('Account created successfully!');
      } else {
        const result = await login({
          email: formData.email,
          password: formData.password,
        });
        if (result.token) {
          setSession(result.token);
          navigate('/projects');
        }
        alert('Logged in successfully!');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-100 my-8 mx-auto p-6 border border-black rounded-lg bg-white shadow-lg shadow-black'>
      <h2 className='text-2xl font-semibold mb-4'>{isSignUp ? 'Create an Account' : 'Log In'}</h2>

      {error && <div className='text-red-500 mb-4'>{error}</div>}

      <form className='flex flex-col' onSubmit={handleSubmit}>
        {isSignUp && (
          <div className='mb-4'>
            <label className='text-xl' htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className='w-full p-2 mt-1 border rounded-sm shadow-black shadow-sm hover:bg-amber-200 focus:outline-amber-400 focus:shadow-amber-700 focus:shadow-lg focus:text-lg'
            />
          </div>
        )}

        <div className='mb-4'>
          <label className='text-xl' htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className='w-full p-2 mt-1 border rounded-sm shadow-black shadow-sm hover:bg-amber-200 focus:outline-amber-400 focus:shadow-amber-700 focus:shadow-lg focus:text-lg'
          />
        </div>

        <div className='mb-4'>
          <label className='text-xl' htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className='w-full p-2 mt-1 border rounded-sm shadow-black shadow-sm hover:bg-amber-200  focus:outline-amber-400 focus:shadow-amber-700 focus:shadow-lg focus:text-lg'
          />
        </div>

        <button type="submit" disabled={loading} className='w-1/2 p-2 cursor-pointer border rounded-lg self-center shadow-black shadow-md hover:bg-amber-200 text-lg hover:text-xl'>
          {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Log In'}
        </button>
      </form>

      <div className='mt-4 text-center'>
        <p>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className='bg-none border-none text-blue-700 cursor-pointer underline'
          >
            {isSignUp ? 'Log In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
}