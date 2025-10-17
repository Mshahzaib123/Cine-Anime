"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FiMail, FiArrowLeft, FiCheck } from 'react-icons/fi';
import ThemeButton from '@/components/theme-button';
import ThemeInput from '@/components/theme-input';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setError('Email is required');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setIsLoading(true);
        setError('');

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
        }, 1500);
    };

    if (isSuccess) {
        return (
            <main className="min-h-screen flex items-center justify-center py-16 px-4">
                <div className="w-full max-w-md">
                    <div 
                        className="bg-foreground/5 rounded-3xl p-8 border border-foreground/10 text-center"
                        data-animate="up"
                    >
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 mb-6">
                            <FiCheck className="w-10 h-10 text-green-500" />
                        </div>
                        
                        <h1 className="heading-h2 text-foreground mb-4">
                            Check Your Email
                        </h1>
                        
                        <p className="large text-foreground/70 mb-8">
                            We have sent password reset instructions to{' '}
                            <span className="text-primary font-semibold">{email}</span>
                        </p>

                        <div className="space-y-4">
                            <ThemeButton href="/login" className="w-full" size="lg">
                                Back to Login
                            </ThemeButton>
                            
                            <p className="text-foreground/60 small">
                                Did not receive the email?{' '}
                                <button 
                                    onClick={() => setIsSuccess(false)}
                                    className="text-primary font-semibold hover:underline"
                                >
                                    Try again
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen flex items-center justify-center py-16 px-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8" data-animate="up">
                    <Link href="/" className="inline-flex items-center justify-center mb-6">
                        <span className="text-primary heading-h4 font-bold">Eiga</span>
                        <span className="text-foreground heading-h4 font-bold">Pulse</span>
                    </Link>
                    <h1 className="heading-h2 text-foreground mb-2">
                        Forgot Password?
                    </h1>
                    <p className="large text-foreground/70">
                        No worries, we will send you reset instructions
                    </p>
                </div>

                {/* Form */}
                <div 
                    className="bg-foreground/5 rounded-3xl p-8 border border-foreground/10"
                    data-animate="up"
                    data-delay="0.1"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-foreground font-semibold mb-2 small">
                                Email Address
                            </label>
                            <ThemeInput
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                leftIcon={FiMail}
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setError('');
                                }}
                                className={error ? 'border-red-500' : ''}
                            />
                            {error && (
                                <p className="text-red-500 text-xs mt-1">{error}</p>
                            )}
                        </div>

                        <ThemeButton
                            type="submit"
                            className="w-full"
                            size="lg"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Sending...' : 'Reset Password'}
                        </ThemeButton>
                    </form>
                </div>

                {/* Back to Login */}
                <div className="text-center mt-6" data-animate="up" data-delay="0.2">
                    <Link 
                        href="/login"
                        className="inline-flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors base"
                    >
                        <FiArrowLeft className="w-4 h-4" />
                        Back to Login
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default ForgotPasswordPage;