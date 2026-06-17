import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useEstadoGlobal } from '../armazenamento/estadoGlobal';

type FisioterapiaNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Fisioterapia'>;

interface Props {
  navigation: FisioterapiaNavigationProp;
}

export default function TelaFisioterapia({ navigation }: Props) {
  const [nivelDor, setNivelDor] = useState('');
  const historicoDor = useEstadoGlobal((state) => state.historicoDor);
  const addRegistroDor = useEstadoGlobal((state) => state.addRegistroDor);

  const handleSaveDor = () => {
    const nivel = parseInt(nivelDor);
    if (isNaN(nivel) || nivel < 0 || nivel > 10) {
      Alert.alert('Erro', 'Por favor, insira um nível de dor válido (0 a 10).');
      return;
    }
    
    addRegistroDor({ nivel });
    Alert.alert('Salvo', 'Nível de dor registrado. Melhoras!');
    setNivelDor('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Fisioterapia</Text>
        <Text style={styles.subtitle}>Gerencie suas dores e exercícios terapêuticos.</Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Registro de Dor (EVA)</Text>
          <Text style={styles.infoText}>Mapeie a intensidade da dor hoje (0 a 10).</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Nível de 0 a 10" 
            keyboardType="numeric"
            value={nivelDor}
            onChangeText={setNivelDor}
          />
          <TouchableOpacity style={styles.actionButton} onPress={handleSaveDor}>
            <Text style={styles.actionButtonText}>Salvar Dor de Hoje</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Evolução da Dor</Text>
          {historicoDor.length === 0 ? (
            <Text style={{color: '#666'}}>Nenhum registro ainda.</Text>
          ) : (
            historicoDor.map((h) => (
              <Text key={h.id} style={{color: '#333', marginBottom: 4}}>
                {new Date(h.data).toLocaleDateString()}: Dor nível {h.nivel}
              </Text>
            ))
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Plano Terapêutico</Text>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Exercícios de Hoje</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Lembretes de Postura</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  scroll: { padding: 24, flexGrow: 1 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#ffc107', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 20 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, elevation: 2, marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  infoText: { fontSize: 16, color: '#666', marginBottom: 16 },
  input: { backgroundColor: '#f8f9fa', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 18, marginBottom: 12 },
  actionButton: { backgroundColor: '#ffc107', padding: 16, borderRadius: 12, alignItems: 'center' },
  actionButtonText: { color: '#333', fontSize: 16, fontWeight: 'bold' },
  secondaryButton: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ffc107', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 10 },
  secondaryButtonText: { color: '#333', fontSize: 16, fontWeight: 'bold' },
  backButton: { backgroundColor: '#dc3545', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 'auto' },
  backButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  historyContainer: { padding: 16, backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#eee', marginBottom: 20 },
  historyTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 }
});
