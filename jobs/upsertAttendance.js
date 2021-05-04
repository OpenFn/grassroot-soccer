alterState(state => {
  const present = dataValue('form.attendance_list.present')(state).toLowerCase();

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

  const session_text = dataValue('form.attendance_list.session')(state);

  const session_id = session_text.slice(0, session_text.indexOf(' ')).slice(1);

  const session = field(`Session_${session_id}__c`, getSessionValue());

  const session_date = field(`Session_${session_id}_Date__c`, dataValue('form.attendance_list.date')(state));

  const event_name = field('Event_C.name', dataValue('form.attendance_list.intervention_name')(state));

  const person_in_attendance = field(
    'Person_Attendance__c',
    dataValue('form.attendance_list.update_participant_cases.item.participant_name')(state)
  );

  const participant_id = field(
    'Name',
    dataValue('form.attendance_list.update_participant_cases.item.participant_id')(state)
  );

  const total_sessions = field(
    'Total_Sessions_Attended__c',
    dataValue('form.attendance_list.update_participant_cases.item.num_sessions_attended')(state)
  );

  let external_id = event_name[1] + person_in_attendance[1];

  external_id = external_id.toLowerCase().replace(/\s/g, '').trim();

  const commcare_external_id = field('CommCare_Ext_ID__c', external_id);

  state.data.destinationFields = fields(
    session,
    session_date,
    event_name,
    participant_id,
    person_in_attendance,
    total_sessions,
    commcare_external_id
  );

  return state;
});

upsert('Attendance__c', 'CommCare_Ext_ID__c', state => state.data.destinationFields);
