alterState(state => {
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
  dataPath('form.attendance_list.update_participant_cases.item[*]'),
  upsert('Attendance__c', 'CommCare_Ext_ID__c', state => ({
    ...fields(
      //  @aleksa-krolls confirm if the value here should be the case_id of the person in attendance
      relationship('Event__r', 'CommCare_Case_ID__c', state => state.data['@id']),
      field('Name', dataValue('participant_name')),
      field('CommCare_Ext_ID__c', state => {
        // @aleksa-krolls intervention_name is not in sample data
        const eventid = dataValue('intervention_name')(state);
        const personid = state.data['@id'];
        return personid + '-' + eventid;
      }),
      // @aleksa-krolls I get this error:
     // INVALID_FIELD: Foreign key external ID: ce3f0b88-a612-4f5e-b26c-9888f65ee376 not found for field CommCare_Case_ID__c in entity Event__c
      relationship('Person_Attendance__r', 'Participant_Identification_Number_PID__c', state => state.data['@id'])
    ),
    ...state.data.dynamicFields,
  }))
);
