import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {Transition, Transitioning} from 'react-native-reanimated';
import Icons from 'react-native-vector-icons/Ionicons';

const transition = (
  <Transition.Together>
    <Transition.In type="fade" delayMs={225} durationMs={75} />
    <Transition.Change interpolation="easeInOut" />
    <Transition.Out type="fade" durationMs={150} />
  </Transition.Together>
);

const StarredList = ({repositories}) => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const ref = useRef();

  return (
    <Transitioning.View
      ref={ref}
      transition={transition}
      style={styles.container}>
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

export default StarredList;

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
});
