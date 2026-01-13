import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { calcularLitrosPor100Km, classificarConsumo } from '../utils/calculos';

export default function Calculadora() {
  // Hook do React para guardar o valor que o utilizador escreve
  const [litros, setLitros] = useState('');
  const [km, setKm] = useState('');
  const [resultado, setResultado] = useState('');

  const handleCalcular = () => {
    // Converter strings para números
    const l = parseFloat(litros);
    const k = parseFloat(km);

    // Validação simples
    if (!l || !k || l <= 0 || k <= 0) {
      Alert.alert('Erro', 'Por favor insira valores válidos para litros e quilómetros.');
      return;
    }

    // Usar as funções de cálculo importadas
    const media = calcularLitrosPor100Km(l, k);
    const classificacao = classificarConsumo(media);

    setResultado(`Média: ${media.toFixed(1)} L/100km\nClassificação: ${classificacao}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de Consumo</Text>

      <Text style={styles.label}>Litros abastecidos:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 40"
        keyboardType="numeric"
        value={litros}
        onChangeText={setLitros}
      />

      <Text style={styles.label}>Quilómetros percorridos:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 600"
        keyboardType="numeric"
        value={km}
        onChangeText={setKm}
      />

      <Button title="Calcular Eficiência" onPress={handleCalcular} />

      {/* Mostra o resultado apenas se houver um cálculo feito */}
      {resultado ? <Text style={styles.result}>{resultado}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 16, marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
  result: { marginTop: 20, fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#2c3e50' },
});
