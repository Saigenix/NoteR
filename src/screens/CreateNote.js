import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,Image,BackHandler,Alert} from 'react-native'
import React, { useState, useEffect ,useLayoutEffect,useRef} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import { Createnote } from '../DB/DAO/NoteDAO';
import Colors from '../../assests/Colours';
const CreateNote = ({navigation, route}) => {

  
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  let handler;
  let titleRef = useRef(null);

  useLayoutEffect(() => {
    // console.log("working")
    navigation.setOptions({
  // headerShown:true,
      headerRight: () => (
        <TouchableOpacity
        onPress={onPressCreatePost}
        >
        <Image
        source={require('../../assests/save.png')}
        style={{
          width: 35,
          height: 35,
          marginRight:15
        }}
      />
      </TouchableOpacity>
      ),
    });
  }, [title, body]);
  

  const onPressCreatePost = async () => {
    if (title == '' || body == '' || title.length >=30) {
      if(title == '' || body == ''){
        alert('Please fill required fields.');
      }else{
        alert('Title is Too long');
      }
        
        return;
    }
   
    Createnote(title, body);
    navigation.navigate('Home');
    return;
   // navigation.goBack();
};
const onBackPress = () => {
    if (title == '' || body == '') {
        //console.log('back press');
        // navigation.navigate('TabNavigatorScreen');
        navigation.goBack();
        return true;

    }
   
        onPressCreatePost();
        return true;

}
useFocusEffect(
    React.useCallback(() => {
      // console.log('Screen was focused');
    titleRef.current.focus();
    // bodyRef.current.clear();
       handler = BackHandler.addEventListener('hardwareBackPress',onBackPress);
      // Do something when the screen is focused
      return () => {
        //console.log('Screen was unfocused');
        handler.remove();
        setTitle('');
        setBody('');
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );
useEffect(() => {
    handler = BackHandler.addEventListener('hardwareBackPress',onBackPress);
   
},[title,body]);

  return (
    <ScrollView style={styles.container}>
            <TextInput
                value={title}
                ref={titleRef}
                style={styles.input}
                // value={title1}
                onChangeText={(text) => {
                  setTitle(text);}}
                placeholder='Title'
                placeholderTextColor='grey'
                // autoFocus={true}
            />
            <TextInput
                style={[styles.input, styles.txt]}
                // value={body1}
                value={body}
                onChangeText={(text) => {
                  setBody(text);
                }}
                placeholder='Body'
                placeholderTextColor='grey'
                multiline={true}
                scrollEnabled={true}
            />
        </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 20,
      backgroundColor: Colors.bg ,
  },
  button: {
      borderColor: '#6200EA',
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 6,
      borderWidth: 1,
      alignItems: 'center',
  },
  buttonLabel: {
      fontSize: 16,
      color: 'white',
  },
  input: {
      marginBottom: 16,
      fontSize: 20,
      color: 'white',
      paddingLeft: 8,
      paddingRight: 8,
      paddingTop: 10,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#6200EA',
      borderRadius: 6,
  },
  txt : {
    fontSize: 19,
    height: 500,
    textAlignVertical: 'top',
    borderBottomWidth: 0,

  }
});

export default CreateNote;