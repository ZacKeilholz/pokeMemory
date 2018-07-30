import React, { Component } from "react";
import Randomizer from 'react-randomizer';
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Counter from "./components/Counter/";
import friends from "./friends.json";
import "./App.css";

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends,
    currentScore: 0,
    highScore: 0,
    chosenFriends: []
  };


  //Move Counters to a separate Component at some point

  // handleIncrement increases this.state.count by 1
  handleIncrement = () => {
    // We always use the setState method to update a component's state
    this.setState({ count: this.state.count + 1 });
  };


  //1. Grab the id from clicked card, 
  //2. check if it's already in the state array, 
  //3. increment currentScore and add id to chosenFriends array,
  //4. else increment highScore and clear chosenFriends array
  newHighScore = (val) => (
    this.state.highScore > val ? this.state.highScore : val
  )


  tallyFriend = id => {
    // Filter this.state.friends for friends with an id not equal to the id being removed

    console.log(`CurrentStoredID's: ${this.state.chosenFriends}`);

    //Check if clicked ID is in state array:
    if (this.state.chosenFriends.includes(id)) {
      alert('You Clicked that one already!');
      this.setState(
        {
          highScore: this.newHighScore(this.state.currentScore),
          currentScore: 0,
        })

    } else {
      alert('Nice!');

      //Correct Answer was Chosen
      this.setState(prevState => ({
        chosenFriends: [...prevState.chosenFriends, id],
        currentScore: this.state.currentScore + 1
      }));
    }


    // Set this.state.friends equal to the new friends array
    this.randomizeArray(this.state.friends);
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
        <Counter
          currentScore={this.state.currentScore}
          highScore={this.state.highScore}
        />
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
