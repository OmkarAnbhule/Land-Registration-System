// let ipfsInstance;

// async function getIPFSInstance() {
//     if (!ipfsInstance) {
//         const IPFS = await import('ipfs-core');
//         ipfsInstance = await IPFS.create();
//     }
//     return ipfsInstance;
// }

// 

let ipfsInstance;

async function getIPFSInstance() {
    const IPFS = await import('ipfs');

    // Create an IPFS client
    if (!ipfsInstance) {
        ipfsInstance = await IPFS.create()
    }
    return ipfsInstance;
}

module.exports = { getIPFSInstance };