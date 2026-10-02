export const WHITEPAPER_HREF =
	'https://github.com/Wire-Network/documentation/blob/master/Whitepaper/Wire%20Network%20Whitepaper.pdf';
export const GITHUB_HREF = 'https://github.com/Wire-Network';
// TODO: replace with the real early-access destination (form, Typeform, or mailto)
export const EARLY_ACCESS_HREF = '#early-access';

export const NAV = [
	{ label: 'About', href: '/#about', external: false },
	{ label: 'Developers', href: '/developers', external: false },
	{ label: 'Whitepaper', href: WHITEPAPER_HREF, external: true },
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
