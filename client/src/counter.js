import { Component } from "react";

export default class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
    }
    incrementCount() {
        this.setState({
            count: this.state.count + 1,
        });
        console.log("incrementing!");
    }

    render() {
        return (
            <div>
                <h1>Im the Counter</h1>
                {/* <p>{this.state.count}</p>
                <button onClick={() => this.incrementCount}></button> */}
            </div>
        );
    }
}
