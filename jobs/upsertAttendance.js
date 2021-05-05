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

  const session_id = session_text.trim().slice(0, session_text.indexOf(' ')).slice(1);

  let external_id =
    dataValue('form.attendance_list.intervention_name')(state) +
    dataValue('form.attendance_list.update_participant_cases.item.participant_name')(state);

  state.data.commcare_external_id = external_id.toLowerCase().replace(/\s/g, '').trim();

  state.data.dynamicFields = [
    field(`Session_${session_id}__c`, getSessionValue()),
    field(`Session_${session_id}_Date__c`, dataValue('form.attendance_list.date')(state)),
  ];

  return state;
});

upsert('Attendance__c', 'CommCare_Ext_ID__c', state => ({
  ...fields(...state.data.dynamicFields),
  ...fields(
    field('Event_C.name', dataValue('form.attendance_list.intervention_name')),
    field('Name', dataValue('form.attendance_list.update_participant_cases.item.participant_id')),
    field('CommCare_Ext_ID__c', dataValue('commcare_external_id')),
    field('Person_Attendance__c', dataValue('form.attendance_list.update_participant_cases.item.participant_name')),
    field(
      'Total_Sessions_Attended__c',
      dataValue('form.attendance_list.update_participant_cases.item.num_sessions_attended')
    )
  ),
}));
