import { useFirestore } from '../firebase/hooks'
import { globalDataCollection } from '../firebase/firebase'


const getCircumferenceVsDiameterArray = () => {
    const data = useFirestore(globalDataCollection)
    console.log(data)
}