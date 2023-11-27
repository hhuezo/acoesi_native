import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Card, FAB } from "react-native-elements";
import React, { useState, useEffect } from "react";
import { API_HOST } from "../../utils/constants";
import { styles } from "./solicitudStyles";

export function RecibosScreen(props) {
  const id = props.route.params.id;
  const [recibos, setRecibos] = useState([]);
  const [noData, setNoData] = useState(false);

  const [numero, setNumero] = useState();
  const [fecha, setFecha] = useState();
  const [nombre, setNombre] = useState();
  const [cantidad, setCantidad] = useState();
  const [meses, setMeses] = useState();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const url = `${API_HOST}/api-solicitud/getRecibos/${id}/`;
      console.log(url);
      const response = await fetch(url);
      const data = await response.json();

      setRecibos(data.recibos);
      setNoData(data.recibos.length === 0);

      //data solicitud
      const { numero } = data.solicitud;
      const { fecha } = data.solicitud;
      const { nombre } = data.solicitud;
      const { monto } = data.solicitud;
      const { meses } = data.solicitud;

      setNumero(numero.toString());
      setFecha(fecha);
      setNombre(nombre);
      setCantidad(monto);
      setMeses(meses.toString());
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const goToAddRecibo = async() => {
    const { navigation } = props;
    navigation.navigate("Solicitudes", { screen: "AddRecibo", params: { id: id }, });
  }

  return (
    <View style={styles.container}>
      <Card containerStyle={[styles.borderGreen]}>
        <View style={styles.titleContainer}>
          <Text h4 style={[styles.titleColumn, styles.boldText]}>
            SOLICITUD #{numero}
          </Text>
        </View>
        <Card.Divider />

        <View style={styles.titleContainer}>
          <Text h4 style={[styles.titleColumn]}>
            {nombre}
          </Text>
        </View>
        <View style={styles.titleContainer}>
          <Text h4 style={[styles.titleColumn]}>
            CANTIDAD ${cantidad}
          </Text>
          <Text h4 style={[styles.titleColumn, styles.alignRight]}>
            FECHA: {fecha}
          </Text>
        </View>
        <Card.Divider />
      </Card>

      <View style={[styles.titleContainer, { marginLeft: 15, marginTop:15 }]}>
        <Text h4 style={[styles.titleColumn, styles.boldText]}>
          RECIBOS
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {noData ? (
          <Text style={styles.noDataText}>No se encontraron datos</Text>
        ) : (
          recibos.map((recibo, index) => (
            <TouchableOpacity key={recibo.id}>
              <Card
                key={recibo.id}
                containerStyle={[
                  styles.borderBlue,
                  index < recibos.length - 1 ? null : styles.cardWithMargin,
                ]}
              >
                <View style={styles.titleContainer}>
                  <Text h4 style={[styles.titleColumn, styles.boldText]}>
                    #{recibo.Numero}
                  </Text>
                  <Text
                    h4
                    style={[
                      styles.titleColumn,
                      styles.alignRight,
                      styles.boldText,
                    ]}
                  >
                    FECHA: {recibo.Fecha}
                  </Text>
                </View>
                <Card.Divider />

                <View style={styles.titleContainer}>
                  <Text h4 style={[styles.titleColumn, styles.boldText]}>
                    PAGO ${recibo.Pago}
                  </Text>
                  <Text h4 style={[styles.titleColumn, styles.alignRight]}>
                    SALDO PENDIENTE: ${recibo.Saldo}
                  </Text>
                </View>
                <Card.Divider />
                <View style={styles.titleContainer}>
                  <Text h4 style={[styles.titleColumn]}>
                    CAPITAL ${recibo.Capital}
                  </Text>
                  <Text h4 style={[styles.titleColumn, styles.alignRight]}>
                    INTERÉS: ${recibo.Interes}
                  </Text>
                </View>
              </Card>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

         {/* Botón flotante */}
         <FAB
        placement="right"
        color="#0F172A" // Azul celeste
        icon={{
          name: "plus",
          type: "material-community",
          size: 25,
          color: "white",
        }}
        onPress={goToAddRecibo}
        style={styles.fab}
      />
    </View>
  );
}
