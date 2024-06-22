import React, { useEffect, useState } from 'react';
import { Typography, Breadcrumb, Button } from 'antd';
import { useLocation, useHistory, useParams  } from 'react-router-dom';
import PageLayout from '../../components/PageLayout/PageLayout';
import SupportPanel from '../../components/Common/Support/SupportPanel';
import SupportTickets from '../../components/Common/Support/SupportTickets';

const { Paragraph } = Typography;

const Support = () => {
    const [routeKey, setRouteKey] = useState('account');

    const { id } = useParams();
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
         if (location.pathname.endsWith('tournament')) {
            setRouteKey('tournament');
        } else if (location.pathname.endsWith('organize')) {
            setRouteKey('organize');
        } else if (location.pathname.endsWith('party')) {
            setRouteKey('party');
        } else if (location.pathname.endsWith('payment')) {
            setRouteKey('payment');
        } else if (location.pathname.endsWith('guideline')) {
            setRouteKey('guideline');
        } else if (location.pathname.endsWith('technical')) {
            setRouteKey('technical');
        } else if (location.pathname.endsWith('others')) {
            setRouteKey('others');
        } else if (location.pathname.endsWith('ticket')) {
            setRouteKey('ticket');
        }else {
            setRouteKey('account');
        }
    }, [location]);

    const handleTabChange = (key) => {
        setRouteKey(key);
        switch (key) {
            case 'account':
                history.push(`/support/${id}`);
                break;
            case 'tournament':
                history.push(`/support/${id}/tournament`);
                break;
            case 'organize':
                history.push(`/support/${id}/organize`);
                break;
            case 'party':
                history.push(`/support/${id}/party`);
                break;
            case 'payment':
                history.push(`/support/${id}/payment`);
                break;
            case 'guideline':
                history.push(`/support/${id}/guideline`);
                break;
            case 'technical':
                history.push(`/support/${id}/technical`);
                break;
            case 'others':
                history.push(`/support/${id}/others`);
                break;
            case 'ticket':
                history.push(`/support/${id}/ticket`);
                break;
            default:
                break;
        }
    };

    return (
        <PageLayout>
            <div className="d-flex justify-content-between">
                <div>
                    {
                        routeKey === 'ticket' ?
                        <Paragraph style={{fontSize: '20px'}} className='mb-0'>My Support Tickets</Paragraph> :
                        <Paragraph style={{fontSize: '20px'}} className='mb-0'>Underdog Help Center</Paragraph>
                    }
                <Breadcrumb 
                    className='mb-4'
                    items={[
                    {
                        title: 'support',
                    },
                    {
                        title:  routeKey,
                    },
                    ]}
                />
                </div>
                <div>
                    {
                        routeKey === 'ticket' ?
                        <Button danger onClick={() => handleTabChange('account')}>Go Back</Button> :
                        <Button danger onClick={() => handleTabChange('ticket')}>My Support Tickets</Button>
                    }
                </div>
            </div>

            {
                routeKey === 'ticket' ?
                <SupportTickets /> :
                <SupportPanel id={id} routeKey={routeKey} handleTabChange={handleTabChange}/>
            }
        </PageLayout>
    );
};

export default Support;