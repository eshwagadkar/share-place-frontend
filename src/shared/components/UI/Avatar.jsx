import './Avatar.css'

// const Avatar = ({ className, style, image, alt, width, }) => {
const Avatar = ({ image, alt }) => {

  return (
    // <div className={`avatar ${className}`} style={style}>
    <div className='avatar'>
      <img
        src={image}
        alt={alt}
        // style={{ width: width, height: height }}
      />
    </div>
  )
}

export default Avatar