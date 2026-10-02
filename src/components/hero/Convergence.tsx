// Convergence field: many chain streams resolving into one coordinated layer.
// Ported from Originkit "Stream Convergence" (originkit.dev, free component library),
// re-tinted to Wire tokens and hardened for production:
//   - DPR capped at 1.5 (1 on phones and touch devices, which also run at 30fps)
//   - a still frame paints at once; the loop starts after page load, when the browser is idle
//   - render loop pauses when offscreen or the tab is hidden
//   - prefers-reduced-motion renders one still frame and stops
//   - no fixed min size; fills its parent
import { useEffect, useRef } from 'react';

const MAX_DPR = 1.5;

const VERT_SRC = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main(){
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG_SRC = `
#extension GL_OES_standard_derivatives : enable
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2  uRes;
uniform float uTime, uSpread, uFreq, uWarp, uWidth, uAngle, uAA, uHover, uVignette, uGain;
uniform vec2  uPtr;
uniform vec3  uBg, uBase, uMid, uAccent;

varying vec2 v_uv;

mat2 rot(float a){
  float s = sin(a), c = cos(a);
  return mat2(c, -s, s, c);
}

float stream(vec2 p, float offset){
  vec2 d = p - uPtr;
  float bulge = exp(-dot(d, d) / 0.35) * uHover * 0.22;
  float y = p.y + offset - bulge + sin(p.x * 2.5 - uTime * 1.5) * uWarp;
  float s = sin(y * uFreq + uTime * 2.0) * 0.5 + 0.5;
  float lo = min(1.0 - 0.15 * uWidth, 0.985);
  float w = uAA * max(fwidth(s), 1e-4);
  return smoothstep(lo - w, 0.99 + w, s);
}

void main(){
  vec2 p = v_uv * 2.0 - 1.0;
  p.x *= uRes.x / max(uRes.y, 1.0);
  p = rot(uAngle) * p;

  float spread = 0.06 * uSpread;

  vec3 col = uBase * 1.2 * stream(p, spread)
           + uMid * 0.5 * stream(p, 0.0)
           + uAccent * 1.8 * stream(p, -spread);

  col *= exp(-length(v_uv * 2.0 - 1.0) * uVignette) * uGain;

  gl_FragColor = vec4(uBg + col, 1.0);
}
`;

type RGB = [number, number, number];

function hex(input: string): RGB {
	const h = input.replace('#', '');
	return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255) as RGB;
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
	const sh = gl.createShader(type);
	if (!sh) return null;
	gl.shaderSource(sh, src);
	gl.compileShader(sh);
	if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
		console.error('Convergence shader:', gl.getShaderInfoLog(sh));
		gl.deleteShader(sh);
		return null;
	}
	return sh;
}

interface Props {
	className?: string;
	/** Defaults are the Wire tokens: ink-950 / cobalt / slate / horizon, tuned to fine cables, not glow */
	background?: string;
	base?: string;
	mid?: string;
	accent?: string;
	/** 0-100, the source's speed dial. Kept calm for a financial brand. */
	speed?: number;
	/** Band frequency multiplier (1 = source default) */
	frequency?: number;
	/** Wave amplitude multiplier */
	amplitude?: number;
	/** Band width multiplier */
	bandWidth?: number;
	/** Field rotation in degrees */
	angle?: number;
	/** 0-1, channel separation between the three streams */
	spread?: number;
	vignette?: number;
	/** Overall intensity. Below 1 keeps the bands from blooming into glow. */
	gain?: number;
	/** Pointer bulge strength, 0 disables */
	hover?: number;
}

