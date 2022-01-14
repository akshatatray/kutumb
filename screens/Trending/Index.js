import React, {useEffect, useState} from 'react';
import {ScrollView, RefreshControl, Text} from 'react-native';
import List from '../../components/List/Index.js';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

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
        {size.map(i => (
          <SkeletonPlaceholder key={i}>
            <SkeletonPlaceholder.Item flexDirection="row" padding={20}>
              <SkeletonPlaceholder.Item
                width={40}
                height={40}
                borderRadius={20}
              />
              <SkeletonPlaceholder.Item marginLeft={20}>
                <SkeletonPlaceholder.Item
                  width={100}
                  height={14}
                  borderRadius={4}
                  marginBottom={5}
                />
                <SkeletonPlaceholder.Item
                  marginTop={6}
                  width={200}
                  height={16}
                  borderRadius={4}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        ))}
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
      <List repositories={repositories} />
    </ScrollView>
  );
};

export default Trending;
