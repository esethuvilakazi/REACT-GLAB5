import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function App() {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (taskText.trim() === "") return;
    const newTask = { id: Date.now().toString(), text: taskText, done: false };
    setTasks([...tasks, newTask]);
    setTaskText("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter new task"
          value={taskText}
          onChangeText={setTaskText}
        />
        <TouchableOpacity style={styles.addBtn} onPress={addTask}>
          <Text>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => toggleTask(item.id)}
            style={styles.taskItem}
          >
            <TouchableOpacity onPress={() => toggleTask(item.id)}>
              <Text style={[styles.taskText, item.done && styles.taskDone]}>
                {item.text}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.delete}>X</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  addBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
    width: 50,
    color: "white",
    borderRadius: 5,
  },
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 8,
    marginRight: 5,
    height: 50,
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    borderColor: "black",
    borderWidth: 1,
    height: 50,
    display: "flex",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
  },
  taskText: {
    fontSize: 16,
  },
  taskDone: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  delete: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    paddingHorizontal: 9,
    paddingVertical: 5,
    backgroundColor: "red",
    borderRadius: 5,
  },
});
