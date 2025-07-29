import { View } from 'react-native';
import { useClasses } from '~/features/class/model/useClasses';
import { ClassList } from '~/features/class/ui/list/class-list';
import { useStudents } from '~/features/student/model/use-students';
import { Text } from '~/shared/components/Text';
import FeedbackMessage from '~/shared/components/ui/feedback-message';
import { t } from '~/shared/i18n/i18n';
import { MainLayout } from '~/shared/layouts/main-layout';

export default function DashboardScreen() {
  const { studentsAmount } = useStudents()
  const { totalClasses, totalHours, formattedEarnings, status, classes, reload } = useClasses()


  type DashboardItem = {
    label: string;
    value: string | number;
  };

  const dashboardItems: DashboardItem[] = [
    { label: t('students'), value: studentsAmount },
    { label: t('classes_made'), value: totalClasses },
    { label: t('hours_taught'), value: totalHours },
    { label: t('earnings'), value: formattedEarnings },
  ]

  return (
    <>

      <MainLayout className='px-0 h-full relative gap-6'>
        <FeedbackMessage />
        <View className="flex-row flex-wrap -m-2 px-2">
          {dashboardItems.map((item, idx) => (
            <View key={idx} className="w-1/2 p-2">
              <View className="bg-blue-500/20 rounded-xl p-4">
                <Text className="text-blue-500" customColor type="subtitle">{item.value}</Text>
                {status === 'loading' ? (
                  <Text className="text-gray-500">{t("loading")}</Text>
                ) : (
                  <Text className="text-gray-500 capitalize">{item.label}</Text>
                )}
              </View>
            </View>
          ))}
        </View>




        {classes.length > 0 && (
          <View className='gap-2 flex flex-col mb-48'>
            <Text className='text-xl px-4'>{t("last_classes")}</Text>
            <ClassList classes={classes} onReload={reload} isLoading={status === 'loading'} />
          </View>
        )}


        {/* <Button onPress={deleteAllClasses} title="Delete all classes" color="#f87171" /> */}
      </MainLayout>
    </>
  );
}
