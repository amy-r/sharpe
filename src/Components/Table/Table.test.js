import React from 'react';
import Table from './Table';
import {shallow} from 'enzyme';

describe( 'Table', () => {
  it('renders receives correct props and renders correctly', () => {
    const mockData = {
      '1ST' : 0.07782962305006015,
      '2GIVE': 0.2838848343236152,
      '8BT': 0.22783350944442976 }

    const wrapper = shallow(<Table currencyReturns = {mockData}/>);
    expect(wrapper).toMatchSnapshot();
  }) 
})