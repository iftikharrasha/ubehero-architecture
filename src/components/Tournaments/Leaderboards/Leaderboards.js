import React, { useRef } from "react";
import { Table, Input, Space, Button, Popover, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import UserPopup from "../../Common/UserPopup/UserPopup";

const Leaderboards = ({leaderboards}) => {
  console.log(leaderboards)
  const searchInput = useRef(null);

  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: 'Player',
      dataIndex: 'username',
      key: 'username',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search player"
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
      onFilter: (value, record) => record.userName.toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            searchInput.current?.focus();
          }, 0);
        }
      },
      render: (text, record) => (
        <Popover placement="topLeft" content={<UserPopup popupUser={record}/>}>
          <div className="d-flex align-items-center">
            <img
              src={record.photo}
              alt="user-pic"
              style={{ width: '45px', height: '45px' }}
              className="rounded-circle"
            />
            <div className="ms-3">
              <p className="fw-bold mb-1">{record.userName}</p>
              <p className="text-muted mb-0">Country: {record.country}</p>
            </div>
          </div>
        </Popover>
      ),
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
      filters: [
        {
          text: 'ameture',
          value: 'ameture',
        },
        {
          text: 'rockie',
          value: 'rockie',
        },
      ],
      onFilter: (value, record) => record.levelTitle === value,
      ellipsis: true,
      render: (text, record) => (
        <div>
          <p className="text-muted mb-0">Level {record.currentLevel}</p>
          <p className="fw-normal mb-1">{record.levelTitle}</p>
        </div>
      ),
    },
    {
      title: 'Played',
      dataIndex: 'totalGamePlayed',
      key: 'totalGamePlayed',
      sorter: {
        compare: (a, b) => a.totalGamePlayed - b.totalGamePlayed,
        multiple: 3,
      },
    },
    {
      title: 'Wins',
      dataIndex: 'wins',
      key: 'wins',
      sorter: {
        compare: (a, b) => a.wins - b.wins,
        multiple: 2,
      },
    },
    {
      title: 'XP',
      dataIndex: 'xp',
      key: 'xp',
      sorter: {
        compare: (a, b) => a.xp - b.xp,
        multiple: 1,
      },
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <Tag color="success">Verified</Tag>
      ),
    },
  ];

  const data = leaderboards.map((item, index) => ({
    key: item._id,
    index: index + 1,
    userName: item.userName,
    photo: item.photo,
    country: "BD",
    joined: item.createdAt,
    totalGamePlayed: item.stats?.totalGamePlayed,
    wins: item.stats?.totalWins,
    xp: item.stats?.totalXp,
    levelTitle: item.stats?.levelTitle,
    currentLevel: item.stats?.currentLevel,
    noOfFollowers: item.requests?.followers.length,
    noOfFollowings: item.requests?.followings.length,
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
          pageSize: 4,
          hideOnSinglePage: true,
        }}
      />
    </div>
  );
};

export default Leaderboards;
