import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={'100%'}
    height={50}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="-5" y="8" rx="3" ry="3" width="100%" height="14" /> 
    <rect x="-4" y="30" rx="3" ry="3" width="55%" height="14" />
  </ContentLoader>
)

export default Skeleton