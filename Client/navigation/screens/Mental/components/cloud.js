import React, { Component } from 'react';
import Cloud from "react-native-word-cloud";
//npm install prop-types , npm install react-native-word-cloud

class WordCloud extends Component {
    render() {
        return (
            <Cloud keywords={keywordsArray} scale={300} largestAtCenter={true} />
        )
    }
}

const colours = ["#A7BED3","#C6E2E9","#F1FFC4","#DAB894"]
const keywordsArray = [
    {
        keyword: "Oof", 
        frequency: Math.sqrt(1),     
        color: colours[Math.floor(Math.random() * 3)]     
    },
    {
        keyword: "Meh", 
        frequency: Math.sqrt(2),     
        color: colours[Math.floor(Math.random() * 3)]     
    },
    {
        keyword: "Perfect", 
        frequency: Math.sqrt(3),     
        color: colours[Math.floor(Math.random() * 3)]     
    },
    {
        keyword: "Mediocre", 
        frequency: Math.sqrt(6),     
        color: colours[Math.floor(Math.random() * 3)]     
    },
    {
        keyword: "Sensational", 
        frequency: Math.sqrt(5),     
        color: colours[Math.floor(Math.random() * 3)]     
    },
    {
        keyword: "Rough", 
        frequency: Math.sqrt(4),     
        color: colours[Math.floor(Math.random() * 3)]     
    }
  ]


export default WordCloud;