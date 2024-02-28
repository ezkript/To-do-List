import React, { useEffect, useState } from 'react';
import { Container, TextInput, Button, Text, Group } from '@mantine/core';
import { showMe, getLists, createList, removeList } from '../api'; // Importar las funciones de la API
import { Link } from 'react-router-dom';

const TaskList = () => {
  const [userLists, setUserLists] = useState([]);
  const [newListName, setNewListName] = useState('');
  const [selectedList, setSelectedList] = useState(null);
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

  const handleRemoveList = async () => {
    if (selectedList !== null) {
      try {
        await removeList(userLists[selectedList]._id);
        setUserLists(userLists.filter((_, index) => index !== selectedList));
        setSelectedList(null);
      } catch (error) {
        console.error('Error removing list:', error);
      }
    }
  };

  return (
    <Container size="md">
      <Text size="xl" style={{ marginBottom: 16 }}>
        Listas de {user}
      </Text>
      <Group style={{ marginBottom: 16 }}>
        <TextInput
          value={newListName}
          onChange={handleNewListNameChange}
          placeholder="Nombre de la nueva lista"
          style={{ marginRight: 8 }}
        />
        <Button onClick={handleAddList}>Agregar Lista</Button>
        {selectedList !== null && (
          <Button onClick={handleRemoveList} color="red" style={{ marginLeft: 8 }}>
            Eliminar Lista
          </Button>
        )}
      </Group>
      <Group direction="column" spacing="xs">
        {userLists.map((list, index) => (
          <Link key={index} to={`/mylists/${list._id}`} style={{ textDecoration: "none" }}>
            <Button
              fullWidth
              variant={selectedList === index ? 'filled' : 'outline'}
              style={{ marginBottom: 8 }}
            >
              {list.name}
            </Button>
          </Link>
        ))}
      </Group>
    </Container>
  );
};

export default TaskList;
