import { replace } from 'react-router-redux'

import * as Status from './Status'
import * as request from '../Library/Request'
import * as lib from '../Library/Library'
// import { requestFirstTutorial } from './Tutorial'

export const register = () => {
  return async (dispatch, getState) => {
    const {
      reg: { windsid, password, approvalKey },
    } = getState()
    if (windsid === '' || password === '' || approvalKey === '') {
      dispatch(resetMode())
      return dispatch(setErrorMessage('入力を確認してください'))
    }
    dispatch(loading(true))
    const path = lib.getAuthPath() + '/adduser'
    const send = {
      userid: windsid,
      passwd: password,
      key: approvalKey,
      clientid: lib.getClientid(),
      useragent: window.navigator.userAgent,
      version: lib.version,
    }
    request.post(path, send, (err, res) => {
      if (err) {
        dispatch(setErrorMessage('登録できませんでした'))
        dispatch(resetMode())
      } else {
        if (res.body.status) {
          // location.reload()
          dispatch(Status.windsidUpdate(windsid))
          dispatch(Status.tokenUpdate(res.body.token))
          dispatch(Status.loginUpdate(true))
          dispatch(Status.setUser(res.body.user))
          dispatch(replace('/'))
          // dispatch(requestFirstTutorial(true, 'first'))
        } else {
          dispatch(Status.windsidUpdate(false))
          dispatch(Status.tokenUpdate(false))
          dispatch(Status.loginUpdate(false))
          dispatch(setErrorMessage('登録できませんでした'))
          dispatch(resetMode())
        }
      }
      dispatch(changePassword(''))
      dispatch(changeKey(''))
      dispatch(loading(false))
    })
  }
}

export const loading = (loading) => ({
  type: 'REG_LOADING',
  payload: {
    loading: loading,
  },
})

export const updateMode = () => {
  return async (dispatch) => {
    dispatch(loading(true))
    setTimeout(() => {
      dispatch(loading(false))
      dispatch(setMode(true))
    }, 200)
  }
}

const setMode = (mode) => ({
  type: 'REG_SET_MODE',
  payload: { mode },
})

export const resetMode = () => ({
  type: 'REG_SET_MODE',
  payload: { mode: false },
})

export const changeWindsid = (windsid) => ({
  type: 'REG_INPUT_WINDSID',
  payload: {
    windsid,
  },
})

export const changePassword = (password) => ({
  type: 'REG_INPUT_PASSWORD',
  payload: {
    password,
  },
})

export const changeKey = (approvalKey) => ({
  type: 'REG_INPUT_KEY',
  payload: {
    approvalKey,
  },
})

export const setErrorMessage = (str) => ({
  type: 'REG_ERROR',
  payload: {
    errorMessage: str,
  },
})
