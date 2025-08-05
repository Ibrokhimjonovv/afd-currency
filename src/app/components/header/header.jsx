'use client'
import React, { useState } from 'react';
import "./header.scss"
import Link from 'next/link';
import Canvas from '../header-offcanvas/canvas';

const Header = () => {
    const [isCanvas, setIsCanvas] = useState(false);
    const handleOpen = () => {
        setIsCanvas(!isCanvas);
    }
    return (
        <>

            <header>
                <div className="header">
                    <div className='qweqwe'>
                        <div className="logo">
                            <img src="/logo.png" alt="" />
                        </div>
                        <nav>
                            <Link href="https://afd-platform.uz">Afd Platform</Link>
                            <Link href="https://afd-music.vercel.app">Afd Music</Link>
                        </nav>
                    </div>
                    <div onClick={handleOpen} className={`hamburger ${isCanvas ? "active" : ''}`}>
                        <div className="line-1"></div>
                        <div className="line-2"></div>
                        <div className="line-3"></div>
                    </div>
                </div>
            </header>
            <Canvas isStatus={isCanvas} /></>
    )
}

export default Header