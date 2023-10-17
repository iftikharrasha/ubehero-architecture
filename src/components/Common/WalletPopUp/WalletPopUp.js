import { Badge, Button, Avatar, Card,  Row, Col, Typography, Popover } from 'antd';
import { WalletOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Meta } = Card;
const { Paragraph } = Typography;

const WalletPopUp = ({userId, userName}) => {
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
                    avatar={<Avatar src="https://i.ibb.co/vjpGbfj/balance-Coin.webp" />}
                    title="Wallet Details"
                    description={`@${userName}`}
                />
                <Row gutter={[16, 16]} className="pt-3">
                    <Col span={8}>
                        <Card bordered={false} className="popBody">
                            <Row justify="center" align="middle" style={{flexDirection: 'column'}}>
                            <Paragraph className="mb-0">Balance</Paragraph>
                            <Paragraph className="mb-0">$0</Paragraph>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card bordered={false} className="popBody">
                            <Row justify="center" align="middle" style={{flexDirection: 'column'}}>
                            <Paragraph className="mb-0">Income</Paragraph>
                            <Paragraph className="mb-0">$0</Paragraph>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card bordered={false} className="popBody">
                            <Row justify="center" align="middle" style={{flexDirection: 'column'}}>
                            <Paragraph className="mb-0">Pending</Paragraph>
                            <Paragraph className="mb-0">$0</Paragraph>
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