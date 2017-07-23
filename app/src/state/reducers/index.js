import {
 combineReducers
} from 'redux';
import FolderSelection from './FolderSelection.js';
import FolderSelection_Name from './FolderSelection_Name.js';
import Note_Name from './Note_Name.js';
import TopBar_Title from './TopBar_Title.js';
import NewNoteToggle from './NewNoteToggle.js';
import Stop_Toggle from './Stop_Toggle.js';
import Play_Toggle from './Play_Toggle.js';
import Pause_Toggle from './Pause_Toggle.js';
import RecTime from './RecTime.js';

const Reducers = combineReducers({
 FolderSelection,
 FolderSelection_Name,
 Note_Name,
 TopBar_Title,
 NewNoteToggle,
 Stop_Toggle,
 Play_Toggle,
 Pause_Toggle,
 RecTime,
})

export default Reducers;
