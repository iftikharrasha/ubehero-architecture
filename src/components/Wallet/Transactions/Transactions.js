import React, { useRef } from "react";
import { Button, Input, Space, Table, Tag, Typography } from 'antd';
import { CaretUpOutlined, CaretDownOutlined, CheckCircleOutlined, SearchOutlined } from '@ant-design/icons';

const { Text } = Typography;

const Transactions = ({myTransactions}) => {
  const searchInput = useRef(null);

  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search payment"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) => record.description.toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            searchInput.current?.focus();
          }, 0);
        }
      },
      render: (text, record) => (
        record.description
      ),
    },
    {
      title: 'Source',
      dataIndex: 'method',
      key: 'method',
      filters: [
        {
          text: 'balance',
          value: 'balance',
        },
        {
          text: 'bkash',
          value: 'bkash',
        },
        {
          text: 'card',
          value: 'card',
        },
      ],
      onFilter: (value, record) => record.method === value,
      ellipsis: true,
      render: (text, record) => (
        record.method
      ),
    },
    {
      title: 'TrxID',
      dataIndex: 'trx',
      key: 'trx',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search TrxID"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) => record.trx.toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            searchInput.current?.focus();
          }, 0);
        }
      },
      render: (text, record) => (
        record.trx
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: {
        compare: (a, b) => a.amount - b.amount,
        multiple: 2,
      },
      render: (text, record) => (
        <Text type={
                  record.activity === 'expense' ? 
                  'danger' 
                  : record.activity === 'earning' ? 
                  'success'
                  : record.activity === 'withdrawal' ? 
                  'warning'
                  : '-'
              }>
          {
            record.activity === 'expense' ? 
            <CaretDownOutlined />
            : record.activity === 'earning' ? 
            <CaretUpOutlined />
            : record.activity === 'withdrawal' ? 
            <CheckCircleOutlined />
            : '-'
          }
          ${record.amount}
        </Text>
      ),
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
      filters: [
        {
          text: 'bdt',
          value: 'bdt',
        },
        {
          text: 'usd',
          value: 'usd',
        },
        {
          text: 'sar',
          value: 'sar',
        },
        {
          text: 'etoken',
          value: 'etoken',
        },
      ],
      onFilter: (value, record) => record.currency === value,
      ellipsis: true,
      render: (text, record) => (
        record.currency
      ),
    },
    {
      title: 'Remarks',
      dataIndex: 'remarks',
      key: 'remarks',
      filters: [
        {
          text: 'registration',
          value: 'registration',
        },
        {
          text: 'topup',
          value: 'topup',
        },
        {
          text: 'prize',
          value: 'prize',
        },
        {
          text: 'transfer',
          value: 'transfer',
        },
        {
          text: 'earning',
          value: 'earning',
        },
        {
          text: 'refund',
          value: 'refund',
        },
        {
          text: 'withdraw',
          value: 'withdraw',
        },
      ],
      onFilter: (value, record) => record.remarks === value,
      ellipsis: true,
      render: (text, record) => (
        record.remarks
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        {
          text: 'approved',
          value: 'approved',
        },
        {
          text: 'pending',
          value: 'pending',
        },
        {
          text: 'incoming',
          value: 'incoming',
        },
        {
          text: 'cancelled',
          value: 'cancelled',
        },
      ],
      onFilter: (value, record) => record.status === value,
      ellipsis: true,
      render: (text) => {
        let statusColor = 'default';
        if (text === 'approved') {
          statusColor = 'success';
        } else if (text === 'pending' || text === 'cancelled' || text === 'incoming') {
          statusColor = 'warning';
        }

        return <Tag color={statusColor}>{text}</Tag>;
      },
    },
  ];

  const data = myTransactions.transactions.map((item, index) => ({
    key: item._id,
    index: index + 1,
    description: item.description,
    method: item.method,
    trx: item.trx,
    amount: item.amount,
    currency: item.currency,
    activity: item.activity,
    remarks: item.remarks,
    status: item.status,
  }));

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div className='mb-3'>
      <Table 
        responsive
        bordered 
        columns={columns} 
        dataSource={data} 
        onChange={onChange}
        scroll={{ x: true }}
        style={{ boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' }}
        pagination={{
          pageSize: 8,
          hideOnSinglePage: false,
        }}
      />
    </div>
  );
};

export default Transactions;
