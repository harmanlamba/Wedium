import {
    loadPostTypesLoading,
    loadPostTypesSuccess,
    loadPostTypesError
} from '../post-type-actions';
import {
    getPostTypes
} from '../../../apis/post-type';

export const loadPostTypes = () => {
    return dispatch => {

        dispatch(loadPostTypesLoading());

        getPostTypes()
            .then(
                postTypes => dispatch(loadPostTypesSuccess(postTypes)),

                error => dispatch(loadPostTypesError(error.message || 'Unexpected error occured.')));

    }
}
