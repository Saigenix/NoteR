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
import { columnName } from '@nozbe/watermelondb';

const NotesCard = ({ note, index,  onPress,onLongPress}) => {
  // console.log(item.getNote());
  // console.log(index);
  // item.updateNote('sss', 'test');
  //console.log(note.title);
  // console.log(note.createdAt);
//   const randColor = () =>  {
//     return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
// }
// const foreground = (bgcolor)=>{
//   var color = (bgcolor.charAt(0)==='#')?bgcolor.substring(1,7):bgcolor;
//   var r = parseInt(color.substring(0,2),16);
//   var g = parseInt(color.substring(2,4),16);
//   var b = parseInt(color.substring(4,6),16);
//   return(((r*0.299)+(g*0.587)+(b*0.114))>186)?"#000000":"#FFFFFF";
// }
//   let colour = randColor();
//   let upcolour = foreground(colour);

// 
  return (
    
    <View style={Styles.view}>
    <TouchableOpacity
    style={Styles.btn}
    onPress={onPress}
    onLongPress={onLongPress}
    >
    <View style={[Styles.card,{backgroundColor: Colors.bg}]}>
        <Text style={[Styles.txt,{color: 'white'}]}>{note.title}</Text>
        <Text style={[Styles.timetxt,{color: 'white'}]}>{note.createdAt.toString().slice(0,25)}</Text>
       </View>
       </TouchableOpacity>
  </View>
 
  );
  };

  const Styles = StyleSheet.create({
    view: {
     flex:1,
    },
    card: {
      borderWidth:1,
      borderColor:'white',
      marginBottom:10,
      paddingLeft:10,
      paddingBottom:3,
      
    },
    txt: {
      fontSize: 25,
      fontWeight: 'bold',
      paddingTop: 10,
      //alignSelf: 'center',
    },
    timetxt: {
      fontSize: 10,
      color: 'white',
      fontWeight: 'bold',
      paddingTop: 13,
      //paddingBottom:0
      



    },
    btn : {
      padding:0,
      margin:0,
      paddingBottom:0,
      


    }
  });


  const enhance = withObservables(['note'], ({ note }) => ({
    note, 
  }))
  
   const EnhancedPost = enhance(NotesCard)
   export default EnhancedPost
  // export default NotesCard;