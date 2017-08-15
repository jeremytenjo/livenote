import {combineReducers} from 'redux';
import FolderSelection from './FolderSelection.js';
import FolderSelection_Name from './FolderSelection_Name.js';
import FolderSelection_ID from './FolderSelection_ID.js';
import Note_Name from './Note_Name.js';
import TopBar_Title from './TopBar_Title.js';
import NewNoteToggle from './NewNoteToggle.js';
import NewNoteToggleImage from './NewNoteToggleImage.js';
import Stop_Toggle from './Stop_Toggle.js';
import Play_Toggle from './Play_Toggle.js';
import Pause_Toggle from './Pause_Toggle.js';
import RecTime from './RecTime.js';
import NewNote_Items from './NewNote_Items.js';
import CurrentTime from './CurrentTime.js';
import NotePreview_Toggle from './NotePreview_Toggle.js';
import NotePreview from './NotePreview.js';
import FolderList from './FolderList.js';
import SnackBar_Toggle from './SnackBar_Toggle.js';
import SnackBar_Message from './SnackBar_Message.js';
import MasterNote_ID from './MasterNote_ID.js';
import RecentNotes from './RecentNotes.js';
import OtionsMenu_Toggle from './OtionsMenu_Toggle.js';
import RecordingState from './RecordingState.js';
import Folder_Delete_ID from './Folder_Delete_ID.js';
import FolderSelection_Rename from './FolderSelection_Rename.js';
import FolderLink_ID from './FolderLink_ID.js';
import FolderLink_Name from './FolderLink_Name.js';

const Reducers = combineReducers({
	FolderSelection,
	FolderSelection_Name,
	Note_Name,
	TopBar_Title,
	NewNoteToggle,
	NewNoteToggleImage,
	Stop_Toggle,
	Play_Toggle,
	Pause_Toggle,
	RecTime,
	NewNote_Items,
	CurrentTime,
	NotePreview_Toggle,
	NotePreview,
	FolderList,
	SnackBar_Toggle,
	SnackBar_Message,
	MasterNote_ID,
	RecentNotes,
	FolderSelection_ID,
	OtionsMenu_Toggle,
	RecordingState,
	Folder_Delete_ID,
	FolderSelection_Rename,
	FolderLink_ID,
	FolderLink_Name
})

export default Reducers;
