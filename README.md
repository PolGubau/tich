# 🎓 Tich – Personal Class Tracker

**Tich** is a mobile app designed for private tutors to manage, track, and organize their teaching activity in a clean, efficient way.

![Preview](./assets/images/preview.webp)

## ✨ Key Features

- 🧑‍🎓 Manage your student base with editable details and class history
- 🗓️ Log private classes with topic, notes, duration, hourly rate, and payment status
- 📊 Dashboard with key statistics and recent activity overview
- 🧭 Three-tab navigation: Dashboard, Students, and Create Class
- 🌗 Dark mode support
- 🌍 Full translations: English, Spanish, Catalan, German — all auto-selected from your device settings

## 🧩 Data Models

### 👨‍🎓 Student
- Photo
- Name
- Email
- Total number of classes
- Individual class history

### 📚 Class
- Linked student
- Topic / title
- Notes
- Duration
- Hourly rate
- Total earned
- Date and start time
- Paid status

## 🖥️ Screenshots

### 📊 Dashboard Overview

Displays global statistics:
- Total students
- Total classes
- Hours taught
- Total revenue

Also shows a chronological list of recent classes with:
- Topic
- Student (avatar + clickable name)
- Time ago (if < 1 month) or exact date
- Duration
- Hourly rate
- Description

![Dashboard](./assets/images/dashboard.webp)

---

### 🧑‍🎓 Students Tab

Filterable list of all students with:
- Profile photo
- Name
- Email
- Number of classes

Includes a button to add a new student. 
New students can be prefilled with contact details from your device's address book.

![Students](./assets/images/create_student.webp)

---

### 🔍 Student Details

Expanded student profile with:
- Contact details
- Edit / delete buttons
- Class history filtered for this student only

![Student Details](./assets/images/student_details.webp)

---

### 📝 Create Class

Form with:
- Linked student
- Topic
- Class notes
- Price per hour
- Paid status
- Duration
- Date and starting time

Includes a date-time selector for easy scheduling.

![Date Select](./assets/images/date_select.webp)

From the class details screen, you can also add the class to your device calendar.

 
---

## 🧪 Tech Stack

- React Native
- TypeScript
- Expo
- i18n with auto-detection
- Native dark mode support


---

## 📄 License

MIT


### Developer notes

This project is built with Expo and React Native.
It uses nativewind for styling, has dark mode support, and includes i18n for multiple languages (es, ca, de, en).



Prod builds guide: https://docs.expo.dev/guides/local-app-production/
Eas submit android: https://github.com/expo/fyi/blob/main/creating-google-service-account.md