# Meu App de Saúde (Health Tracker)

Um aplicativo moderno, acessível e *offline-first* desenvolvido em React Native e Expo, projetado para ajudar pacientes (focando também em acessibilidade para o público idoso) a acompanhar de forma autônoma o seu quadro clínico, medicamentos, sinais vitais e bem-estar geral.

## 🚀 Tecnologias e Arquitetura

- **React Native & Expo (SDK 54)**: Framework base.
- **TypeScript**: Para tipagem estática e segurança do código.
- **Zustand**: Gerenciamento de estado global focado no funcionamento offline. O app foi construído de forma que os dados sejam gravados localmente para garantir rapidez e funcionamento sem internet.
- **React Navigation**: Navegação em pilhas (Stack) com rotas modulares.

## 🛠️ O que já foi implementado

O projeto já possui sua infraestrutura visual e o fluxo de dados local (banco em memória) completamente implementados. O acesso é feito pelas credenciais simuladas de administrador (`admin` / `admin`). 

Os seguintes grandes módulos já estão funcionais, validados e conectados:

1. **Dashboard Inicial (Home)**: Com botões amplos, alto contraste e rolagem responsiva para todos os tamanhos de Android.
2. **Sinais Vitais**: Registro de BPM e Glicose com histórico exibido em tempo real.
3. **Lembretes**: Listagem interativa com opção para adicionar novos hábitos/remédios.
4. **Humor & Atividade Física**: Diário emocional com seleção de escala visual e cruzamento de níveis de atividade física.
5. **Farmácia**: Inventário local de medicamentos (Nome, dosagem, forma e estoque) com validação de interações perigosas (ex: alertas para AAS).
6. **Enfermagem**: Cadastro de Sinais Avançados (Temp, SpO2, Pressão) com alertas automáticos em caso de Febre (>37.8°C) ou Hipotermia (<35.0°C).
7. **Educação Física**: Tela para gerenciar progressos e metas de treino na semana.
8. **Psicologia**: Questionários embutidos e SOS (Área de crise com atalho para o CVV).
9. **Fisioterapia**: Registro rápido do Nível de Dor (Escala EVA de 0 a 10) e evolução.

---

<details>
<summary>📋 Ver a lista completa de Requisitos do Sistema</summary>

### Requisitos Funcionais (RF01 - RF48)

*   **RF01:** Tela de login e cadastro com e-mail ou CPF, telefone, senha.
*   **RF02:** Confirmação de cadastro por código enviado ao e-mail ou telefone (OTP).
*   **RF03:** Cadastro de perfil do paciente: idade, peso, altura, sexo.
*   **RF04:** Cálculo automático de IMC com base nos dados.
*   **RF05:** Coleta de informações médicas (diabetes, problema cardíaco, hipertensão).
*   **RF06:** Registro e histórico de BPM.
*   **RF07:** Registro e histórico de glicose (mg/dL).
*   **RF08:** Lembretes de medicamentos.
*   **RF09:** Aferição e histórico de Pressão Arterial (mmHg).
*   **RF10:** Registro diário de Humor.
*   **RF11:** Registro de Nível de Atividade Física diária.
*   **RF12:** Controle de ingestão de água.
*   **RF13:** Checklist diário de higiene básica.
*   **RF14:** Histórico completo de eventos médicos (log).
*   **RF15 a RF21 (Módulo Farmácia):** Cadastrar Medicamentos (nome, dose, etc.), Interação Medicamentosa (alertas de risco de sangramento), Gestão de Estoque Caseiro, Controle de adesão com base nos lembretes, Orientação de armazenamento, Histórico e Gerar Relatório em PDF.
*   **RF22 a RF28 (Módulo Enfermagem):** Sinais vitais aprofundados (SpO2, Temperatura corporal), Alertas automáticos ao preencher dados vitais fora de referência, Cartão de Vacinas em tabela, Registro de feridas/curativos, Lembrete de consultas, Checklist de acompanhante e Cadastro de Alergias.
*   **RF29 a RF35 (Módulo Educação Física):** Diário de treinos (descrição, tempo), Visualização de treinos na semana, Cálculo aproximado de kcal/treino, Avaliação de Percepção de Esforço, Biblioteca local de exercícios, Alerta de sedentarismo e Meta semanal.
*   **RF36 a RF42 (Módulo Psicologia):** Diário Emocional expandido, Acesso aos questionários PHQ-9 e GAD-7, Botão SOS (Contatos de crise / CVV 188), Controle do sono (horas e qualidade), Lembrete motivacional e Registro de fatores estressantes.
*   **RF43 a RF48 (Módulo Fisioterapia):** Mapa de Dor corporal (região e tipo de dor), Evolução da dor (gráfico), Exercícios terapêuticos, Lembrete de correção postural e Histórico de melhora motora funcional.

### Requisitos Não Funcionais (RNF01 - RNF14)
*   **RNF01 a RNF14:** Banco de dados seguro e offline-first, criptografia em trânsito, acessibilidade para idosos (letras maiores, auto contraste), conformidade com LGPD/HIPAA, tempo de resposta na interface, modo offline funcional e baixo peso do pacote (abaixo de 50mb).

</details>

---

## 🚧 O que ainda falta fazer (Próximos Passos)

Embora 100% da arquitetura, fluxo visual e state management estejam de pé, algumas automações reais precisam ser refinadas para entregar a aplicação final:

- [ ] **Integração Push Notifications**: Transformar os "Lembretes" armazenados no Zustand em alertas sonoros reais pelo celular (Notificações Nativas).
- [ ] **Lógica de IMC e Perfil (RF03-RF04)**: Criar a tela exata de edição de Altura e Peso para o cálculo matemático automático do IMC na tela "Ver Meu IMC".
- [ ] **Exportação de PDF (Farmácia)**: Adicionar biblioteca geradora de PDF (`expo-print`) para transformar a lista de remédios em um documento compartilhável via WhatsApp ou e-mail.
- [ ] **Questionários (PHQ-9 / GAD-7)**: Implementar as perguntas individuais da escala dentro de uma tela modal na Psicologia para somar a nota final de triagem.
- [ ] **Persistência Offline Real**: Mudar o estado `Zustand` simples para usar o middleware `persist` com `AsyncStorage` (para que os dados continuem salvos se a pessoa fechar o app pelo painel multitarefas).
- [ ] **Integração Firebase**: Caso decida sincronizar os backups na nuvem (após implementar a persistência), subir o banco offline para o Firebase Firestore de forma transparente.
