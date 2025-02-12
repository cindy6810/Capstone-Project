import React, { useRef, useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  Animated, 
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function CommentScreen({ route }) {
  const { song } = route.params;
  const navigation = useNavigation();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  const translateY = useRef(new Animated.Value(0)).current;
  const scale = translateY.interpolate({
    inputRange: [0, 300],
    outputRange: [1, 0.5],
    extrapolate: 'clamp',
  });

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      if (event.nativeEvent.translationY > 150) {
        navigation.goBack();
      } else {
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    }
  };
  
  //will set up functions here to grab data from database once set up
  //useEffect
  const handleSubmitComment = () => {
    if (comment.trim()) {
      const newComment = {
        id: Date.now().toString(),
        text: comment,
        timestamp: new Date().toISOString()
      };
      setComments([newComment, ...comments]);
      setComment('');
    }
  };

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
        <View style={styles.header}>
          <Image source={song.image} style={styles.songImage} />
          <Text style={styles.songTitle}>{song.title}</Text>
          <Text style={styles.artistName}>{song.artist}</Text>
        </View>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1}}
          keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        >
          <FlatList
            data={comments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.commentItem}>
                <Text style={styles.commentText}>{item.text}</Text>
              </View>
            )}
            style={styles.commentList}
          />

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={comment}
              onChangeText={setComment}
              placeholder="Add a comment..."
              multiline
            />
            <TouchableOpacity 
              style={styles.submitButton}
              onPress={handleSubmitComment}
            >
              <Text style={styles.submitText}>Post</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  songImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  songTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  artistName: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  commentSection: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  commentList: {
    flex: 1,
  },
  commentItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  commentText: {
    fontSize: 14,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 20,
    justifyContent: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});