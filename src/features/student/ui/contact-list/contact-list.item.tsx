import { MaterialIcons } from '@expo/vector-icons';
import * as Contacts from 'expo-contacts';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import Avatar from '~/shared/components/Avatar';
import { Text } from '~/shared/components/Text';

export function ContactListItem({ contact }: { contact: Contacts.Contact }) {
  const router = useRouter();

  const handleSelect = () => {
    const { name, emails } = contact;

    router.replace({
      pathname: '/(tabs)/students/create',
      params: {
        contactName: name,
        contactEmail: emails?.[0]?.email ?? '',
        avatarUrl: contact.image?.uri ?? '',
      },
    });
  };

  return (
      <Pressable  onPress={handleSelect} android_ripple={{ color: "#dddddd50" }} className='p-4 border-b flex flex-row gap-6 border-neutral-500/50 bg-neutral-300 dark:bg-neutral-700'>
      <Avatar avatarUrl={contact.image?.uri ?? null} iconSize={26} className='w-12 h-12' />
      <View className='flex flex-col'>
        <View className='flex flex-row gap-2 items-center'>
        <Text>{contact.name}</Text>
          {contact.isFavorite && <MaterialIcons name="star" size={14} color="yellow" />}
        </View>
        {contact.emails && contact.emails.length > 0 && (
          <Text customColor className='text-neutral-700 dark:text-neutral-400 w-full '>{contact.emails[0].email}</Text>
        )}
      </View>
    </Pressable>
  );
}
