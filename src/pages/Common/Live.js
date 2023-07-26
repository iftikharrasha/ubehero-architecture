import React from "react";
import { Epg, Layout } from "planby";
import { usePlanby } from "../../hooks/usePlanby";
import { ChannelItem, ProgramItem, Timeline } from '../../components/LiveTournaments';
import { Typography } from 'antd';
const { Title, Paragraph } = Typography;

const Live = () => {
    const { isLoading, getEpgProps, getLayoutProps } = usePlanby();

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
            <ProgramItem key={program.data.id} program={program} {...rest} />
          )}
          renderChannel={({ channel }) => (
            <ChannelItem key={channel.uuid} channel={channel} />
          )}
        />
      </Epg>
    </section>
  );
};

export default Live;
