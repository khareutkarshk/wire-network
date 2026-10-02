import { gsap } from 'gsap';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

/** Decode `el` into `to`, left to right. Used for lifecycle state changes only. */
export function scramble(el: HTMLElement, to: string, reduce = false) {
	if (reduce) {
		el.textContent = to;
		return;
	}
	const obj = { p: 0 };
	gsap.killTweensOf(obj);
	gsap.to(obj, {
		p: 1,
		duration: 0.45,
		ease: 'none',
		onUpdate() {
			const n = Math.floor(obj.p * to.length);
			el.textContent =
				to.slice(0, n) + Array.from({ length: to.length - n }, () => GLYPHS[(Math.random() * GLYPHS.length) | 0]).join('');
		},
		onComplete: () => void (el.textContent = to),
	});
}
