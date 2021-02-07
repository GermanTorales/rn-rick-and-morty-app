import React from "react";
import Home from "./src/Views/Home/Home";
import SingleCharacter from "./src/Views/SingleCharacter/SingleCharacter";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Dimensions } from "react-native";

/* 
Creo un stack de navegacion.
Esta funcion devuelve 2 propiedades: la vista y el navegador
*/
const Stack = createStackNavigator();

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
          options={() => ({
            title: "Rick and Morty",
            headerTitleStyle: {
              fontWeight: "bold",
              marginLeft: Dimensions.get('window').width / 4
            },
          })}
        />
        <Stack.Screen
          name="SingleCharacter"
          component={SingleCharacter}
          options={({ route }) => ({ title: "Go back" })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
