import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Alert } from 'react-native';
import { useEstadoGlobal } from '../armazenamento/estadoGlobal';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type RemindersScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Lembretes'>;

interface Props {
  navigation: RemindersScreenNavigationProp;
}

const remindersData = [
  { id: '1', title: 'Tomar Água (200ml)', type: 'Água', time: '08:00', color: '#17a2b8' },
  { id: '2', title: 'Remédio Pressão', type: 'Remédio', time: '09:00', color: '#dc3545' },
  { id: '3', title: 'Alongamento', type: 'Exercício', time: '10:00', color: '#28a745' },
  { id: '4', title: 'Escovar os dentes', type: 'Higiene', time: '13:00', color: '#0056b3' },
];

export default function TelaLembretes({ navigation }: Props) {
  const lembretesData = useEstadoGlobal((state) => state.lembretes);
  const addLembrete = useEstadoGlobal((state) => state.addLembrete);

  const handleAddNovo = () => {
    // Simulando a adição de um lembrete (na prática abriria um Modal)
    addLembrete({
      title: 'Novo Lembrete Adicionado',
      type: 'Outros',
      time: '12:00',
      color: '#6f42c1'
    });
    Alert.alert('Sucesso', 'Lembrete adicionado!');
  };
  const renderItem = ({ item }: { item: typeof remindersData[0] }) => (
    <View style={styles.reminderCard}>
      <View style={[styles.colorBar, { backgroundColor: item.color }]} />
      <View style={styles.reminderContent}>
        <View>
          <Text style={styles.reminderTitle}>{item.title}</Text>
          <Text style={styles.reminderType}>{item.type}</Text>
        </View>
        <View style={styles.timeBadge}>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meus Lembretes</Text>
      </View>

      <TouchableOpacity style={styles.newButton} activeOpacity={0.8} onPress={handleAddNovo}>
        <Text style={styles.newButtonText}>+ Novo Lembrete</Text>
      </TouchableOpacity>

      <FlatList
        data={lembretesData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  newButton: {
    backgroundColor: '#0056b3',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
  },
  newButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  reminderCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    overflow: 'hidden',
  },
  colorBar: {
    width: 6,
  },
  reminderContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  reminderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  reminderType: {
    fontSize: 14,
    color: '#666',
  },
  timeBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
