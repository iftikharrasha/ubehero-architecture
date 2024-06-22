import { Badge, Button, Avatar, Card,  Row, Col, Typography, Popover, Statistic } from 'antd';
import { WalletOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Meta } = Card;
const { Paragraph } = Typography;

const WalletPopUp = ({userId, userName, aquamarine, tourmaline}) => {
    const content = (
        <Card
            style={{
                width: 300,
                boxShadow: 'none'
            }}
            className="popCard"
            bordered={false}
            actions={[
                <Row justify="center" align="middle">
                    <Button style={{ fontSize: '12px' }} icon={<WalletOutlined  style={{ marginBottom: "6px" }}/>}>
                        <Link to={`/wallet/${userId}`}>
                            My Wallet
                        </Link>
                    </Button>
                </Row>,
                <Row justify="center" align="middle">
                    <Button style={{ fontSize: '12px' }} icon={<WalletOutlined  style={{ marginBottom: "6px" }}/>}>
                        <Link to={`/wallet/${userId}/settings`}>
                            Settings
                        </Link>
                    </Button>
                </Row>,
            ]}
            >
                <Meta
                    avatar={<Avatar src="https://cdn-icons-png.freepik.com/512/6466/6466947.png" />}
                    title="Wallet Details"
                    description={`@${userName}`}
                />
                <Row gutter={[16, 16]} className="pt-3">
                    <Col span={12}>
                        <Card bordered={false} className="popBody">
                            <Row justify="center" align="middle" style={{flexDirection: 'column'}}>
                            <Statistic
                                className='text-center'
                                title="Aquamarine"
                                value={aquamarine}
                                precision={2}
                                valueStyle={{
                                    color: '#8bb1f2',
                                }}
                                prefix={
                                    <img alt="aquamarine" src="https://res.cloudinary.com/duoalyur6/image/upload/v1717705441/aquamarine_lluqes.png"
                                        style={{
                                        width: "28px",
                                        height: "28px",
                                        }}
                                    />
                                }
                            />
                            </Row>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card bordered={false} className="popBody">
                            <Row justify="center" align="middle" style={{flexDirection: 'column'}}>
                            <Statistic
                                className='text-center'
                                title="Tourmaline"
                                value={tourmaline}
                                precision={2}
                                valueStyle={{
                                    color: '#FF960C',
                                }}
                                prefix={
                                    <img alt="tourmaline" src="https://res.cloudinary.com/duoalyur6/image/upload/v1717705440/tourmaline_psakuj.png"
                                        style={{
                                        width: "28px",
                                        height: "28px",
                                        }}
                                    />
                                }
                            />
                            </Row>
                        </Card>
                    </Col>
                </Row>
        </Card>
    );

    return (
        <div className='me-4'>
            <Popover placement="bottomLeft" content={content} trigger="click" className='popup'>
                <Badge count="0" size="small" color="red" style={{ color: 'white' }}>
                    <i className="fas fa-wallet text-white"></i>
                </Badge>
             </Popover>
        </div>
    );
};

export default WalletPopUp;