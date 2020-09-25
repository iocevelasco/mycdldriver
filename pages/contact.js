import React,{ Component} from 'react';
import MainLayout from '../components/layouts/mainLayout';

class Contact extends Component {
    render(){
        return(
            <>
                <MainLayout>
                    <h1>Contact</h1>
                    <div style={{ color:'red'}}>
                        Hello guys
                    </div>
                    <div className="jsxStyled">
                        Styles with styled-jsx
                    </div>   
                    <style jsx>
                       {`
                            .jsxStyled {
                                color:blue
                            }
                       `}
                    </style>
                    <div className="contact_static">
                        Styles with static css
                    </div>
                    <div>
                        <img src="/static/images/knicks.jpeg"/>
                    </div>
                </MainLayout>
            </>
        )
    }
}

export default Contact;