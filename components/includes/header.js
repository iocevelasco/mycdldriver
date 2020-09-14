import React from 'react';
import Link from 'next/link';

const Header = () => (
    <>
        <header>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <Link href="/">
                        <a className="navbar-brand">
                            My Awesome app
                        </a> 
                    </Link>

                    <div className="collapse navbar-collapse">
                        <div className="navbar-nav">

                        <Link href="/">
                            <a className="nav-item nav-link">Home</a>
                        </Link>
                        <Link href="/contact">
                            <a className="nav-item nav-link">Contact</a>
                        </Link>
                        <Link href="/about">
                            <a className="nav-item nav-link">About us</a>
                        </Link>
                        <Link href="/users">
                            <a className="nav-item nav-link">Users</a>
                        </Link>

                        </div>
                    </div>

                </nav>
            </div>
        </header>



      
    </>
)

export default Header;