import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Home from "../screens/Home";
//import Create from "../screens/Create";
import ListScreen from "../screens/ListScreen";

const Stack = createStackNavigator();
function Router(): JSX.Element {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      {/* <Stack.Screen name="Create" component={Create} options={{ headerShown: false }} /> */}
      <Stack.Screen name="DetailScreen" component={ListScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
export default Router;