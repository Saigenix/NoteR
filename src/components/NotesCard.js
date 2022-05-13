import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../../assests/Colours';
import withObservables from '@nozbe/with-observables';

const NotesCard = ({ note, index,  onPress,onLongPress}) => {
  // console.log(item.getNote());
  // console.log(index);
  // item.updateNote('sss', 'test');
  console.log(note.title);
  console.log(note.createdAt);
  


  return (
    
    <View style={Styles.view}>
    <TouchableOpacity
    style={Styles.btn}
    onPress={onPress}
    onLongPress={onLongPress}
    >
    <View style={Styles.card}>
        <Text style={Styles.txt}>{note.title}</Text>
        <Text style={Styles.timetxt}>{note.createdAt.toString().slice(0,25)}</Text>
       </View>
       </TouchableOpacity>
  </View>
 
  );
  };

  const Styles = StyleSheet.create({
    view: {
     flex: 1,
     alignItems: 'center',
     width: "100%",
     height: 140,
     backgroundColor: Colors.bg,
    },
    card: {
      flex: 1,
      padding: 15,
      margin:15,
      backgroundColor: Colors.bg,
      maxHeight: 100,
      width: "90%",
      borderWidth:2,
      borderRadius:10,
      borderColor: "white",
      
    },
    txt: {
      fontSize: 25,
      color: 'white',
      fontWeight: 'bold',
      paddingTop: 10,
      alignSelf: 'center',
    },
    timetxt: {
      fontSize: 10,
      color: 'white',
      fontWeight: 'bold',
      paddingTop: 13,



    },
    btn : {
      height: "100%",
      width: "100%",


    }
  });


  const enhance = withObservables(['note'], ({ note }) => ({
    note, 
  }))
  
   const EnhancedPost = enhance(NotesCard)
   export default EnhancedPost
  // export default NotesCard;