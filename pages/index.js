import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../store/actions';
import Link from 'next/link';
import MainLayout from '../components/layouts';
class Home extends Component {

    componentDidMount(){
        this.props.dispatch(getUsers())
    }

    render(){
        return(
            <MainLayout>
                <Link href="/user">
                    <a>Users page</a>
                </Link>
            </MainLayout>
        )
    }

}

function mapStateToProps(state){
    return {
        users: state.users
    }
}


export default connect(mapStateToProps)(Home);