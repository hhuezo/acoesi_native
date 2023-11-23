import React, { useState } from "react";
import { View, Button, TextInput, StyleSheet } from "react-native";

export function AddSolicitudScreen() {
  const [dateFecha, setDateFecha] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateFecha;
    setShow(Platform.OS === "ios");
    setDateFecha(currentDate);
  };

  const showMode = () => {
    setShow(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.datePicker}>
        <TextInput
          style={styles.input}
          editable={false} // Esto hace que el TextInput no sea editable
          value={dateFecha.toLocaleDateString()} // Esto mostrará la fecha seleccionada en el formato local
        />
        <Button onPress={showMode} title="Selecciona la fecha" />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateFecha}
          mode={"date"}
          display="default"
          onChange={onChange}
        />
      )}
      {/* ... Resto del código ... */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  datePicker: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 10,
  },
});
