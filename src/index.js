// Inpired by: https://codepen.io/popmotion/pen/xWrbNm?editors=0010

import React from 'react'
import ReactDOM from 'react-dom'
import { withGesture } from 'react-with-gesture'
import { Spring, animated } from 'react-spring'
import './styles.css'

@withGesture // https://github.com/drcmda/react-with-gesture
class Slider extends React.Component {
  render() {
    const { xDelta, down, children } = this.props
    return (
      <Spring native to={{ x: down ? xDelta : 0 }} immediate={name => down && name === 'x'}>
        {({ x }) => (
          <div className="item" style={{ backgroundColor: xDelta < 0 ? '#FF1C68' : '#14D790' }}>
            <animated.div
              className="bubble"
              style={{
                transform: x
                  .interpolate({ map: Math.abs, range: [50, 300], output: [0.5, 1], extrapolate: 'clamp' })
                  .interpolate(x => `scale(${x})`),
                justifySelf: xDelta < 0 ? 'end' : 'start'
              }}
            />
            <animated.div className="fg" style={{ transform: x.interpolate(x => `translate3d(${x}px,0,0)`) }}>
              {down && Math.abs(xDelta) > 50 ? (xDelta < 0 ? 'Cancel' : 'Accept') : children}
            </animated.div>
          </div>
        )}
      </Spring>
    )
  }
}

ReactDOM.render(<Slider>Slide me</Slider>, document.getElementById('root'))
