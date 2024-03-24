const createNode = async () => {
    const { createHelia } = await import('helia')
    const { unixfs } = await import('@helia/unixfs')
    const helia = await createHelia();
    const heliaFs = unixfs(helia)
    module.exports = heliaFs;
}
createNode()
