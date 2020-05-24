import React from 'react';
import { shallow } from 'enzyme';

import UserMenu from '../../../components/header/user-menu';

it('snapshot usermenu default load', () => {
    const user = {
        isAuthenticated: true,
        pictureUri: "https://imsteve.jpg",
        username: "steve mcqueen"
    }
    const setRouteLeaveHook = jest.fn();

    let wrapper = shallow(<
        UserMenu.WrappedComponent 
        user={user}
        params={
            {
                router: setRouteLeaveHook,
            }
        }
    />
    );

    expect(wrapper).toMatchSnapshot();
});