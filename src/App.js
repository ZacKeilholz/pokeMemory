import React, { Component } from "react";
import Randomizer from 'react-randomizer';
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";
import "./App.css";

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends,
    currentScore: 0,
    highScore: 0,
    chosenFriends:[]
  };

  // handleIncrement increases this.state.count by 1
  handleIncrement = () => {
    // We always use the setState method to update a component's state
    this.setState({ count: this.state.count + 1 });
  };


  //1. Grab the id from clicked card, 
  //2. check if it's already in the state array, 
  //3. increment currentScore and add id to chosenFriends array,
  //4. else increment highScore and clear chosenFriends array
  
  tallyFriend = id => {
    // Filter this.state.friends for friends with an id not equal to the id being removed

    this.setState(prevState => ({
       chosenFriends: [...prevState.chosenFriends, id] 
    }));

    const friends = this.state.friends.filter(friend => friend.id !== id);

    // Set this.state.friends equal to the new friends array
    this.randomizeArray(friends);
  };

  randomizeArray = inputArr => {
    const friends = Randomizer.randomizeArray(inputArr);
    this.setState({ friends });
  }


  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <Wrapper>
        <Title>Friends List</Title>
        <h2>Current Number Correct: {this.state.currentScore}</h2>
        <h2>High Score: {this.state.highScore}</h2>
        <h2>Chosen Id's: {this.state.chosenFriends}</h2>

        {this.state.friends.map(friend => (
          <FriendCard
            tallyFriend={this.tallyFriend}
            id={friend.id}
            key={friend.id}
            name={friend.name}
            image={friend.image}
            occupation={friend.occupation}
            location={friend.location}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
