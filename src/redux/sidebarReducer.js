let initialState = {
  friendsList: [
    { name: 'Andrew', id: 1, avatar: 'https://letsenhance.io/static/66c1b6abf8f7cf44c19185254d7adb0c/28ebd/AiArtBefore.jpg' },
    { name: 'Max', id: 2, avatar: 'https://letsenhance.io/static/66c1b6abf8f7cf44c19185254d7adb0c/28ebd/AiArtBefore.jpg' },
    { name: 'Antony', id: 3, avatar: 'https://letsenhance.io/static/66c1b6abf8f7cf44c19185254d7adb0c/28ebd/AiArtBefore.jpg' },
    { name: 'Rinat', id: 4, avatar: 'https://letsenhance.io/static/66c1b6abf8f7cf44c19185254d7adb0c/28ebd/AiArtBefore.jpg' },
  ]
}

let sidebarReducer = (state = initialState, action) => {
  
  switch(action.type){
    default: 
      return state;
  }

}

export default sidebarReducer;