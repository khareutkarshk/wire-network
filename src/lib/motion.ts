import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

export const EASE = 'expo.out';
export const DUR = { ui: 0.2, reveal: 0.6, hero: 0.9 } as const;

export const prefersReducedMotion = () =>
	window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis: Lenis | null = null;

/** Smooth scroll, driven by the GSAP ticker so ScrollTrigger stays in sync. */
function initLenis() {
	lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
	lenis.on('scroll', ScrollTrigger.update);
	gsap.ticker.add((time) => lenis?.raf(time * 1000));
	gsap.ticker.lagSmoothing(0);

	// In-page anchors (nav "About", hero "Explore the Network") go through Lenis
	document.querySelectorAll<HTMLAnchorElement>('a[href^="#"], a[href^="/#"]').forEach((a) => {
		a.addEventListener('click', (e) => {
			const hash = a.getAttribute('href')!.replace(/^\//, '');
			const target = hash.length > 1 ? document.querySelector(hash) : null;
			if (!target || target instanceof HTMLDialogElement) return;
			e.preventDefault();
			lenis?.scrollTo(target as HTMLElement, { offset: -64 });
			history.replaceState(null, '', hash);
		});
	});
}

/** Fade-up for [data-reveal]; staggers children of [data-reveal-group]. */
function initReveals() {
	gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
		gsap.fromTo(
			el,
			{ opacity: 0, y: 20 },
			{
				opacity: 1,
				y: 0,
				duration: DUR.reveal,
				ease: EASE,
				delay: Number(el.dataset.revealDelay ?? 0),
				scrollTrigger: { trigger: el, start: 'top 88%', once: true },
			},
		);
	});
}

/** Line-by-line mask reveal for headings marked [data-split]. */
function initSplitHeadings() {
	gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
		SplitText.create(el, {
			type: 'lines',
			mask: 'lines',
			autoSplit: true,
			onSplit(self) {
				gsap.set(el, { visibility: 'visible' });
				return gsap.from(self.lines, {
					yPercent: 110,
					duration: DUR.hero,
					ease: EASE,
					stagger: 0.08,
					scrollTrigger: { trigger: el, start: 'top 85%', once: true },
				});
			},
		});
	});
}

export function initMotion() {
	if (prefersReducedMotion()) return;
	initLenis();
	document.fonts.ready.then(() => {
		initSplitHeadings();
		initReveals();
		ScrollTrigger.refresh();
	});
}

/** Current Lenis instance (null under reduced motion). */
export const lenisInstance = () => lenis;

export { gsap, ScrollTrigger };
