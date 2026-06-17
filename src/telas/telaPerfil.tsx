import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Perfil'>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

export default function ProfileScreen({ navigation }: Props) {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState<string | null>(null);
  
  const [imc, setImc] = useState<number | null>(null);
  const [imcClassification, setImcClassification] = useState('');

  const genders = ['Masculino', 'Feminino', 'Outro'];

  // IMC Calculation logic
  useEffect(() => {
    const w = parseFloat(weight.replace(',', '.'));
    const h = parseFloat(height.replace(',', '.')) / 100; // cm to meters

    if (w > 0 && h > 0) {
      const calculatedImc = w / (h * h);
      setImc(calculatedImc);

      if (calculatedImc < 18.5) {
        setImcClassification('Abaixo do peso');
      } else if (calculatedImc >= 18.5 && calculatedImc < 24.9) {
        setImcClassification('Normal');
      } else if (calculatedImc >= 25 && calculatedImc < 29.9) {
        setImcClassification('Sobrepeso');
      } else {
        setImcClassification('Obesidade');
      }
    } else {
      setImc(null);
      setImcClassification('');
    }
  }, [weight, height]);

  const handleSave = () => {
    if (!age || !weight || !height || !gender) {
      Alert.alert('Atenção', 'Preencha todos os campos do perfil.');
      return;
    }
    Alert.alert('Sucesso', 'Perfil salvo com sucesso!', [
      { text: 'OK', onPress: () => navigation.replace('Inicial') }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Meu Perfil</Text>
        <Text style={styles.subtitle}>Complete seus dados de saúde para uma experiência personalizada.</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Idade</Text>
          <TextInput
            style={styles.input}
            placeholder="Sua idade"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.formGroup, { flex: 1, marginRight: 10 }]}>
            <Text style={styles.label}>Peso (kg)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 70.5"
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
            />
          </View>
          <View style={[styles.formGroup, { flex: 1, marginLeft: 10 }]}>
            <Text style={styles.label}>Altura (cm)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 175"
              value={height}
              onChangeText={setHeight}
              keyboardType="numeric"
            />
          </View>
        </View>

        <Text style={styles.label}>Sexo</Text>
        <View style={styles.genderContainer}>
          {genders.map((g) => (
            <TouchableOpacity
              key={g}
              style={[styles.genderButton, gender === g && styles.selectedGender]}
              onPress={() => setGender(g)}
            >
              <Text style={[styles.genderText, gender === g && styles.selectedGenderText]}>{g}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {imc !== null && (
          <View style={styles.imcContainer}>
            <Text style={styles.imcTitle}>Seu IMC: {imc.toFixed(1)}</Text>
            <Text style={styles.imcClass}>{imcClassification}</Text>
          </View>
        )}

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar e Continuar</Text>
        </TouchableOpacity>
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
    padding: 24,
    flexGrow: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#17a2b8',
    marginBottom: 8,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  formGroup: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    color: '#333',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  genderButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  selectedGender: {
    borderColor: '#17a2b8',
    backgroundColor: '#e0f7fa',
  },
  genderText: {
    fontSize: 16,
    color: '#666',
  },
  selectedGenderText: {
    color: '#17a2b8',
    fontWeight: 'bold',
  },
  imcContainer: {
    backgroundColor: '#e9ecef',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 30,
  },
  imcTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  imcClass: {
    fontSize: 20,
    color: '#17a2b8',
    fontWeight: 'bold',
    marginTop: 4,
  },
  saveButton: {
    backgroundColor: '#0056b3',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 'auto',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
