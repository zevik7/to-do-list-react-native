import React from 'react'
import { TodoListsFlatList } from '@/Components'
import { View, Text } from 'react-native'

const ArchiveContainer = () => {
  return (
    <TodoListsFlatList onlyShowArchive />
  )
}

export default ArchiveContainer
