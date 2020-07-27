import React from "react";
// import ReactDOM from "react-dom";
import { Table, Button } from 'antd';
import WrappedNormalLoginForm from "./Login";
import "antd/dist/antd.css";
import '../css/index.css';

const dataSource = [
  {
    key: '1',
    name: 'Jerry',
    age: 18,
    gender: 'male',
    isHandsome: 'ture'
  },
  {
    key: '2',
    name: 'Jimmy',
    age: 20,
    gender: 'male',
    isHandsome: 'false'
  },
  {
    key: '3',
    name: 'Jenny',
    age: 44,
    gender: 'female',
    isHandsome: 'Nah'
  }
];

const columns = [
  {
    title: 'name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'gender',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: 'age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'isHandsome',
    dataIndex: 'isHandsome',
    key: 'isHandsome',
  }
];

export default class InfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredInfo: null,
      sortedInfo: null,
    };
  }

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null })
  }

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  setAgeSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    });
  };

  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        filters: [{ text: 'Jerry', value: 'Jerry' }, { text: 'Jenny', value: 'Jenny' }],
        filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.name.includes(value),
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        sorter: (a, b) => a.age - b.age,
        sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        filters: [{ text: 'Male', value: 'Male' }, { text: 'Female', value: 'Female' }],
        filteredValue: filteredInfo.gender || null,
        onFilter: (value, record) => record.gender.includes(value),
        sorter: (a, b) => a.gender.length - b.gender.length,
        sortOrder: sortedInfo.columnKey === 'gender' && sortedInfo.order,
        ellipsis: true,
      },
    ];

    return (
      <div>
        <WrappedNormalLoginForm />
        <div>
          <div className="table-operations">
            <Button onClick={this.setAgeSort}>Sort age</Button>
            <Button onClick={this.clearFilters}>Clear Filters</Button>
            <Button onClick={this.clearAll}>Clear All</Button>
          </div>
          <Table columns={columns} dataSource={dataSource} onChange={this.handleChange} />
        </div>      </div>
    );
  }
}
