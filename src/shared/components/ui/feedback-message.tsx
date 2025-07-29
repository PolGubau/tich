import * as MailComposer from 'expo-mail-composer';
import React from 'react';
import { Pressable } from 'react-native';
import { t } from '~/shared/i18n/i18n';
import { Text } from '../Text';


export default function FeedbackMessage() {
  return (<Pressable onPress={() => {
    MailComposer.composeAsync({
      recipients: ['tactilweb@gmail.com'],
      subject: 'Tich Feedback',
      body: 'Please provide your feedback about Tich here...',
    });
  }}>

    <Text
      className='bg-blue-500/20 text-blue-500 text-center p-2 rounded-xl'
      type='small'
    >
      {t("feedback_message")}
    </Text>
  </Pressable>
  )
}