import React from "react";
//import {render} from "react-dom"
import { Shaders, Node, GLSL } from "gl-react";

const shaders = Shaders.create({
    RecButton: {
        frag: GLSL`precision highp float;
        varying vec2 uv;
        uniform float value;
        void main() {
        vec3 toColor = vec3(0.7568,0.0549,0);
        vec3 fromColor = vec3(0.7568,value,value);
        float d = 2. * distance(uv, vec2(0.5));
        gl_FragColor = mix(
        vec4(mix(fromColor, toColor, d), 1.0),
        vec4(0.0),
        step(1.0, d)
  );
}
`,
    },
});

class RecButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: 0 };
    }
    componentDidMount() {
        const loop = (time) => {
            this.raf = requestAnimationFrame(loop);
            this.setState({
                value: (1 + Math.cos(time / 800)) / 2, // cycle between 0 and 1
            });
        };
        this.raf = requestAnimationFrame(loop);
    }
    componentWillUnmount() {
        cancelAnimationFrame(this.raf);
    }

    render() {
        const { fader } = this.props;
        const { value } = this.state;
        return <Node shader={shaders.RecButton} uniforms={{ value }} />;
    }
}

export default RecButton;
