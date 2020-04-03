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
        })
        .catch(error => {
          const meeting = {
            id: 'response.data.id',
            creationDateTime: new Date(),
            subject: 'subject',
            joinUrl: 'https://join.com',
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
          // const launch_presentation_return_url = `https://canvas.classcom.app/courses/2/external_content/success/external_tool_dialog`
          // const returnUrl = `${launch_presentation_return_url}?return_type=url&url=${meeting.joinUrl}&text=${meeting.subject}&title=${meeting.subject}&target=_blank`
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
