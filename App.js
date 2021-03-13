import React from "react";
import Characters from "./src/Views/Characters/Characters";
import SingleCharacter from "./src/Views/SingleCharacter/SingleCharacter";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Dimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Locations from "./src/Views/Locations/Locations";
import SingleLocation from "./src/Views/SingleLocation/SingleLocation";
import Episodes from "./src/Views/Episodes/Episodes";
import { Width } from "./src/common/generalStyles";
/* 
Creo un stack de navegacion.
Esta funcion devuelve 2 propiedades: la vista y el navegador
*/
const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Characters"
        component={Characters}
        options={() => ({
          title: "Characters",
          headerTitleStyle: {
            fontWeight: "bold",
            marginLeft: Dimensions.get("window").width / 4,
          },
        })}
      />
      <Tab.Screen name="Locations" component={Locations} />
      <Tab.Screen name="Episodes" component={Episodes} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    /* 
    Este componente es el que maneja nuestra navegacion y contiene
    el estado de la navegacion
     */
    <NavigationContainer>
      <Stack.Navigator>
        {/* 
        Con Stack.Screen defino una nueva vista.
        Esta consta de un nombre y del componente que se va a mostrar
        Se le pueden agregar opciones de personalizacion a la barra
         */}
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Rick and Morty api",
            headerStyle: {
              backgroundColor: "#22A5B2",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              paddingLeft: Width / 4
            },
          }}
        />

        <Stack.Screen
          name="SingleCharacter"
          component={SingleCharacter}
          options={({ route }) => ({ title: "Go back" })}
        />
        <Stack.Screen
          name="SingleLocation"
          component={SingleLocation}
          options={({ route }) => ({ title: "Go back" })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
