const randomItem = require('random-item')
const { roadGraph } = require('./roads')

class VillageState{
    constructor(place, parcels){
        this.place = place
        this.parcels = parcels
    }

    move(destination){
        if(!Object.keys(roadGraph[this.place]).includes(destination)){
            return this
        }
        else{
            let parcels = this.parcels.map(parcel => 
                parcel.place != this.place ? parcel : { place: destination, adress: parcel.adress }

            ).filter(parcel => parcel.place != parcel.adress)

            return new VillageState(destination, parcels)
        }
    }

    static random(parcelCount = 5){
        let parcels = []

        for(let i = 0; i < parcelCount; i++){
            let adress = randomItem(Object.keys(roadGraph))
            let place = ''

            do{
                place = randomItem(Object.keys(roadGraph))
            
            } while(place == adress)

            parcels.push({ place, adress })
        }

        return new VillageState('Post Office', parcels)
    }
}

exports.VillageState = VillageState
