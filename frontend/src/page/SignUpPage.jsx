import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import {
  Code,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
} from 'lucide-react';
import { z } from 'zod';

const SignUpSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be of 6 characters'),
  username: z.string().min(3, 'Name must be at least 3 characters'),
});

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  const signup = async (data) => {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const onSubmit = async (data) => {
    try {
      setIsSigningUp(true);
      await signup(data);
      console.log('Signup data:', data);
    } catch (error) {
      console.error('SignUp failed:', error);
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <div className='h-screen grid lg:grid-cols-2 bg-gray-900 text-white'>
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8'>
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>
              <div className='w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                <Code className='w-6 h-6 text-primary' />
              </div>
              <h1 className='text-2xl font-bold mt-2'>Welcome</h1>
              <p className='text-base-content/60'>Sign up to your account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium text-white'>Username</span>
              </label>
              <div className='relative'>
                <User className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
                <input
                  type='text'
                  {...register('username')}
                  className={`input input-bordered w-full pl-10 bg-gray-800 text-white ${errors.username ? 'input-error' : ''}`}
                  placeholder='John Doe'
                />
              </div>
              {errors.username && (
                <p className='text-red-400 text-sm mt-1'>{errors.username.message}</p>
              )}
            </div>

            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium text-white'>Email</span>
              </label>
              <div className='relative'>
                <Mail className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
                <input
                  type='email'
                  {...register('email')}
                  className={`input input-bordered w-full pl-10 bg-gray-800 text-white ${errors.email ? 'input-error' : ''}`}
                  placeholder='you@example.com'
                />
              </div>
              {errors.email && (
                <p className='text-red-400 text-sm mt-1'>{errors.email.message}</p>
              )}
            </div>

            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium text-white'>Password</span>
              </label>
              <div className='relative'>
                <Lock className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  className={`input input-bordered w-full pl-10 pr-10 bg-gray-800 text-white ${errors.password ? 'input-error' : ''}`}
                  placeholder='••••••••'
                />
                <button
                  type='button'
                  className='absolute right-3 top-2.5'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className='h-5 w-5 text-gray-400' /> : <Eye className='h-5 w-5 text-gray-400' />}
                </button>
              </div>
              {errors.password && (
                <p className='text-red-400 text-sm mt-1'>{errors.password.message}</p>
              )}
            </div>

            <button type='submit' className='btn btn-primary w-full' disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 className='h-5 w-5 animate-spin mr-2' />
                  Loading...
                </>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>

          <div className='text-center'>
            <p className='text-gray-400'>
              Already have an account?{' '}
              <Link to='/login' className='link link-primary'>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className='hidden lg:flex items-center justify-center bg-gray-800'>
        <div className='text-center px-8'>
          <h2 className='text-3xl font-bold mb-2'>Welcome to our platform!</h2>
          <p className='text-base text-gray-300'>
            Sign up to access our platform and start using our services.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
