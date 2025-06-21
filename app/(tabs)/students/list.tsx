
import { studentListMock } from '~/features/student/__mocks__/studentList.mock';
import { StudentList } from '~/features/student/ui/student-list/student-list';
import { SafeMainLayout } from '~/shared/layouts/main-layout';
export default function StudentsScreen() {
  return (

    <SafeMainLayout>
      <StudentList students={studentListMock} />
    </SafeMainLayout>

  );
}