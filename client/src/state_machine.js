import React from "react";
import Sketch from "react-p5";
// import "p5/lib/addons/p5.sound";

export default class StateMachine extends Component {
    constructor() {
        super();
        this.state = {};
    }
    setup = (p5) => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight);
        p5.angleMode(p5.DEGREES);
    };

    loaded() {
        this.loadedState = true;
    }

    draw = (p5) => {
        p5.background(0);

        p5.stroke(255);
        p5.noFill();

        p5.translate(p5.width / 2, p5.height / 2);
        p5.beginShape();
        for (let i = 0; i < 360; i++) {
            let r = p5.map(this.volHistory[i], 0, 1, 50, 500);
            let x = r * p5.cos(i);
            let y = r * p5.sin(i);

            p5.vertex(x, y);
        }
        p5.endShape();
    };

    render() {
        return <Sketch setup={this.setup} draw={this.draw} />;
    }
}
