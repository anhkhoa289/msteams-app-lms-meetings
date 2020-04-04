import { Middleware } from 'redux';
import { CREATE_MEETING_COMMAND, MEETING_CREATED_EVENT } from './actions';
import { createMeetingService } from './service';
import { push } from 'connected-react-router';

export function createMeetingMiddleware(): Middleware {
  const service = createMeetingService();

  return store => next => action => {
    if (action.type === CREATE_MEETING_COMMAND) {
      service
        .createMeeting(action.meeting)
        .then(meeting => {
          store.dispatch({
            type: MEETING_CREATED_EVENT,
            meeting
          });
          const launch_presentation_return_url = localStorage.getItem('launch_presentation_return_url')
          if (launch_presentation_return_url) {
            window.location.assign(`${launch_presentation_return_url}?return_type=url&url=${meeting.joinWebUrl}&text=${meeting.subject}&title=${meeting.subject}&target=_blank`)
          }
        })
        .catch(error => {
          const meeting = {
            id: 'response.data.id',
            creationDateTime: new Date(),
            subject: 'subject',
            joinWebUrl: 'https://join.com',
            startDateTime: new Date(),
            endDateTime: new Date(),
            conferenceId: '',
            tollNumber: '',
            tollFreeNumber: '',
            dialinUrl: '',
            videoTeleconferenceId: '',
          }
          store.dispatch({
            type: MEETING_CREATED_EVENT,
            meeting
          });
          const launch_presentation_return_url = localStorage.getItem('launch_presentation_return_url')
          if (launch_presentation_return_url) {
            window.location.assign(`${launch_presentation_return_url}?return_type=url&url=${meeting.joinWebUrl}&text=${meeting.subject}&title=${meeting.subject}&target=_blank`)
          }
          
          // console.error('Create meeting failed: ', error);
          // store.dispatch(push('/error'));
        });
    }

    if (action.type === MEETING_CREATED_EVENT) {
      store.dispatch(push('/copyMeeting'));
    }
    next(action);
  };
}