export default function Convergence({
	className,
	background = '#05070A',
	base = '#2F6BFF',
	mid = '#4A5666',
	accent = '#7EA5FF',
	speed = 34,
	frequency = 2.4,
	amplitude = 1,
	bandWidth = 0.55,
	angle = 28,
	spread = 0.65,
	vignette = 0.8,
	gain = 0.62,
	hover = 1,
}: Props) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const gl = canvas.getContext('webgl', { alpha: false, antialias: false, depth: false, powerPreference: 'low-power' });
		if (!gl) {
			canvas.dataset.failed = 'true';
			return;
		}

		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const hasDerivatives = !!gl.getExtension('OES_standard_derivatives');
		const src = hasDerivatives
			? FRAG_SRC
			: FRAG_SRC.replace('#extension GL_OES_standard_derivatives : enable', '#define fwidth(x) 0.0');

		const vs = compile(gl, gl.VERTEX_SHADER, VERT_SRC);
		const fs = compile(gl, gl.FRAGMENT_SHADER, src);
		const prog = gl.createProgram();
		if (!vs || !fs || !prog) return;
		gl.attachShader(prog, vs);
		gl.attachShader(prog, fs);
		gl.linkProgram(prog);
		if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
		gl.useProgram(prog);

		const buf = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buf);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
		const aPos = gl.getAttribLocation(prog, 'a_pos');
		gl.enableVertexAttribArray(aPos);
		gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

		const u = (name: string) => gl.getUniformLocation(prog, name);
		const angRad = (angle * Math.PI) / 180;
		gl.uniform1f(u('uSpread'), 0.3 + spread * 0.7);
		gl.uniform1f(u('uFreq'), 6.0 * frequency);
		gl.uniform1f(u('uWarp'), 0.12 * amplitude);
		gl.uniform1f(u('uWidth'), bandWidth);
		gl.uniform1f(u('uAngle'), angRad);
		gl.uniform1f(u('uAA'), hasDerivatives ? 1 : 0);
		gl.uniform1f(u('uVignette'), vignette);
		gl.uniform1f(u('uGain'), gain);
		gl.uniform3fv(u('uBg'), hex(background));
		gl.uniform3fv(u('uBase'), hex(base));
		gl.uniform3fv(u('uMid'), hex(mid));
		gl.uniform3fv(u('uAccent'), hex(accent));
		const uTime = u('uTime');
		const uRes = u('uRes');
		const uHover = u('uHover');
		const uPtr = u('uPtr');

		const ptr = { tx: 0.5, ty: 0.5, x: 0.5, y: 0.5, on: 0, onS: 0 };
		const rate = (Math.min(100, Math.max(0, speed)) / 50) * 0.3;
		let clock = 7.3; // start mid-phase so the still frame is a composed one
		let raf = 0;
		let last = performance.now();
		let visible = true;

		// Phones and touch devices: half the pixels and half the frames
		const small = window.matchMedia('(max-width: 767px), (pointer: coarse)').matches;
		const frameMs = small ? 1000 / 30 : 0;
		let armed = false;

		const resize = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, small ? 1 : MAX_DPR);
			const bw = Math.max(1, Math.round(canvas.clientWidth * dpr));
			const bh = Math.max(1, Math.round(canvas.clientHeight * dpr));
			if (canvas.width !== bw || canvas.height !== bh) {
				canvas.width = bw;
				canvas.height = bh;
			}
			gl.viewport(0, 0, bw, bh);
			gl.uniform2f(uRes, bw, bh);
		};

		const draw = (dt: number) => {
			clock = (clock + dt * rate) % 12566;
			const k = 1 - Math.exp(-dt * 5.5);
			ptr.x += (ptr.tx - ptr.x) * k;
			ptr.y += (ptr.ty - ptr.y) * k;
			ptr.onS += (ptr.on - ptr.onS) * k;

			const ar = canvas.width / Math.max(canvas.height, 1);
			const qx = (ptr.x * 2 - 1) * ar;
			const qy = 1 - ptr.y * 2;
			gl.uniform2f(uPtr, qx * Math.cos(angRad) - qy * Math.sin(angRad), qx * Math.sin(angRad) + qy * Math.cos(angRad));
			gl.uniform1f(uHover, hover * ptr.onS);
			gl.uniform1f(uTime, clock);
			gl.drawArrays(gl.TRIANGLES, 0, 3);
		};

		const loop = (now: number) => {
			raf = requestAnimationFrame(loop);
			if (frameMs && now - last < frameMs) return;
			const dt = Math.min(0.05, (now - last) / 1000);
			last = now;
			draw(dt);
		};
		const start = () => {
			if (!armed || raf || reduce || !visible || document.hidden) return;
			last = performance.now();
			raf = requestAnimationFrame(loop);
		};
		const stop = () => {
			cancelAnimationFrame(raf);
			raf = 0;
		};

		resize();
		draw(0);
		canvas.dataset.ready = 'true';

		const ro = new ResizeObserver(() => {
			resize();
			if (!raf) draw(0);
		});
		ro.observe(canvas);

		const io = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			visible ? start() : stop();
		});
		io.observe(canvas);

		const onVis = () => (document.hidden ? stop() : start());
		document.addEventListener('visibilitychange', onVis);

		const track = (e: PointerEvent) => {
			const r = canvas.getBoundingClientRect();
			if (r.width <= 0 || r.height <= 0) return;
			ptr.tx = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
			ptr.ty = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
			ptr.on = 1;
		};
		const onLeave = () => {
			ptr.tx = 0.5;
			ptr.ty = 0.5;
			ptr.on = 0;
		};
		if (!reduce && hover > 0) {
			canvas.addEventListener('pointermove', track);
			canvas.addEventListener('pointerleave', onLeave);
		}

		// Animate only once the page has loaded and the main thread is free
		const arm = () => {
			armed = true;
			start();
		};
		const idle = () => ('requestIdleCallback' in window ? requestIdleCallback(arm, { timeout: 2500 }) : setTimeout(arm, 1200));
		if (document.readyState === 'complete') idle();
		else window.addEventListener('load', idle, { once: true });

		return () => {
			window.removeEventListener('load', idle);
			stop();
			ro.disconnect();
			io.disconnect();
			document.removeEventListener('visibilitychange', onVis);
			canvas.removeEventListener('pointermove', track);
			canvas.removeEventListener('pointerleave', onLeave);
		};
	}, [background, base, mid, accent, speed, frequency, amplitude, bandWidth, angle, spread, vignette, gain, hover]);

	return <canvas ref={canvasRef} className={className} style={{ display: 'block', width: '100%', height: '100%' }} />;
}
