import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AportacionScreen } from "../screens/Aportaciones/AportacionScreen";

import React from "react";
const Stack = createNativeStackNavigator();

export function AportacionStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AportacionesStack"
        component={AportacionScreen}
        options={{ title: "Aportaciones" }}
      />
    </Stack.Navigator>
  );
}
