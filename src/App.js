import React, { Component } from "react";
import Randomizer from 'react-randomizer';
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Counter from "./components/Counter/";
import friends from "./friends.json";
import "./App.css";

class App extends Component {

  state = {
    friends,
    currentScore: 0,
    highScore: 0,
    chosenFriends: []
  };

  //To Do:
  //1. Get rid of x button and turn card into on click event 

  //Helper function to determine what the new high score should be.
  newHighScore = (val) => (
    this.state.highScore > val ? this.state.highScore : val
  )

  tallyFriend = id => {

    //Check if clicked ID is in state array- if it is, end the current game, and add score to high score if it's > high score
    if (this.state.chosenFriends.includes(id)) {
      //Incorrect Answer was Chosen
      alert('Game over!  You Clicked that one already!');
      this.setState(
        {
          highScore: this.newHighScore(this.state.currentScore),
          chosenFriends:[],
          currentScore: 0,
        })
    } else {
      //Correct Answer was Chosen- Concat selected ID to state id array to keep track of id's and increment the current score
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
        <Title>Memory Game Thing</Title>
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
