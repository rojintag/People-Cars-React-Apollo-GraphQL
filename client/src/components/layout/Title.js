const Title = (props) => {
  return (
    <div style={{position: 'relative'}}>
      <h1 style={{ backgroundColor: 'white', position: 'absolute', top: '-20px', left: '45%', padding: '0 .5rem' }}>{props.title}</h1>
    </div>
  )
}

export default Title