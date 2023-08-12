import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import useTournament from '../../../hooks/useTournament';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Avatar, Button, Card, Divider, Image, List, Space, Table, Tag, Transfer } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import difference from 'lodash/difference';

const { Meta } = Card;

const StageResult = ({ tId, updatedTournament, setUpdatedTournament }) => {
    const { handleTournamentDraftUpdate, errorMessage } = useTournament();
  
    const handleTournamentUpdate = (e, role, status) => {
      e.preventDefault();
      handleTournamentDraftUpdate(updatedTournament, role, status);
    };

    const [routeKey, setRouteKey] = useState('claims');
    const tabList = [
        { eventKey: 'claims', title: 'Claims' },
        { eventKey: 'result', title: 'Result' },
    ];

    const handlePrev = () => {
        // Get the index of the current active tab
        const currentIndex = tabList.findIndex((tab) => tab.eventKey === routeKey);
        // Get the index of the previous tab
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : 0;
        // Set the active tab key to the previous tab
        setRouteKey(tabList[prevIndex].eventKey);
    };

    const handleNext = () => {
        // Get the index of the current active tab
        const currentIndex = tabList.findIndex((tab) => tab.eventKey === routeKey);
        // Get the index of the next tab
        const nextIndex = currentIndex < tabList.length - 1 ? currentIndex + 1 : currentIndex;
        // Set the active tab key to the next tab
        setRouteKey(tabList[nextIndex].eventKey);
    };

    const claims = [
        {
          image: updatedTournament.tournamentThumbnail,
          gamer: "gamer1",
          date: "1 hour ago"
        },
        {
          image: updatedTournament.tournamentThumbnail,
          gamer: "gamer2",
          date: "2 hours ago"
        },
        {
          image: updatedTournament.tournamentThumbnail,
          gamer: "gamer3",
          date: "3 hours ago"
        },
    ];

    //Transfering result to winners list
    const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
        <Transfer {...restProps}>
            {({
                direction,
                filteredItems,
                onItemSelectAll,
                onItemSelect,
                selectedKeys: listSelectedKeys,
                disabled: listDisabled,
            }) => {
                const columns = direction === 'left' ? leftColumns : rightColumns;
                const rowSelection = {
                    getCheckboxProps: (item) => ({
                        disabled: listDisabled || item.disabled,
                    }),
                    onSelectAll(selected, selectedRows) {
                        const treeSelectedKeys = selectedRows.filter((item) => !item.disabled).map(({ key }) => key);
                        const diffKeys = selected
                        ? difference(treeSelectedKeys, listSelectedKeys)
                        : difference(listSelectedKeys, treeSelectedKeys);
                        onItemSelectAll(diffKeys, selected);
                    },
                    onSelect({ key }, selected) {
                        onItemSelect(key, selected);
                    },
                    selectedRowKeys: listSelectedKeys,
                };
                return (
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={filteredItems}
                        size="small"
                        onRow={({ key, disabled: itemDisabled }) => ({
                            onClick: () => {
                                if (itemDisabled || listDisabled) return;
                                onItemSelect(key, !listSelectedKeys.includes(key));
                            },
                        })}
                        style={{
                            pointerEvents: listDisabled ? 'none' : undefined,
                        }}
                    />
                );
            }}
        </Transfer>
    );
    
    const mockTags = ['ameture', 'rockie', 'pro'];

    const mockData = Array.from({
            length: 20,
        }).map((_, i) => ({
            key: i.toString(),
            title: `gamer ${i + 1}`,
            description: `description of gamer ${i + 1}`,
            disabled: false,
            tag: mockTags[i % 3],
        })
    );

    const leftTableColumns = [
        {
            dataIndex: 'title',
            title: 'Name',
        },
        {
            dataIndex: 'tag',
            title: 'Level',
            render: (level) => <Tag>{level}</Tag>,
        },
        {
            dataIndex: 'description',
            title: 'Description',
        },
    ];

    const rightTableColumns = [
        {
            dataIndex: 'title',
            title: 'Name',
        },
        {
            dataIndex: 'tag',
            title: 'Level',
            render: (level) => <Tag>{level}</Tag>,
        },
        {
            dataIndex: 'description',
            title: 'Description',
        },
    ];

    const [targetKeys, setTargetKeys] = useState(mockData);
    const [rightTableData, setRightTableData] = useState([]);

    const onChange = (nextTargetKeys, direction, moveKeys) => {
        setTargetKeys(nextTargetKeys);
        
        if (direction === "right") {
            const newRightTableData = [...rightTableData];
            moveKeys.forEach((key) => {
            const movedItem = mockData.find((item) => item.key === key);
            if (movedItem) {
                newRightTableData.push(movedItem);
            }
            });
            setRightTableData(newRightTableData);
        } else if (direction === "left") {
            const newRightTableData = rightTableData.filter((item) => !moveKeys.includes(item.key));
            setRightTableData(newRightTableData);
        }
    };

    return (
        <>
            <h5>
                Phase 3: Battle Time | Submit the result of<strong> {updatedTournament.tournamentName}</strong>
            </h5>
                    
            <Form className="w-100 px-5 pb-4">
                <Divider orientation="right">
                    <Space>
                        <Button type="primary" onClick={(e) => handleTournamentUpdate(e, 'master', 'draft')}>
                            Save Draft
                        </Button>
                        <Button type="primary" onClick={(e) => handleTournamentUpdate(e, 'master', 'pending')}>
                            Submit
                        </Button>
                    </Space>
                </Divider>
                <Tabs
                    id="controlled-tab-example"
                    className="mb-3"
                    activeKey={routeKey}
                >
                    <Tab eventKey="claims" title="Claims">
                        <h2>Claims</h2>
                        <p>This section will be unlocked once the tournamentEnds!</p>
                        
                        <List
                            grid={{
                                gutter: 16,
                                column: 3,
                            }}
                            dataSource={claims}
                            renderItem={(item, index) => (
                                <List.Item>
                                    <Card title={`Screenshot ` + parseInt(index+1)}
                                        cover={
                                            <Image
                                                width="100%"
                                                src={item.image}
                                                className="p-3"
                                            />
                                        }
                                        actions={[
                                          <SettingOutlined key="setting" />,
                                          <EditOutlined key="edit" />,
                                          <EllipsisOutlined key="ellipsis" />,
                                        ]}
                                    >
                                        <Meta
                                            avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
                                            title={item.gamer}
                                            description={item.date}
                                        />
                                    </Card>
                                </List.Item>
                            )}
                        />
                    </Tab>
                    <Tab eventKey="result" title="Result">
                        <h2>Result</h2>
                        <p>This section will be unlocked once the tournamentEnds!</p>
                        
                        <div>
                            <TableTransfer
                                dataSource={mockData}
                                targetKeys={targetKeys}
                                showSearch={true}
                                onChange={onChange}
                                leftColumns={leftTableColumns}
                                rightColumns={rightTableColumns}
                                filterOption={(inputValue, item) =>
                                    item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
                                }
                            />
                        </div>

                    </Tab>
                </Tabs>

                {
                    errorMessage ? <p className="text-warning text-center">{errorMessage}</p> : null
                }

                <Space>
                    <Button onClick={handlePrev}>
                        Prev
                    </Button>
                    <Button onClick={handleNext}>
                        Next
                    </Button>
                </Space>

                {/* <Button variant="success" type="submit" onClick={(e) => handleTournamentUpdate(e, 'master', 'pending')} className='ms-3'>
                    Submit
                </Button>
                <Button variant="primary" type="submit" onClick={(e) => handleTournamentUpdate(e, 'master', 'draft')} className='ms-3'>
                    Save Draft
                </Button> */}
            </Form>
        </>
    );
};

export default StageResult;