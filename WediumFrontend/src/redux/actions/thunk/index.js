import { loadPostTypesLoading, loadPostTypesSuccess, loadPostTypesError } from '../post-type-actions';
import Api from '../../../apis';

export function loadPostTypes() {
    return dispatch => {

        dispatch(loadPostTypesLoading());

        Api.getPostTypes()
            .then(
                postTypes => dispatch(loadPostTypesSuccess(postTypes)),

                error => dispatch(loadPostTypesError(error.message || 'Unexpected error occured.')));

    }
}