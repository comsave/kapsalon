import React from 'react';
import styled from 'styled-components';
import 'animate.css';
import * as Kapsalon from './kapsalon.jpeg';

const AppWrapper = styled.div`
  background: url(${Kapsalon}) repeat;
  background-size: 100%;
  position: fixed;
  width: 100%;
  height: 100%;
`;

const Timer = styled.div`
  position: relative;
  top: 30%;
  left: 0;
  text-align: center;
  padding: 20px;
  background: rgba(255, 255, 255, .5);
`;

const Title = styled.div`
  font-size: 42px;
  text-shadow: 4px 4px 2px rgba(150, 150, 150, 1);
`;

const Remaining = styled.div`
  font-size: 42px;
  color: red;
`

Date.prototype.addDays = function(days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

const getCelebrationDate = () => {
  const today = new Date();
  const celebrationDay = 5;
  const celebrationTime = 12;
  let daysToAdd;

  if(today.getDay() === celebrationDay && today.getHours() < celebrationTime){
    daysToAdd = 0;
  }
  else{
    daysToAdd = today.getDay() >= celebrationDay ? 7 - today.getDay() + celebrationDay : celebrationDay - today.getDay();
  }

  const celebrationDate = today.addDays(daysToAdd);
  return new Date(celebrationDate.getFullYear(), celebrationDate.getMonth(), celebrationDate.getDate(), 12, 0, 0);
}

const getRandomFromArray = items => items[Math.floor(Math.random()*items.length)];

const availableAnimations = `
  bounce	flash	pulse	rubberBand
shake	headShake	swing	tada
wobble	jello	bounceIn	bounceInDown
bounceInLeft	bounceInRight	bounceInUp	bounceOut
bounceOutDown	bounceOutLeft	bounceOutRight	bounceOutUp
fadeIn	fadeInDown	fadeInDownBig	fadeInLeft
fadeInLeftBig	fadeInRight	fadeInRightBig	fadeInUp
fadeInUpBig	fadeOut	fadeOutDown	fadeOutDownBig
fadeOutLeft	fadeOutLeftBig	fadeOutRight	fadeOutRightBig
fadeOutUp	fadeOutUpBig	flipInX	flipInY
flipOutX	flipOutY	lightSpeedIn	lightSpeedOut
rotateIn	rotateInDownLeft	rotateInDownRight	rotateInUpLeft
rotateInUpRight	rotateOut	rotateOutDownLeft	rotateOutDownRight
rotateOutUpLeft	rotateOutUpRight	hinge	jackInTheBox
rollIn	rollOut	zoomIn	zoomInDown
zoomInLeft	zoomInRight	zoomInUp	zoomOut
zoomOutDown	zoomOutLeft	zoomOutRight	zoomOutUp
slideInDown	slideInLeft	slideInRight	slideInUp
slideOutDown	slideOutLeft	slideOutRight	slideOutUp
`.replace(/\s/g, ' ').split(' ');

const getRandomAnimation = () => getRandomFromArray(availableAnimations);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: this.getTime(),
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({
      time: this.getTime(),
    }), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getTime() {
    return getCelebrationDate().getTime() - new Date().getTime();
  }

  getRemaining() {
    let days = parseFloat((this.state.time / 1000 / 60 / 60 / 24).toFixed(5));
    let hours = 0;
    let minutes = 0;

    if(days < 1) {
      hours = parseFloat((days * 24).toFixed(4));
      days = 0;
    }
    if(hours > 0 && hours < 1) {
      minutes = parseFloat((hours / 60).toFixed(3));
      hours = 0;
    }

    return {
      days,
      hours,
      minutes,
    };
  }

  render() {
    const { days, hours, minutes } = this.getRemaining();
    const animation = getRandomAnimation();

    return (
      <AppWrapper>
        <Timer>
          <Title>Celebrate Kapsalon in...</Title>
          <Remaining className={`${animation} animated`}>
            {days > 0 && <div>{days.toFixed(5)} days</div>}
            {hours > 0 && <div>{hours.toFixed(4)} hours</div>}
            {minutes > 0 && <div>{minutes.toFixed(3)} minutes</div>}
          </Remaining>
        </Timer>
      </AppWrapper>
    );
  }
}

export default App;
