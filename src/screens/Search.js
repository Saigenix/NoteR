import { View, Text, StyleSheet,TextInput,FlatList} from 'react-native';
import React ,{useState,useLayoutEffect,useRef,useEffect}from 'react';
import Colors from '../../assests/Colours';
import NotesCard  from '../components/NotesCard';
import withObservables from '@nozbe/with-observables';
import { observenotes} from '../DB/DAO/NoteDAO'

const Search = ({navigation , notes}) => {
const [notess,setNotes] = useState(notes)
const [FilNotes,setFillNotes] = useState(notes)
const [search,setSearch]=useState('')
let titleRef = useRef(null);


useLayoutEffect(() => {
    // console.log("working")
    navigation.setOptions({
  headerShown:true,
  title: 'Search',
  headerStyle: {
    backgroundColor: Colors.PURPLE,
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  }
    });
  }, []);
  
const openNote = (note) => {

    navigation.navigate('UpdateNote', { note });
  }
const searchFilter = (text)=>{
    if(text){
        const newData = notes.filter((item)=>{
            const itemData = ((item.title ? 
            item.title.toUpperCase():
            ''.toUpperCase()) + (item.content ? item.content.toUpperCase():''.toUpperCase()) +(item.createdAt.toString().slice(0,25)?item.createdAt.toString().slice(0,25).toUpperCase():''.toUpperCase()))
            console.log(itemData)
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) >-1;

        });
        setFillNotes(newData)
        setSearch(text)
    }else{
        setNotes(notes);
        setSearch(text)
    }

}
useEffect(()=>{
    titleRef.current.focus();
},[]);

const renderItem = ({item, index}) => {
    return (
      <NotesCard note={item} 
      index={index} 
      onPress={() => openNote(item)}
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
    <View style={styles.view}>
      <TextInput
               value={search}
                ref={titleRef}
                style={styles.input}
                // value={title1}
                onChangeText={(text) => {
                searchFilter(text);}}
                placeholder='Search'
                placeholderTextColor='grey'
                // autoFocus={true}
            />
            <FlatList
    data={FilNotes}
    keyExtractor={(_, index) => index.toString()}
    renderItem={renderItem}
    ListEmptyComponent={_emptyComponent} />
    </View>
  )
}

const styles = StyleSheet.create({
 view :{
flex:1,
backgroundColor:Colors.bg,
 },input:{
    marginBottom: 16,
      fontSize: 20,
      color: 'white',
      paddingLeft: 8,
      paddingRight: 8,
      paddingTop: 20,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#6200EA',
      borderRadius: 6,
      
      
 }


})


const enhance = withObservables([], () => ({
    notes: observenotes() ,
  }));
  
  export default enhance(Search);