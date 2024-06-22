import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import useProfile from '../../hooks/useProfile';

const InternalSupportTable = () => {
    const { handleAllTickets } = useProfile();
    const [myTickets, setMyTickets] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const tickets = await handleAllTickets();
            setMyTickets(tickets);
          } catch (error) {
            setMyTickets([]);
            console.error('Error fetching tickets list:', error);
          }
        };
      
        fetchData();
    }, []);

    const data = myTickets?.map((item, index) => ({
        _id: item?._id,
        title: item.title,
        tag: item?.tag,
        status: item?.status,
        createdAt: item?.createdAt,
      }));

    const columns = [
        {
          key: '_id',
          dataIndex: '_id',
          title: '# Ticket ID',
        },
        {
          key: 'title',
          dataIndex: 'title',
          title: 'Subject',
          render: (_, record) => <Link style={{color: '#F030C0'}} to={`/ticket/${record._id}`}>{record.title}</Link>,
        },
        {
          dataIndex: 'createdAt',
          key: 'createdAt',
          title: 'Created At',
          render: (text) => <p>{moment(text).local().format("LLL")}</p>
        },
        {
          key: 'tag',
          dataIndex: 'tag',
          title: 'Issue',
          render: (text) => <Tag color='geekblue'>{text}</Tag>
        },
        {
          key: 'status',
          dataIndex: 'status',
          title: 'Status',
          render: (text) => <Tag color={text === 'solved' ? 'green' : 'volcano'}>{text}</Tag>
        },
  ];

    return (
      
      <div className="container pt-4">
        <section className="mb-4">
          <div className="card">
              <div className="card-header text-center py-3">
                  <h5 className="mb-0 text-center">
                      <strong>Support Tickets List</strong>
                  </h5>
              </div>
              <div className="card-body">
                  <div className="table-responsive">
                    <Table columns={columns} dataSource={data} />
                  </div>
              </div>
          </div>
        </section>
    </div>
    );
};

export default InternalSupportTable;