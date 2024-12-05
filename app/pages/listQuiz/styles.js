import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#412E8B",
    justifyContent: "space-between",
    padding: 20,
    height: 80,
  },
  button: {
    height: 50,
    width: 50,
  },
  body: {
    flex: 1,
    paddingTop: 40,
    display: "flex",
  },
  quizTemplate: {
    margin: 10,
    borderWidth: 1,
    backgroundColor: "#412E8B",
    alignItems: "flex-start",
    padding: 10,
  },
  quizImage: {
    width: "100%",
    borderWidth: 1,
    height: 200,
    marginBottom: 10,
    backgroundColor: "lightgrey",
  },
  title: {
    color: "white",
    fontSize: 30,
  },
  description: {
    color: "white",
    fontSize: 14,
  },
  createButton: {
    position: "absolute",
    bottom: 20,
    left: 300,
    backgroundColor: "#412E8B",
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    elevation: 5,
    zIndex: 5,
  },
});

export default styles;
