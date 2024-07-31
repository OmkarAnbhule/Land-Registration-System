const main = async () => {
    const { createHelia } = await import('helia')
    const { json } = await import('@helia/json')

    const helia = await createHelia()
    const j = json(helia)

    const myImmutableAddress = await j.add({ hello: 'world' })

    //console.log(await j.get(myImmutableAddress))
    
}
main()