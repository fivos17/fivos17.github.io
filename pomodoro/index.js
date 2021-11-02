function App() {
  const [minutes, setMinutes] = React.useState(25);
  const [seconds, setSeconds] = React.useState(0);
  const [session, setSession] = React.useState(25);
  const [breakk, setBreakk] = React.useState(5);
  const [paused, setPaused] = React.useState(true);
  const [intervalId, setIntervalId] = React.useState();
  const [lap, setLap] = React.useState(true);

  // Increment
  const onIncrement = (type) => {
    if(paused){
    if (type === "session" && session < 60) {
      setSession(session + 1);
      setMinutes(minutes + 1);
    } else if (type === "breakk" && breakk < 60) {
      setBreakk(breakk + 1);
    }
    console.log("increment");
    }
  };

  // Decrement
  const onDecrement = (type) => {
    if(paused){
    if (type === "session" && session > 1) {
      setSession(session - 1);
      setMinutes(minutes - 1);
    } else if (type === "breakk" && breakk > 1) {
      setBreakk(breakk - 1);
    }
    console.log("decrement");
    }
  };

  // Start or stop
  const onStartStop = () => {
    console.log(paused);
    if (paused === true) {
      setPaused(false);
      let xMinutes = minutes;
      let xSeconds = seconds;
      let xLap = lap;
      setIntervalId(setInterval(function () {
        if (xSeconds > 0) {
          setMinutes(xMinutes);
          xSeconds--;
          setSeconds(xSeconds);
        } else {
          xMinutes--;
          setMinutes(xMinutes);
          xSeconds = 59;
          setSeconds(xSeconds);
        }
        if(xMinutes==0 && xSeconds==0 && xLap){
          xMinutes = breakk;
          xSeconds = 1;
          xLap = false;
          setLap(false);
          document.getElementById('beep').play();
        }else if(xMinutes==0 && xSeconds==0){
          xMinutes = session;
          xSeconds = 1;
          xLap = true;
          setLap(true);
          document.getElementById('beep').play();
        }
      }, 1000));
    }
    if(paused===false){
      setPaused(true);
      clearInterval(intervalId);
    }
  };

  // Reset
  const onReset = () => {
    setMinutes(25);
    setSeconds(0);
    setSession(25);
    setBreakk(5);
    setPaused(true);
    setLap(true);
    document.getElementById('beep').pause();
    document.getElementById('beep').currentTime = 0;
    clearInterval(intervalId);
    console.log("reset");
  };
  
  return (
      <div className="container d-flex justify-content-center">
      <div className="bg-danger p-4 rounded">
      <h1 className='mb-4 text-light' style={{fontFamily:'"Courgette", cursive'}}>POMODORO</h1>
      <div className='d-md-flex'>
      <SessionLength
        session={session}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />
      <BreakLength
        breakk={breakk}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />
      </div>
      <Display
        paused={paused}
        lap={lap}
        minutes={minutes}
        seconds={seconds}
        onStartStop={onStartStop}
        onReset={onReset}
      />
      </div>
    </div>
  );
}

function SessionLength({ session, onIncrement, onDecrement }) {
  return (
    <div>
      <h3 id="session-label">Session Length</h3>
      <div className='d-flex align-items-center'>
      <Button content='angle-down' id="session-decrement" onClick={() => onDecrement("session")} />
      <h4 id="session-length" className='w-25 text-center font-monospace mx-1'>{session}</h4>
      <Button content='angle-up' id="session-increment" onClick={() => onIncrement("session")} />
      </div>
    </div>
  );
}

function BreakLength({ breakk, onIncrement, onDecrement }) {
  return (
    <div className='ms-md-5 mt-4 mt-md-0'>
      <h3 id="break-label">Break Length</h3>
      <div className='d-flex align-items-center'>
      <Button content='angle-down' id="break-decrement" onClick={() => onDecrement("breakk")} />
      <h4 id="break-length" className='w-25 text-center font-monospace mx-1'>{breakk}</h4>
      <Button content='angle-up' id="break-increment" onClick={() => onIncrement("breakk")} />
      </div>
    </div>
  );
}

function Button({ content, id, onClick }) {
  return (
    <button className={`btn btn-success ${content=='redo-alt'&&'ms-4'}`} id={id} onClick={onClick} title={id}>
      <i className={`fas fa-${content}`}></i>
    </button>
  );
}

function Display({ paused, lap, minutes, seconds, onStartStop, onReset }) {
  return (
    <div className='mt-4'>
      <h3 id="timer-label">{lap ? 'Session' : 'Break'}</h3>
      <h2 id="time-left" className={`font-monospace mt-3 alert alert-${minutes?'success':'danger'}`} style={{width:'min-content'}}>
        {minutes.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false
        })}
        :
        {seconds.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false
        })}
      </h2>
      <audio id='beep' src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/success.mp3' />
      <Button content={paused?'play':'pause'} id="start_stop" onClick={onStartStop} />
      <Button content='redo-alt' id="reset" onClick={onReset} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
