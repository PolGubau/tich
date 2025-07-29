import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import ContactList from '~/features/student/ui/contact-list/contact-list';
import { useColorScheme } from '~/shared/hooks/useColorScheme';

export default function Modal() {
    
  const theme = useColorScheme()
  return (<>
     <Animated.View
      entering={FadeIn}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
         <Link href={'./create'} asChild replace>
      <Pressable style={StyleSheet.absoluteFill} />
      </Link>
      <Animated.View
        entering={SlideInDown} className={"rounded-2xl w-[95%] h-[85%] overflow-hidden"}
      >
        <Link href="./create" className='absolute top-4 right-4 rounded-full p-2 z-10'>
          <MaterialIcons name="close" size={24} color={theme ? "white" : "black"} />
        </Link>


      
        <ContactList />
      </Animated.View>
    </Animated.View>
   </>
  );
}
