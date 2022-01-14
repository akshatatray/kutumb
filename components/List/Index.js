import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, Modal} from 'react-native';
import {Transition, Transitioning} from 'react-native-reanimated';
import Icons from 'react-native-vector-icons/Ionicons';
import MMKVStorage, {useMMKVStorage} from 'react-native-mmkv-storage';

const MMKV = new MMKVStorage.Loader().initialize();

const transition = (
  <Transition.Together>
    <Transition.In type="fade" delayMs={225} durationMs={75} />
    <Transition.Change interpolation="easeInOut" />
    <Transition.Out type="fade" durationMs={150} />
  </Transition.Together>
);

const List = ({repositories}) => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentRepo, setCurrentRepo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [starredRepos, setStarredRepos] = useMMKVStorage('starred', MMKV, []);
  const ref = useRef();

  useEffect(() => {
    MMKV.removeItem('starred');
  }, []);

  return (
    <Transitioning.View
      ref={ref}
      transition={transition}
      style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{marginBottom: 40, width: '100%'}}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.imageBox}>
                  <Image
                    style={styles.image}
                    source={{uri: currentRepo?.builtBy[0].avatar}}
                  />
                </View>
                <View style={{paddingLeft: 25}}>
                  <Text style={styles.titleStyle}>{currentRepo?.username}</Text>
                  <Text style={styles.repoStyle}>
                    {currentRepo?.repositoryName}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.cancelTextStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonStar]}
                onPress={() => {
                  setStarredRepos([...starredRepos, currentRepo]);
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textStyle}>Star Repository</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {repositories.map(
        (
          {
            rank,
            username,
            repositoryName,
            description,
            language,
            languageColor,
            totalStars,
            forks,
            builtBy,
          },
          index,
        ) => (
          <TouchableOpacity
            key={rank}
            onPress={() => {
              ref.current.animateNextTransition();
              setCurrentIndex(index === currentIndex ? null : index);
            }}
            onLongPress={() => {
              setCurrentRepo({
                rank,
                username,
                repositoryName,
                description,
                language,
                languageColor,
                totalStars,
                forks,
                builtBy,
              });
              setModalVisible(true);
            }}
            style={styles.cardContainer}
            activeOpacity={0.6}>
            <View style={{flex: 1}}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.imageBox}>
                  <Image
                    style={styles.image}
                    source={{uri: builtBy[0].avatar}}
                  />
                </View>
                <View style={{paddingLeft: 25}}>
                  <Text style={styles.titleStyle}>{username}</Text>
                  <Text style={styles.repoStyle}>{repositoryName}</Text>
                </View>
              </View>
            </View>
            {index === currentIndex && (
              <View style={{paddingLeft: 65, paddingTop: 10}}>
                <Text numberOfLines={2} style={styles.descriptionStyle}>
                  {description}
                </Text>
                <View style={styles.bottomView}>
                  {language !== null && (
                    <View style={styles.languageView}>
                      <View
                        style={[
                          styles.languageColor,
                          {backgroundColor: languageColor},
                        ]}
                      />
                      <Text style={styles.language}>{language}</Text>
                    </View>
                  )}
                  <View style={styles.languageView}>
                    <Icons
                      name="ios-star"
                      size={14}
                      color="#fcd741"
                      style={{marginRight: 6}}
                    />
                    <Text style={styles.language}>{totalStars}</Text>
                  </View>
                  <View style={styles.languageView}>
                    <Icons
                      name="ios-git-branch"
                      size={14}
                      color="#242424"
                      style={{marginRight: 6}}
                    />
                    <Text style={styles.language}>{forks}</Text>
                  </View>
                </View>
              </View>
            )}
          </TouchableOpacity>
        ),
      )}
    </Transitioning.View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    flexGrow: 1,
    borderTopWidth: 1,
    borderColor: '#ddd',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  imageBox: {
    width: 40,
    height: 40,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  titleStyle: {
    fontSize: 12,
    marginBottom: 5,
    color: '#555',
  },
  repoStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#484848',
  },
  descriptionStyle: {
    color: '#555',
  },
  bottomView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 15,
  },
  languageView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  language: {
    fontSize: 12,
    color: '#555',
    marginRight: 15,
  },
  languageColor: {
    marginRight: 6,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
    alignItems: 'center',
  },
  buttonClose: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'grey',
    marginRight: 10,
  },
  buttonStar: {
    backgroundColor: '#157ff5',
    marginLeft: 10,
  },
  cancelTextStyle: {
    color: 'grey',
    fontWeight: 'bold',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
