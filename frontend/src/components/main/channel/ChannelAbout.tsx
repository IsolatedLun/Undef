import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import ChannelDetails from "../../combines/ChannelDetails";
import { INF_Channel } from "./ChannelRouter";

const ChannelAbout = ({ channel }: { channel: INF_Channel }) => {
  const { isLogged, user } = useAuth();
  const isChannelOwner = isLogged ? user.channel_id === channel.id : false;

  return (
    <div className="channel__about flex flex--center--between">
      <div>
        <h2>Description</h2>
        <p className="channel__description">{channel.channel_description}</p>

        <ChannelDetails details={channel.channel_details} id={channel.id}
          isChannelOwner={isChannelOwner} />
      </div>

      <div className="channel__stats flex flex--col gap--05">
        <p className="txt--muted">Joined at {channel.created_at}</p>
        <div className="line--split"></div>
        <p>{channel.total_views} views</p>
      </div>
    </div>
  );
};

export default ChannelAbout;
