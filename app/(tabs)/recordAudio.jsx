import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { Audio } from "expo-av";

export default function App() {
  const [recording, setRecording] = useState(null);
  const [recordings, setRecordings] = useState([]);

  async function startRecording() {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Please allow microphone access to record audio."
        );
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await newRecording.startAsync();
      setRecording(newRecording);
    } catch (error) {
      Alert.alert("Recording Error", error.message);
    }
  }

  async function stopRecording() {
    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();
      const { sound, status } = await recording.createNewLoadedSoundAsync();

      setRecordings((prevRecordings) => [
        ...prevRecordings,
        {
          sound,
          duration: formatDuration(status.durationMillis),
          file: recording.getURI(),
        },
      ]);

      setRecording(null);
    } catch (error) {
      Alert.alert("Error Stopping Recording", error.message);
    }
  }

  function formatDuration(milliseconds) {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.round((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  function playRecording(index) {
    recordings[index].sound.replayAsync();
  }

  return (
    <View style={styles.container}>
      <Button
        title={recording ? "Stop Recording" : "Start Recording"}
        onPress={recording ? stopRecording : startRecording}
      />

      {recordings.map((rec, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.text}>
            Recording #{index + 1} | {rec.duration}
          </Text>
          <Button title="Play" onPress={() => playRecording(index)} />
        </View>
      ))}

      {recordings.length > 0 && (
        <Button title="Clear Recordings" onPress={() => setRecordings([])} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  text: {
    marginRight: 10,
  },
});
