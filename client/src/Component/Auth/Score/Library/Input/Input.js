import React, { Component } from 'react'
import request from 'superagent'

import * as lib from '../../../../../Library/Library'

import './Input.css'

export default class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {
      load: undefined,
      value: this.props.value,
      num: undefined,
      list: [],
    }
  }

  changeValue(e) {
    this.setState({ value: e.target.value })
    if (this.props.onChange) {
      this.props.onChange({
        target: this,
        value: e.target.value,
      })
    }
    if (!e.target.value) return this.setState({ list: [] })
    this.setState({ load: false })
    // URL
    request
      .post('https://score.winds-n.com/api/member/input')
      // request.post('http://192.168.1.22:3011/api/member/input')
      .type('form')
      .send({
        session: lib.getSession(),
        target: this.props.target,
        query: e.target.value,
      })
      .end((err, res) => {
        if (err) return
        const response = res.body
        if (response.status) {
          this.setState({ list: response.list, load: true })
          return
        }
      })
  }

  setValue(text) {
    this.setState({ value: text, list: [] })
    if (this.props.onChange) {
      this.props.onChange({
        target: this,
        value: text,
      })
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value })
  }

  render() {
    var correctArray = []
    const autoCorrect = this.state.list.map((each) => {
      const text = each[this.props.target]
      if (Array.isArray(text)) {
        return text.map((e, i) => {
          if (correctArray.indexOf(e) === -1) {
            correctArray.push(e)
            return (
              <div key={i} onClick={() => this.setValue(e)} className="auto-correct">
                {e}
              </div>
            )
          }
        })
      } else {
        if (correctArray.indexOf(text) === -1) {
          correctArray.push(text)
          return (
            <div key={each._id} onClick={() => this.setValue(text)} className="auto-correct">
              {text}
            </div>
          )
        }
      }
    })
    const classProps = this.props.className ? 'input ' + this.props.className : 'input'
    return (
      <div className={classProps}>
        <label>{this.props.label}</label>
        <input
          type="text"
          className={this.props.inputClass}
          value={this.state.value}
          onChange={(e) => this.changeValue(e)}
        />
        {autoCorrect}
      </div>
    )
  }
}
