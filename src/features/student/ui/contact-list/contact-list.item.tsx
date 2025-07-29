import { MaterialIcons } from '@expo/vector-icons';
import * as Contacts from 'expo-contacts';
import { Pressable, View } from 'react-native';
import Avatar from '~/shared/components/Avatar';
import { Text } from '~/shared/components/Text';
import { t } from '~/shared/i18n/i18n';

export function ContactListItem({ contact, onSelect }: { contact: Contacts.Contact, onSelect: (contact: Contacts.Contact) => void }) {

  const handleSelect = () => {
    onSelect(contact);
  };

  return (
    <Pressable onPress={handleSelect} android_ripple={{ color: "#dddddd50" }} className='p-4 flex flex-row gap-6'>
      <Avatar avatarUrl={contact.image?.uri ?? null} iconSize={26} className='w-12 h-12 aspect-square max-h-12 max-w-12' />
      <View className='flex flex-col'>
        <View className='flex flex-row gap-2 items-center'>
          <Text>{contact.name}</Text>
          {contact.isFavorite && <MaterialIcons name="star" size={14} color="yellow" />}
        </View>

        <Text type="small">{contact.emails?.[0].email ?? t("no_email")}</Text>

      </View>
    </Pressable>
  );
}
