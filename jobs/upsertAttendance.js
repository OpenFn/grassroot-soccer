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
each(
  merge(dataPath('form.attendance_list.item[*]'), fields(
    field('intervention_name', dataValue('form.intervention_name')),
    field('case_id', dataValue('form.case.@case_id')),
  )),
  upsert( 'Attendance__c', 'CommCare_Ext_ID__c', state => ({
    ...fields(...state.data.dynamicFields),
    ...fields(
    relationship('Event__r', 'CommCare_Case_ID__c', dataValue('case_id')),
    field('Name', dataValue('form.attendance_list.update_participant_cases.item.participant_id')),
    field('CommCare_Ext_ID__c', state => {
        var eventid = dataValue('intervention_name')(state);
        var personid = state.data.case.index.parent['#text'];
        return personid + '-' + eventid;
      }),
    relationship('Person_Attendance__r', 'Participant_Identification_Number_PID__c', dataValue('create_attendance_case.case.index.parent.#text')),
    
  ),
 }))
);
