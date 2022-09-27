import { View,
  Text, 
  TouchableOpacity,
  FlatList, 
  StyleSheet,
  Modal,
Image} from 'react-native'
import React, {useState,useLayoutEffect} from 'react'
import QouteCard from '../components/QouteCard'
import NotesCard  from '../components/NotesCard'
import withObservables from '@nozbe/with-observables'
import { observenotes , deleteAll } from '../DB/DAO/NoteDAO'
import Colors from '../../assests/Colours'

const Home = ({navigation, notes}) => {
 
  //console.log(notes)
  // deleteAll()
  const [modalVisible, setModalVisible] = useState(false);
  const [note, setNote] = useState(null);
  useLayoutEffect(() => {
    // console.log("working")
    navigation.setOptions({
  headerShown:true,
  headerStyle: {
    backgroundColor: Colors.PURPLE,
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
      headerRight: () => (
        <TouchableOpacity
        onPress={searchContent}
        >
        <Image
        source={require('../../assests/search.png')}
        style={{
          width: 35,
          height: 35,
          marginRight:15
        }}
      />
      </TouchableOpacity>
      ),
    });
  }, []);
 const searchContent=()=>{
  navigation.navigate('Search');
 }

// rahul seen this 

  const openNote = (note) => {

    navigation.navigate('UpdateNote', { note });
  }

  const deleteNote = (note) => {
    note.deleteNote();
    setModalVisible(!modalVisible);
  }


  const renderItem = ({item, index}) => {
    return (
      <NotesCard note={item} 
      index={index} 
      onPress={() => openNote(item)}
      onLongPress={() => {setModalVisible(true)
      setNote(item)}}
      navigation={navigation} />
    )

  }
  const _emptyComponent = () => {
    return (
        <View style={styles.nonote}>
            <Text style={{color:"white", fontSize:20}}>Click on plus + icon to make new note!</Text>
        </View>
    );
};
  return (

    <View style={{backgroundColor: Colors.bg, flex:1}}>
    <QouteCard/> 
    <FlatList
    data={notes}
    keyExtractor={(_, index) => index.toString()}
    renderItem={renderItem}
    ListEmptyComponent={_emptyComponent} /> 
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => deleteNote(note)} >
              <Text style={styles.textStyle}>Delete Note !</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>              
    </View>
    
  )
}

const styles = StyleSheet.create({
   nonote : {
     flex: 1,
     backgroundColor: Colors.bg,
     alignItems: 'center',
     justifyContent: 'center',
     fontSize: 40,
     color: 'white',

   },
   centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }


})



const enhance = withObservables([], () => ({
  notes: observenotes() ,
}));

export default enhance(Home);
