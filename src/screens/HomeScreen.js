import { View, Text, Button } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../firebase'

const HomeScreen = () => {

  const { firebase } = useContext(FirebaseContext);
  const [userData, setUserData] = useState([]);

  useEffect(()=>{
    firebase.db.collection("user").onSnapshot((snapshot) =>{
      setUserData(
        snapshot.docs.map((doc) =>({
          id: doc.id,
          data: doc.data(),
        }))
      )
    })
  }, [])


  return (
    <View>
      {userData?.map(({id, data})=>(
        <Text key={id}>{data.name}</Text>
      ))}
    </View>
  )
}

export default HomeScreen