import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { removeFromWishList } from '../../redux/slices/tournamentSlice';
import moment from 'moment';

import { Badge, List, Popover, Skeleton, Button } from 'antd';
import { BookOutlined, MinusCircleOutlined } from '@ant-design/icons';

const WishList = () => {
    const wish = useSelector((state) => state.tournaments.wishList);
    const dispatch = useDispatch();
    
    const [initLoading, setInitLoading] = useState(true);
    const [data, setData] = useState([]);
    const [isLoadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const itemLimit = 3; // Number of items to display initially
    const containerRef = useRef(null);

    useEffect(() => {
        // Simulating initial data loading
        setTimeout(() => {
        setInitLoading(false);
        setData(wish.slice(0, itemLimit)); // Slice the data to display limited items
        setHasMore(itemLimit < wish.length); // Check if there are more items to load
        }, 1000);
    }, [wish, itemLimit]);

    const loadMore = () => {
        setHasMore(false)
        setLoadingMore(true);
    
        // Simulating loading more data with a delay
        setTimeout(() => {
        const currentDataLength = data.length;
        const newData = [
            ...data,
            ...Array(itemLimit).fill({ loading: true }) // Add skeleton items with loading state
        ];
    
        setData(newData);
    
        // Simulating data loading with a delay
        setTimeout(() => {
            const updatedData = [
            ...data.slice(0, currentDataLength),
            ...wish.slice(currentDataLength, currentDataLength + itemLimit)
            ];
    
            setData(updatedData);
            setLoadingMore(false);
            setHasMore(currentDataLength + itemLimit < wish.length); // Check if there are more items to load
        }, 2000);
        }, 0);
    };

    const scrollToBottom = () => {
        if (containerRef.current) {
        const { scrollHeight } = containerRef.current;
        containerRef.current.scrollTo({
            top: scrollHeight,
            behavior: 'smooth',
        });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [data]);

    const content = (
        <div className="notyf-item scrollable" ref={containerRef}>
          <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            size='larger'
            loading={initLoading}
            loadMore={loadMore}
            dataSource={data}
            renderItem={(item) => (
              <List.Item
                actions={
                    [
                      <MinusCircleOutlined onClick={() => dispatch(removeFromWishList(item._id))}/>,
                    ]
                }
              >
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    avatar={<BookOutlined />}
                    title={<Link to={`/tournament/details/${item._id}`}>{`${item.tournamentName}`}</Link>}
                    description={`Starts: ${moment(item.dates?.tournamentStart).format('ll')} | ${item.category}`}
                  />
                </Skeleton>
              </List.Item>
            )}
          />
          {hasMore && (
            <Button onClick={loadMore} block className='loadmore' danger>
              Load More
            </Button>
          )}
        </div>
    );

    return (
        <div className='me-3'>
          <Popover placement="bottomLeft" title="Saved Tournaments" content={content} trigger="click" className='popup'>
            <Badge count={wish.length} size="small" color="red" style={{ color: 'white' }}>
              <i className="fa-solid fa-bookmark text-white"></i>
            </Badge>
          </Popover>
        </div>
    );
};

export default WishList;