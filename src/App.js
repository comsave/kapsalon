import React from 'react';
import styled from 'styled-components';

const AppWrapper = styled.div`
  position:relative;
  width:100%;
  height:100%;
`;

const Clouds = styled.div`
  background:url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/56901/bg-clouds2-tinypng.png") repeat-x 0 bottom #ACE6FF;
  width:100%;
  height:230px; /*190px*/
  min-height:230px;
  position:absolute;
  top:0;
  left:0;
  z-index:1;
  -webkit-transform:translate3d(0,0,0.01);
  transform:translate3d(0,0,0.01);
`;

const Ground = styled.div`@-webkit-keyframes rotating /* Safari and Chrome */ {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
  background:url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/56901/grass_tile-tinypng.png") repeat-x 0 0 transparent;
  position: absolute;
  bottom: 0;
  left: 1000;
  z-index:2;
  animate: left;
  width: 100%;
  height: 192px;
  min-height:192px;
  border:0 none transparent;
  outline:0 none transparent;
  -webkit-transform:translate3d(0,0,0.01);
  transform:translate3d(0,0,0.01);
  will-change: transform;
`;

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

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    console.log(getCelebrationDate())

    return (
      <AppWrapper>
        // <Clouds />
        // <Ground />
      </AppWrapper>
    );
  }
}

export default App;
