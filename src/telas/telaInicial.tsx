import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { FontAwesome5, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

type TelaInicialNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Inicial'>;

interface Props {
  navigation: TelaInicialNavigationProp;
}

const { width } = Dimensions.get('window');

export default function TelaInicial({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.title}>Olá, Paciente!</Text>
            <TouchableOpacity style={styles.settingsButton}>
              <Ionicons name="settings-sharp" size={28} color="#999" />
            </TouchableOpacity>
          </View>
          <Text style={styles.subtitle}>Como você está se sentindo hoje?</Text>
        </View>

        <View style={styles.grid}>
          <TouchableOpacity 
            style={[styles.card, { backgroundColor: '#0d6efd' }]} 
            onPress={() => navigation.navigate('Humor')}
            activeOpacity={0.8}
          >
            <Text style={styles.emoji}>😊</Text>
            <Text style={styles.cardText}>Humor & Atividade</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.card, { backgroundColor: '#dc3545' }]} 
            onPress={() => navigation.navigate('SinaisVitais')}
            activeOpacity={0.8}
          >
            <FontAwesome5 name="heartbeat" size={48} color="#fff" style={styles.icon} />
            <Text style={styles.cardText}>Sinais Vitais (BPM/ Glicose)</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.card, { backgroundColor: '#28a745' }]} 
            onPress={() => navigation.navigate('Lembretes')}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="clock-outline" size={54} color="#fff" style={styles.icon} />
            <Text style={styles.cardText}>Meus Lembretes</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.card, { backgroundColor: '#17a2b8' }]} 
            onPress={() => navigation.navigate('Perfil')}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="scale-bathroom" size={54} color="#fff" style={styles.icon} />
            <Text style={styles.cardText}>Ver Meu IMC</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.card, { backgroundColor: '#fd7e14' }]} 
            onPress={() => navigation.navigate('Farmacia')}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="pill" size={54} color="#fff" style={styles.icon} />
            <Text style={styles.cardText}>Farmácia</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.card, { backgroundColor: '#6f42c1' }]} 
            onPress={() => navigation.navigate('Enfermagem')}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="stethoscope" size={54} color="#fff" style={styles.icon} />
            <Text style={styles.cardText}>Enfermagem</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.card, { backgroundColor: '#28a745' }]} 
            onPress={() => navigation.navigate('EducacaoFisica')}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="run" size={54} color="#fff" style={styles.icon} />
            <Text style={styles.cardText}>Ed. Física</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.card, { backgroundColor: '#17a2b8' }]} 
            onPress={() => navigation.navigate('Psicologia')}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="brain" size={54} color="#fff" style={styles.icon} />
            <Text style={styles.cardText}>Psicologia</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.card, { backgroundColor: '#ffc107' }]} 
            onPress={() => navigation.navigate('Fisioterapia')}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="human-handsup" size={54} color="#333" style={[styles.icon, { color: '#333' }]} />
            <Text style={[styles.cardText, { color: '#333' }]}>Fisioterapia</Text>
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
    paddingBottom: 40,
    flexGrow: 1,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#333',
  },
  settingsButton: {
    backgroundColor: '#e9ecef',
    padding: 10,
    borderRadius: 30,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%', // 48% width leaves a 4% gap (half of the previous 8% gap)
    aspectRatio: 1, // Mantém o botão quadrado e se adapta a qualquer tela Android
    borderRadius: 20,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16, // Metade do espaçamento vertical também
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  emoji: {
    fontSize: 54,
    marginBottom: 12,
  },
  icon: {
    marginBottom: 12,
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
