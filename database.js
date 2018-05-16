const { Database, Model } = require('mongorito');

(async() => {
    const db = new Database('localhost/relations');
    await db.connect();
    
    class Thing extends Model {}
    db.register(Thing);
    // reset things collection
    await Thing.remove({})
    
    
    const rudolf = new Thing({
        name: 'Rudolf',
        age:18,
        race: 'Firbolg',
        summary: "An 18 year old firbolg from the #[Arox Monastery] who serves the god, #[Marthammor Duin]",
        seed:true,
    })
    await rudolf.save();
    
    const arox = new Thing({
        name: 'Arox Monastery',
        age: 1700,
        location: "Mountains",
        summary: "A Monastery that serves #[Marthammor Duin]",
    })
    await arox.save();
    
    const seed = await Thing.find({'seed':true});
    console.log(seed.get());
    await db.disconnect();
})();
