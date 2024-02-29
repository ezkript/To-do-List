import React, { useEffect, useState } from 'react';
import { Container, TextInput, Button, Text, Group, Center } from '@mantine/core';
import { showMe, getLists, createList } from '../api';
import { Link } from 'react-router-dom';

const TaskList = () => {
  const [userLists, setUserLists] = useState([]);
  const [newListName, setNewListName] = useState('');
  const [user, setUser] = useState("Usuario");

  useEffect(() => {
    document.title = 'Listas';
    async function fetchData() {
      try {
        const userData = await showMe();
        setUser(userData.decodedToken.name);

        const listsData = await getLists();
        setUserLists(listsData.lists);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const handleNewListNameChange = (event) => {
    setNewListName(event.target.value);
  };

  const handleAddList = async () => {
    if (newListName.trim() !== '') {
      try {
        const newList = await createList({ name: newListName.trim() });
        setUserLists([...userLists, newList]);
        setNewListName('');
        window.location.reload();
      } catch (error) {
        console.error('Error creating list:', error);
      }
    }
  };

  return (
    <Center>
      <Container size={"100vw"} mih={"100vh"} pt={30}>
        <Text size="xl" mb={16}>
          Listas de {user}
        </Text>
        <Group mb={16}>
          <TextInput
            value={newListName}
            onChange={handleNewListNameChange}
            placeholder="Nombre de la nueva lista"
            mr={8}
          />
          <Button onClick={handleAddList}>Agregar Lista</Button>
        </Group>
        <Group justify='center' align='center' maw={300}>
          {userLists.map((list, index) => (
            <Link key={index} to={`/mylists/${list._id}`}>
              <Button
                w={"300"}
                variant={'outline'}
                mb={8}
              >
                <Text truncate fw={600}>
                  {list.name}
                </Text>
              </Button>
            </Link>
          ))}
        </Group>
      </Container>
    </Center>
  );
};

export default TaskList;
