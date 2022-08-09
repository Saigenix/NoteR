import  React from 'react'
import {Button} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import TaskChecker from './src/screens/TaskChecker';
import CreateNote from './src/screens/CreateNote';
import UpNote from './src/screens/UpNote';
import Colors from './assests/Colours';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Search from './src/screens/Search';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{ title: 'NoteR',
    headerShown: false,
    }}>
      <HomeStack.Screen name="home" component={Home}/>
      <HomeStack.Screen name="UpdateNote" component={UpNote} />
      <HomeStack.Screen name="Search" component={Search}/>

    </HomeStack.Navigator>
  );
}

const App = () => {
  return (
    
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={{
        
         BarActiveTintColor: 'white',
         tabBarInactiveTintColor: 'gray',
         tabBarActiveBackgroundColor: Colors.GRAY,
         tabBarInactiveBackgroundColor: Colors.bg,
         tabBarShowLabel: false,
         tabBarStyle: { position: 'absolute',
         zIndex: 4,
         bottom: 0,
         padding: 0,
         margin: 0, },
        }}
      
      >
      <Tab.Screen 
      name="HomeStackScreen"
      component={HomeStackScreen}
      options={{ title: 'NoteR',
      headerShown: false,
          headerStyle: {
            backgroundColor: Colors.PURPLE,
           
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#fff',
           },
           tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ), 
  }}
       />
      <Tab.Screen
       name="CreateNote" 
       component={CreateNote} 
       options={{ 
         title: 'Create Note',
         headerStyle: {
            backgroundColor: Colors.PURPLE,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }, 
            tabBarIcon: ({ color, size }) => ( <MaterialCommunityIcons name="plus-box-outline" color={color} size={size} />),
          }}
       />
      <Tab.Screen name="Task Checker" component={TaskChecker} 

        options={{
          headerStyle: {
            backgroundColor: Colors.PURPLE,
           
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#fff',
           },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="briefcase-check" color={color} size={size} />
          ), 
        }}
      />
      </Tab.Navigator>
     </NavigationContainer> 
     );
}

export default App