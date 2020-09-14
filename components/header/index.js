import React from 'react';
import Link from 'next/link';
import { Layout } from 'antd';

const { Header  } = Layout;

const HeaderComponent = () => (
    <>
        <Header>
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
                        <Link href="/login">
                            <a className="nav-item nav-link">Login</a>
                        </Link>
                        </div>
                    </div>

                </nav>
            </div>
        </Header>
    </>
)

export default HeaderComponent;