// The in-site reader. It loads the latest PDF from GitHub and falls back to the bundled copy.
export const WHITEPAPER_HREF = '/whitepaper/';
export const WHITEPAPER_GITHUB_HREF =
	'https://github.com/Wire-Network/documentation/blob/master/Whitepaper/Wire%20Network%20Whitepaper.pdf';
export const WHITEPAPER_PDF_SOURCES = [
	'https://raw.githubusercontent.com/Wire-Network/documentation/master/Whitepaper/Wire%20Network%20Whitepaper.pdf',
	'/whitepaper/wire-network-whitepaper.pdf',
];
export const GITHUB_HREF = 'https://github.com/Wire-Network';
// Opens the early-access dialog (EarlyAccess.astro). Its endpoint comes from PUBLIC_EARLY_ACCESS_ENDPOINT.
export const EARLY_ACCESS_HREF = '#early-access';

export const NAV = [
	{ label: 'About', href: '/#about', external: false },
	{ label: 'Developers', href: '/developers/', external: false },
	{ label: 'Whitepaper', href: WHITEPAPER_HREF, external: false },
] as const;

// Connected chains named in data.md. Icons: Iconify "cryptocurrency" set; Hedera from simple-icons.
export const CHAINS = [
	{ name: 'Ethereum', icon: 'cryptocurrency:eth' },
	{ name: 'Solana', icon: 'cryptocurrency:sol' },
	{ name: 'Cardano', icon: 'cryptocurrency:ada' },
	{ name: 'Polkadot', icon: 'cryptocurrency:dot' },
	{ name: 'Hedera', icon: 'hedera' },
	{ name: 'BNB Chain', icon: 'cryptocurrency:bnb' },
	{ name: 'TRON', icon: 'cryptocurrency:trx' },
] as const;
