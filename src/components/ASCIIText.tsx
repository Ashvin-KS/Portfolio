import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
uniform float uTime;
uniform float uEnableWaves;

void main() {
    vUv = uv;
    vec3 transformed = position;
    
    if (uEnableWaves > 0.5) {
        float time = uTime * 5.0;
        transformed.x += sin(time + position.y) * 0.5;
        transformed.y += cos(time + position.z) * 0.15;
        transformed.z += sin(time + position.x);
    }
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
uniform float uTime;
uniform sampler2D uTexture;

void main() {
    vec2 offset = vec2(
        cos(uTime * 2.0 + vUv.x) * 0.01,
        sin(uTime * 2.0 + vUv.y) * 0.01
    );
    
    float r = texture2D(uTexture, vUv + offset).r;
    float g = texture2D(uTexture, vUv + offset * 0.5).g;
    float b = texture2D(uTexture, vUv - offset).b;
    float a = texture2D(uTexture, vUv).a;
    
    gl_FragColor = vec4(r, g, b, a);
}
`;

const map = (n: number, start: number, stop: number, start2: number, stop2: number) => 
  ((n - start) / (stop - start)) * (stop2 - start2) + start2;

const PX_RATIO = typeof window !== 'undefined' ? window.devicePixelRatio : 1;

class AsciiFilter {
  renderer: THREE.WebGLRenderer;
  domElement: HTMLDivElement;
  pre: HTMLPreElement;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  deg: number = 0;
  invert: boolean;
  fontSize: number;
  fontFamily: string;
  charset: string;
  width: number = 0;
  height: number = 0;
  center: { x: number; y: number } = { x: 0, y: 0 };
  mouse: { x: number; y: number } = { x: 0, y: 0 };
  cols: number = 0;
  rows: number = 0;
  imgDataCache: Uint8ClampedArray | null = null;

  constructor(
    renderer: THREE.WebGLRenderer,
    fontSize: number = 12,
    fontFamily: string = "'Courier New', monospace",
    charset: string = ' .\'`^",:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$',
    invert: boolean = true
  ) {
    this.renderer = renderer;
    this.invert = invert;
    this.fontSize = fontSize;
    this.fontFamily = fontFamily;
    this.charset = charset;

    this.domElement = document.createElement('div');
    Object.assign(this.domElement.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%'
    });

    this.pre = document.createElement('pre');
    this.domElement.appendChild(this.pre);

    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d', { willReadFrequently: true })!;
    this.context.imageSmoothingEnabled = false;

    this.onMouseMove = this.onMouseMove.bind(this);
    document.addEventListener('mousemove', this.onMouseMove, { passive: true });
  }

  setSize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.renderer.setSize(width, height);
    this.reset();
    this.center = { x: width / 2, y: height / 2 };
    this.mouse = { ...this.center };
  }

  reset() {
    this.context.font = `${this.fontSize}px ${this.fontFamily}`;
    const charWidth = this.context.measureText('A').width;

    this.cols = Math.floor(this.width / charWidth);
    this.rows = Math.floor(this.height / this.fontSize);

    this.canvas.width = this.cols;
    this.canvas.height = this.rows;

    Object.assign(this.pre.style, {
      fontFamily: this.fontFamily,
      fontSize: `${this.fontSize}px`,
      margin: '0',
      padding: '0',
      lineHeight: '1em',
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '9',
      backgroundAttachment: 'fixed',
      mixBlendMode: 'difference'
    });

    this.imgDataCache = null;
  }

  render(scene: THREE.Scene, camera: THREE.Camera) {
    this.renderer.render(scene, camera);

    const { width: w, height: h } = this.canvas;
    this.context.clearRect(0, 0, w, h);
    this.context.drawImage(this.renderer.domElement, 0, 0, w, h);

    this.asciify();
    this.updateHue();
  }

  onMouseMove(e: MouseEvent) {
    this.mouse = { x: e.clientX * PX_RATIO, y: e.clientY * PX_RATIO };
  }

  updateHue() {
    const dx = this.mouse.x - this.center.x;
    const dy = this.mouse.y - this.center.y;
    const deg = (Math.atan2(dy, dx) * 180) / Math.PI;
    this.deg += (deg - this.deg) * 0.075;
    this.domElement.style.filter = `hue-rotate(${this.deg.toFixed(1)}deg)`;
  }

  asciify() {
    const { width: w, height: h } = this.canvas;
    const imgData = this.context.getImageData(0, 0, w, h).data;
    const charsetLen = this.charset.length;
    let str = '';

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (x + y * w) * 4;
        const a = imgData[i + 3];

        if (a === 0) {
          str += ' ';
          continue;
        }

        const r = imgData[i];
        const g = imgData[i + 1];
        const b = imgData[i + 2];
        const gray = (0.3 * r + 0.6 * g + 0.1 * b) / 255;
        
        let idx = Math.floor((1 - gray) * (charsetLen - 1));
        if (this.invert) idx = charsetLen - idx - 1;
        str += this.charset[idx];
      }
      str += '\n';
    }
    this.pre.textContent = str;
  }

  dispose() {
    document.removeEventListener('mousemove', this.onMouseMove);
  }
}

