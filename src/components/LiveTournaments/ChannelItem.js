import { ChannelBox, ChannelLogo } from "planby";
// import { notyf } from "../../Utilities/Hooks/useNotification";

export const ChannelItem = ({ channel, nowPlaying }) => {
  const { position, logo } = channel;

  const handleChannel = (id) => {
    // if(channel.uuid === nowPlaying.channelUuid){
    //   notyf.open({
    //     type: 'success',
    //     message: "El canal ya se está reproduciendo."
    //   });
    // }else{
    //   notyf.open({
    //     type: 'error',
    //     message: "Elige un programa en vivo desde la guía de programación."
    //   });
    // }
  };

  return (
    <ChannelBox {...position} className={channel.uuid === nowPlaying.channelUuid ? "isChannelLive" : "isChanneNotlLive"} onClick={() => handleChannel(channel.uuid)}>
      <ChannelLogo src={logo} alt="Logo"/>
    </ChannelBox>
  );
};
