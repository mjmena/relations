const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/relations');
const {Thing, Relation} = require('./models');

(async() => {
    // reset things collection
    await Thing.remove({})

    const rudolf = new Thing({
        name: 'Rudolf',
        summary: "An 18 year old firbolg from the #[Arox Monastery] who serves the god, #[Marthammor Duin]",
        attributes: [
            { name: 'age', value: 18 },
            { name: 'race', value: 'Firbolg' }
        ],
        seed: true,
    })
    await rudolf.save();

    const arox = new Thing({
        name: 'Arox Monastery',
        summary: "A Monastery that serves #[Marthammor Duin]",
        attributes: [
            { name: 'age', value: 1700 },
            { name: 'location', value: 'Arox Mountains' }
        ],
    })
    await arox.save();
    
    const marthhammor = new Thing({
        name: 'Marthammor Duin',
        summary: 'Marthammor Duin is the dwarven god who is the patron of travelers.',
        attributes: [],
    })
    await marthhammor.save();

    const grugach = new Thing({
        name: 'Grugach',
        summary: 'A socially incompetant human.',
        attributes: [],
    })
    
    await grugach.save()

    const home = new Relation({
        participants: [rudolf._id, arox._id]
    })
    
    const myreligion = new Relation({
        participants: [rudolf._id, marthhammor._id]
    })
    
    const place = new Relation({
        participants: [marthhammor._id, arox._id]
    })
    
    const friends = new Relation({
        participants: [rudolf._id, grugach._id]
    })
    
    await home.save()
    await myreligion.save()
    await place.save()
    await friends.save()
    
    mongoose.connection.close()
})();
