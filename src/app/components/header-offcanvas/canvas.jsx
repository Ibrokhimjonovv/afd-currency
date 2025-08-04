import React from 'react';
import "./canvas.scss";
import Link from 'next/link';

const Canvas = ({isStatus}) => {
    
  return (
    <div id='canvas' className={isStatus ? "active" : ''}>
        <h2>Our other sites</h2>
        <ul>
            <li>
                <Link href="https://afd-platform.uz">To watch films: AFD Platform</Link>
            </li>
            <li>
                <Link href="https://afd-music.vercel.app">To listen musics: AFD Music</Link>
            </li>
        </ul>
    </div>
  )
}

export default Canvas