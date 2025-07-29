import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import ContactList from '~/features/student/ui/contact-list/contact-list';
import { useColorScheme } from '~/shared/hooks/useColorScheme';
import { SafeMainLayout } from '~/shared/layouts/main-layout';

export default function Modal() {
    
  const theme = useColorScheme()
  return (<SafeMainLayout>
    <Animated.View
      className={" flex-1"}
      entering={FadeIn}
     
    >
 
      <Animated.View
        entering={SlideInDown} className={"rounded-2xl w-full h-full overflow-hidden"}
      >
        <Link href="./create" className='absolute top-4 right-4 rounded-full p-2 z-10'>
          <MaterialIcons name="close" size={24} color={theme==="dark" ? "white" : "black"} />
        </Link>


      
        <ContactList />
      </Animated.View>
     </Animated.View>
   </SafeMainLayout>
  );
}
