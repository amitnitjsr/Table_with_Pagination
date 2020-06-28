import React, { Component } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Table from '../Table/Table';

export default class Home extends Component {

    render() {
        return (
            <div>
                <Navbar />
                <Table />
            </div>
        )
    }
}