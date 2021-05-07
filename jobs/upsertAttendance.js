// push to production
alterState(state => {
  const present = dataValue('form.attendance_list.update_participant_cases.item.attendance_session')(state).toLowerCase();

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
    dataValue('form.intervention_name')(state) +
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
    relationship('Event__r', 'CommCare_Ext_ID__c', dataValue('form.intervention_name')),
    field('Name', dataValue('form.attendance_list.update_participant_cases.item.participant_id')),
    field('CommCare_Ext_ID__c', dataValue('commcare_external_id')),
    relationship('Person_Attendance__r', 'Participant_Identification_Number_PID__c', dataValue('form.case.@case_id')),
    // field(
    //   'Total_Sessions_Attended__c',
    //   dataValue('form.attendance_list.update_participant_cases.item.num_sessions_attended')
    // ) //NOTE: cannot map rollup summary fields
  ),
}));
