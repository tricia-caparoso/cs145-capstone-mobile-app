import Amplify, { API } from 'aws-amplify';
import awsmobile from './src/aws-exports';
import React, { Component } from 'react';
import { Text, TextInput, View, Image, Linking, TouchableHighlight, PermissionsAndroid, Button, Platform, StyleSheet} from 'react-native';
import { CameraKitCameraScreen, } from 'react-native-camera-kit';
import DeviceInfo from 'react-native-device-info';

Amplify.configure(awsmobile);
class App extends Component {
  constructor() {
    super();
    this.state = {
      qrvalue: '',
      opneScanner: false,
      apiResponse: '',
      OTP:'',
      status: '',
      deviceId: ''
    };
  }
  handleChangeOTP = (event) => {this.setState({OTP: event});}
  async lockBike() {
    let newNote = {
      body: {
        "devId": DeviceInfo.getUniqueID(),
        "devPass": this.state.OTP,
        "status": true,
        "rackId": Number(this.state.qrvalue)
      }
    }
    const path = "/BikeRacks/";
    try {
      const apiResponse = await API.post("RFunc", path, newNote)
      this.setState({apiResponse});
      if (apiResponse) this.setState({status: "Your Bike is locked now!"});
      else this.setState({status: "This rack is already locked!"});
    } catch (e) {
      this.setState({status: "This rack is already locked and occupied!"});
    }
  } 
  async unlockBike() {
    let newNote = {
      body: {
        "devId": DeviceInfo.getUniqueID(),
        "status": false,
        "rackId": Number(this.state.qrvalue)
      }
    }
    const path = "/BikeRacks/";
    try {
      const apiResponse = await API.put("RFunc", path, newNote)
      this.setState({apiResponse});
      this.setState({status: "Your Bike is unlocked now!"});
    } catch (e) {
      this.setState({status: "You are not authorized to unlock this bike!"});
    }
  }
  async generateOTP() {
    const path = "/BikeRacks/object/" + this.state.qrvalue;
    try {
      const apiResponse = await API.get("RFunc", path);
      this.setState({apiResponse});
      this.setState({OTP: apiResponse.Pass});
      if (apiResponse.Pass) this.setState({status: "Password received!\nClick the lock button to secure your Bike now!"});
      else this.setState({status: "Cannot bind you to this rack!\nIt is already occupied!"});
    } catch (e) {
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
            <Image style={{width: 150, height:150}} source={require('./logo.png')}/>
            <Text style={styles.simpleText}>Rack #: {this.state.qrvalue}</Text>
            <Text style={styles.simpleText}>{this.state.status}</Text>
            <TouchableHighlight
              onPress={() => this.onOpneScanner()}
              style={styles.button}>
                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>Open QR Scanner</Text>
            </TouchableHighlight>
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
    marginTop:10
  },
  heading: { 
    color: 'black', 
    fontSize: 24, 
    alignSelf: 'center', 
    padding: 5,
  },
  simpleText: { 
    color: 'black', 
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'center', 
    padding: 5, 
    marginTop: 10
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