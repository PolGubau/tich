import { Text } from 'react-native';
import { MainLayout } from '~/shared/layouts/main-layout';

export default function DashboardScreen() {
  return (

    <MainLayout>
      <Text> 🔹 Total alumnos

        🔹 Total ganado este mes

        🔹 Horas trabajadas esta semana

        🔹 Alumnos con deudas

        🔹 Botón rápido: “Añadir clase”</Text>
    </MainLayout>

  );
}
