import React, { useState, useEffect } from 'react'
import apiService from '../services/api'
import '../App.css'

const Dashboard = ({
  handleNewCoherenceValues,
  handleNewWordcloudData,
  handleNewTopics,
  initialTopics,
}) => {
  const [input, setInput] = useState('')
  const [colorizedText, setColorizedText] = useState(undefined)
  const [topicLayout, setTopicLayout] = useState(initialTopics)
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState(null)

  useEffect(() => {
    console.log('DashInit', initialTopics)
    setTopicLayout(initialTopics)
  }, [initialTopics])

  const getRandAbst = async () => {
    const abst = await apiService.getRandom()
    setInput(abst)
    console.log(input)
  }

  const handleSubmit = async () => {
    window.scrollTo(0, 0)
    setLoading(true)
    let topicLayout1 = [...topicLayout]
    let abst_input = input.slice(0)

    setInput('')

    let res = await apiService.analyze(abst_input)

    console.log(res)

    setLoading(false)

    //console.log(res)
    //console.log("TYPE:", typeof res.topics[0])
    for (let t in topicLayout1) {
      // t is the index for each element in the object topicLayout
      let q = res.topics.find(e => e[0] == t) // This might break the function?

      // console.log(q)
      if (q) {
        topicLayout1[t]['percentage'] = parseFloat(q[1] * 100).toFixed(2)
      } else {
        topicLayout1[t]['percentage'] = 0
      }
    }
    setColorizedText(res.words)
    setTopicLayout(topicLayout1)
    handleNewTopics(topicLayout1)
  }

  const handleSubmitTrain = async () => {
    setLoading(true)

    let res = await apiService.train()
    console.log(res)
    var dat = res.topic_list

    // Passes coherence values to parent component
    handleNewCoherenceValues(res.coherence_values)
    handleNewWordcloudData(res.word_cloud_data)

    var i = 0
    let List = dat.map(item => {
      i = i + 1
      return {
        description: `Topic ${i} : ${item}`,
        percentage: undefined,
      }
    })
    console.log(List)

    setLoading(false)
    setTopicLayout(List)
  }

  const onSubmit = async e => {
    e.preventDefault()
    console.log('Submitted Form')
    let res = await apiService.uploadFile(file)
    if (res===200) alert("file uploaded") 
    else alert("upload failed")
  }

  const onChange = e => {
    setFile(e.target.files[0])
    console.log(e.target.files[0])
  }

  const animTime = 300
  return (
    <div className="container" style={{ marginTop: '20px' }}>
      {/* TOP PART TO ANALYZE GIVEN ABSTRACT */}
      <div className="row">
        <ul className="col-12 list-inline col-lg-3 bg-0" id="topicList">
          {topicLayout.map((t, i) => {
            setTimeout(() => {
              let element = document.getElementById(`topic${i}`)
              if (element !== null)
                element.className = `list-inline-item col-xs d-md-block topic-rel roundedBubble topic_${i} animateBubble`
            }, animTime * i + 100)

            return (
              <li
                className="list-inline-item col-xs d-md-block topic-rel"
                className={'invis roundedBubble topic_' + i}
                key={'topic' + i}
                id={'topic' + i}
              >
                {t.description}
                <br />
                {t.percentage}
              </li>
            )
          })}
        </ul>
        {}

        <div className="col-lg-9 col-12 bg-2 pt-2 pb-2 roundinator">
          {/* {colorizedText} */}
          {colorizedText ? (
            colorizedText.map((word, idx) => {
              return (
                <span
                  key={'colorWord' + idx}
                  className={'roundedHighlight topic_' + word[1]}
                >
                  {word[0]}
                  <span className="colorSpace"> </span>
                </span>
              )
            })
          ) : (
            <p className="blockquote text-center ">Awaiting Document Submission</p>
          )}
        </div>
      </div>

      {/* ABSTRACT INPUT */}
      <div className="row mt-5">
        <div className="col-12">
          {loading && (
            <div className="spinner-grow text-light spinner-grow-lg" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>

        <textarea
          name="abstract"
          id="abstractInput"
          placeholder="Input some data here or double click to get a random document"
          className="col-12 form-control form-rounded"
          rows="10"
          onDoubleClick={() => {
            getRandAbst()
          }}
          value={input}
          onChange={e => {
            setInput(e.target.value)
          }}
        ></textarea>

        {/*
        <button onClick={() => getRandAbst()} className="btn btn-outline-light offset-1 col-1 roundButton">
          Random Abstract
        </button>
		*/}

        <div className="mt-4 col-12">
          <button
            onClick={handleSubmit}
            className="btn btn-success btn-lg col-4 offset-md-1 btn-space animateBubble"
          >
            ANALYZE
          </button>
          <button
            onClick={handleSubmitTrain}
            className="btn btn-primary btn-lg col-4 offset-md-1 btn-space animateBubble"
          >
            TRAIN
          </button>
        </div>
      </div>
      <div className="container-fluid mt-5 mb-5">
        <form onSubmit={onSubmit}>
          <h1 className="text-left text-white">Upload a CSV file</h1>
          <br />
          <input
            id="upload-file"
            type="file"
            onChange={onChange}
            className="roundinator"
          />
          <button type="submit" className="btn btn-light" style={{ marginLeft: 50 }}>
            Upload File
          </button>
        </form>
      </div>
    </div>
  )
}

export default Dashboard
