import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    const found = tasks.find(item => item.title === newTaskTitle);

    if (found) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome',[{text: 'Ok'}]);
      return;
    }

    setTasks(oldTasks => [...oldTasks, task]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }));
    
    const foundTask = updatedTasks.find(item => item.id === id);
    
    if (!foundTask)
      return;

    foundTask.done = !foundTask.done;
    setTasks(updatedTasks);
        
  }

  function handleRemoveTask(id: number) {
    setTasks(oldTasks => oldTasks.filter(item => item.id != id));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})

