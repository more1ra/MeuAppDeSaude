import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type PsicologiaNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Psicologia'>;

interface Props {
  navigation: PsicologiaNavigationProp;
}

export default function TelaPsicologia({ navigation }: Props) {
  const handleSOS = () => {
    Alert.alert('Área de Crise', 'Ligue 188 (CVV) ou contate sua emergência cadastrada.');
  };

  const handleResponderQuestionario = (nome: string) => {
    // Mocking test response logic
    Alert.alert('Sucesso', `Suas respostas para o ${nome} foram salvas localmente e estão prontas para a triagem profissional.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Psicologia</Text>
        <Text style={styles.subtitle}>Cuide da sua saúde mental e bem-estar.</Text>

        <TouchableOpacity style={styles.sosButton} onPress={handleSOS}>
          <Text style={styles.sosButtonText}>SOS / Área de Crise</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Diário Emocional</Text>
          <Text style={styles.infoText}>O histórico de humor salvo na tela principal já é compartilhado com a psicologia.</Text>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Humor')}>
            <Text style={styles.actionButtonText}>Abrir Diário de Humor</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Questionários (Triagem)</Text>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => handleResponderQuestionario('PHQ-9')}>
            <Text style={styles.secondaryButtonText}>Responder PHQ-9 (Depressão)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => handleResponderQuestionario('GAD-7')}>
            <Text style={styles.secondaryButtonText}>Responder GAD-7 (Ansiedade)</Text>
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
  title: { fontSize: 32, fontWeight: 'bold', color: '#17a2b8', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 20 },
  sosButton: { backgroundColor: '#dc3545', padding: 20, borderRadius: 12, alignItems: 'center', marginBottom: 20, elevation: 4 },
  sosButtonText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, elevation: 2, marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  infoText: { fontSize: 16, color: '#666', marginBottom: 16 },
  actionButton: { backgroundColor: '#17a2b8', padding: 16, borderRadius: 12, alignItems: 'center' },
  actionButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  secondaryButton: { backgroundColor: '#f8f9fa', borderWidth: 1, borderColor: '#17a2b8', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 10 },
  secondaryButtonText: { color: '#17a2b8', fontSize: 16, fontWeight: 'bold' },
  backButton: { backgroundColor: '#6c757d', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 'auto' },
  backButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});
