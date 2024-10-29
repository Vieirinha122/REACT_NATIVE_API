import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState(null);
  const [condition, setCondition] = useState('');
  const [wind, setWind] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=b3e9934cbe084986a7d00841242910&lang=pt&q=${city}`);
      setTemperature(response.data.current.temp_c);
      setCondition(response.data.current.condition.text);
      setWind(response.data.current.wind_kph);
      setHumidity(response.data.current.humidity);
      setError('');
    } catch (err) {
      setError('Cidade não encontrada. Tente novamente.');
      setTemperature(null);
      setCondition('');
      setWind(null);
      setHumidity(null);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Verifique a Temperatura</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome da cidade"
        value={city}
        onChangeText={setCity}
      />
      <TouchableOpacity style={styles.button} onPress={fetchWeather}>
        <Text style={styles.buttonText}>Buscar Temperatura</Text>
      </TouchableOpacity>
      {temperature !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.result}>Temperatura: {temperature} °C</Text>
          <Text style={styles.result}>Condição: {condition}</Text>
          <Text style={styles.result}>Vento: {wind} km/h</Text>
          <Text style={styles.result}>Umidade: {humidity} %</Text>
        </View>
      )}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#e0f7fa', // Cor de fundo suave
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#00796b', // Cor do título
  },
  input: {
    height: 50,
    borderColor: '#00796b',
    borderWidth: 2,
    borderRadius: 25,
    marginBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff', // Fundo branco para o input
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Sombra para Android
  },
  button: {
    backgroundColor: '#00796b', // Cor do botão
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 30,
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#ffffff', // Fundo branco para o resultado
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  result: {
    fontSize: 20,
    marginVertical: 5,
    color: '#333',
  },
  error: {
    color: 'red',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default WeatherApp;