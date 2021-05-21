query(`SELECT Id, Name, CommCare_Ext_ID__c FROM Event__c WHERE CommCare_Case_ID__c = '${state.data.form.case['@case_id']}'`);

alterState(state => {
  // Note: lastReferenceValue selects the first item in the references array.
  state.data.eventName = lastReferenceValue('records[0].CommCare_Ext_ID__c')(state);
  
  function getSessionValue(present) {
    switch (present.toString().toLowerCase()) {
      case 'yes':
        return 'X';
      case 'no':
        return 'A';
      case '':
        return 'N';
      default:
        return 'U';
    }
  }

  function getSessionId(session_text) {
    return session_text.toString().trim().slice(0, session_text.indexOf(' ')).slice(1);
  }

  function objectToArray(object) {
    if (!object) return [];
    return !Array.isArray(object) ? [object] : object;
  }

  state.data.form.attendance_list.update_participant_cases.item = objectToArray(
    state.data.form.attendance_list.update_participant_cases.item
  );

  const sessionText = dataValue('form.attendance_list.session')(state);
  const sessionId = getSessionId(sessionText);

  //   @aleksa-krolls confirm the path for the session date
  const sessionDate = dataValue("form.case['@date_modified']")(state);

  state.data.form.attendance_list.update_participant_cases.item =
    state.data.form.attendance_list.update_participant_cases.item.map(item => {
      const sessionValue = getSessionValue(item.attendance_session);
      return {
        ...item,
        dynamicFields: { [`Session_${sessionId}__c`]: sessionValue, [`Session_${sessionId}_Date__c`]: sessionDate },
      };
    });

  return state;
});

each(
  merge(
    dataPath('form.attendance_list.update_participant_cases.item[*]'),
    fields(
      field('intervention_name', dataValue('form.intervention_name')),
      field('eventName', dataValue('eventName'))
    )
  ),
  upsert('Attendance__c', 'CommCare_Ext_ID__c', state => ({
    ...fields(
      relationship('Event__r', 'CommCare_Ext_ID__c', dataValue('eventName')),
      field('CommCare_Ext_ID__c', state => `${state.data['@id']}-${state.data.eventName}`),
      relationship('Person_Attendance__r', 'Participant_Identification_Number_PID__c', dataValue('@id'))
    ),
    ...state.data.dynamicFields,
  }))
);
