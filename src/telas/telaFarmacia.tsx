import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Alert, FlatList } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useEstadoGlobal } from '../armazenamento/estadoGlobal';

type FarmaciaScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Farmacia'>;

interface Props {
  navigation: FarmaciaScreenNavigationProp;
}

export default function TelaFarmacia({ navigation }: Props) {
  const [isAdding, setIsAdding] = useState(false);
  const [nome, setNome] = useState('');
  const [dosagem, setDosagem] = useState('');
  const [forma, setForma] = useState('');
  const [estoque, setEstoque] = useState('');

  const medicamentos = useEstadoGlobal((state) => state.medicamentos);
  const addMedicamento = useEstadoGlobal((state) => state.addMedicamento);

  const handleSave = () => {
    if (!nome || !dosagem) {
      Alert.alert('Erro', 'Nome e dosagem são obrigatórios.');
      return;
    }

    if (nome.toLowerCase().includes('aspirina') || nome.toLowerCase() === 'aas') {
      Alert.alert('Atenção: Interação', 'Cuidado ao misturar com anticoagulantes!');
    }

    addMedicamento({ nome, dosagem, forma, estoque });
    setIsAdding(false);
    setNome(''); setDosagem(''); setForma(''); setEstoque('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {isAdding ? (
        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={styles.title}>Novo Medicamento</Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Nome (Ex: Losartana)</Text>
            <TextInput style={styles.input} value={nome} onChangeText={setNome} />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Dosagem (Ex: 50mg)</Text>
            <TextInput style={styles.input} value={dosagem} onChangeText={setDosagem} />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Forma (Ex: Comprimido, Xarope)</Text>
            <TextInput style={styles.input} value={forma} onChangeText={setForma} />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Quantidade em Estoque</Text>
            <TextInput style={styles.input} value={estoque} onChangeText={setEstoque} keyboardType="numeric" />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar Medicamento</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => setIsAdding(false)}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <View style={styles.listContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Farmácia</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => setIsAdding(true)}>
              <Text style={styles.addButtonText}>+ Adicionar</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={medicamentos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View>
                  <Text style={styles.cardTitle}>{item.nome}</Text>
                  <Text style={styles.cardSub}>{item.dosagem} - {item.forma}</Text>
                </View>
                <View style={styles.estoqueBadge}>
                  <Text style={styles.estoqueText}>Estoque: {item.estoque}</Text>
                </View>
              </View>
            )}
            ListEmptyComponent={<Text style={styles.empty}>Nenhum medicamento cadastrado.</Text>}
          />
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  scroll: { padding: 24, flexGrow: 1 },
  listContainer: { padding: 24, flex: 1 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#0056b3' },
  addButton: { backgroundColor: '#28a745', padding: 12, borderRadius: 8 },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  formGroup: { marginBottom: 16 },
  label: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', borderRadius: 12, padding: 16, fontSize: 18 },
  saveButton: { backgroundColor: '#0056b3', borderRadius: 12, padding: 18, alignItems: 'center', marginTop: 20 },
  saveButtonText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  cancelButton: { backgroundColor: '#6c757d', borderRadius: 12, padding: 18, alignItems: 'center', marginTop: 10 },
  cancelButtonText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 2 },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  cardSub: { fontSize: 16, color: '#666' },
  estoqueBadge: { backgroundColor: '#e0f7fa', padding: 8, borderRadius: 8 },
  estoqueText: { color: '#17a2b8', fontWeight: 'bold' },
  empty: { textAlign: 'center', color: '#666', fontSize: 16, marginTop: 40 },
  backButton: { backgroundColor: '#dc3545', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  backButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});
