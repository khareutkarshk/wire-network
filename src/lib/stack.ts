// Developer stack from data.md. Repo links verified against github.com/Wire-Network.
export const STACK = [
	{
		name: 'nodeop',
		role: 'Core Wire node service',
		detail: 'Runs a Wire node: block production, validation and the APIs your app talks to.',
		repo: 'https://github.com/Wire-Network/wire-sysio',
	},
	{
		name: 'kiod',
		role: 'Key management and transaction signing',
		detail: 'Holds keys in a local wallet daemon and signs transactions on request.',
		repo: 'https://github.com/Wire-Network/wire-sysio',
	},
	{
		name: 'clio',
		role: 'CLI for interacting with the network',
		detail: 'Query chain state, push transactions and manage accounts from the terminal.',
		repo: 'https://github.com/Wire-Network/wire-sysio',
	},
	{
		name: 'CDT',
		role: 'Contract Development Toolkit',
		detail: 'Compiles C++ smart contracts to WebAssembly for the Wire runtime.',
		repo: 'https://github.com/Wire-Network/wire-cdt',
	},
	{
		name: 'Wire Hub',
		role: 'Explorer and network management',
		detail: 'Browse blocks, accounts and transactions, and manage your presence on the network.',
		repo: null,
	},
] as const;
