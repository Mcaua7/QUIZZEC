import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: 'center',
    backgroundColor: '#412E8B'
  },
  camera:{
    height: '80%',
    width: '90%',
    borderRadius: 10,
    justifyContent:'center',
    paddingLeft: 50,
    backgroundColor: 'lightgrey',
    marginBottom: 50,
    marginTop:10,
  },
  back:{
    position: "absolute",
    top: 10,
    right: 340,
    backgroundColor: "#412E8B",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  permission:{
    flex: 1,
    paddingTop: 80,
    alignItems: 'center',
    backgroundColor: '#412E8B'
  },
  textPermission:{
    color: 'white',
    fontSize: 20
  },
  button:{
    borderWidth: 1,
    backgroundColor: 'white',
    height: 50,
    width: 300,
    borderRadius: 10,
    justifyContent: 'center',
    textAlign: 'center'
  },
  touchable:{
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: '10',
    borderWidth: 1
  },
  textButton:{
    color: '#412E8B',
    fontSize: 20,
    fontWeight: 'bold'
  }
  
});

export default styles;
