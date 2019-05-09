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
      apiResponse: '',
      OTP:'',
      temp: ''
    };
  }
  handleChangeOTP = (event) => {this.setState({OTP: event});}
  async lockBike() {
    let newNote = {
      body: {
        "devId": 4,
        "devPass": this.state.OTP,
        "status": true,
        "rackId": Number(this.state.qrvalue)
      }
    }
    const path = "/BikeRacks/";
    // Use the API module to save the note to the database
    this.setState({apiResponse: "hi"});
    try {
      const Response = await API.put("RFunc", path, newNote)
      this.setState({apiResponse: Response});
    } catch (e) {
      this.setState({apiResponse: e.response});
    }
  } 
  async unlockBike() {
    let newNote = {
      body: {
        "status": false,
        "rackId": Number(this.state.qrvalue)
      }
    }
    const path = "/BikeRacks/";
    try {
      const Response = await API.put("RFunc", path, newNote)
      this.setState({apiResponse: Response});
    } catch (e) {
      this.setState({apiResponse: e});
      console.log(e);
    }
  }
  async generateOTP() {
    const path = "/BikeRacks/object/" + this.state.qrvalue;
    this.setState({apiResponse: "Check"});
    try {
      const apiResponse = await API.get("RFunc", path);
      this.setState({apiResponse});
      this.setState({OTP: apiResponse.Pass});
    } catch (e) {
      console.log(e);
      this.setState({apiResponse: e});
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
            <Text style={styles.simpleText}>{this.state.OTP ? 'Your Password: '+this.state.OTP : ''}</Text>
            <TextInput style={styles.textInput} autoCapitalize='none' onChangeText={this.handleChangeOTP}/>
            <TouchableHighlight
              onPress={() => this.onOpneScanner()}
              style={styles.button}>
                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>Open QR Scanner</Text>
            </TouchableHighlight>
            <ScrollView>
            <Text>Response: {this.state.apiResponse && JSON.stringify(this.state.apiResponse, undefined, 2)}</Text>
            </ScrollView>
            <TouchableHighlight onPress={this.generateOTP.bind(this)} style={styles.button}>
                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>Get One-Time Password</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.lockBike.bind(this)} style={styles.button}>
                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>Lock Bike</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.unlockBike.bind(this)} style={styles.button}>
                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>Unlock Bike</Text>
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
      height: 50,
      width: 200,
      borderWidth: 1,
      color: 'green',
      fontSize: 12,
      backgroundColor: 'black'
   }
});