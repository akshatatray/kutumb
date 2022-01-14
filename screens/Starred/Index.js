import React, {useEffect, useState} from 'react';
import {ScrollView, RefreshControl, View, Text} from 'react-native';
import StarredList from '../../components/StarredList/Index.js';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import MMKVStorage from 'react-native-mmkv-storage';

const MMKV = new MMKVStorage.Loader().initialize();

const Starred = ({ navigation }) => {
  const size = [...Array(20).keys()];
  const [starred, setStarred] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getStarred = async () => {
    const response = await MMKV.getArrayAsync('starred');
    if (!response) {
      setIsEmpty(true);
    } else {
      setStarred(response);
      setIsEmpty(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getStarred();
      console.log('Starred');
    });
    return unsubscribe;
  }, [navigation]);

  if (isEmpty) {
    return (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={getStarred} />
        }>
        <Text style={{textTransform: 'capitalize', fontSize: 16, color: 'black'}}>
          You have no starred repositories.
        </Text>
        <Text style={{textTransform: 'capitalize', fontSize: 16, color: 'black'}}>
          Start browsing and star some!
        </Text>
      </ScrollView>
    );
  }

  if (isLoading) {
    return (
      <ScrollView>
        {size.map(i => (
          <SkeletonPlaceholder key={i}>
            <SkeletonPlaceholder.Item flexDirection="row" margin={20}>
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
          refreshing={isLoading}
          onRefresh={() => {
            setIsLoading(true);
            getStarred();
          }}
        />
      }>
      <StarredList repositories={starred} />
    </ScrollView>
  );
};

export default Starred;
