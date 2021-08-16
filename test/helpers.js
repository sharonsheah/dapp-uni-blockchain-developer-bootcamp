export const EVM_REVERT = 'VM Exception while processing transaction: revert';

export const tokens = (n) => {
	return web3.utils.toWei(n.toString(), "ether");
};