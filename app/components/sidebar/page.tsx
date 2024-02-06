// components/Sidebar.js
import React from 'react';
import Link from 'next/link';

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
 return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <ul>
                <li><Link href="/"><a>Home</a></Link></li>
                <li><Link href="/about"><a>About</a></Link></li>
                <li><Link href="/blog"><a>Blog</a></Link></li>
                <li><Link href="/contact"><a>Contact</a></Link></li>
            </ul>
        </div>
 );
};

export default Sidebar;
