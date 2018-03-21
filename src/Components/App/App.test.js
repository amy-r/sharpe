import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';

it('renders correctly', () => {
  const wrapper = shallow(<App />, {disableLifecycleMethods:true});
  expect(wrapper).toMatchSnapshot();
})
