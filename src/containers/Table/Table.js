import React, { Component } from 'react';
import ReactTable from 'react-table';
import TablePagination from '@material-ui/core/TablePagination';
import PaginateComponent from '../../components/Pagination/Paginate';
import {
    handleChangePage,
    handleChangeRowsPerPage
} from '../../components/Pagination/PaginationHandler';
import JsonData from '../../assets/JsonData/JsonData';
import './Table.css';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderData: JsonData[0].shipments,
            paginateData: JsonData[0].shipments,
            pageSize: 5,
            pageIndex: 0,
            searchInput: '',
            searchResult: null,
            page: 0,
            page_size: 5
        }
    }

    // This function call, when user type text or clear text value in search fields
    inputHandler = (event) => {
        this.setState({ searchInput: event.target.value }, () => {
            if (!this.state.searchInput) {
                this.setState({
                    renderData: JsonData[0].shipments, searchResult: null, paginateData: JsonData[0].shipments,
                    page: 0
                });
            }
        });
    }

    // OnClick on search button, this function call and searching data
    searchHandler = () => {

        if (this.state.searchInput) {
            if (this.state.searchInput.length > 0) {
                // eslint-disable-next-line
                const matchData = JsonData[0].shipments.filter(data => {
                    if (data.mode.toLowerCase().includes(this.state.searchInput.toLowerCase())
                        || data.name
                            .toLowerCase()
                            .includes(this.state.searchInput.toLowerCase())
                        || data.origin
                            .toLowerCase()
                            .includes(this.state.searchInput.toLowerCase())
                        || data.total
                            .includes(this.state.searchInput)
                    )
                        return data;
                });
                this.setState({ renderData: matchData, searchResult: matchData, paginateData: matchData, page: 0 });
            }
        }
    }

    // OnChange pageIndex or rowPer page_size, this fuction call
    fetchData = () => {

        const indexOfLastPost = (parseInt(this.state.page) + 1) * parseInt(this.state.page_size);
        const indexOfFirstPost = parseInt(indexOfLastPost) - parseInt(this.state.page_size);
        let currentPosts = null;
        if (this.state.searchResult) {
            currentPosts = this.state.searchResult.slice(indexOfFirstPost, indexOfLastPost);
        }
        else {
            currentPosts = this.state.paginateData.slice(indexOfFirstPost, indexOfLastPost);
        }
        this.setState({ renderData: currentPosts });
    }

    render() {

        return (
            <div ref="reload">

                <input className="input-text" type="search" placeholder="Search..."
                    value={this.state.searchInput} onChange={(event) => this.inputHandler(event)} />
                <button className="search-btn"
                    type="button" onClick={() => this.searchHandler()}>Search</button>

                <ReactTable
                    data={this.state.renderData ? this.state.renderData : []}
                    columns={[
                        {
                            Header: () => <div className="ID" >ID</div>,
                            accessor: 'id',
                            className: 'text-center',
                            width: 75,
                        },
                        {
                            Header: () => <div className="Header" >Name</div>,
                            accessor: 'name',
                            className: 'text-center',
                            width: 400
                        },
                        {
                            Header: () => <div className="Header" >Mode</div>,
                            accessor: 'mode',
                            className: 'text-center',
                        },
                        {
                            Header: () => <div className="Header" >Origin</div>,
                            accessor: 'origin',
                            className: 'text-center',
                        },
                        {
                            Header: () => <div className="Header" >Total</div>,
                            accessor: 'total',
                            className: 'text-center',
                        },
                    ]}
                    pageSize={this.state.page_size}
                    showPaginationBottom={false}
                />
                {this.state.paginateData && this.state.paginateData.length > 0 ? (
                    <div >
                        <table >
                            <tbody className="table-body">
                                <tr>
                                    <TablePagination
                                        className="TablePagination-style"
                                        rowsPerPageOptions={[5, 10, 25, 50]}
                                        colSpan={3}
                                        count={this.state.paginateData ? this.state.paginateData.length : 0}
                                        rowsPerPage={Number(this.state.page_size)}
                                        page={Number(this.state.page)}
                                        SelectProps={{
                                            inputProps: { 'aria-label': 'rows per page' },
                                            native: true
                                        }}
                                        onChangePage={(event, newPage) =>
                                            handleChangePage(
                                                newPage,
                                                this.setState.bind(this),
                                                this.fetchData,
                                                this.refs['reload']
                                            )}
                                        onChangeRowsPerPage={(event) =>
                                            handleChangeRowsPerPage(
                                                event.target.value,
                                                this.setState.bind(this),
                                                this.fetchData,
                                                this.refs['reload']
                                            )}
                                        ActionsComponent={PaginateComponent}
                                    />
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : null}
            </div>
        )
    }
}

export default Table;