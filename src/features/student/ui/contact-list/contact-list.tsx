import { MaterialIcons } from '@expo/vector-icons';
import * as Contacts from 'expo-contacts';
import { useEffect, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { Text } from '~/shared/components/Text';
import { useColorScheme } from '~/shared/hooks/useColorScheme';
import { t } from '~/shared/i18n/i18n';
import { ContactListItem } from './contact-list.item';
import { CustomFlatList } from './custom-flat-list';




const useGetContacts = () => {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const response: Contacts.ContactResponse = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails, Contacts.Fields.Image, Contacts.Fields.Name],
        });

        if (response.data.length > 0) {
          setContacts(response.data);
        }
      }
      setLoading(false);
    })();
  }, []);
  return { contacts, loading };
}

const filterContacts = (contacts: Contacts.Contact[], query: string, onlyFavs: boolean) => {
  let filteredContacts = contacts;

  const lowerQuery = query.toLowerCase();
  filteredContacts = contacts.filter(contact => {
    const name = contact.name?.toLowerCase() || '';
    const emails = contact.emails?.map(email => email.email?.toLowerCase()) || [];
    return name.includes(lowerQuery) || emails.some(email => email?.includes(lowerQuery));
  });

  if (onlyFavs) {
    filteredContacts = filteredContacts.filter(contact => contact.isFavorite);
  }
 

  return filteredContacts;
}

export default function ContactList() {
  const theme  = useColorScheme();
  const { contacts, loading } = useGetContacts();
  const [filteredContacts, setFilteredContacts] = useState<Contacts.Contact[]>(contacts);
  const [query, setQuery] = useState('');
  const [onlyFavs, setOnlyFavs] = useState(false);

  useEffect(() => {
    setFilteredContacts(filterContacts(contacts, query, onlyFavs));
   }
  , [contacts, query, onlyFavs]);

  return (<CustomFlatList
    indicatorStyle={theme === 'dark' ? 'white' : 'black'}
    refreshing={loading}
    data={filteredContacts} 
    renderItem={({ item }) => <ContactListItem contact={item} />}

    HeaderComponent={
      <View className='p-4 pt-6 bg-neutral-200 dark:bg-neutral-800 flex flex-col gap-1'>
        <Text type='subtitle'>{t("contacts")}</Text>
        <Text className='opacity-70' type='small'>{t("select_contact")}</Text>
      </View>
    }

    StickyElementComponent={
      <View className='p-3 px-4 w-full flex flex-row gap-2 items-center bg-neutral-200 dark:bg-neutral-800 border-b border-neutral-500/50'>
      <MaterialIcons name="search" size={20} color={theme === 'dark' ? 'white' : 'black'} />
      <TextInput placeholder={t("search_contact")}  className='w-full placeholder:text-neutral-500 text-black dark:text-white' value={query} onChangeText={setQuery}  />
      </View>
    }
    
    TopListElementComponent={<View className='p-2 flex flex-row gap-2 items-center bg-neutral-300 dark:bg-neutral-700 pt-20'>
      
      <Pressable android_ripple={{ color: "#dddddd50" }} onPressIn={() => {
        setQuery('');
      }}>
        <Text className='rounded-lg py-1 px-3 bg-neutral-500/50'>
          {t("all")}
        </Text>
      </Pressable>
      <Pressable android_ripple={{ color: "#dddddd50" }} onPressIn={() => {
        setOnlyFavs(!onlyFavs);
      }} className='rounded-lg py-1 flex items-center gap-1 flex-row px-3 bg-neutral-500/50'>
        <MaterialIcons name="star" size={16} color={onlyFavs ? "yellow" : "gray"} />
        <Text>{t("favorites")}</Text>
       </Pressable>
      </View>
      }
  />
  );
}
      