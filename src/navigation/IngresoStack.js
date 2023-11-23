import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IngresoScreen } from "../screens/Ingresos/IngresoScreen";

import React from "react";
const Stack = createNativeStackNavigator();

export function IngresoStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="IngresoStack"
        component={IngresoScreen}
        options={{ title: "Ingresos y egresos" }}
      />
    </Stack.Navigator>
  );
}
