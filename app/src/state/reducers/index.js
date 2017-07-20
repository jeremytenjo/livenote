import {
 combineReducers
} from 'redux';
import FolderSelection from './FolderSelection.js';
import FolderSelection_Name from './FolderSelection_Name.js';

const Reducers = combineReducers({
 FolderSelection,
 FolderSelection_Name
})

export default Reducers;
