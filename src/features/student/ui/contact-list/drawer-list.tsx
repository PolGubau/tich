import { MaterialIcons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetFlashList } from "@gorhom/bottom-sheet";
import * as Contacts from "expo-contacts";
import React, { useCallback, useRef } from "react";
import { Pressable, Text } from "react-native";
import { useColorScheme } from "~/shared/hooks/useColorScheme.web";
import { t } from "~/shared/i18n/i18n";
import { useGetContacts } from "./contact-list";
import { ContactListItem } from "./contact-list.item";

type Props = {
  onSelect: (contact: Contacts.Contact) => void;
};
export const DrawerList = ({ onSelect }: Props) => {
  // hooks
  const sheetRef = useRef<BottomSheet>(null);
  const { contacts } = useGetContacts();


  const data = contacts;
 
 
 
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
    ({ item,onSelect }: {
      item: Contacts.Contact;
      onSelect: (contact: Contacts.Contact) => void;
    }) => (
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
        
        ref={sheetRef}
        style={{
          marginTop: 10,
        }}
      >
        <BottomSheetFlashList
          data={data}
          estimatedItemSize={40}
          keyExtractor={(i: Contacts.Contact) => i.id ?? i.name}
          renderItem={({item}: {item: Contacts.Contact})=>renderItem({item, onSelect})}
         />
      </BottomSheet>
    </>
  );
}; 