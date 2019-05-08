import Amplify, { API } from 'aws-amplify';
import awsmobile from './src/aws-exports';
//This is an example code to Scan QR code//
import React, { Component } from 'react';
//import react in our code.
import { Text, TextInput, View, ScrollView, Linking, TouchableHighlight, PermissionsAndroid, Button, Platform, StyleSheet} from 'react-native';
// import all basic components
import { CameraKitCameraScreen, } from 'react-native-camera-kit';
//import CameraKitCameraScreen we are going to use.
Amplify.configure(awsmobile);
class App extends Component {
  constructor() {
    super();
    this.state = {
      //variable to hold the qr value
      qrvalue: '',
      opneScanner: false,
      apiResponse: 404,
      rackId:''
    };
  }
  handleChangeRackId = (event) => {this.setState({rackId: event});}
  async saveTest() {
    let newNote = {
      body: {
        "rackPass": "abc123",
        "devPass": "def456",
        "devId": 23,
        "status": true,
        "rackId": this.state.qrvalue
      }
    }
    const path = "/Racks/";
    // Use the API module to save the note to the database
    try {
      const Response = await API.post("RacksCRUD", path, newNote)
      console.log("response from saving note: " + apiResponse);
      this.setState({apiResponse: Response});
    } catch (e) {
      this.setState({apiResponse: e});
    }
  }
  async getTest() {
    const path = "/Racks/object/" + this.state.qrvalue;
    try {
      const apiResponse = await API.get("RacksCRUD", path);
      console.log("response from getting note: " + apiResponse);
      this.setState({apiResponse});
    } catch (e) {
    this.setState({apiResponse: e});
      console.log(e);
    }
  }
  async deleteTest() {
    const path = "/Racks/" + this.state.qrvalue;
    try {
      const apiResponse = await API.del("RacksCRUD", path);
      console.log("response from deleteing note: " + apiResponse);
      this.setState({apiResponse});
    } catch (e) {
    this.setState({apiResponse: e});
      console.log(e);
    }
  }
  onOpenlink() {
    //Function to open URL, If scanned 
    Linking.openURL(this.state.qrvalue);
    //Linking used to open the URL in any browser that you have installed
  }
  onBarcodeScan(qrvalue) {
    //called after te successful scanning of QRCode/Barcode
    this.setState({ qrvalue: qrvalue });
    this.setState({ opneScanner: false });
  }
  onOpneScanner() {
    var that =this;
    //To Start Scanning
    if(Platform.OS === 'android'){
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,{
              'title': 'SmartRack Camera Permission',
              'message': 'SmartRack App needs access to your camera '
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //If CAMERA Permission is granted
            that.setState({ qrvalue: '' });
            that.setState({ opneScanner: true });
          } else {
            alert("CAMERA permission denied");
          }
        } catch (err) {
          alert("Camera permission err",err);
          console.warn(err);
        }
      }
      //Calling the camera permission function
      requestCameraPermission();
    }else{
      that.setState({ qrvalue: '' });
      that.setState({ opneScanner: true });
    }    
  }
  render() {
    let displayModal;
    //If qrvalue is set then return this view
    if (!this.state.opneScanner) {
      return (
        <View style={styles.container}>
            <Text style={styles.heading}>Welcome to SmartRack!</Text>
            <Text style={styles.simpleText}>{this.state.qrvalue ? 'Scanned QR Code: '+this.state.qrvalue : ''}</Text>
            {this.state.qrvalue.includes("http") ? 
              <TouchableHighlight
                onPress={() => this.onOpenlink()}
                style={styles.button}>
                  <Text style={{ color: '#FFFFFF', fontSize: 12 }}>Open Link</Text>
              </TouchableHighlight>
              : null
            }
            <TouchableHighlight
              onPress={() => this.onOpneScanner()}
              style={styles.button}>
                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>Open QR Scanner</Text>
            </TouchableHighlight>
            <ScrollView >
              <Text>Response: {this.state.qrvalue} {this.state.apiResponse && JSON.stringify(this.state.apiResponse, undefined, 2)}</Text>
            </ScrollView >
            <TouchableHighlight onPress={this.saveTest.bind(this)} style={styles.button}>
                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>Save data</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.getTest.bind(this)} style={styles.button}>
                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>Get data</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.deleteTest.bind(this)} style={styles.button}>
                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>Delete data</Text>
            </TouchableHighlight>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <CameraKitCameraScreen
          showFrame={true}
          //Show/hide scan frame
          scanBarcode={true}
          //Can restrict for the QR Code only
          laserColor={'red'}
          //Color can be of your choice
          frameColor={'red'}
          //If frame is visible then frame color
          colorForScannerFrame={'black'}
          //Scanner Frame color
          onReadCode={event =>
            this.onBarcodeScan(event.nativeEvent.codeStringValue)
          }
        />
      </View>
    );
  }
}
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2c3539',
    padding: 10,
    width:300,
    marginTop:16
  },
  heading: { 
    color: 'black', 
    fontSize: 24, 
    alignSelf: 'center', 
    padding: 10, 
    marginTop: 30 
  },
  simpleText: { 
    color: 'black', 
    fontSize: 20, 
    alignSelf: 'center', 
    padding: 10, 
    marginTop: 16
  },
  textInput: {
      margin: 15,
      height: 30,
      width: 200,
      borderWidth: 1,
      color: 'green',
      fontSize: 12,
      backgroundColor: 'black'
   }
});