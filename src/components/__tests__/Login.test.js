// useCounter.test.js
import React from 'react'
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from '@testing-library/react'
// this adds custom jest matchers from jest-dom
import 'jest-dom/extend-expect';
import LoginComponent from '../components/Login'

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

describe('LoginComponent', () => {
  test('it renders the LoginComponent', () => {    
    render(<LoginComponent />)
  })
})