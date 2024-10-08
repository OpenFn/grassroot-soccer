fn(state => {
  if (!state.data.form.attendance_list.update_participant_cases.item) {
    console.log('No participant attendance data was provided, not upserting to Salesforce.');
    return state;
  } else {
    // query(
    //   `SELECT Id, Name, CommCare_Ext_ID__c FROM Event__c WHERE CommCare_Case_ID__c = '${state.data.form.attendance_list.update_participant_cases.item[0]['@id']}'`
    // );

    // fn(state => {
    const records = lastReferenceValue('records')(state);
    const eventName = lastReferenceValue('records[0].CommCare_Ext_ID__c')(state);

    // if (!eventName) {
    //   console.log(
    //     `Participant not found with CommCare_Case_ID__c: ${state.data.form.attendance_list.update_participant_cases.item[0]['@id']}`
    //   );
    //   return state;
    // }

    return execute(
      fn(state => {
        // Note: lastReferenceValue selects the first item in the references array.
        state.data.eventName = eventName ? eventName.replace(/\//gi, '') : null;

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
        
        //When GRS enters session names incorrectly in CommCare (e.g., session: "P8 // My body is mine)
        function findPValue(input) {
          // Regular expression to match "P" followed by one or more digits, then "//"
            const regex = /P(\d+)\s*\/\//;
    
          // Match the input against the regex
          const match = input.match(regex);
    
          // If a match is found, return the captured digits as an integer
          if (match) {
            return parseInt(match[1], 10);
          } else {
            // If no match is found, return null or handle as needed
          return 'Session_not_found';
        }
}

        const sessionText = dataValue('form.attendance_list.session')(state);
        const sessionId = sessionText.includes('//') ? findPValue(sessionText) : getSessionId(sessionText);
        
        console.log('sessionText:: ', sessionText); 
        console.log('sessionId:: ', sessionText); 
        
        const sessionDate = dataValue("form.case['@date_modified']")(state);

        state.data.form.attendance_list.update_participant_cases.item =
          state.data.form.attendance_list.update_participant_cases.item.map(item => {
            const sessionValue = getSessionValue(item.attendance_session);
            return {
              ...item,
              dynamicFields: {
                [`Session_${sessionId}__c`]: sessionValue,
                [`Session_${sessionId}_Date__c`]: sessionDate,
              },
            };
          });

        return state;
      }),

      each(
        merge(
          dataPath('form.attendance_list.update_participant_cases.item[*]'),
          fields(
            field('intervention_name', dataValue('form.intervention_name')),
            field('eventName', dataValue('eventName')),
            field('caseid', dataValue('form.case.@case_id'))
          )
        ),
        upsert('Attendance__c', 'CommCare_Ext_ID__c', state => ({
          ...fields(
            relationship('Event__r', 'CommCare_Case_ID__c', dataValue('caseid')),
            field(
              'CommCare_Ext_ID__c',
              state => `${state.data['@id']}-${toUTF8(state.data.intervention_name)}`
            ),
            relationship('Person_Attendance__r', 'Participant_Identification_Number_PID__c', dataValue('@id'))
          ),
          ...state.data.dynamicFields,
        }))
      )
    )(state);
  }
});
