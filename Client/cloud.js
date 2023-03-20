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
const keywordsArray = [
    {
        keyword: "Oof", 
        frequency: Math.sqrt(1),     
        color: "#A7BED3"     
    },
    {
        keyword: "Meh", 
        frequency: Math.sqrt(2),     
        color: "#C6E2E9"     
    },
    {
        keyword: "Perfect", 
        frequency: Math.sqrt(3),     
        color: "#F1FFC4"     
    },
    {
        keyword: "Mediocre", 
        frequency: Math.sqrt(6),     
        color: "#FFCAAF"     
    },
    {
        keyword: "Sensational", 
        frequency: Math.sqrt(5),     
        color: "#DAB894"     
    },
    {
        keyword: "Rough", 
        frequency: Math.sqrt(4),     
        color: "#DAB894"     
    }
  ]


export default WordCloud;