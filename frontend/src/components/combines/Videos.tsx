import React from "react";
import { useFilters } from "../../hooks/useFilters";
import Loader from "../layouts/Loader";
import Video, { INF_Video } from "../modules/Video";

interface Videos {
  videos: INF_Video[] | undefined;
  filters?: any | object | undefined;
  direction?: 'vertical' | 'side';
}

const Videos = ({ props }: { props: Videos }) => {
  if(props.videos)
    if (props.filters === undefined)
    return (
      <>
        { props.videos.map((video, idx) => (
          <Video key={idx} props={video} direction={props.direction} />
        )) }
      </>
    );
  else
    return (
      <>
        { useFilters(props.videos, props.filters, "").map((video, idx) => (
          <Video key={idx} props={video} direction={props.direction} />
        ))}
      </>
    );
  else
    return <Loader radius={20} />
};

export default Videos;
