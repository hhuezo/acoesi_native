import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SolicitudScreen } from "../screens/Solicitudes/SolicitudScreen";
import { AddSolicitudScreen } from "../screens/Solicitudes/AddSolicitudScreen";
import { EditSolicitudScreen } from "../screens/Solicitudes/EditSolicitudScreen";
import { RecibosScreen } from "../screens/Solicitudes/RecibosScreen";

const Stack = createNativeStackNavigator();

import React from "react";

export function SolicitudStack() {




  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SolicitudesStack"
        component={SolicitudScreen}
        options={{ title: "Solicitudes" }}
      />

      <Stack.Screen
        name="AddSolicitud"
        component={AddSolicitudScreen}
        options={{ title: "Agregar solicitud" }}
      />

      <Stack.Screen
        name="EditSolicitud"
        component={EditSolicitudScreen}
        options={{ title: "Solicitud",}}
      />

<Stack.Screen
        name="Recibos"
        component={RecibosScreen}
        options={{ title: "Recibos",}}
      />
    </Stack.Navigator>
  );
}
