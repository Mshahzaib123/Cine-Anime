"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';
import ThemeButton from '@/components/theme-button';
import ThemeInput from '@/components/theme-input';

const SignupPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name) {
            newErrors.name = 'Name is required';
        } else if (formData.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            const user = {
                id: Date.now(),
                name: formData.name,
                email: formData.email,
                bio: '',
                joinedDate: new Date().toISOString(),
            };

            localStorage.setItem('user', JSON.stringify(user));
            setIsLoading(false);
            router.push('/profile');
        }, 1000);
    };

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
                        Create Account
                    </h1>
                    <p className="large text-foreground/70">
                        Join EigaPulse today
                    </p>
                </div>

                {/* Signup Form */}
                <div 
                    className="bg-foreground/5 rounded-3xl p-8 border border-foreground/10"
                    data-animate="up"
                    data-delay="0.1"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label className="block text-foreground font-semibold mb-2 small">
                                Full Name
                            </label>
                            <ThemeInput
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                leftIcon={FiUser}
                                value={formData.name}
                                onChange={handleInputChange}
                                className={errors.name ? 'border-red-500' : ''}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block text-foreground font-semibold mb-2 small">
                                Email Address
                            </label>
                            <ThemeInput
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                leftIcon={FiMail}
                                value={formData.email}
                                onChange={handleInputChange}
                                className={errors.email ? 'border-red-500' : ''}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-foreground font-semibold mb-2 small">
                                Password
                            </label>
                            <ThemeInput
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Create a password"
                                leftIcon={FiLock}
                                rightIcon={showPassword ? FiEyeOff : FiEye}
                                onRightIconClick={() => setShowPassword(!showPassword)}
                                value={formData.password}
                                onChange={handleInputChange}
                                className={errors.password ? 'border-red-500' : ''}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label className="block text-foreground font-semibold mb-2 small">
                                Confirm Password
                            </label>
                            <ThemeInput
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                leftIcon={FiLock}
                                rightIcon={showConfirmPassword ? FiEyeOff : FiEye}
                                onRightIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className={errors.confirmPassword ? 'border-red-500' : ''}
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                            )}
                        </div>

                        {/* Terms Checkbox */}
                        <div>
                            <label className="flex items-start gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 mt-1 rounded border-foreground/30 text-primary focus:ring-primary"
                                    required
                                />
                                <span className="text-foreground/80 small">
                                    I agree to the{' '}
                                    <Link href="/terms" className="text-primary hover:underline">
                                        Terms of Service
                                    </Link>
                                    {' '}and{' '}
                                    <Link href="/privacy" className="text-primary hover:underline">
                                        Privacy Policy
                                    </Link>
                                </span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <ThemeButton
                            type="submit"
                            className="w-full"
                            size="lg"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </ThemeButton>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-foreground/10"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-foreground/5 text-foreground/60 small">
                                Or sign up with
                            </span>
                        </div>
                    </div>

                    {/* Social Signup */}
                    <div className="grid grid-cols-2 gap-3">
                        <ThemeButton variant="outline" className="w-full">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Google
                        </ThemeButton>
                        <ThemeButton variant="outline" className="w-full">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
                            </svg>
                            Facebook
                        </ThemeButton>
                    </div>
                </div>

                {/* Login Link */}
                <p className="text-center mt-6 text-foreground/70 base" data-animate="up" data-delay="0.2">
                    Already have an account?{' '}
                    <Link href="/login" className="text-primary font-semibold hover:underline">
                        Login here
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default SignupPage;