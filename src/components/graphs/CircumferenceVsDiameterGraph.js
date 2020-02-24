import React, { useEffect, useState } from 'react'
import Scatterplot from './Scatterplot'
import { getCircumferenceVsDiameterArray } from '../../services/circumferenceDiameter'
import { useFirestore } from '../../firebase/hooks'
import { globalDataCollection, globalStatsCollection } from '../../firebase/firebase'

const CircumferenceVsDiameterGraph = () => {

    const data = useFirestore(globalDataCollection)
    console.log(data, 'data')
    if(!data) return <h1>no data</h1>
    const dataArray = (data.map(point => [point.circumference, point.diameter]))

    return (
    <>
    <h1>Graph</h1>
        <Scatterplot data={dataArray} xMax={100} yMax ={100}/>
    </>
    )
}

export default CircumferenceVsDiameterGraph