class CanvasTxt {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  txt: string;
  fontSize: number;
  fontFamily: string;
  color: string;
  font: string;

  constructor(txt: string, fontSize: number = 200, fontFamily: string = 'Arial', color: string = '#fdf9f3') {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d')!;
    this.txt = txt;
    this.fontSize = fontSize;
    this.fontFamily = fontFamily;
    this.color = color;
    this.font = `600 ${this.fontSize}px ${this.fontFamily}`;
    this.resize();
    this.render();
  }

  resize() {
    this.context.font = this.font;
    const metrics = this.context.measureText(this.txt);

    this.canvas.width = Math.ceil(metrics.width) + 20;
    this.canvas.height = Math.ceil(metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent) + 20;
  }

  render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = this.color;
    this.context.font = this.font;

    const metrics = this.context.measureText(this.txt);
    this.context.fillText(this.txt, 10, 10 + metrics.actualBoundingBoxAscent);
  }

  get texture() {
    return this.canvas;
  }
}

class CanvAscii {
  container: HTMLElement;
  width: number;
  height: number;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  mouse: { x: number; y: number } = { x: 0, y: 0 };
  mesh: THREE.Mesh;
  renderer: THREE.WebGLRenderer;
  filter: AsciiFilter;
  center: { x: number; y: number };
  animationFrameId: number = 0;
  time: number = 0;

