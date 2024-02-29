import React, { useState } from 'react';
import { Container, Text, Paper, Group, Checkbox, Badge, Title, Button, TextInput, Flex, Modal, Center } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { createTask, getListById, getTasks, removeList, removeTask, toggleTask } from '../api';

const TaskPage = () => {
  const { listId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [listName, setListName] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);

  const handleTitleChange = (event) => setNewTaskTitle(event.target.value);
  const handleDescriptionChange = (event) => setNewTaskDescription(event.target.value);

  React.useEffect(() => {
    async function fetchTasks() {
      document.title = "Tareas";
      try {
        const tasksData = await getTasks(listId);
        const getList = await getListById(listId);
        setListName(getList.list.name)
        document.title = `Tareas - ${getList.list.name}`;
        setTasks(tasksData.tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }

    fetchTasks();
  }, [listId]);

  const handleToggleTask = async (taskId) => {
    try {
      await toggleTask(taskId);
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
      await removeTask(taskId, listId);
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
      };

      await createTask(listId, data);
      const tasksData = await getTasks(listId);
      setTasks(tasksData.tasks);
    } catch (error) {
      console.error('Error creating task: ', error);
    }
  };

  const handleRemoveList = async (id) => {
    try {
      tasks.map(async (task) => await removeTask(task._id, id));
      removeList(id).then((response)=>window.location.href="/mylists");
    } catch (error) {
      console.error('Error deleting list: ', error);
    }
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };
  const handlePaperClick = () => {
    setShowTaskModal(true);
  }
  
  return (
    <Container miw={"100vw"} justify='center' align='center'>
      <Group 
        maw={"60vw"}
        justify="center"
        align="center"
        wrap='nowrap'>
        <Button onClick={() => handleRemoveList(listId)}  w="15%" color="red" variant="outline">
          Eliminar lista
        </Button>
        <Title order={1} pl={16} w="85%" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          Lista: {listName}
        </Title>
      </Group>
      <Group justify='center' align='center' maw={"60vw"}>
        <Group wrap="nowrap" miw={'100%'} display={'flex'} align='flex-end'>
          <TextInput label="Tarea" value={newTaskTitle} onChange={handleTitleChange} miw={"20vw"}/>
          <TextInput label="Descripción" value={newTaskDescription} onChange={handleDescriptionChange} miw={"20vw"}/>
          <Button onClick={handleAddTask} variant="outline" miw={"18vw"}>
            Agregar Tarea
          </Button>
        </Group>
        {tasks.map((task, index) => (
          <Group key={index} align="center" mb={24} miw={"100%"} maw='60vw' wrap={'nowrap'} onClick={() => handleTaskClick(task)}>
            <Checkbox checked={task.done} onChange={() => handleToggleTask(task._id)} color="teal" maw={"15%"} />
            <Badge color={task.done ? 'teal' : 'gray'} style={{ minWidth: 100, marginLeft: 16, flexShrink: 0 }}>
              {task.done ? 'Completado' : 'Pendiente'}
            </Badge>
            <Paper shadow="lg" onClick={()=> handlePaperClick()} style={{ background: task.done ? "#228be6" : "white", border: "#228be6 solid 1px", marginLeft: 16, flex: 1, minWidth: 0 }}>
              <Flex direction="column" gap={8} px={10} py={5}>
                <Text ta={'left'} truncate fw={700} style={{ color: task.done ? 'white' : 'black' }}>
                  {task.title}
                </Text>
                <Text ta={'left'} truncate style={{ color: task.done ? 'white' : 'black' }}>
                  {task.description}
                </Text>
              </Flex>
            </Paper>
            <Button onClick={() => handleRemoveTask(task._id)} ml={16} maw='10%' color="red" variant="outline" style={{ flexShrink: 0 }}>
              Eliminar
            </Button>
          </Group>
        ))}
      </Group>
      <Modal opened={showTaskModal} onClose={() => setShowTaskModal(false)} size="md" title="Detalles">
        <Center style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <Flex direction="column" justify={'center'} align={"center"} style={{ maxWidth: '80vw' }}>
            <Text fw={700} ta={'left'} style={{ wordBreak: 'break-word' }}>{selectedTask && selectedTask.title}</Text>
            <Text ta={"left"} style={{ wordBreak: 'break-word' }}>{selectedTask && selectedTask.description}</Text>
          </Flex>
        </Center>
      </Modal>
    </Container>
  );
};

export default TaskPage;
