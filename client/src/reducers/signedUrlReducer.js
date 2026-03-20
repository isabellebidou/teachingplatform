import { FETCH_USER_AUDIO_URL} from '../actions/types';

export default function signedUrlReducer(state = [], action) {
  switch (action.type) {
    
    case FETCH_USER_AUDIO_URL:
      console.log("audioReducer audio url action.payload.audioId",action.payload.audioId )
      return {
    
        
         
          [action.payload.audioId]: action.payload.url
        
      };
    default:
      return state;

  }
}
