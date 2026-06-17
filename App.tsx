import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TelaInicial from './src/telas/telaInicial';
import TelaSinaisVitais from './src/telas/telaSinaisVitais';
import TelaHumor from './src/telas/telaHumor';
import TelaLembretes from './src/telas/telaLembretes';
import TelaLogin from './src/telas/telaLogin';
import TelaCadastro from './src/telas/telaCadastro';
import TelaPerfil from './src/telas/telaPerfil';
import TelaFarmacia from './src/telas/telaFarmacia';
import TelaEnfermagem from './src/telas/telaEnfermagem';
import TelaEducacaoFisica from './src/telas/telaEducacaoFisica';
import TelaPsicologia from './src/telas/telaPsicologia';
import TelaFisioterapia from './src/telas/telaFisioterapia';

export type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Perfil: undefined;
  Inicial: undefined;
  SinaisVitais: undefined;
  Humor: undefined;
  Lembretes: undefined;
  Farmacia: undefined;
  Enfermagem: undefined;
  EducacaoFisica: undefined;
  Psicologia: undefined;
  Fisioterapia: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#F8F9FA' } }}>
        <Stack.Screen name="Login" component={TelaLogin} />
        <Stack.Screen name="Cadastro" component={TelaCadastro} />
        <Stack.Screen name="Perfil" component={TelaPerfil} />
        <Stack.Screen name="Inicial" component={TelaInicial} />
        <Stack.Screen name="SinaisVitais" component={TelaSinaisVitais} />
        <Stack.Screen name="Humor" component={TelaHumor} />
        <Stack.Screen name="Lembretes" component={TelaLembretes} />
        <Stack.Screen name="Farmacia" component={TelaFarmacia} />
        <Stack.Screen name="Enfermagem" component={TelaEnfermagem} />
        <Stack.Screen name="EducacaoFisica" component={TelaEducacaoFisica} />
        <Stack.Screen name="Psicologia" component={TelaPsicologia} />
        <Stack.Screen name="Fisioterapia" component={TelaFisioterapia} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
