import React from 'react'
import { Link } from 'react-router-dom'
import {configure, shallow} from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import isReact from 'is-react'
import LandingPage from '../components/landingPage.jsx'

configure({ adapter: new Adapter() })

describe('<LandingPage />', () => {
    let landing
    
    beforeEach(() => {
        landing = shallow(<LandingPage />)
        expect(isReact.classComponent(LandingPage)).toBeFalsy()
    })

    it(`Debería renderizar un <Link> que vaya a '/home'`, () => {
      expect(landing.find(Link).length).toBeGreaterThanOrEqual(1)
      
    })

    it('Debería renderizar un <h1>', () => {
      expect(landing.find('h1').length).toBeGreaterThanOrEqual(1)
    })

    it('Debería renderizar un <h3>', () => {
      expect(landing.find('h3').length).toBeGreaterThanOrEqual(1)
    })

    it('Debería renderizar un <button>', () => {
      expect(landing.find('button').length).toBeGreaterThanOrEqual(1)
    })

    it('Debería renderizar dos <div>', () => {
      expect(landing.find('div')).toHaveLength(2)
    })
  
})