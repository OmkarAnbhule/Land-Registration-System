

let ipfsInstance;

async function getIPFSInstance() {
    if (!ipfsInstance) {
        const IPFS = await import('ipfs-core');
        ipfsInstance = await IPFS.create();
    }
    return ipfsInstance;
}

module.exports = { getIPFSInstance };