  constructor(
    text: string,
    asciiFontSize: number,
    textFontSize: number,
    textColor: string,
    planeBaseHeight: number,
    enableWaves: boolean,
    containerElem: HTMLElement,
    width: number,
    height: number
  ) {
    this.container = containerElem;
    this.width = width;
    this.height = height;

    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    this.camera.position.z = 30;

    this.scene = new THREE.Scene();

    const textCanvas = new CanvasTxt(text, textFontSize, 'IBM Plex Mono', textColor);
    const texture = new THREE.CanvasTexture(textCanvas.texture);
    texture.minFilter = THREE.NearestFilter;

    const textAspect = textCanvas.canvas.width / textCanvas.canvas.height;
    const planeH = planeBaseHeight * (textCanvas.canvas.height / textFontSize);
    const planeW = planeH * textAspect;

    const geometry = new THREE.PlaneGeometry(planeW, planeH, 36, 36);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: texture },
        uEnableWaves: { value: enableWaves ? 1.0 : 0.0 }
      }
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);

    this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    this.renderer.setPixelRatio(1);
    this.renderer.setClearColor(0x000000, 0);

    this.filter = new AsciiFilter(this.renderer, asciiFontSize, 'IBM Plex Mono');
    this.container.appendChild(this.filter.domElement);
    
    this.setSize(width, height);
    this.center = { x: width / 2, y: height / 2 };

    this.onMouseMove = this.onMouseMove.bind(this);
    this.container.addEventListener('mousemove', this.onMouseMove, { passive: true });
    this.container.addEventListener('touchmove', this.onMouseMove, { passive: true });
  }

  setSize(w: number, h: number) {
    this.width = w;
    this.height = h;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.filter.setSize(w, h);
    this.center = { x: w / 2, y: h / 2 };
  }

  onMouseMove(evt: MouseEvent | TouchEvent) {
    const e = (evt as TouchEvent).touches?.[0] || (evt as MouseEvent);
    const bounds = this.container.getBoundingClientRect();
    this.mouse = { x: e.clientX - bounds.left, y: e.clientY - bounds.top };
  }

  animate() {
    const animateFrame = (timestamp: number) => {
      this.time = timestamp * 0.001;
      this.animationFrameId = requestAnimationFrame(animateFrame);
      this.render();
    };
    this.animationFrameId = requestAnimationFrame(animateFrame);
  }

  render() {
    (this.mesh.material as THREE.ShaderMaterial).uniforms.uTime.value = Math.sin(this.time);

    const targetRotX = map(this.mouse.y, 0, this.height, 0.5, -0.5);
    const targetRotY = map(this.mouse.x, 0, this.width, -0.5, 0.5);

    this.mesh.rotation.x += (targetRotX - this.mesh.rotation.x) * 0.05;
    this.mesh.rotation.y += (targetRotY - this.mesh.rotation.y) * 0.05;

    this.filter.render(this.scene, this.camera);
  }

  dispose() {
    cancelAnimationFrame(this.animationFrameId);
    this.filter.dispose();
    this.container.removeChild(this.filter.domElement);
    this.container.removeEventListener('mousemove', this.onMouseMove);
    this.container.removeEventListener('touchmove', this.onMouseMove);
    
    this.scene.traverse(obj => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(m => m.dispose());
        } else {
          mesh.material.dispose();
        }
      }
    });
    
    this.scene.clear();
    this.renderer.dispose();
  }
}

interface ASCIITextProps {
  text?: string;
  asciiFontSize?: number;
  textFontSize?: number;
  textColor?: string;
  planeBaseHeight?: number;
  enableWaves?: boolean;
}

export default function ASCIIText({
  text = 'David!',
  asciiFontSize = 8,
  textFontSize = 200,
  textColor = '#fdf9f3',
  planeBaseHeight = 8,
  enableWaves = true
}: ASCIITextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const asciiRef = useRef<CanvAscii | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const initAscii = (w: number, h: number) => {
      if (asciiRef.current) asciiRef.current.dispose();
      
      asciiRef.current = new CanvAscii(
        text,
        asciiFontSize,
        textFontSize,
        textColor,
        planeBaseHeight,
        enableWaves,
        containerRef.current!,
        w,
        h
      );
      asciiRef.current.animate();
    };

    const { width, height } = containerRef.current.getBoundingClientRect();

    if (width === 0 || height === 0) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const { width: w, height: h } = entry.boundingClientRect;
            if (w > 0 && h > 0) {
              initAscii(w, h);
              observer.disconnect();
            }
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(containerRef.current);

      return () => {
        observer.disconnect();
        asciiRef.current?.dispose();
      };
    }

    initAscii(width, height);

    const ro = new ResizeObserver(entries => {
      const entry = entries[0];
      if (!entry || !asciiRef.current) return;
      const { width: w, height: h } = entry.contentRect;
      if (w > 0 && h > 0) {
        asciiRef.current.setSize(w, h);
      }
    });
    ro.observe(containerRef.current);

    return () => {
      ro.disconnect();
      asciiRef.current?.dispose();
    };
  }, [text, asciiFontSize, textFontSize, textColor, planeBaseHeight, enableWaves]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500&display=swap');

        .ascii-text-container canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          image-rendering: pixelated;
        }

        .ascii-text-container pre {
          margin: 0;
          user-select: none;
          padding: 0;
          line-height: 1em;
          background-image: radial-gradient(circle, #ff6188 0%, #fc9867 50%, #ffd866 100%);
          background-attachment: fixed;
          -webkit-text-fill-color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
        }
      `}</style>
    </div>
  );
}