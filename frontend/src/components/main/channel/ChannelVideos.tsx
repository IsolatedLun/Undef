import Videos from "../../combines/Videos"
import { INF_Video } from "../../modules/Video"

const ChannelVideos = ({ videos } : { videos: INF_Video[] }) => {
  return (
    <div className="videos">
        <Videos props={{ videos: videos }} />
    </div>
  )
}

export default ChannelVideos