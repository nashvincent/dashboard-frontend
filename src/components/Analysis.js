import React, { useState } from 'react'
import WordCloud from './WordCloud'
import PieChart from './PieChart'
import SimpleLineChart from './SimpleLineChart'

const Analysis = ({ coherenceValues, wordcloudData, topics }) => {
  const getFirstTopic = () => {
    return getRelevantTopics()[0]
  }

  const getRelevantTopics = () => {
    const topicList = topics.map(obj => {
      return {
        name: obj.description.slice(0, 8).trim(),
        value: Number(obj.percentage),
      }
    })
    console.log('Relevant: ', topicList)
    return topicList
  }

  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const [currentTopic, setCurrentTopic] = useState(getFirstTopic)

  const show = menuIsOpen ? 'show' : ''
  const menuItems = getRelevantTopics().map(topic => (
    <a
      className="dropdown-item"
      href="#"
      onClick={() => {
        setCurrentTopic(topic)
        setMenuIsOpen(false)
      }}
    >
      {topic.name}
    </a>
  ))

  const getFullTopic = () => {
    if (topics.length === 0) return []
    let topic = topics.find(topic => currentTopic.name == topic.description.slice(0, 8))
    const idx = Number(currentTopic.name.substring(6)) - 1
    console.log('data: ', wordcloudData[idx])
    return wordcloudData[idx]
  }

  return (
    <div className="container" style={{ marginTop: '20px' }}>
      {/* Page Heading */}
      <div className="row">
        <div className="col-6">
          <h1 className="page-header text-white display-2 ml-5">Analysis</h1>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-5 bg-white mr-auto ml-auto shadow-lg p-3 mb-5 rounded">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              onClick={() => setMenuIsOpen(!menuIsOpen)}
            >
              Topic
            </button>
            <div className={`dropdown-menu collapse ${show}`}>{menuItems}</div>
          </div>
          <WordCloud wordcloudData={getFullTopic()} />
        </div>

        <div className="col-5 bg-white ml-auto mr-auto shadow-lg p-3 mb-5 rounded">
          <PieChart topics={getRelevantTopics()} />
        </div>
      </div>

      <div className="row mt-5 mb-5">
        <div className="col-12 bg-white mr-auto ml-auto shadow-lg p-3 mb-5 rounded">
          <SimpleLineChart coherenceValues={coherenceValues} />
        </div>
      </div>
    </div>
  )
}

export default Analysis
