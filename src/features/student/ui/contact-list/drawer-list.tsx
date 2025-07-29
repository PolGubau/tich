import { MaterialIcons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetFlashList } from "@gorhom/bottom-sheet";
import * as Contacts from "expo-contacts";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, View } from "react-native";
import { Text } from "~/shared/components/Text";
import { useColorScheme } from "~/shared/hooks/useColorScheme.web";
import { t } from "~/shared/i18n/i18n";
import { filterContacts, useGetContacts } from "./contact-list";
import { ContactListItem } from "./contact-list.item";

type Props = {
  onSelect: (contact: Contacts.Contact) => void;
};
export const DrawerList = ({ onSelect }: Props) => {
  // hooks
  const sheetRef = useRef<BottomSheet>(null);
  const { contacts } = useGetContacts();
  const [filteredContacts, setFilteredContacts] = useState<Contacts.Contact[]>(contacts);
  const [query, setQuery] = useState('');
  const [onlyFavs, setOnlyFavs] = useState(false);

  useEffect(() => {
    setFilteredContacts(filterContacts(contacts, query, onlyFavs));
  }
    , [contacts, query, onlyFavs]);


  const data = filteredContacts;



  const handleOpenPress = useCallback(() => {
    sheetRef.current?.expand();
  }, []);

  const handleOnSelect = useCallback(
    (contact: Contacts.Contact) => {
      onSelect(contact);
      sheetRef.current?.close();
    },
    [onSelect]
  );


  // render
  const renderItem = useCallback(
    ({ item }: { item: Contacts.Contact }) => (
      <ContactListItem contact={item} onSelect={handleOnSelect} />

    ),
    []
  );
  const theme = useColorScheme();
  return (
    <>
      <Pressable onPress={handleOpenPress} android_ripple={{ color: "#dddddd50" }} className='p-3 px-4 bg-neutral-400/30 flex gap-2 items-center flex-row rounded-xl w-fit'>
        <MaterialIcons name="people" size={18} color={theme === 'dark' ? 'white' : 'black'} />
        <Text>{t("prefill_with_contact")}</Text>
      </Pressable>
      <BottomSheet
        enablePanDownToClose
        index={-1}
        backgroundStyle={{ backgroundColor: theme === 'dark' ? '#1f2937' : '#f3f4f6' }}
        ref={sheetRef}
        style={{
          marginTop: 10,
        }}
      >
        <BottomSheetFlashList

          data={data}
          ListHeaderComponent={
            () => (
              <View className='p-4 pt-6 flex flex-col gap-1'>
                <Text type='subtitle'>{t("contacts")}</Text>
                <Text className='opacity-70' type='small'>{t("select_contact")}</Text>





                <View className='p-2 flex flex-row gap-2 items-centerº'>

                  <Pressable android_ripple={{ color: "#dddddd50" }} onPressIn={() => {
                    setQuery('');
                  }}>
                    <Text className='rounded-lg py-1 px-3 bg-neutral-500/20 dark:bg-neutral-500/50'>
                      {t("all")}
                    </Text>
                  </Pressable>
                  <Pressable android_ripple={{ color: "#dddddd50" }} onPressIn={() => {
                    setOnlyFavs(!onlyFavs);
                  }} className='rounded-lg py-1 flex items-center gap-1 flex-row px-3 bg-neutral-500/20 dark:bg-neutral-500/50'>
                    <MaterialIcons name="star" size={16} color={onlyFavs ? "yellow" : "gray"} />
                    <Text>{t("favorites")}</Text>
                  </Pressable>
                </View>

              </View>

            )
          }
          estimatedItemSize={40}
          keyExtractor={(i: Contacts.Contact) => i.id ?? i.name}
          renderItem={renderItem} />
      </BottomSheet>
    </>
  );
}; 