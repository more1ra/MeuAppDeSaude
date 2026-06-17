import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useEstadoGlobal } from '../armazenamento/estadoGlobal';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type VitalsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SinaisVitais'>;

interface Props {
  navigation: VitalsScreenNavigationProp;
}

export default function TelaSinaisVitais({ navigation }: Props) {
  const [bpm, setBpm] = useState('');
  const [glucose, setGlucose] = useState('');
  const addSinalVital = useEstadoGlobal((state) => state.addSinalVital);
  const historico = useEstadoGlobal((state) => state.sinaisVitais);

  const handleSave = () => {
    if (!bpm || !glucose) {
      Alert.alert('Erro', 'Preencha os dois campos.');
      return;
    }
    addSinalVital({ bpm, glicose: glucose });
    Alert.alert('Salvo', 'Sinais vitais registrados com sucesso!');
    setBpm('');
    setGlucose('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.title}>Sinais Vitais</Text>
          <Text style={styles.subtitle}>Registre seus batimentos e níveis de glicose recentes.</Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Batimentos por Minuto (BPM)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 75"
            keyboardType="numeric"
            value={bpm}
            onChangeText={setBpm}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Glicose (mg/dL)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 90"
            keyboardType="numeric"
            value={glucose}
            onChangeText={setGlucose}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar Dados</Text>
          </TouchableOpacity>

          <View style={styles.historyContainer}>
            <Text style={styles.historyTitle}>Histórico Recente</Text>
            {historico.length === 0 ? (
              <Text style={{color: '#666'}}>Nenhum registro ainda.</Text>
            ) : (
              historico.map((h, index) => (
                <Text key={h.id} style={{color: '#333'}}>
                  {new Date(h.data).toLocaleTimeString()}: BPM {h.bpm} - Glicose {h.glicose}
                </Text>
              ))
            )}
          </View>

          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scroll: {
    padding: 20,
    flexGrow: 1,
  },
  header: {
    marginTop: 40,
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#dc3545',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    color: '#333',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  buttonContainer: {
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#0056b3',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#28a745',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    elevation: 2,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  historyContainer: {
    marginVertical: 20,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  }
});
