const Loader = ({ id, cls, radius=70 } : { id?: string, cls?: string, radius?: number }) => {
  return (
    <div id={id !== null ? id : '_'} className={`primary-loader ${cls}`}>
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
        style={{ margin: 'auto', background: 'rgba(0, 0, 0, 0) none repeat scroll 0% 0%', display: 'block', shapeRendering: 'auto'}} 
          width={`${radius}px`} height={`${radius}px`}  viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">

        <circle cx="50" cy="50" r="41" strokeWidth="13" stroke="#ffffff" strokeDasharray="64.40264939859075 64.40264939859075" fill="none" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="0.9174311926605504s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
        </circle>
      </svg>
    </div>
  )
}

export default Loader