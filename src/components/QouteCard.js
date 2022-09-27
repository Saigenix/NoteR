import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Colors from '../../assests/Colours';
import { captureRef } from "react-native-view-shot";
import Share from 'react-native-share';

const QouteCard = () => {
  const [qoute, setqoute] = useState('Stay Hungry, stay Foolish');
  const [loding, setloding] = useState(true);
  const qouteurl = 'https://api.quotable.io/random?maxLength=120';
  viewref = useRef();
  
  const shareimg = async () => {
      const uri = captureRef(viewref,{
        fileName:"Quote",
        format:'png',
        quality:0.7,
       // result:"base64"
      }).then(
        (uri) => {
           Share.open({url:uri}).then((res) => {
            console.log(res);
          })
          .catch((err) => {
            err && console.log(err);
          });
        },
        (error) => console.error("Oops, snapshot failed", error)
      );
    // console.log(uri)

  }

  const getqoute = async () => {
    try {
      const respornce = await fetch(qouteurl);
      const qoute = await respornce.json();
      setqoute(qoute.content);
      setloding(false);
      console.log(qoute.content);
    } catch (error) {
      console.log(error);
      setloding(true);
    }
  };

  useEffect(() => {
    getqoute();
  }, []);

  return (
    <View style={Styles.view}>
      <View style={Styles.card}  ref={viewref}>
        {loding ? (
          <View>
            <Text style={Styles.txt}>
            Stay Hungry, Stay Foolish
            </Text>
            <ActivityIndicator size="small" color="#0000ff" />
          </View>
        ) : (
          <Text style={Styles.txt}>{qoute}</Text>
        )}
        <TouchableOpacity
          onPress={() => {
            setloding(true);
            getqoute();
          }}>
          <Image
            source={require('../../assests/Vector.png')}
            style={Styles.imgreload}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={shareimg}>
          <Image
            source={require('../../assests/share.png')}
            style={Styles.imgshare}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  view: {
    //flex: 1,
    alignItems: 'center',
     width: '100%',
    //maxHeight: 250,
     backgroundColor: Colors.bg,
  },
  card: {
   // flex: 1,
    padding: 15,
    margin: 15,
    backgroundColor: Colors.bg,
    
   // maxHeight: 140,
    width: "98%",
    borderWidth:2,
    borderColor: "white",
    
  },
  txt: {
    fontSize: 20,
    color: 'white',
    padding: 2,
    alignSelf: 'center',
  },
  imgreload: {
    //flex: 1,
    top:-20,
    bottom:60,
    height: 30,
    width: 30,
    position: 'absolute',
    alignSelf: 'flex-end',
    flexWrap: 'wrap'
  },imgshare: {
    //flex: 1,
    top:-20,
    right:40,
    bottom:60,
    height: 28,
    width: 28,
    position: 'absolute',
    alignSelf: 'flex-end',
    flexWrap: 'wrap'
  },
});
export default QouteCard;
