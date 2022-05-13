import { View, Text, TextInput, TouchableOpacity,
     StyleSheet,
ScrollView} from 'react-native'
import React, { useState, useEffect } from 'react';
import Colors from '../../assests/Colours';



const UpNote = ({navigation, route}) => {

  const [note, setNote] = useState(route.params.note);
  const [title, setTitle] = useState(note?.title ?? '');
  const [body, setBody] = useState(note?.content ?? '');


  const onPressCreatePost = async () => {
    if (title == '' || body == '') {
        alert('Please fill required fields.');
        return;

    } 
    note.updateNote(title, body);
    navigation.goBack();
    return;
   
    // navigation.goBack();
};



  return (
    <ScrollView style={styles.container}>
            <TextInput
                style={styles.input}
                value={title}
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
            <TouchableOpacity
                delayPressIn={0}
                style={styles.button}
                onPress={onPressCreatePost}
                >
                <Text style={styles.buttonLabel}>
                    save
                </Text>
            </TouchableOpacity>
        </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 20,
      backgroundColor: Colors.bg,
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
    fontSize: 16,
    fontStyle: 'italic',
    height: 400,
    textAlignVertical: 'top',


  }
});

export default UpNote;