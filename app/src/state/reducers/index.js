import {
 combineReducers
} from 'redux';
import FolderSelection from './FolderSelection.js';
import FolderSelection_Name from './FolderSelection_Name.js';
import Note_Name from './Note_Name.js';
import TopBar_Title from './TopBar_Title.js';
import NewNoteToggle from './NewNoteToggle.js';

const Reducers = combineReducers({
 FolderSelection,
 FolderSelection_Name,
 Note_Name,
 TopBar_Title,
 NewNoteToggle
})

export default Reducers;
