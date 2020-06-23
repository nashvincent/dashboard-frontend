import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import apiService from './services/api'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Analysis from './components/Analysis'

// The plan: Add state to this component to store the incoming topic list, coherence values, etc

// TODO: Write a useEffect hook to fetch data from the init end point and store the data in state
// TODO: Remove hardcoded topicLayout from Dashboard state and instead pass topicLayout state from App to Dashboard as props
// TODO: Pass topics to Dashboard as props and set that as its state

// (Experimental)Proposal: Remove topics state from dashboard altogther, store topicLayout in topics state (in App component)

// CURR TODO:
//    Pass correct data to PieChart from Analysis
//    Fix animation bug that crashes app
//    Add dropdown selector in Analysis wordcloud to select a particular topic (Should be dynamic)

const App = () => {
  const [coherenceValues, setCoherenceValues] = useState([])
  const [wordcloudData, setWordcloudData] = useState([])
  const [topics, setTopics] = useState([])

  const handleNewCoherenceValues = values => setCoherenceValues(values)
  const handleNewWordcloudData = values => setWordcloudData(values)
  const handleNewTopics = values => setTopics(values)

  const getFilteredTopics = () => {
    return topics.filter(obj => obj.percentage > 1)
  }

  useEffect(() => {
    console.log('App', topics)
  }, [topics])

  // Hook to fetch initial data
  useEffect(() => {
    async function fetchData() {
      const data = await apiService.getInitialData()
      console.log(data)
      let cV = data.topic_list.map((obj, idx) => {
        return {
          description: `Topic ${idx + 1} : ${obj}`,
          percentage: undefined,
        }
      })
      setTopics(cV)
      setCoherenceValues(data.coherence_values)
      setWordcloudData(data.word_cloud_data)
    }
    fetchData()
  }, [])

  return (
    <Router>
      <div>
        <Navbar />

        <Switch>
          <Route path="/analysis">
            <Analysis
              coherenceValues={coherenceValues}
              wordcloudData={wordcloudData}
              topics={getFilteredTopics()}
            />
          </Route>
          <Route path="/">
            <Dashboard
              initialTopics={topics}
              handleNewCoherenceValues={handleNewCoherenceValues}
              handleNewWordcloudData={handleNewWordcloudData}
              handleNewTopics={handleNewTopics}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
