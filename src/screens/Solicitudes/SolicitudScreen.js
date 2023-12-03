import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Card, SearchBar, FAB } from "react-native-elements";
import { API_HOST } from "../../utils/constants";
import { styles } from "./solicitudStyles";

export function SolicitudScreen(props) {
  const [solicitudes, setSolicitudes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [noData, setNoData] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [idSolicitud, setIdSolicitud] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  const fetchData = async () => {
    try {
      setIsRefreshing(true);
      const url = `${API_HOST}/api-solicitud?search=${searchText}`;
      console.log(url);
      const response = await fetch(url);
      const data = await response.json();
      setSolicitudes(data);
      setNoData(data.length === 0);
      //console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setNoData(true);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSearch = () => {
    //setIsLoading(true);
    setIsRefreshing(true);
    fetchData();
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { navigation } = props;
  const goToAddSolicitud = () => {
    //navigation.navigate('AddSolicitud');
    // primer parametro nombre de Stack y segundo nombre de screen
    navigation.navigate("Solicitudes", { screen: "AddSolicitud" });
  };

  const ShowModal = (id) => {
    console.log(id);
    setIdSolicitud(id);
    toggleModal();
  };

  const goToEditSolicitud = () => {
    setModalVisible(!modalVisible);
    let id = idSolicitud;
    setIdSolicitud(null);
    navigation.navigate("Solicitudes", {
      screen: "EditSolicitud",
      params: { id: id },
    });

  };

  const goToRecibos = () => {
    setModalVisible(!modalVisible);
    let id = idSolicitud;
    setIdSolicitud(null);
    navigation.navigate("Solicitudes", {
      screen: "Recibos",
      params: { id: id },
    });

  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Buscar..."
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
        onSubmitEditing={handleSearch}
        platform="default" // o "ios" o "android"
        cancelButtonTitle="Cancelar"
      />
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      >
        {noData ? (
          <Text style={styles.noDataText}>No se encontraron datos</Text>
        ) : (
          solicitudes.map((solicitud, index) => (
            <TouchableOpacity key={solicitud.id} onPress={() => ShowModal(solicitud.id)}>
              <Card
                key={solicitud.id}
                containerStyle={[
                  styles.cardContainer,
                  solicitud.id_estado === 1
                    ? styles.borderBlue
                    : solicitud.id_estado === 2
                    ? styles.borderBlue
                    : styles.borderGreen,
                  index < solicitudes.length - 1 ? null : styles.cardWithMargin,
                ]}
              >
                {/* Título con dos columnas */}
                <View style={styles.titleContainer}>
                  <Text h4 style={[styles.titleColumn, styles.boldText]}>
                    #{solicitud.numero}
                  </Text>
                  <Text
                    h4
                    style={[
                      styles.titleColumn,
                      styles.alignRight,
                      styles.boldText,
                    ]}
                  >
                    Fecha: {solicitud.fecha}
                  </Text>
                </View>
                <Card.Divider />
                <Text h4 style={[styles.boldText]}>
                  {solicitud.nombre}
                </Text>
                {/* Cuerpo con dos columnas */}
                <View style={styles.bodyContainer}>
                  <View style={styles.bodyColumn}>
                    <Text>CANTIDAD: ${solicitud.cantidad}</Text>
                  </View>
                  <View style={styles.bodyColumn}>
                    <Text style={styles.alignRight}> {solicitud.banco}</Text>
                  </View>
                </View>
                <View>
                  <Text h4 style={[styles.alignRight, styles.boldText]}>
                    {solicitud.estado}
                  </Text>
                  {/* Puedes agregar el valor del estado aquí */}
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
        onPress={goToAddSolicitud}
        style={styles.fab}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Puedes agregar lógica para cerrar la modal aquí
          toggleModal();
        }}
      >
        {/* Contenido de la modal */}
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Aquí puedes colocar el contenido específico de tu modal */}
            <Text h1 style={[styles.boldText, { textAlign: "center" }]}>
              Opciones
            </Text>
            <TouchableOpacity
               onPress={goToRecibos}
              style={{
                height: 50,
                backgroundColor: "#475569",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
                marginTop: 20,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "white", fontSize: 18, marginLeft: 10 }}>
                  Ver recibos
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={goToEditSolicitud}
              style={{
                height: 50,
                backgroundColor: "#475569",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
                marginTop: 20,
              }}
            >
              <Text style={{ color: "white", fontSize: 18 }}>Modificar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={toggleModal}
              style={{
                height: 50,
                backgroundColor: "#0F172A",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
                marginTop: 20,
              }}
            >
              <Text style={{ color: "white", fontSize: 18 }}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
