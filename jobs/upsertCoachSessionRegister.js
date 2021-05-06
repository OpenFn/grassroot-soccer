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

  const session_id = session_text.trim().slice(0, session_text.indexOf(' ')).slice(1);

  state.data.dynamicFields = [
    field(`Session_${session_id}__c`, getSessionValue()),
    field(`Session_${session_id}_Date__c`, dataValue('form.date')(state)),
    field(`Session_${session_id}_Duration__c`, dataValue('form.duration')(state)),
  ];

  return state;
});

upsert('Attendance__c', 'Event__c.name', state => ({
  ...fields(field('Event__c.name', dataValue('form.intervention_name'))),
  ...fields(...state.data.dynamicFields),
}));