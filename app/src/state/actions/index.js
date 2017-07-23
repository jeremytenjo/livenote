//defoine what to change in store
export const folderSelection = (e) => {
  return {
    type: 'TRIGGER_CLICKED',
    data: e
  }
}

export const FolderSelection_Name = (e) => {
  return {
    type: 'CHANGE_NAME',
    data: e
  }
}
export const Note_Name = (e) => {
  return {
    type: 'CHANGE_NOTE_NAME',
    data: e
  }
}
export const Change_TopBar_Title = (e) => {
  return {
    type: 'CHANGE_TOPBAR_TITLE',
    data: e
  }
}
export const Toggle_NewNote = (e) => {
  return {
    type: 'NEWNOTE_TOGGLE',
    data: e
  }
}
export const Stop_Toggle = (e) => {
  return {
    type: 'STOP_TOGGLE',
    data: e
  }
}
export const Play_Toggle = (e) => {
  return {
    type: 'PLAY_TOGGLE',
    data: e
  }
}
export const Pause_Toggle = (e) => {
  return {
    type: 'PAUSE_TOGGLE',
    data: e
  }
}

export const Seconds_Change = (e) => {
  return {
    type: 'INCREASE_TIME',
    data: e
  }
}
