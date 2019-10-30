import { replace } from 'react-router-redux'
import * as request from '../Library/Request'
import * as lib from '../Library/Library'
import { showToast } from './Toast'

const prefix = 'MANAGER_'

export const getManager = () => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    if (getState().manager.acquired) return false
    dispatch(loading(true))
    const path = lib.getApiPath() + '/manager/'
    request.post(path, {}, (err, res) => {
      if (err) {
        return false
      } else {
        dispatch(update(res.body))
        dispatch(acquired(true))
      }
      dispatch(loading(false))
    })
  }
}

export const update = (data) => ({
  type: prefix + 'UPDATE',
  payload: {
    data
  }
})

export const acquired = (acquired) => ({
  type: prefix + 'ACQUIRED',
  payload: {
    acquired
  }
})

export const loading = (loading) => ({
  type: prefix + 'LOADING',
  payload: {
    loading: loading
  }
})

export const getSelectionPhase = () => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    dispatch(loadingSelectionPhase(true))
    const path = lib.getSurveyPath() + '/api/selection/phase'
    const send = {
      session: lib.getSession()
    }
    request.post(path, send, (err, res) => {
      if (err) {
        dispatch(setSelectionPhase(false))
      } else {
        dispatch(setSelectionPhase(res.body.phase))
      }
      dispatch(loadingSelectionPhase(false))
    })
  }
}

const loadingSelectionPhase = (loadingSelectionPhase) => ({
  type: prefix + 'LOADING_SELECTION_PHASE',
  payload: { loadingSelectionPhase }
})

const setSelectionPhase = (selectionPhase) => ({
  type: prefix + 'SET_SELECTION_PHASE',
  payload: { selectionPhase }
})

export const setSelectionPost = (selectionPost) => ({
  type: prefix + 'SET_SELECTION_POST',
  payload: { selectionPost }
})

export const sendPost = () => {
  return async (dispatch, getState) => {
    if (!window.localStorage.token) return false
    if (!getState().manager.selectionPost.titleJa && !getState().manager.selectionPost.titleEn) {
      return dispatch(showToast('入力内容を確認してください'))
    }
    dispatch(loadingSelectionPost(true))
    const path = lib.getSurveyPath() + '/api/selection/post'
    const send = {
      session: lib.getSession(),
      selection: getState().manager.selectionPost
    }
    request.post(path, send, (err, res) => {
      dispatch(loadingSelectionPost(false))
      if (err) {
        dispatch(showToast('サーバーエラー'))
      } else {
        dispatch(replace('/manager/selection'))
      }
    })
  }
}

const loadingSelectionPost = (loadingSelectionPost) => ({
  type: prefix + 'LOADING_SELECTION_POST',
  payload: { loadingSelectionPost }
})