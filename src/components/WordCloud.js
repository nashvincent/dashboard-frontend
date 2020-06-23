import React from 'react'
import ReactWordcloud from 'react-wordcloud'

// const words = [
//   { value: 264, text: 'investor' },
//   { value: 149, text: 'investment' },
//   { value: 141, text: 'stock' },
//   { value: 136, text: 'sale' },
//   { value: 133, text: 'bank' },
//   { value: 123, text: 'growth' },
//   { value: 113, text: 'industry' },
//   { value: 108, text: 'rate' },
//   { value: 106, text: 'analyst' },
//   { value: 104, text: 'revenue' },
//   { value: 135, text: 'financial' },
//   { value: 133, text: 'firm' },
//   { value: 132, text: 'consumer' },
//   { value: 131, text: 'build' },
// ]

const options = {
  // colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
  enableTooltip: true,
  deterministic: false,
  fontFamily: 'roboto',
  fontSizes: [10, 60],
  fontStyle: 'normal',
  fontWeight: 'normal',
  //padding: 1.5,
  rotations: 3,
  rotationAngles: [0, 0],
  scale: 'log', // scales = sqrt, log, linear
  spiral: 'archimedean', // patterns = archimedean, rectangular
  transitionDuration: 1000,
}
// TODO: Pass wordcloudData as props to ReactWordcloud
const WordCloud = ({ wordcloudData }) => {
  console.log(wordcloudData)
  return (
    <div style={{ justifyContent: 'center' }}>
      <p className="display-4 lead font-weight-light text-center gradientText">
        Topic-wise Breakdown
      </p>
      <div style={{ height: 400, width: 450 }}>
        {wordcloudData.length !== 0 ? (
          <ReactWordcloud options={options} words={wordcloudData} minSize={[400, 400]} />
        ) : (
          <h1 style={{ textAlign: 'center', marginTop: 50 }}>
            Please analyze a document
          </h1>
        )}
      </div>
    </div>
  )
}

export default WordCloud
