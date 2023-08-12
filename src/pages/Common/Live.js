import React from "react";
import { Epg, Layout } from "planby";
import { usePlanby } from "../../hooks/usePlanby";
import { ChannelItem, ProgramItem, Timeline } from '../../components/LiveTournaments';
import { Modal, Typography } from 'antd';
const { Title, Paragraph } = Typography;

const Live = () => {
    const { isLoading, getEpgProps, getLayoutProps, nowPlaying, setNowPlaying } = usePlanby();

  return (
    <section className="epg">
      <div className="hero__wrapper__content__left">
          <Title>Live Tournaments</Title>
          <Paragraph className='p'>You are seeing the timeline of tournaments that has battle started.</Paragraph>
      </div>
      <Epg isLoading={isLoading} {...getEpgProps()}>
        <Layout
          {...getLayoutProps()}
          renderTimeline={(props) => <Timeline {...props} />}
          renderProgram={({ program, ...rest }) => (
            <ProgramItem key={program.data.id} setNowPlaying={setNowPlaying} program={program} {...rest} />
          )}
          renderChannel={({ channel }) => (
            <ChannelItem key={channel.uuid} channel={channel} />
          )}
        />
      </Epg>

      <Modal
        title="Live Streaming"
        okText="View Details"
        open={nowPlaying}
        onOk={() => setNowPlaying(false)}
        onCancel={() => setNowPlaying(false)}
        width={900}
      >
        <div className="liveStream">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/c84_RXN2ovw?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
      </Modal>
    </section>
  );
};

export default Live;
