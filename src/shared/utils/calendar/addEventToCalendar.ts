import { createEventAsync, EntityTypes, Event, getCalendarsAsync, requestCalendarPermissionsAsync } from "expo-calendar"
import { Alert } from "react-native"
import { t } from "~/shared/i18n/i18n"


type EventProps = {
  title: string,
  startDate: Date,
  endDate: Date,
  notes: string,
  url?: string
}
export const addEventToCalendar = async (props: EventProps) => {

  const { title, startDate, endDate, notes, url } = props

  try {
    const { status } = await requestCalendarPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert(t("error"), t("calendar_permission_denied"))
      return
    }



    // Get the list of calendars
    const calendars = await getCalendarsAsync(EntityTypes.EVENT)
    const defaultCalendar =
      calendars.find((calendar) => calendar.isPrimary) || calendars[0]
    if (!defaultCalendar) {
      Alert.alert(t("error"), t("calendar_not_found"))
      return
    }


    // Create the event
    const eventConfig: Omit<Partial<Event>, 'id' | 'organizer'> = {
      title,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      allDay: false,
      notes,
      creationDate: new Date().toISOString(),
      calendarId: defaultCalendar.id,
      alarms: [{
        relativeOffset: -15, // 15 minutes before the event
      }],
      url: `tich://${url}`
    }
    // console.log('eventConfig:', eventConfig)
    const eventId = await createEventAsync(defaultCalendar.id, eventConfig)
    // console.log(eventId)
    Alert.alert(t("success"), t("class_added_to_calendar"))


  } catch (error) {
    console.warn(error)
    Alert.alert(t("error"), t("calendar_add_failed"))

  }
}