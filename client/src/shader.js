import React from "react";
import { Shaders, Node, GLSL } from "gl-react";

const shaders = Shaders.create({
    helloBlue: {
        frag: GLSL`
precision highp float;
varying vec2 uv;
uniform float value;
void main() {
  gl_FragColor = vec4(1, uv.y, value, 1.0);
}`,
    },
});
class HelloBlue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };
    }

    componentDidMount() {
        const loop = (time) => {
            this.raf = requestAnimationFrame(loop);
            this.setState({
                value: (1 + Math.cos(time / 1000)) / 2, // cycle between 0 and 1
            });
        };
        this.raf = requestAnimationFrame(loop);
    }

    render() {
        const { value } = this.state;
        return <Node shader={shaders.helloBlue} uniforms={{ value }} />;
    }
}

export default HelloBlue;
