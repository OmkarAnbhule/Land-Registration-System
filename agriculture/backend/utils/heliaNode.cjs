async function main() {
    const fs = require('fs')
    const IPFS = await import('ipfs-core');
    const imagesDir = './images'

    const files = fs.readdirSync(imagesDir)

    const ipfs = await IPFS.create()

    for (let file of files) {
        const buffer = fs.readFileSync(`${imagesDir}/${file}`)
        const result = await ipfs.add(buffer)
        console.log(result)
    }
}
main()