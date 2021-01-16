import React from 'react';
import ReactDOM from 'react-dom';
/* Lifecycle demo*/
/* Pure Function 'Clock'

function Clock(props){
    return(
        <div>
            <h5>现在的时间是 {props.date.toLocaleTimeString()}</h5>
        </div>
    );
  }
  
  function ticks(){
    ReactDOM.render(
        <Clock date={new Date()} />, document.getElementById('clock')
    )
  }
  setInterval(ticks, 1000);
  
*/

/*
---------------------------------
-- Step 1 -- Function -> Class --
---------------------------------
class Clock extends React.Component{
    render(){
    return(
        <div>
            <h5>现在的时间是 {this.props.date.toLocaleTimeString()}</h5>
        </div>
    );
  }
}
  
  function ticks(){
    ReactDOM.render(
        <Clock date={new Date()} />, document.getElementById('clock')
    )
  }
  setInterval(ticks, 1000);
*/

/*
---------------------------------
-  Step 2 -- Add state to Class -
---------------------------------

class Clock extends React.Component{
    constructor(props){
        super(props);
        this.state = {date: new Date()};
    }

    render(){
        return(
            <div>
                <h5>现在的时间是 {this.state.date.toLocaleTimeString()}</h5>
        </div>
        );
    }
}

ReactDOM.render(
    <Clock />, document.getElementById(`clock`)
)
*/
/*
---------------------------------
-  Step 2 -- Add state to Class -
---------------------------------
*/
class Clock extends React.Component{
    constructor(props){
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount(){
    this.timerID = setInterval(
        () => this.ticks(), 1000
    );
    }

    componentWillUnmount(){
        clearInterval(this.timerID);
    }

    ticks(){
        this.setState({
            date: new Date()
        });
    }

    render(){
        return(
            <div>
                <h5>现在的时间是 {this.state.date.toLocaleTimeString()}</h5>
        </div>
        );
    }
}

ReactDOM.render(
    <Clock />, document.getElementById(`clock`)
)

export default Clock;