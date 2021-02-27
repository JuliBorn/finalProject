import React from "react";
//import {render} from "react-dom"
import { Shaders, Node, GLSL } from "gl-react";

const shaders = Shaders.create({
    helloBlue: {
        frag: GLSL`precision highp float;
        varying vec2 uv;
void main() {
    vec3 toColor = vec3(0.7568,0.0549,0);
    vec3 fromColor = vec3(.8,0.3,0);
  float d = 2.0 * distance(uv, vec2(0.5));
  gl_FragColor = mix(
    vec4(mix(fromColor, toColor, d), 1.0),
    vec4(0.0),
    step(1.0, d)
  );
}
`,
    },
});

class HelloBlue extends React.Component {
    render() {
        const { blue } = this.props;
        return <Node shader={shaders.helloBlue} uniforms={{ blue }} />;
    }
}

export default HelloBlue;
