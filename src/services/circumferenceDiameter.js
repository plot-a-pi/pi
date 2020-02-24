import { useFirestore } from '../firebase/hooks'
import { globalDataCollection, globalStatsCollection } from '../firebase/firebase'

export const getCircumferenceVsDiameterArray = () => {
       const data = useFirestore(globalDataCollection)
        console.log(data, 'data')
        if(!data) return
        return (data.map(point => [point.circumference, point.diameter]))

}


// export const getMaxValues = () => {

// }