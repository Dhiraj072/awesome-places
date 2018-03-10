import React from 'react';
import { shallow } from 'enzyme';
import PlaceListItem from '../../../components/PlaceListItem/PlaceListItem';

describe('PlaceListItem', () => {
    const onPlaceListItemPress = jest.fn();
    const wrapper = shallow(<PlaceListItem
        onPlaceListItemPress={onPlaceListItemPress}
    />);
    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should call onPlaceListItemPress prop when pressed', () => {
        wrapper.find('TouchableOpacity').simulate('press');
        expect(onPlaceListItemPress).toHaveBeenCalled();
    });
});

