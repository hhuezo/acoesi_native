import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SolicitudStack } from "./SolicitudStack";
import { AportacionStack } from "./AportacionStack";
import { IngresoStack } from "./IngresoStack";
import { PersonaStack } from "./PersonaStack";

import { Icon } from "react-native-elements";

const Tab = createBottomTabNavigator();

export function AppNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#0f172a",
        tabBarInactiveTintColor: "#64748b",
        tabBarIcon: ({ color, size }) =>  screenOptions(route,color,size)
         
      })}
    >
      <Tab.Screen name="Solicitudes" component={SolicitudStack} options={{title:"Solicitudes"}}  />
      <Tab.Screen name="Aportaciones" component={AportacionStack} options={{title:"Aportaciones"}}  />
      <Tab.Screen name="Ingresos" component={IngresoStack} options={{title:"Ingresos y egresos"}}  />
      <Tab.Screen name="Personas" component={PersonaStack} options={{title:"Personas"}}  />
    </Tab.Navigator>
  );
}

function screenOptions(route, color, size) {
  let iconName;
  if (route.name === "Solicitudes") {
    iconName = "file-document-outline";
  }

  if (route.name === "Aportaciones") {
    iconName = "cash";
  }

  if (route.name === "Ingresos") {
    iconName = "currency-usd";
  }

  if (route.name === "Personas") {
    iconName = "account";
  }

  return (
    <Icon type="material-community" name={iconName} color={color} size={size} />
  );
}
