"use client"
import React from 'react';
import { Settings } from 'lucide-react';

export default function DevelopmentScreen() {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-fade-in">
                {/* Header */}
                <div className="rounded-t-2xl px-6 py-4" style={{ background: '#264acd' }}>
                    <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                        <h3 className="text-white font-bold text-lg">Development Update</h3>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="text-center">
                        <h4 className="text-2xl font-bold text-gray-800 mb-2">We're Cooking Something Big!</h4>
                        <p className="text-gray-600 text-sm">Major updates in development</p>
                    </div>
                </div>
            </div>
        </div>
    );
}