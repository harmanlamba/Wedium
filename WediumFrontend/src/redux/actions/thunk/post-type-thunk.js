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

        // On load of fetching post types, enable loading
        dispatch(loadPostTypesLoading());

        getPostTypes()
            .then(
                // On getting post types, stop loading, and update post types state
                postTypes => dispatch(loadPostTypesSuccess(postTypes)),

                error => dispatch(loadPostTypesError(error.message || 'Unexpected error occured.')));

    }
}