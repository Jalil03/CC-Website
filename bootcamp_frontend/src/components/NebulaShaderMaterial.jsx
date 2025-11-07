import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

const NebulaShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color(0xff4d4d),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vec3 pos = position;
      pos.z += sin(uv.x * 10.0 + uTime * 0.5) * 0.2;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment Shader
  `
    varying vec2 vUv;
    uniform float uTime;
    uniform vec3 uColor;

    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
      float strength = smoothstep(0.5, 0.2, length(vUv - 0.5));
      float noise = random(vUv + uTime * 0.05);
      strength += noise * 0.1;
      vec3 color = mix(vec3(0.0), uColor, strength);
      gl_FragColor = vec4(color, strength * 0.9);
    }
  `
);

export default NebulaShaderMaterial;
