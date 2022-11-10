import React from 'react'

const TheDate = () => {

    var today = new Date()
        today = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  return (
    <div>
        <h1>{this.this.state.today}</h1>
    </div>
  )
}

export default TheDate