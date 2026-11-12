import { View, Text, Pressable, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import {apiClient} from '../../../server/src/'
const WEEKDAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

function buildMonthGrid(year: number, month: number) {
  const firstOfMonth = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const startWeekday = firstOfMonth.getDay()

  const cells: (number | null)[] = []
  for (let i = 0; i < startWeekday; i++) cells.push(null)
  for (let day = 1; day <= daysInMonth; day++) cells.push(day)
  while (cells.length % 7 !== 0) cells.push(null)

  const weeks: (number | null)[][] = []
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7))
  }
  return weeks
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const CalendarTab = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const weeks = buildMonthGrid(year, month)

  return (
    <ScrollView className="flex-1 bg-black">
      <View className="mt-3 mx-3">
        <View className="flex-row items-center justify-between px-1">
          <Pressable>
            <Ionicons name="chevron-back" size={24} color="#e5e5e5" />
          </Pressable>
          <Text className="text-white text-xl font-bold">
            {MONTH_NAMES[month]} {year}
          </Text>
          <Pressable>
            <Ionicons name="chevron-forward" size={24} color="#e5e5e5" />
          </Pressable>
        </View>

        <View className="flex-row justify-between mt-4">
          {WEEKDAY_LABELS.map((label, i) => (
            <View key={i} className="flex-1 items-center">
              <Text className="text-neutral-500 font-semibold">{label}</Text>
            </View>
          ))}
        </View>

        {weeks.map((week, weekIndex) => (
          <View key={weekIndex} className="flex-row justify-between mt-2">
            {week.map((day, dayIndex) => {
              const isToday = day === today.getDate()
              return (
                <View key={dayIndex} className="flex-1 items-center">
                  {day !== null ? (
                    <Pressable
                      className={`w-9 h-9 items-center justify-center rounded-full ${
                        isToday ? 'bg-emerald-500' : ''
                      }`}
                    >
                      <Text
                        className={
                          isToday ? 'text-black font-bold' : 'text-white'
                        }
                      >
                        {day}
                      </Text>
                    </Pressable>
                  ) : (
                    <View className="w-9 h-9" />
                  )}
                </View>
              )
            })}
          </View>
        ))}

        <View className="card mt-6">
          <Text className="text-white font-bold text-lg">Today</Text>
          <Text className="text-neutral-500 mt-1">No events yet</Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default CalendarTab
