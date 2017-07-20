import {
 combineReducers
} from 'redux';
import FolderSelection from './FolderSelection.js';
import FolderSelection_Name from './FolderSelection_Name.js';
import Note_Name from './Note_Name.js';

const Reducers = combineReducers({
 FolderSelection,
 FolderSelection_Name,
 Note_Name
})

export default Reducers;
