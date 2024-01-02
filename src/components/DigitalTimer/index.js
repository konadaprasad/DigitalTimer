// Write your code here
import {Component} from 'react'

import './index.css'

const time = 25

let buttonText = ''
let imageAlt = ''

class DigitalTimer extends Component {
  state = {
    minutes: time,
    seconds: 0,
    timerStatus: 'Paused',
    reset: true,
    initialtime: time,
    startButton: false,
  }

  tick = () => {
    const {minutes, seconds, initialtime} = this.state

    if (seconds === 0) {
      this.setState({
        seconds: 60,
        minutes: minutes - 1,
      })
    }

    this.setState(prevState => ({
      seconds: prevState.seconds - 1,
      timerStatus: 'Running',
      reset: false,
      startButton: true,
    }))

    if (minutes === 0 && seconds === 0) {
      clearInterval(this.secondsId)
      this.setState({
        minutes: 0,
        seconds: 0,
        startButton: false,
        timerStatus: 'Paused',
      })
    }
  }

  timingStart = () => {
    this.secondsId = setInterval(this.tick, 1000)
    this.setState({startButton: true, timerStatus: 'Running'})
  }

  timingPause = () => {
    clearInterval(this.secondsId)
    this.setState({
      timerStatus: 'Paused',
      reset: false,
      startButton: false,
    })
  }

  timerReset = () => {
    const {initialtime} = this.state
    clearInterval(this.secondsId)
    this.setState({
      minutes: initialtime,
      seconds: 0,
      timerStatus: 'Paused',
      reset: true,
      startButton: false,
    })
  }

  decrement = () => {
    const {reset} = this.state
    if (reset) {
      this.setState(prevState => ({
        minutes: prevState.minutes - 1,
        initialtime: prevState.initialtime - 1,
      }))
    }
  }

  increment = () => {
    const {reset} = this.state
    if (reset) {
      this.setState(prevState => ({
        minutes: prevState.minutes + 1,
        initialtime: prevState.initialtime + 1,
      }))
    }
  }

  render() {
    const {minutes, seconds, timerStatus, initialtime, startButton} = this.state
    let sec
    let min
    if (startButton) {
      buttonText = 'Pause'
      imageAlt = 'pause icon'
    } else {
      buttonText = 'Start'
      imageAlt = 'play icon'
    }
    if (seconds < 10) {
      sec = `0${seconds}`
    } else {
      sec = seconds
    }
    if (minutes < 10) {
      min = `0${minutes}`
    } else {
      min = minutes
    }

    let timeText = ''
    console.log(startButton)
    if (startButton === false) {
      timeText = (
        <div className="start-stop-icon">
          <button
            type="button"
            className="time-btn text"
            onClick={this.timingStart}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
              alt={imageAlt}
              className="icon"
            />
            {buttonText}
          </button>
        </div>
      )
    } else {
      timeText = (
        <div className="start-stop-icon">
          <button
            type="button"
            className="time-btn text"
            onClick={this.timingPause}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
              alt={imageAlt}
              className="icon"
            />
            {buttonText}
          </button>
        </div>
      )
    }

    return (
      <div className="container">
        <h1 className="heading">Digital Timer</h1>
        <div className="inner-container">
          <div className="cont1">
            <div className="inner-cont1">
              <div className="timing">
                <h1 className="time-text">
                  {min}:{sec}
                </h1>
                <p className="timer-status">{timerStatus}</p>
              </div>
            </div>
          </div>
          <div className="cont2">
            <div className="start-and-stop">
              {timeText}
              <div className="restart-icon">
                <button
                  type="button"
                  className="time-btn"
                  onClick={this.timerReset}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="icon"
                  />
                </button>
                <p className="text">Restart</p>
              </div>
            </div>
            <div className="timer-limit">
              <p className="set-time">set Timer limit</p>
              <div className="increment-decrement-cont">
                <button
                  className="minus-btn"
                  type="button"
                  onClick={this.decrement}
                >
                  -
                </button>
                <p className="timer-value">{initialtime}</p>
                <button
                  className="minus-btn"
                  type="button"
                  onClick={this.increment}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
