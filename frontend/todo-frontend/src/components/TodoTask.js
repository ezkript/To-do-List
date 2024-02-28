import React from 'react';
import { Container, Text, Paper, Group, Checkbox, Badge, Title, Button, TextInput } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { createTask, getListById, getTasks, removeList, removeTask, toggleTask } from '../api'; // Importar las funciones necesarias desde el archivo de integraciones

const TaskPage = () => {
  const { listId } = useParams();
  const [tasks, setTasks] = React.useState([]);
  const [newTaskTitle, setNewTaskTitle] = React.useState("");
  const [newTaskDescription, setNewTaskDescription] = React.useState("");
  const [listName, setListName] = React.useState("")
  const handleTitleChange = (event) => setNewTaskTitle(event.target.value);
  const handleDescriptionChange = (event) => setNewTaskDescription(event.target.value);

  React.useEffect(() => {
    async function fetchTasks() {
      document.title = "Tareas";
      try {
        const tasksData = await getTasks(listId);
        const getList = await getListById(listId);
        setListName(getList.list.name)
        document.title = "Tareas" + ` - ${getList.list.name}`;
        setTasks(tasksData.tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }

    fetchTasks();
  }, [listId]);

  const handleToggleTask = async (taskId) => {
    try {
      // Hacer toggle a la tarea en la API
      await toggleTask(taskId);
      // Actualizar la lista de tareas para reflejar el cambio localmente
      const updatedTasks = tasks.map((task) =>
        task._id === taskId ? { ...task, done: !task.done } : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const handleRemoveTask = async (taskId) => {
    try {
      // Eliminar la tarea en la API
      await removeTask(taskId, listId);
      // Actualizar la lista de tareas eliminando la tarea eliminada
      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error removing task:', error);
    }
  };

  const handleAddTask = async () => {
    try {
        const data = {
            title: newTaskTitle,
            description: newTaskDescription,
        }

        await createTask(listId, data);
        const tasksData = await getTasks(listId);
        setTasks(tasksData.tasks);
    } catch (error) {
        console.error('Error creating task: ', error);
    }
  } 

  const handleRemoveList = async (id) => {
    try {
        tasks.map(async (task) => await removeTask(task._id, id));
        removeList(id).then((response)=>window.location.href="/mylists");
    } catch (error) {
        console.error('Error deleting list: ', error);
    }
  }

  return (
    <Container size="md">
      <Title order={1} style={{ marginBottom: 16 }}>
        Lista: {listName}
      </Title>
      <Button onClick={() => handleRemoveList(listId)} style={{ marginLeft: 16 }} color="red" variant="outline">
        Eliminar lista
      </Button>
      <Group direction="column" spacing="xl">
        <Group align="center">
          <TextInput label="Título" value={newTaskTitle} onChange={handleTitleChange} style={{ marginRight: 16 }} />
          <TextInput label="Descripción" value={newTaskDescription} onChange={handleDescriptionChange} style={{ marginRight: 16 }} />
          <Button onClick={handleAddTask} variant="outline">
            Agregar Tarea
          </Button>
        </Group>
        {tasks.map((task, index) => (
          <Group key={index} align="center" style={{ marginBottom: 24 }}>
            <Checkbox checked={task.done} onChange={() => handleToggleTask(task._id)} color="teal" />
            <Badge color={task.done ? 'teal' : 'gray'} style={{ minWidth: 100, marginLeft: 16 }}>
              {task.done ? 'Completado' : 'Pendiente'}
            </Badge>
            <Paper padding="xl" shadow="lg" style={{ background: task.done ? "#228be6" : "white", border: "grey solid 1px", marginLeft: 16, flex: 1 }}>
              <Group direction="column" spacing="md">
                <Text size="lg" weight={600} px={10} py={5} style={{ color: task.done ? 'white' : 'black', fontWeight: "bold" }}>
                  {task.title}
                </Text>
                <Text size="lg" style={{ color: task.done ? 'white' : 'black' }}>
                  {task.description}
                </Text>
              </Group>
            </Paper>
            <Button onClick={() => handleRemoveTask(task._id)} style={{ marginLeft: 16 }} color="red" variant="outline">
              Eliminar
            </Button>
          </Group>
        ))}
      </Group>
    </Container>
  );
};

export default TaskPage;