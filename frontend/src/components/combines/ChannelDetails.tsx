export interface INF_ChannelDetail {
    key: string;
    value: string;
    type: string;
}

const ChannelDetail = ({ detail } : { detail: INF_ChannelDetail }) => {
    return (
        <>
            <div>
                <p className="txt--muted upper btn--muted">{ detail.key }</p>
            </div>
            <div>
                <p>{ detail.value }</p>
            </div>
        </>
    )
  }

const ChannelDetails = ({ details } : { details: INF_ChannelDetail[] }) => {
  return (
    <>
        <h3>Details</h3>
        <div className="channel__user-links flex gap--1">
            {
                details.map((detail: any) => <ChannelDetail detail={detail} /> )
            }
        </div>
    </>
  )
}

export default ChannelDetails