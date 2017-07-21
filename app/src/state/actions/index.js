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
    type: 'CHANGE_TOPBAR_TITLE',
    data: e
  }
}
