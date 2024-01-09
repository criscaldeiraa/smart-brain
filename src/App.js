import React, { Component } from 'react';
// import Particles from 'react-particles-js';
import ParticlesBg from 'particles-bg'
// import Clarifai from 'clarifai';
// import fetch from 'node-fetch';
import axios from 'axios';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

window.process = {}

const initialState = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    // Check if the response and its nested properties exist
    if (data && data.outputs && data.outputs[0] && data.outputs[0].data &&
      data.outputs[0].data.regions && data.outputs[0].data.regions[0] &&
      data.outputs[0].data.regions[0].region_info &&
      data.outputs[0].data.regions[0].region_info.bounding_box) {

      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);

      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      };
    } else {
      console.error('Invalid response structure from Clarifai API:', data);
      // Return a default bounding box or handle the error as needed
      return {
        leftCol: 0,
        topRow: 0,
        rightCol: 0,
        bottomRow: 0
      };
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    axios.post("https://smart-brain-back-end-vmuu.onrender.com/imageurl", {
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: this.state.input
      }),
    })
      .then(response => response.json())
      .then(response => {
        // Check if the response contains an error
        if (response.error) {
          console.error('Clarifai API Error:', response.error);
          // Handle the error case, e.g., show a message to the user
          // You may want to update the state or UI accordingly
        } else {
          // Proceed with face detection and image update
          axios.put("https://smart-brain-back-end-vmuu.onrender.com/image", {
            headers: { 
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log);

          this.displayFaceBox(this.calculateFaceLocation(response));
        }
      })
      .catch(err => {
        console.error('Fetch Error:', err);
        // Handle fetch error, e.g., show a message to the user
        // You may want to update the state or UI accordingly
      });
  };

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className='App'>
        <ParticlesBg type="cobweb" bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'home'
          ? <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
          : (
            route === 'signin'
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;
