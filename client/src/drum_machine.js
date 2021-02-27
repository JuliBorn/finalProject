import React from "react";

// import Sketch from "react-p5";
// import P5Wrapper from "react-p5-wrapper";
import p5 from "p5";
import "./p5.sound.js";

function DrumMachine(props) {
    let song = p5.loadSound("song.mp3", loaded);
    let loaded = () => {
        console.log("Song loaded");
    };
    let a = 300;
    let b = 300;
    let speed = 3;
    let setup = (p5, canvasParentRef) => {
        let xyz = p5.createCanvas(1000, 200).parent(canvasParentRef);
        let x = (p5.windowWidth - p5.width) / 2;
        let y = (p5.windowHeight - p5.height) / 2;
        xyz.position(x, y);
    };
    let draw = (p5) => {
        p5.background("rgb(100%,0%,10%)");
        p5.stroke(255);
        p5.strokeWeight(4);
        p5.noFill();
        p5.ellipse(a, b, 100, 100);
        if (a >= p5.width) {
            speed = -3;
        }
        if (a === 90) {
            speed = 3;
        }
        a = a + speed;
    };
    return (
        <div className="Drum">
            <Sketch setup={setup} draw={draw} className="App" />
        </div>
    );
}

export default DrumMachine;
