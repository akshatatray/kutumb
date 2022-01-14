import React, {useEffect, useState} from 'react';
import {ScrollView, RefreshControl, Text} from 'react-native';

const Trending = () => {
  const size = [...Array(20).keys()];
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRepositories = async () => {
    const response = await fetch(
      'https://gh-trending-api.herokuapp.com/repositories?language=',
    );
    const data = await response.json();
    setRepositories(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  if (loading) {
    return (
      <ScrollView>
        <Text>Loading...</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={() => {
            setLoading(true);
            fetchRepositories();
          }}
        />
      }>
      {/* <List repositories={repositories} /> */}
    </ScrollView>
  );
};

export default Trending;
