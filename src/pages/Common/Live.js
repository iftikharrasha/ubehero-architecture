import React from "react";
import { Epg, Layout } from "planby";
import { usePlanby } from "../../hooks/usePlanby";
import { ChannelItem, ProgramItem, Timeline } from '../../components/LiveTournaments';

const Live = () => {
    const { isLoading, getEpgProps, getLayoutProps, nowPlaying, setNowPlaying } = usePlanby();

  return (
    <div className='d-flex flex-column align-items-center justify-content-center'
      style={{ paddingTop: "150px" }}
    >
        <Epg isLoading={isLoading} {...getEpgProps()}>
            <Layout
                {...getLayoutProps()}
                renderTimeline={(props) => <Timeline {...props} />}
                renderProgram={({ program, ...rest }) => (
                    <ProgramItem key={program.data.id} setNowPlaying={setNowPlaying} program={program} {...rest} />
                )}
                renderChannel={({ channel }) => (
                    <ChannelItem key={channel.uuid} channel={channel} nowPlaying={nowPlaying}/>
                )}
            />
        </Epg>
    </div>

  );
};

export default Live;
