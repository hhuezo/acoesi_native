import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { API_HOST } from "../../utils/constants";
import { styles } from "./AddSolicitudStyles";
import DateTimePicker from "@react-native-community/datetimepicker";

import {
    ALERT_TYPE,
    Dialog,
    AlertNotificationRoot,
    Toast,
  } from "react-native-alert-notification";

export function AddReciboScreen(props) {
  const id = props.route.params.id;
  const [capital, setCapital] = useState("");
  const [interes, setInteres] = useState("");
  const [numero, setNumero] = useState("");
  const [monto, setMonto] = useState("");
  const [total, setTotal] = useState("");
  const [pago, setPago] = useState("");


  //para manejo de datepicker
  const [dateFecha, setDateFecha] = useState(new Date());
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const url = `${API_HOST}/api-solicitud/AddRecibo/${id}/`;
      //console.log(url);
      const response = await fetch(url);
      const data = await response.json();

      const { capital } = data;
      const { interes } = data;
      const { solicitud } = data;
      const { solicitud_monto } = data;

      setCapital(capital);
      setInteres(interes.toFixed(2));
      setNumero(solicitud);
      setMonto(solicitud_monto);

      let total = parseFloat(capital) +  parseFloat(interes);
      setTotal(total.toFixed(2));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const showMode = () => {
    setShow(true);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateFecha;
    setShow(Platform.OS === "ios");

    setDateFecha(currentDate);
    //console.log(currentDate);
  };


  const handSendData = async () => {

    // Validar que los campos obligatorios no sean nulos
  if (!pago || pago < 0.01) {
      //alert("Por favor, completa todos los campos obligatorios.");
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: "Por favor, ingresar pago.",
        button: "Cerrar",
      });
      return;
    }

    let pago_decimal = parseFloat(pago);
    let total_decimal = parseFloat(total);

    
    if ( pago_decimal > total_decimal) {
        //alert("Por favor, completa todos los campos obligatorios.");
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: "Por favor, La cantidad ingresada es mayor que la deuda",
          button: "Cerrar",
        });
        return;
      }

    /*Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Ok",
        textBody: "Pago ingresado correctamente",
        button: "Cerrar",
      });
      return;*/

  
  };

  return (
    <ScrollView>
      <View style={styles.container}>

      <View style={styles.formControlNumber}>
          <Text style={styles.label}># SOLICITUD</Text>
          <TextInput
            style={styles.inputNumber}
            keyboardType="numeric"
            value={numero.toString()}
            editable={false}
          />
        </View>


        <Text style={styles.label}>FECHA</Text>
        <View style={styles.inputDate}>
          <TouchableOpacity onPress={showMode}>
            <TextInput
              style={styles.inputDate}
              editable={false}
              value={"   " + dateFecha.toLocaleDateString()}
            />
          </TouchableOpacity>
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

        <View style={styles.formControlNumber}>
          <Text style={styles.label}>MONTO</Text>
          <TextInput
            style={styles.inputNumber}
            keyboardType="numeric"
            value={capital}
            editable={false}
          />
        </View>


        <View style={styles.formControlNumber}>
          <Text style={styles.label}>INTERÉS</Text>
          <TextInput
            style={styles.inputNumber}
            keyboardType="numeric"
            value={interes.toString()}
            editable={false}
          />
        </View>


        <View style={styles.formControlNumber}>
          <Text style={styles.label}>TOTAL</Text>
          <TextInput
            style={styles.inputNumber}
            keyboardType="numeric"
            value={total.toString()}
            editable={false}
          />
        </View>


        <View style={styles.formControlNumber}>
          <Text style={styles.label}>PAGO</Text>
          <TextInput
            style={styles.inputNumber}
            keyboardType="numeric"
            value={pago}
            onChangeText={setPago}
          />
        </View>
        <TouchableOpacity
          style={{
            height: 50,
            backgroundColor: "#0F172A",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
          }}
          onPress={handSendData}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Enviar</Text>
        </TouchableOpacity>


      </View>

      <AlertNotificationRoot>     
    </AlertNotificationRoot>
    </ScrollView>
  );
}
