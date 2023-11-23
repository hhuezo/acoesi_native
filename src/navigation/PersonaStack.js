import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PersonaScreen } from "../screens/Personas/PersonaScreen";

import React from "react";
const Stack = createNativeStackNavigator();

export function PersonaStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PersonaStack"
        component={PersonaScreen}
        options={{ title: "Personas" }}
      />
    </Stack.Navigator>
  );
}
