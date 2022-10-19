import { View, Text, TextInput, TouchableOpacity,
     StyleSheet,
ScrollView,Image,BackHandler, Share} from 'react-native'
import React, { useState, useEffect, useLayoutEffect,useCallback,useRef} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import Colors from '../../assests/Colours';



const UpNote = ({navigation, route}) => {

  const [note, setNote] = useState(route.params.note);
  const [title, setTitle] = useState(note?.title ?? '');
  const [body, setBody] = useState(note?.content ?? '');
  let titleRef = useRef(null);
  let handler;
  useLayoutEffect(() => {
    // console.log("working")
    navigation.setOptions({
   
   headerShown:true,
   tabBarStyle: {display: 'none'},
  //  NavbarShown:false,
   headerStyle: {
    backgroundColor: Colors.PURPLE,
   
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    color: '#fff',
   },
      headerRight: () => (
        <View style={{
        flexDirection:'row',
        justifyContent:"flex-end",
        alignItems:"center",
        }}>
        <TouchableOpacity onPress={onShare}>
        <Image
        source={require('../../assests/share.png')}
        style={{
          width: 30,
          height: 30,
          margin:5
        }}
      />
        </TouchableOpacity>
        <TouchableOpacity
        onPress={onPressCreatePost}
        >
        <Image
        source={require('../../assests/save.png')}
        style={{
          width: 35,
          height: 35,
          marginRight:8,
          marginLeft:10
        }}
      />
      </TouchableOpacity>
      </View>
      ),
    });
  }, [title, body]);
  const onShare = async () => {
    try {
      const result = Share.share({
        title:title,
        message: `${title}  ${body}  ~NoteR`
  });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const onPressCreatePost = async () => {
    if (title == '' || body == '' || title.length >=30) {
      if(title == '' || body == ''){
        alert('Please fill required fields.');
      }else{
        alert('Title is Too long');
      }
        
        return;
    }
    note.updateNote(title, body);
    navigation.goBack();
    return;
   
    // navigation.goBack();
};
const onBackPress = () => {
    if (title == '' || body == '') {
        //console.log('back press');
        navigation.navigate('home');
        // navigation.goBack();
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
                style={styles.input}
                value={title}
                ref={titleRef}
                onChangeText={(text) => setTitle(text)}
                placeholder='Title'
                placeholderTextColor='grey'
                autoFocus={true}
            />
            <TextInput
                style={[styles.input, styles.txt]}
                value={body}
                onChangeText={(text) => setBody(text)}
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
      backgroundColor: Colors.bg,
      flexGrow:1
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
      borderBottomWidth: 2,
      borderBottomColor: '#6200EA',
      borderRadius: 6,
  },
  txt : {
    // position: 'absolute',
    fontSize: 19,
    height: 500,
    // height: '100%',
    // marginTop:90,
    textAlignVertical: 'top',
    borderBottomWidth: 0,

  }
});

export default UpNote;