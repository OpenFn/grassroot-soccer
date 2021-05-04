alterState(state => {
  const present = dataValue('form.present')(state).toLowerCase();

  function getSessionValue() {
    let value;
    switch (present) {
      case 'yes':
        value = 'X';
        break;
      case 'no':
        value = 'A';
        break;
      case '':
        value = 'N';
        break;
      default:
        value = 'U';
        break;
    }
    return value;
  }

  const session_text = dataValue('form.session')(state);

  const session_id = session_text.slice(0, session_text.indexOf(' ')).slice(1);

  const session = field(`Session_${session_id}__c`, getSessionValue());

  const session_date = field(`Session_${session_id}_Date__c`, dataValue('form.date')(state));

  const session_duration = field(`Session_${session_id}_Duration__c`, dataValue('form.duration')(state));

  const event_name = field('Event_C.name', dataValue('form.intervention_name')(state));

  state.data.destinationFields = fields(session, session_date, session_duration, event_name);

  return state;
});

upsert('Attendance__c', 'Event_C.name', state => state.data.destinationFields);
