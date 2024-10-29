// WeatherApp.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
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
    <View style={styles.container}>
      <Text style={styles.title}>Verifique a Temperatura</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome da cidade"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Buscar Temperatura" onPress={fetchWeather} />
      {temperature !== null && (
        <View>
          <Text style={styles.result}>Temperatura: {temperature} °C</Text>
          <Text style={styles.result}>Condição: {condition}</Text>
          <Text style={styles.result}>Vento: {wind} km/h</Text>
          <Text style={styles.result}>Umidade: {humidity} %</Text>
        </View>
      )}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  result: {
    fontSize: 18,
    marginVertical: 5,
  },
  error: {
    color: 'red',
    marginTop: 20,
  },
});

export default WeatherApp;