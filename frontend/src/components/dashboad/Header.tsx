import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, User, Settings } from 'lucide-react';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useAuth } from '@/authentication/hook';
import Link from 'next/link';

export default function Header() {
    const { isAuthenticated, username, clearUserData } = useCurrentUser();
    const { logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            clearUserData();
            window.location.href = '/';
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="text-2xl">💭</div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            QuoteVote
                        </h1>
                    </div>

                    <nav className="hidden md:flex items-center space-x-6">
                        <Link
                            href="/"
                            className="text-gray-600 hover:text-purple-600 transition-colors"
                        >
                            หน้าแรก
                        </Link>
                        
                    </nav>

                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
                                    <User className="h-4 w-4" />
                                    <span>{username || 'ผู้ใช้'}</span>
                                </div>

                              

                                <Button
                                    onClick={handleLogout}
                                    variant="outline"
                                    size="sm"
                                    className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                                >
                                    <LogOut className="h-4 w-4 mr-2" />
                                    ออกจากระบบ
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-gray-600 hover:text-purple-600"
                                    >
                                        เข้าสู่ระบบ
                                    </Button>
                                </Link>

                                <Link href="/register">
                                    <Button
                                        variant="default"
                                        size="sm"
                                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                    >
                                        สมัครสมาชิก
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
} 