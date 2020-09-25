import React from 'react';
import Header from '../includes/header';
import Head from 'next/head'

const MainLayout = (props) => (
    <>
        <Head>
            <title>My Awesome app</title>
            <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet"/>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet"/>
            <link href="/static/css/styles.css" rel="stylesheet"/>
        </Head>
        <div className="mainLayout_container">
            <Header/>
            <div className="container">
                {props.children}
            </div>
            
        </div>
        
    </>
)

export default MainLayout;