import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import { useState, useEffect } from 'react';
import api from './src/services/api'; // <--- Importamos o nosso serviço

export default function App() {
  const [loading, setLoading] = useState(true);
  const [eventos, setEventos] = useState([]);

  // Função para buscar dados ao Laravel
  async function carregarEventos() {
    try {
      setLoading(true);
      const response = await api.get('/eventos'); 
      setEventos(response.data);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
      alert("Erro de conexão! Verifica se o IP está certo e o Laravel a rodar.");
    } finally {
      setLoading(false);
    }
  }

  // <---------------- Alterado por gemini: useEffect corre assim que a App abre
  useEffect(() => {
    carregarEventos();
  }, []);

  // Componente que desenha cada "cartão" de evento
  const renderEvento = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.titulo}</Text>
      <Text style={styles.cardDate}>{item.data_hora}</Text>
      <Text style={styles.cardLocal}>📍 {item.local}</Text>
      <Text style={styles.cardStatus}>Status: {item.status}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📅 Eventos Caloirada</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{marginTop: 50}} />
      ) : (
        <FlatList
          data={eventos}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderEvento}
          // <---------------- Bónus: Puxar para atualizar (Pull to Refresh)
          onRefresh={carregarEventos}
          refreshing={loading}
          ListEmptyComponent={<Text style={styles.emptyText}>Sem eventos agendados.</Text>}
        />
      )}

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

// Estilos (tipo CSS)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginTop: 30, // Margem para não ficar em cima da barra de status
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Sombra para Android
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  cardDate: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  cardLocal: {
    fontSize: 14,
    color: '#2980b9',
    fontWeight: '600',
  },
  cardStatus: {
    fontSize: 12,
    marginTop: 5,
    textTransform: 'uppercase',
    color: '#95a5a6',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#666',
  }
});